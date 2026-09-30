<script setup lang="ts">
import { ChatSession, Message } from '@/types/chat';




interface Props {
    chat: ChatSession
    message: Message
}

defineProps<Props>()

function getMessageParts(message: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g

    return message.split(urlRegex).map((part) => ({
        text: part,
        isUrl: /^https?:\/\/[^\s]+$/.test(part),
    }))
}

function formatMessageTime(date: string) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    })
}
</script>

<template>
    <div
        class="flex"
        :class="
            message.sender === 'session'
                ? 'justify-end'
                : 'justify-start'
        "
    >
        <div class="max-w-[80%]">
            <!-- Bubble -->
            <div
                class="rounded-2xl px-3 py-2 text-sm"
                :class="
                    message.sender === 'session'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                "
            >
                <template
                    v-for="(part, index) in getMessageParts(message.message)"
                    :key="index"
                >
                    <a
                        v-if="part.isUrl"
                        :href="part.text"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="break-all underline underline-offset-2"
                    >
                        {{ part.text }}
                    </a>

                    <span v-else>
                        {{ part.text }}
                    </span>
                </template>
            </div>

            <!-- Time -->
            <div
                class="mt-1 text-[10px] text-muted-foreground"
                :class="
                    message.sender === 'session'
                        ? 'text-right'
                        : 'text-left'
                "
            >
                {{ formatMessageTime(message.created_at) }}
            </div>
        </div>
    </div>
</template>