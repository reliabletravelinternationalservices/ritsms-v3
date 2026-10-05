<script setup lang="ts">
import ConversationListItem from './ConversationListItem.vue';

import { useChatStore } from '@/stores/clientChat';

const chat = useChatStore();
</script>

<template>
    <div class="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        <!-- Groups coming soon -->
        <div
            v-if="chat.filter === 'groups'"
            class="
                flex h-full
                items-center justify-center
                px-8 text-center
            "
        >
            <div>
                <div
                    class="
                        mx-auto mb-3
                        flex size-12 items-center justify-center
                        rounded-full
                        bg-[#edbd53]/10
                        text-[#edbd53]
                    "
                >
                    <span class="text-xl">👥</span>
                </div>

                <h3 class="font-semibold">
                    Groups are coming soon
                </h3>

                <p class="mt-1 text-sm text-white/40">
                    For now, chats are limited to
                    direct conversations.
                </p>
            </div>
        </div>

        <template v-else>
            <ConversationListItem
                v-for="conversation in chat.filteredConversations"
                :key="conversation.id"
                :conversation="conversation"
                :active="
                    chat.activeConversation?.id ===
                    conversation.id
                "
                @click="
                    chat.selectConversation(conversation)
                "
            />

            <div
                v-if="
                    !chat.loadingConversations &&
                    chat.filteredConversations.length === 0
                "
                class="
                    flex h-40
                    items-center justify-center
                    text-sm text-white/40
                "
            >
                No conversations found.
            </div>
        </template>
    </div>
</template>