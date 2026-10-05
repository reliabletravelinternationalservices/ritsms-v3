<script setup lang="ts">
import { computed } from 'vue';

import type { Message } from '@/types/conversation';

interface Props {
    message: Message;
}

const props = defineProps<Props>();

/*
 * Change this according to your authenticated
 * participant implementation.
 */
const isMine = computed(() => {
    return props.message.sender_id === window.currentUserId;
});
</script>

<template>
    <div
        class="flex"
        :class="
            isMine
                ? 'justify-end'
                : 'justify-start'
        "
    >
        <div
            class="flex max-w-[70%] items-end gap-2"
            :class="
                isMine
                    ? 'flex-row-reverse'
                    : 'flex-row'
            "
        >
            <!-- Avatar -->
            <img
                v-if="
                    !isMine &&
                    message.sender?.avatar
                "
                :src="message.sender.avatar"
                class="size-8 rounded-full object-cover"
            />

            <div
                v-else-if="!isMine"
                class="
                    flex size-8
                    items-center justify-center
                    rounded-full
                    bg-white/10
                    text-xs font-bold
                "
            >
                {{
                    message.sender?.name
                        ?.charAt(0)
                        .toUpperCase()
                }}
            </div>

            <!-- Bubble -->
            <div>
                <div
                    class="
                        rounded-2xl
                        px-4 py-2.5
                        text-sm
                    "
                    :class="
                        isMine
                            ? 'rounded-br-md bg-[#edbd53] text-black'
                            : 'rounded-bl-md bg-[#292c2d] text-white'
                    "
                >
                    {{ message.message }}
                </div>

                <!-- Attachments -->
                <div
                    v-if="
                        message.attachments?.length
                    "
                    class="mt-2 space-y-2"
                >
                    <a
                        v-for="attachment in message.attachments"
                        :key="attachment.id"
                        :href="attachment.url"
                        target="_blank"
                        class="
                            block
                            rounded-xl
                            bg-white/5
                            p-2
                            text-xs
                            text-[#edbd53]
                        "
                    >
                        {{ attachment.name }}
                    </a>
                </div>

                <div
                    class="
                        mt-1
                        text-[10px]
                        text-white/30
                    "
                    :class="
                        isMine
                            ? 'text-right'
                            : 'text-left'
                    "
                >
                    {{ message.created_at }}
                </div>
            </div>
        </div>
    </div>
</template>