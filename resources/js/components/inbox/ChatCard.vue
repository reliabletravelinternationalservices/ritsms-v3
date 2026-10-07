<script setup lang="ts">
import { formatMessageTime } from '@/lib/utils'

import {
    ChatSessionWithLatestMessage,
    Mode,
} from '@/types/chat'

import {
    ConversationWithLatestMessage,
} from '@/types/conversation'

interface Props {
    chat: ChatSessionWithLatestMessage | ConversationWithLatestMessage
    mode: Mode
    active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
})

const chatName = () => {
    if (props.mode === 'sessions') {
        return (props.chat as ChatSessionWithLatestMessage).code ?? 'Unnamed session'
    }

    return (props.chat as ConversationWithLatestMessage).name ?? 'Unnamed conversation'
}
</script>

<template>
    <button type="button" class="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition" :class="props.active
        ? 'bg-muted'
        : 'hover:bg-muted/60'
        ">
        <!-- AVATAR -->
        <div class="relative shrink-0">
            <div
                class="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {{ mode === 'sessions' ? 'SC' : 'CV' }}
            </div>

            <!-- STATUS -->
            <span v-if="(chat as ChatSessionWithLatestMessage).status === 'open'"
                class="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-green-500" />

            <span v-else-if="(chat as ChatSessionWithLatestMessage).status === 'closed'"
                class="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-gray-500" />
        </div>

        <!-- INFO -->
        <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
                <!-- NAME -->
                <p class="truncate text-sm" :class="chat.latest_message?.state === 'unread'
                    ? 'font-semibold'
                    : 'font-medium'
                    ">
                    {{ chatName() }}
                </p>

                <!-- TIME -->
                <span v-if="chat.latest_message?.created_at" class="shrink-0 text-[10px] text-muted-foreground">
                    {{ formatMessageTime(chat.latest_message.created_at) }}
                </span>
            </div>

            <!-- LAST MESSAGE -->
            <div class="mt-1 flex items-center gap-2">
                <p class="min-w-0 flex-1 truncate text-xs" :class="chat.latest_message?.state === 'unread'
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground'
                    ">
                    {{ chat.latest_message?.message || 'No messages yet' }}
                </p>

                <!-- UNREAD COUNT -->
                <span v-if="chat.new_messages_count > 0"
                    class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {{ chat.new_messages_count }}
                </span>
            </div>
        </div>
    </button>
</template>