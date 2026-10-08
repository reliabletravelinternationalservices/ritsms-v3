<script setup lang="ts">
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'

import ChatWindow from './ChatWindow.vue'
import { useSessionChatbox } from '@/stores/chatbox.js'
import { useSessionChat } from '@/stores/sessionChat'

const chatbox = useSessionChatbox()
const sessionChat = useSessionChat()

onMounted(async () => {
    await sessionChat.initializeStoredChat()
})

</script>

<template>
    <div class="fixed bottom-5 right-5 z-50 text-foreground">
        <ChatWindow v-if="chatbox.isChatboxOpen" @close="chatbox.chatboxToggle(false)" />

        <button v-else type="button"
            class="relative flex size-14 items-center justify-center rounded-full bg-yellow-600 text-foreground shadow-xl transition-colors hover:bg-yellow-400"
            :aria-label="chatbox.unreadMessageCount > 0
                ? `Open chat, ${chatbox.unreadMessageCount} unread messages`
                : 'Open chat'" @click="chatbox.chatboxToggle(true)">
            <Icon icon="lucide:message-circle-more" width="28" height="28" />

            <span v-if="chatbox.unreadMessageCount > 0"
                class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-background"
                aria-hidden="true">
                {{ chatbox.unreadMessageCount > 99 ? '99+' : chatbox.unreadMessageCount }}
            </span>
        </button>
    </div>
</template>