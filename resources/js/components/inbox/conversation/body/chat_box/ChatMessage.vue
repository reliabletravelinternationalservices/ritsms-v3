<script setup lang="ts">
import { formatMessageTime } from '@/lib/utils'
import type { Message } from '@/types/conversation'

interface Props {
    isMine: boolean
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
</script>

<template>
    <div class="flex w-full" :class="message.type === 'system'
        ? 'justify-center'
        : isMine
            ? 'justify-end'
            : 'justify-start'
        ">
        <div :class="message.type === 'system'
            ? 'flex max-w-[90%] flex-col items-center'
            : 'max-w-[80%]'
            ">
            <!-- System Message -->
            <template v-if="message.type === 'system'">
                <div
                    class="rounded-full border border-border/60 bg-muted/60 px-4 py-1.5 text-center text-xs text-muted-foreground shadow-sm">
                    <div class="whitespace-pre-wrap break-words">
                        <template v-for="(part, index) in getMessageParts(message.message)" :key="index">
                            <a v-if="part.isUrl" :href="part.text" target="_blank" rel="noopener noreferrer"
                                class="break-all underline underline-offset-2">
                                {{ part.text }}
                            </a>

                            <span v-else>{{ part.text }}</span>
                        </template>
                    </div>
                </div>

                <div class="mt-1 text-[10px] text-muted-foreground">
                    {{ formatMessageTime(message.created_at) }}
                </div>
            </template>

            <!-- Regular Message -->
            <template v-else>
                <div class="w-fit rounded-2xl px-3 py-2 text-sm" :class="isMine
                    ? 'bg-yellow-600 text-primary-foreground rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                    ">
                    <div class="whitespace-pre-wrap break-words">
                        <template v-for="(part, index) in getMessageParts(message.message)" :key="index">
                            <a v-if="part.isUrl" :href="part.text" target="_blank" rel="noopener noreferrer"
                                class="break-all underline underline-offset-2">
                                {{ part.text }}
                            </a>

                            <span v-else>{{ part.text }}</span>
                        </template>
                    </div>
                </div>

                <!-- Time -->
                <div class="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground"
                    :class="isMine ? 'justify-end' : 'justify-start'">
                    {{ formatMessageTime(message.created_at) }}
                </div>
            </template>
        </div>
    </div>
</template>
