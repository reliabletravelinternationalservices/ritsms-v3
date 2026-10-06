<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

import Message from './Message.vue'
import EmptyMessage from './EmptyMessage.vue'
import MessageSkeleton from './MessageSkeleton.vue'

import { useSessionChatbox } from '@/stores/chatbox.js'
import { formatDateLabel, isSameDay } from '@/lib/utils.js'

const chatbox = useSessionChatbox()

const messagesContainer = ref<HTMLElement | null>(null)

let lastScrolledSessionId: string | null = null

function scrollToBottom() {
    nextTick(() => {
        if (!messagesContainer.value) return

        messagesContainer.value.scrollTop =
            messagesContainer.value.scrollHeight
    })

}

watch(
    [
        () => chatbox.getChatSessionDetails?.uuid,
        () => chatbox.getMessages.length,
        () => chatbox.isLoadingMessages,
    ],
    ([sessionId, length, isLoading]) => {
        if (
            !sessionId ||
            length === 0 ||
            isLoading ||
            lastScrolledSessionId === sessionId
        ) return

        scrollToBottom()
        lastScrolledSessionId = sessionId
    },
    {
        immediate: true,
    },
)

defineExpose({
    scrollToBottom,
})

</script>

<template>
    <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto scroll-smooth p-4
            [scrollbar-width:thin]
            [scrollbar-color:hsl(var(--muted-foreground)/0.45)_transparent]"
    >
        <!-- Loading -->
        <MessageSkeleton
            v-if="chatbox.isLoadingMessages"
        />

        <!-- Empty -->
        <EmptyMessage
            v-else-if="chatbox.isEmptyMessage"
        />

        <!-- Messages -->
        <div
            v-else
            class="space-y-5"
        >
            <template
                v-for="(message, index) in chatbox.getMessages"
                :key="message.id"
            >
                <!-- Date separator -->
                <div
                    v-if="
                        index === 0 ||
                        !isSameDay(
                            message.created_at,
                            chatbox.getMessages[index - 1].created_at,
                        )
                    "
                    class="flex items-center gap-3"
                >
                    <div class="h-px flex-1 bg-border" />

                    <span
                        class="text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
                    >
                        {{ formatDateLabel(message.created_at) }}
                    </span>

                    <div class="h-px flex-1 bg-border" />
                </div>

                <Message
                    :message="message"
                />
            </template>
        </div>
    </div>
</template>