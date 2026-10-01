<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'

import ChatWindow from './ChatWindow.vue'
import { useSessionChatbox } from '@/stores/chatbox.js'

const chatbox = useSessionChatbox()


onMounted(()=>{
    chatbox.initializeChatSession()
})

</script>

<template>
    <div class="fixed bottom-5 right-5 z-50 text-foreground">
        <ChatWindow
            v-if="chatbox.isChatboxOpen"
            @close="chatbox.chatboxToggle(false)"
        />

        <button
            v-else
            type="button"
            class="flex size-14 items-center justify-center rounded-full bg-yellow-600 text-foreground shadow-xl transition-colors hover:bg-yellow-400"
            @click="chatbox.chatboxToggle(true)"
        >
            <Icon
                icon="lucide:message-circle-more"
                width="28"
                height="28"
            />
        </button>
    </div>
</template>