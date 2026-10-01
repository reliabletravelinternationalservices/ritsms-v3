```vue
<script setup lang="ts">

import { Loader2, X } from '@lucide/vue'

import { isSenderType } from '@/lib/utils'
import { Message } from '@/types/chat'

interface Props {
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
            isSenderType(message.sender_type, 'session')
                ? 'justify-end'
                : 'justify-start'
        "
    >
        <div class="max-w-[80%]">

            <!-- Bubble -->
            <div
                class="rounded-2xl px-3 py-2 text-sm w-fit"
                :class="
                    isSenderType(message.sender_type, 'session')
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                "
            >
                <!-- Message -->
                <div class="whitespace-pre-wrap break-words">
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

                
            </div>

            <!-- Time -->
            <div
                class="mt-1 text-[10px] text-muted-foreground flex items-center gap-1 justify-end"
                :class="
                    isSenderType(message.sender_type, 'session')
                        ? 'text-right'
                        : 'text-left'
                "
            >
            <!-- Sending / Failed -->
                <div
                    v-if="
                        isSenderType(message.sender_type, 'session') &&
                        message.status !== 'sent'
                    "
                    class="mt-0.5 flex justify-end"
                >
                    <Loader2
                        v-if="message.status === 'sending'"
                        class="size-3 text-muted-foreground animate-spin"
                    />

                    <X
                        v-else-if="message.status === 'failed'"
                        class="size-3 text-destructive"
                    />
                </div>
                <span v-if="message.status !== 'sending'">
                     {{ formatMessageTime(message.created_at) }}
                </span>
            </div>

        </div>
    </div>
</template>
```
