<script setup lang="ts">
import { Icon } from '@iconify/vue';

import { useChatStore } from '@/stores/clientChat';

const chat = useChatStore();
</script>

<template>
    <header
        class="
            flex h-[72px]
            shrink-0
            items-center
            justify-between
            border-b border-white/10
            bg-[#17191a]
            px-5
        "
    >
        <div class="flex items-center gap-3">
            <img
                v-if="chat.activeConversation?.avatar"
                :src="chat.activeConversation.avatar"
                class="
                    size-11
                    rounded-full
                    object-cover
                "
            />

            <div
                v-else
                class="
                    flex size-11
                    items-center justify-center
                    rounded-full
                    bg-[#edbd53]
                    font-bold text-black
                "
            >
                {{
                    chat.activeConversation?.name
                        ?.charAt(0)
                        .toUpperCase()
                }}
            </div>

            <div>
                <h2 class="font-semibold">
                    {{ chat.activeConversation?.name }}
                </h2>

                <p class="text-xs text-white/40">
                    Active now
                </p>
            </div>
        </div>

        <div class="flex items-center gap-1">
            <button
                class="
                    flex size-10
                    items-center justify-center
                    rounded-full
                    text-[#edbd53]
                    hover:bg-white/10
                "
            >
                <Icon
                    icon="lucide:phone"
                    class="size-5"
                />
            </button>

            <button
                class="
                    flex size-10
                    items-center justify-center
                    rounded-full
                    text-[#edbd53]
                    hover:bg-white/10
                "
            >
                <Icon
                    icon="lucide:video"
                    class="size-5"
                />
            </button>

            <button
                class="
                    flex size-10
                    items-center justify-center
                    rounded-full
                    text-[#edbd53]
                    hover:bg-white/10
                "
            >
                <Icon
                    icon="lucide:info"
                    class="size-5"
                />
            </button>
        </div>
    </header>
</template>