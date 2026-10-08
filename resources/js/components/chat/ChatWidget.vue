<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'

import ChatWindow from './ChatWindow.vue'
import { useSessionChat } from '@/stores/sessionChat'


const openChatbox = ref(false)


const sessionChat = useSessionChat()


const tootleChatbox = (value: boolean) => {
    openChatbox.value = value
}


onMounted(async () => {
    await sessionChat.initializeStoredChat()
})

</script>

<template>
    <div class="fixed bottom-5 right-5 z-50 text-foreground">
        <ChatWindow v-if="openChatbox" @close="tootleChatbox(false)" />

        <button v-else type="button"
            class="relative flex size-14 items-center justify-center rounded-full bg-yellow-600 text-foreground shadow-xl transition-colors hover:bg-yellow-400"
            :aria-label="sessionChat.totalNewMessages > 0
                ? `Open chat, ${sessionChat.totalNewMessages} unread messages`
                : 'Open chat'" @click="tootleChatbox(true)">
            <Icon icon="lucide:message-circle-more" width="28" height="28" />

            <span v-if="!sessionChat.isEmptyNewMessages"
                class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-background"
                aria-hidden="true">
                {{ sessionChat.totalNewMessages > 99 ? '99+' : sessionChat.totalNewMessages }}
            </span>
        </button>
    </div>
</template>