<script setup lang="ts">
import ChatHeader from './ChatHeader.vue';
import MessageList from './MessageList.vue';
import MessageComposer from './MessageComposer.vue';
import { useChatStore } from '@/stores/clientChat';

const chat = useChatStore();

function openNewConversation() {
    chat.showNewConversation = true;
}
</script>

<template>
    <main class="min-w-0 flex-1 bg-[#111313]">
        <!-- No conversation -->
        <div
            v-if="!chat.activeConversation"
            class="
                flex h-full
                items-center justify-center
            "
        >
            <div class="text-center">
                <div
                    class="
                        mx-auto mb-4
                        flex size-16
                        items-center justify-center
                        rounded-full
                        bg-[#edbd53]/10
                        text-[#edbd53]
                    "
                >
                    <span class="text-2xl">💬</span>
                </div>

                <h2 class="text-lg font-semibold">
                    Your messages
                </h2>

                <p class="mt-1 text-sm text-white/40">
                    Select a conversation to start chatting or 
                    <span>
                        <button class="font-bold underline text-yellow-600" @click="openNewConversation">
                            Create
                        </button>
                    </span>
                </p>
            </div>
        </div>

        <!-- Conversation -->
        <div
            v-else
            class="flex h-full flex-col"
        >
            <ChatHeader />

            <MessageList />

            <MessageComposer />
        </div>
    </main>
</template>