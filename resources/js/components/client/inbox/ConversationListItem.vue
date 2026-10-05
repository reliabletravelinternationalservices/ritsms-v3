<script setup lang="ts">
import { computed } from 'vue';

import type { Conversation } from '@/types/conversation';

interface Props {
    conversation: Conversation;
    active?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    click: [];
}>();

const lastMessage = computed(() => {
    return props.conversation.last_message?.message ??
        'No messages yet';
});

const unread = computed(() => {
    return props.conversation.unread_count ?? 0;
});
</script>

<template>
    <button
        type="button"
        class="
            flex w-full
            items-center gap-3
            rounded-xl
            px-3 py-3
            text-left
            transition
        "
        :class="
            active
                ? 'bg-[#edbd53]/15'
                : 'hover:bg-white/5'
        "
        @click="emit('click')"
    >
        <!-- Avatar -->
        <div class="relative shrink-0">
            <img
                v-if="conversation.avatar"
                :src="conversation.avatar"
                class="
                    size-12 rounded-full
                    object-cover
                "
            />

            <div
                v-else
                class="
                    flex size-12
                    items-center justify-center
                    rounded-full
                    bg-[#edbd53]
                    font-bold
                    text-black
                "
            >
                {{
                    conversation.name
                        ?.charAt(0)
                        .toUpperCase()
                }}
            </div>

            <!-- online -->
            <span
                class="
                    absolute bottom-0 right-0
                    size-3.5
                    rounded-full
                    border-2
                    border-[#17191a]
                    bg-green-500
                "
            />
        </div>

        <!-- Content -->
        <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
                <h3
                    class="
                        truncate
                        text-sm font-semibold
                        text-white
                    "
                >
                    {{ conversation.name }}
                </h3>

                <span
                    v-if="conversation.last_message_at"
                    class="
                        shrink-0
                        text-[11px]
                        text-white/35
                    "
                >
                    {{ conversation.last_message_at }}
                </span>
            </div>

            <div class="mt-1 flex items-center gap-2">
                <p
                    class="
                        min-w-0 flex-1 truncate
                        text-xs
                        text-white/45
                    "
                >
                    {{ lastMessage }}
                </p>

                <span
                    v-if="unread"
                    class="
                        flex size-5
                        shrink-0
                        items-center justify-center
                        rounded-full
                        bg-[#edbd53]
                        text-[10px]
                        font-bold
                        text-black
                    "
                >
                    {{ unread > 99 ? '99+' : unread }}
                </span>
            </div>
        </div>
    </button>
</template>