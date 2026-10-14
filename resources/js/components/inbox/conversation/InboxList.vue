<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

import ChatCard from './ChatCard.vue'
import CreateConvoModal from './CreateConvoModal.vue'
import { useAdminConvoChat } from '@/stores/adminConvoChat.js';
import { useDebounceFn } from '@vueuse/core'
import { Loader2 } from '@lucide/vue';

const service = useAdminConvoChat();

const showNewConversationDialog = ref(false);
const loadingConvos = ref(false);


const filterChat = useDebounceFn(async (value: string | number) => {
    loadingConvos.value = true;
    if (!value) {
        return
    }
    await service.getConversations({ search: value.toString() })
    loadingConvos.value = false;
}, 300)





</script>

<template>
    <aside class="flex h-full min-h-0 flex-col border-r py-6 text-foreground">
        <!-- SEARCH -->
        <div class="flex shrink-0 items-center gap-2 px-3 pb-3">
            <div class="relative w-full">
                <Icon icon="lucide:search"
                    class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input type="text" placeholder="Search convo name..." @update:model-value="filterChat"
                    class="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring" />
            </div>

            <!-- NEW CONVERSATION -->
            <button type="button"
                class="flex size-8 items-center justify-center rounded-md hover:bg-muted border border-foreground-muted text-muted-foreground transition-colors"
                title="New conversation" @click="showNewConversationDialog = true">
                <Icon icon="lucide:plus" class="size-4" />
            </button>
        </div>

        <!-- CHAT LIST -->
        <div class="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
            <ChatCard v-for="chat in service.convoDataList" :key="chat.id" :chat="chat"
                :active="service.isSelectedConvoID(chat.id)" @click="service.selectConvo(chat.id)" />

            <!-- EMPTY -->
            <div v-if="service.convoDataList.length === 0"
                class="flex flex-col items-center justify-center px-4 py-12 text-center">
                <Icon icon="lucide:search-x" class="mb-2 size-7 text-muted-foreground" />

                <p class="text-sm font-medium">
                    No conversations found
                </p>

                <p class="mt-1 text-xs text-muted-foreground">
                    Try searching for another conversation.
                </p>
            </div>

            <div v-if="loadingConvos" class="flex flex-col items-center justify-center px-4 py-12 text-center">
                <Loader2 class="animate-spin" />
            </div>
        </div>

        <CreateConvoModal v-model:open="showNewConversationDialog" />
    </aside>
</template>