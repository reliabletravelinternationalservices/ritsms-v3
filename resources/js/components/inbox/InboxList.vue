<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

import ChatCard from './ChatCard.vue'
import type { ChatCardData } from './ChatCard.vue'
import { ChatSession } from '@/types/chat'

interface Props {
    chats: ChatSession[]
    activeId: number | string | null
    title: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
    select: [chat: ChatSession]
    create: []
}>()

const search = ref('')

const filteredChats = computed(() => {
    const query = search.value.trim().toLowerCase()

    if (!query) {
        return props.chats
    }

    return props.chats.filter(chat =>
        chat.code.toLowerCase().includes(query)
    )
})
</script>

<template>
    <aside class="flex h-full min-h-0 flex-col border-r">

        <!-- LIST HEADER -->
        <div class="flex shrink-0 items-center justify-between px-4 py-3">
            <div>
                <h2 class="text-sm font-semibold">
                    {{ title }}
                </h2>

                <p class="text-xs text-muted-foreground">
                    {{ props.chats.length }}
                    conversations
                </p>
            </div>

            <button
                type="button"
                class="flex size-8 items-center justify-center rounded-md hover:bg-muted"
                title="New conversation"
                @click="emit('create')"
            >
                <Icon
                    icon="lucide:plus"
                    class="size-4"
                />
            </button>
        </div>

        <!-- SEARCH -->
        <div class="shrink-0 px-3 pb-3">
            <div class="relative">
                <Icon
                    icon="lucide:search"
                    class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />

                <input
                    v-model="search"
                    type="text"
                    placeholder="Search conversations..."
                    class="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
                />
            </div>
        </div>

        <!-- CHAT LIST -->
        <div class="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
            <ChatCard
                v-for="chat in filteredChats"
                :key="chat.id"
                :chat="chat"
                :active="chat.id === activeId"
                @click="emit('select', chat)"
            />

            <div
                v-if="filteredChats.length === 0"
                class="flex flex-col items-center justify-center px-4 py-12 text-center"
            >
                <Icon
                    icon="lucide:search-x"
                    class="mb-2 size-7 text-muted-foreground"
                />

                <p class="text-sm font-medium">
                    No conversations found
                </p>

                <p class="mt-1 text-xs text-muted-foreground">
                    Try searching for another conversation.
                </p>
            </div>
        </div>
    </aside>
</template>