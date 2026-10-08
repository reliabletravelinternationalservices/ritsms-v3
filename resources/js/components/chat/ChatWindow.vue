<script setup lang="ts">
import { ref } from 'vue'

import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatComposer from './ChatComposer.vue'
import ChatStart from './ChatStart.vue'
import { useSessionChatbox } from '@/stores/chatbox'
import InitializingChat from './InitializingChat.vue'
import { useSessionChat } from '@/stores/sessionChat'

const sessionChat = useSessionChat()




const chatMessagesRef = ref<InstanceType<typeof ChatMessages> | null>(null)


const chatbox = useSessionChatbox()

const emit = defineEmits<{
    close: []
}>()


const sendMessage = async () => {
    await chatbox.sendComposedMessage()
    chatMessagesRef.value?.scrollToBottom()
}

const startSession = async () => {
    await sessionChat.createChatSession()
    await sessionChat.initializeStoredChat()
}

</script>

<template>
    <div
        class="mb-3 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl"
    >
        <ChatHeader
            :online="sessionChat.isValidSession"
            @close="emit('close')"
        />
        
        <InitializingChat
            v-if="sessionChat.isInitializing"
        />

        <ChatStart
            v-else-if="!sessionChat.isValidSession && !sessionChat.isInitializing"
            :starting="sessionChat.isCreatingSession"
            @start="startSession"
        />

        <template v-else>
            <ChatMessages ref="chatMessagesRef" />

            <ChatComposer
                @send="sendMessage"
            />
        </template>
    </div>
</template>