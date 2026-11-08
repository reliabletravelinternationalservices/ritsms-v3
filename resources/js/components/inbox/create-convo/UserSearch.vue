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

const hasMore = computed(() => !!contacts.value?.next_cursor)

watch(search, (value) => {
    if (debounceTimer) clearTimeout(debounceTimer)

    // Invalidate previous requests
    searchVersion++

    // Reset pagination
    contacts.value = null

    if (!value.trim()) {
        isOpen.value = false
        isLoading.value = false
        return
    }

    isOpen.value = true

    debounceTimer = setTimeout(() => {
        fetchUsers(value.trim())
    }, 400)
})

async function fetchUsers(query: string, cursor?: string | null) {
    if (isLoading.value) return

    const version = searchVersion
    isLoading.value = true

    try {
        const response = await userService.searchUserContacts(
            query,
            cursor
        )

        // Ignore outdated search results
        if (version !== searchVersion) return

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

    } catch (error) {
        if (version === searchVersion) {
            console.error('Failed to search users:', error)
        }
    } finally {
        if (version === searchVersion) {
            isLoading.value = false
        }
    }
}

function loadMoreUsers() {
    if (isLoading.value || !hasMore.value) return

    fetchUsers(
        search.value.trim(),
        contacts.value?.next_cursor
    )
}

function selectUser(user: Contact) {
    emit('select', user)

    search.value = ''
    contacts.value = null
    isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
    if (
        searchContainer.value &&
        !searchContainer.value.contains(event.target as Node)
    ) {
        isOpen.value = false
    }
}

function handleFocus() {
    if (search.value.trim()) {
        isOpen.value = true
    }
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside)

    if (debounceTimer) clearTimeout(debounceTimer)

    searchVersion++
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
                        <Avatar class="size-10 shrink-0">
                            <AvatarImage v-if="user.avatar" :src="user.avatar" :alt="user.display_name" />

                            <AvatarFallback>
                                <AvatarPlaceholder />
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