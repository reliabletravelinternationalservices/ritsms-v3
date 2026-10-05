<script setup lang="ts">
import { nextTick, onUpdated, ref } from 'vue';

import MessageBubble from './MessageBubble.vue';

import { useChatStore } from '@/stores/clientChat';

const chat = useChatStore();

const container = ref<HTMLElement | null>(null);

async function scrollToBottom() {
    await nextTick();

    if (!container.value) {
        return;
    }

    container.value.scrollTop =
        container.value.scrollHeight;
}

onUpdated(scrollToBottom);
</script>

<template>
    <div
        ref="container"
        class="
            min-h-0
            flex-1
            overflow-y-auto
            px-5 py-5
        "
    >
        <div class="mx-auto max-w-4xl">
            <div
                v-if="chat.loadingMessages"
                class="
                    flex h-full
                    items-center justify-center
                    text-sm text-white/40
                "
            >
                Loading messages...
            </div>

            <div
                v-else
                class="space-y-3"
            >
                <MessageBubble
                    v-for="message in chat.messages"
                    :key="message.id"
                    :message="message"
                />
            </div>
        </div>
    </div>
</template>