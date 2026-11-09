
<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted, computed } from 'vue'
import { Input } from '@/components/ui/input'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import AvatarPlaceholder from '@/components/AvatarPlaceholder.vue'
import InfiniteScroll from '@/components/InfiniteScroll.vue'

import { Contact } from '@/types/user/contact'
import { userService } from '@/services/userService'
import { CursorPaginated } from '@/types/cursor/cursor-paginated'

const emit = defineEmits<{
    (e: 'select', user: Contact): void
}>()

const search = ref('')
const contacts = ref<CursorPaginated<Contact> | null>(null)

const isLoading = ref(false)
const isOpen = ref(false)

const searchContainer = ref<HTMLElement | null>(null)

let debounceTimer: ReturnType<typeof setTimeout> | null = null
let searchVersion = 0
let searchAbortController: AbortController | null = null

const hasMore = computed(() => !!contacts.value?.next_cursor)

// ======================
// ABORT REQUEST
// ======================

function abortSearch() {
    searchVersion++

    searchAbortController?.abort()
    searchAbortController = null

    isLoading.value = false
}

// ======================
// WATCH SEARCH
// ======================

watch(search, (value) => {
    if (debounceTimer) {
        clearTimeout(debounceTimer)
        debounceTimer = null
    }

    // Cancel previous request
    abortSearch()

    // Reset results
    contacts.value = null

    if (!value.trim()) {
        isOpen.value = false
        return
    }

    isOpen.value = true

    debounceTimer = setTimeout(() => {
        debounceTimer = null
        fetchUsers(value.trim())
    }, 400)
})

// ======================
// FETCH USERS
// ======================

async function fetchUsers(query: string, cursor?: string | null) {
    if (!query || isLoading.value) return

    // Cancel previous request if any
    searchAbortController?.abort()

    const controller = new AbortController()
    searchAbortController = controller

    const version = searchVersion

    isLoading.value = true

    try {
        const response = await userService.searchUserContacts(
            {
                search: query,
                cursor: cursor || null,
            },
            controller.signal
        )

        // Ignore outdated or cancelled requests
        if (
            controller.signal.aborted ||
            version !== searchVersion
        ) return

        if (cursor && contacts.value) {
            contacts.value = {
                ...response,
                data: [
                    ...contacts.value.data,
                    ...response.data,
                ],
            }
        } else {
            contacts.value = response
        }

    } catch (error: any) {
        if (
            error.name !== 'CanceledError' &&
            error.code !== 'ERR_CANCELED' &&
            version === searchVersion
        ) {
            console.error('Failed to search users:', error)
        }
    } finally {
        if (searchAbortController === controller) {
            searchAbortController = null
            isLoading.value = false
        }
    }
}

// ======================
// LOAD MORE
// ======================

function loadMoreUsers() {
    if (isLoading.value || !hasMore.value) return

    fetchUsers(
        search.value.trim(),
        contacts.value?.next_cursor
    )
}

// ======================
// SELECT USER
// ======================

function selectUser(user: Contact) {
    // Cancel pending request
    abortSearch()

    emit('select', user)

    search.value = ''
    contacts.value = null
    isOpen.value = false
}

// ======================
// CLICK OUTSIDE
// ======================

function handleClickOutside(event: MouseEvent) {
    if (
        searchContainer.value &&
        !searchContainer.value.contains(event.target as Node)
    ) {
        isOpen.value = false
        abortSearch()
    }
}

// ======================
// FOCUS
// ======================

function handleFocus() {
    if (search.value.trim()) {
        isOpen.value = true
    }
}

// ======================
// LIFECYCLE
// ======================

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside)

    if (debounceTimer) {
        clearTimeout(debounceTimer)
    }

    abortSearch()
})
</script>


<template>
    <div ref="searchContainer" class="relative w-full">
        <Input v-model="search" type="text" placeholder="Search a name | email..." autocomplete="off"
            @focus="handleFocus" />

        <div v-if="isOpen && search.trim()"
            class="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md">
            <!-- Initial Loading -->
            <div v-if="isLoading && !contacts"
                class="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground">
                <span class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Searching users...
            </div>

            <!-- Results -->
            <template v-else-if="contacts?.data.length">
                <InfiniteScroll :loading="isLoading" :has-more="hasMore" :threshold="80" direction="top-to-bottom"
                    class="max-h-72 overflow-y-auto p-1" @load="loadMoreUsers">
                    <button v-for="user in contacts.data" :key="user.id" type="button"
                        class="flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-accent hover:text-accent-foreground"
                        @click="selectUser(user)">
                        <Avatar class="h-10 w-10 overflow-hidden rounded-circle border border-sidebar-border bg-sidebar">
                            <AvatarImage v-if="user.avatar" :src="user.avatar" :alt="user.display_name" />
                            <AvatarFallback class="rounded-circle text-white">
                                <AvatarPlaceholder class="aspect-square h-full w-full" />
                            </AvatarFallback>
                        </Avatar>

                        <div class="min-w-0 flex-1">
                            <p class="truncate text-sm font-medium">
                                {{ user.display_name }}
                            </p>

                            <p class="truncate text-xs text-muted-foreground">
                                {{ user.email }}
                            </p>
                        </div>

                        <span
                            class="shrink-0 rounded-md bg-muted px-2 py-1 text-[10px] font-medium capitalize text-muted-foreground">
                            {{ user.role }}
                        </span>
                    </button>
                </InfiniteScroll>
            </template>

            <!-- Empty -->
            <div v-else-if="!isLoading" class="p-5 text-center text-sm text-muted-foreground">
                No users found.
            </div>
        </div>
    </div>
</template>