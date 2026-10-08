<script setup lang="ts">

import ChatHeader from './ChatHeader.vue'
import ChatMessage from './ChatMessage.vue'
import MessageComposer from './MessageComposer.vue'
import { Message as SessionMessage, Mode } from '@/types/chat'
import { Message as ConversationMessage } from '@/types/conversation'
import ChatComposer from './ChatComposer.vue'


interface Props {
    mode: Mode
    name: string
    initials: string
    status?: 'open' | 'closed' | undefined
    messages: SessionMessage[] | ConversationMessage[]
}

defineProps<Props>()

const emit = defineEmits<{
    send: [
        content: string,
        attachments?: unknown[] | null
    ]

    typing: [value: boolean]
    mute: []
    archive: []
    delete: []
}>()

// const isThemTyping = ref(false)
</script>

<template>
    <div
        class="flex min-w-0 flex-1 flex-col overflow-hidden text-foreground min-h-[calc(100vh-150px)] max-h-[calc(100vh-150px)]">
        <!-- Header -->
        <ChatHeader :name="name" :initials="initials" :status="status" @mute="emit('mute')" @archive="emit('archive')"
            @delete="emit('delete')" />

        <!-- Messages -->
        <div class="min-h-0 h-[500px] flex-1 overflow-y-auto bg-muted/20 p-5">
            <div class="flex justify-center">
                <span class="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
                    Today
                </span>
            </div>

            <div class="mt-6 space-y-4">
                <ChatMessage v-for="message in messages" :key="message.id" :message="message" />
            </div>

            <!-- Other user is typing -->
            <!-- <div v-if="isThemTyping" class="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span class="flex gap-1">
                    <span class="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                    <span class="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:100ms]" />
                    <span class="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:200ms]" />
                </span>

                {{ name }} is typing...
            </div> -->
        </div>

        <!-- Composer always at bottom -->
        <div class="shrink-0 bg-background self-end w-full">
            <ChatComposer @send="emit('send', $event)" />
            <!-- <MessageComposer v-if="mode === 'chats'" @send="emit('send', $event)" /> -->
        </div>
    </div>
</template>