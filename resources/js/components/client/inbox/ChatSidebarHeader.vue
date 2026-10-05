<script setup lang="ts">
import { Icon } from '@iconify/vue';

import { useChatStore } from '@/stores/clientChat';

const chat = useChatStore();

function openNewConversation() {
    chat.showNewConversation = true;
}
</script>

<template>
    <div class="flex items-center justify-between px-5 pt-4 pb-3">
        <h1
            class="
                text-2xl
                font-bold
                tracking-tight
            "
        >
            Chats
        </h1>

        <div class="flex items-center gap-2">
            <!-- Menu -->
            <button
                type="button"
                class="
                    flex size-9 items-center justify-center
                    rounded-full
                    bg-white/10
                    text-white/70
                    transition
                    hover:bg-white/15
                    hover:text-[#edbd53]
                "
            >
                <Icon
                    icon="lucide:more-horizontal"
                    class="size-5"
                />
            </button>

            <!-- New chat -->
            <button
                type="button"
                class="
                    flex size-9 items-center justify-center
                    rounded-full
                    bg-white/10
                    text-white/80
                    transition
                    hover:bg-[#edbd53]
                    hover:text-black
                "
                @click="openNewConversation"
            >
                <Icon
                    icon="lucide:square-pen"
                    class="size-5"
                />
            </button>
        </div>
    </div>
</template>