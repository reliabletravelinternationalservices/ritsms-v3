<script setup lang="ts">
import { ref } from 'vue'

import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatComposer from './ChatComposer.vue'
import ChatStart from './ChatStart.vue'
import { useSessionChatbox } from '@/stores/chatbox.js'
import InitializingChat from './InitializingChat.vue'

const chatbox = useSessionChatbox()

const emit = defineEmits<{
    close: []
}>()


</script>

<template>
    <div
        class="mb-3 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl"
    >
        <ChatHeader
            :online="chatbox.isHasSession"
            @close="emit('close')"
        />
        
        <InitializingChat
            v-if="!chatbox.isHasSession && chatbox.isInitializing"
            :initializing="chatbox.isInitializing"
        />

        <ChatStart
            v-else-if="!chatbox.isHasSession"
            :starting="chatbox.isChatStarting"
            @start="chatbox.startChat"
        />

        <template v-else>
            <ChatMessages />

            <ChatComposer />
        </template>
    </div>
</template>