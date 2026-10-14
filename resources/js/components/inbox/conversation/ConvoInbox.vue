<script setup lang="ts">
import { ref } from 'vue';
import InboxList from './InboxList.vue';
import { Mode } from '@/types/chat.js';
import { useAdminConvoChat } from '@/stores/adminConvoChat.js';
import ChatBox from './ChatBox.vue';
import NoConvoSelected from '../NoConvoSelected.vue';
import { useDebounceFn } from '@vueuse/core';

const props = defineProps<{ mode: Mode }>();

//
const service = useAdminConvoChat();

const chatboxRef = ref<InstanceType<typeof ChatBox> | null>(null)





const selectChat = async (uuid: string) => {
    // await service.selectChat(props.mode, uuid)
    chatboxRef.value?.scrollToBottom()
}

const sendMessage = async (message: string) => {
    // await service.sendSessionMessage(message);
}


</script>

<template>
    <div class="flex min-h-0 flex-1">
        <!-- LEFT -->
        <div class="w-[320px] shrink-0">
            <InboxList />
        </div>

        <!-- CENTER -->
        <main class="min-w-0 max-h-[calc(100vh-150px)] flex-1">
            <!-- <ChatBox v-if="!service.isNoSelectedChat" ref="chatboxRef" :name="service.getSelectedSessionChat!.code"
                initials="SC" :status="service.getSelectedSessionChat!.status" :messages="service.getSessionMessages"
                :loading="service.isLoadingChats" @send="sendMessage" /> -->

            <NoConvoSelected />
        </main>
    </div>
</template>