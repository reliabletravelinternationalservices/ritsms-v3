<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { watch } from 'vue';

import { useChatStore } from '@/stores/clientChat';

const chat = useChatStore();

let timeout: ReturnType<typeof setTimeout>;

watch(
    () => chat.search,
    () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            chat.fetchConversations();
        }, 300);
    },
);
</script>

<template>
    <div class="px-4 pb-3">
        <div
            class="
                flex items-center gap-2
                rounded-full
                bg-white/10
                px-4 py-2
                text-white/50
            "
        >
            <Icon
                icon="lucide:search"
                class="size-5 shrink-0"
            />

            <input
                v-model="chat.search"
                type="text"
                placeholder="Search Messenger"
                class="
                    min-w-0 flex-1
                    bg-transparent
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/40
                "
            />
        </div>
    </div>
</template>