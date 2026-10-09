<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

import ChatCard from './ChatCard.vue'
import {
    ChatSessionWithLatestMessage as ChatSession,
    Mode,
} from '@/types/chat'


interface Props {
    chats: ChatSession[]
}

const props = withDefaults(defineProps<Props>(),{
    chats: ()=> []
})

const emit = defineEmits<{
    select: [id: string]
}>()

const search = ref('')
const selectedID = ref<string | null>(null)



const filteredChats = computed(() => {
    const query = search.value.trim().toLowerCase()

    if (!query) {
        return props.chats
    }

    return props.chats.filter((chat) => {
        return chat.code
            ?.toLowerCase()
            .includes(query)
    })
})



const selectChat= (id:string) =>{
    selectedID.value = id;
    emit('select', id)
}




</script>

<template>
    <aside class="flex h-full min-h-0 flex-col border-r py-6 text-foreground">
        <!-- SEARCH -->
        <div class="flex shrink-0 items-center gap-2 px-3 pb-3">
            <div class="relative w-full">
                <Icon icon="lucide:search"
                    class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input v-model="search" type="text" placeholder="Search sessions..."
                    class="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring" />
            </div>

            <!-- NEW CONVERSATION -->
            <!-- <button v-if="mode === 'chats'" type="button"
                class="flex size-8 items-center justify-center rounded-md hover:bg-muted" title="New conversation"
                @click="emit('create')">
                <Icon icon="lucide:plus" class="size-4" />
            </button> -->
        </div>

        <!-- CHAT LIST -->
        <div class="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
            <ChatCard v-for="chat in filteredChats" :key="chat.id" :chat="chat"
                :active="chat.uuid === selectedID" @click="selectChat(chat.uuid)"/>

            <!-- EMPTY -->
            <div v-if="filteredChats.length === 0"
                class="flex flex-col items-center justify-center px-4 py-12 text-center">
                <Icon icon="lucide:search-x" class="mb-2 size-7 text-muted-foreground" />

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