<script setup lang="ts">
import { onMounted } from 'vue';

import ChatSidebarHeader from './ChatSidebarHeader.vue';
import ChatSearch from './ChatSearch.vue';
import ChatFilters from './ChatFilters.vue';
import ConversationList from './ConversationList.vue';

import { useChatStore } from '@/stores/clientChat';

const chat = useChatStore();

onMounted(() => {
    chat.fetchConversations();
});
</script>

<template>
    <aside
        class="
            flex w-[360px] shrink-0 flex-col
            border-r border-white/10
            bg-[#17191a]
        "
    >
        <ChatSidebarHeader />

        <ChatSearch />

        <ChatFilters />

        <ConversationList />
    </aside>
</template>