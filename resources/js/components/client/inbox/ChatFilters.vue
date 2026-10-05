<script setup lang="ts">
import { useChatStore } from '@/stores/clientChat';
import type { ChatFilter } from '@/types/conversation';

const chat = useChatStore();

const filters: {
    label: string;
    value: ChatFilter;
}[] = [
    {
        label: 'All',
        value: 'all',
    },
    {
        label: 'Unread',
        value: 'unread',
    },
    {
        label: 'Groups',
        value: 'groups',
    },
];

function selectFilter(filter: ChatFilter) {
    chat.filter = filter;
    chat.fetchConversations();
}
</script>

<template>
    <div class="flex gap-2 px-4 pb-3">
        <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            class="
                rounded-full
                px-4 py-2
                text-sm
                font-semibold
                transition
            "
            :class="
                chat.filter === filter.value
                    ? 'bg-[#edbd53] text-black'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
            "
            @click="selectFilter(filter.value)"
        >
            {{ filter.label }}

            <span
                v-if="
                    filter.value === 'unread' &&
                    chat.unreadCount > 0
                "
                class="ml-1"
            >
                {{ chat.unreadCount }}
            </span>
        </button>
    </div>
</template>