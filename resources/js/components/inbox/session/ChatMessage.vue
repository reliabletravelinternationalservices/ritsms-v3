<script setup lang="ts">
import { formatMessageTime } from '@/lib/utils';
import { Message as SessionMessage } from '@/types/chat';
import { Message as ConversationMessage } from '@/types/conversation';
import { computed, nextTick, ref, watch } from 'vue'


const props = defineProps<{
    message: SessionMessage | ConversationMessage
}>()

const isMine = computed(() => props.message.sender_type === 'admin')



</script>

<template>
    <div class="flex" :class="isMine ? 'justify-end' : 'justify-start'">
        <div class="max-w-[70%]" :class="isMine ? 'items-end' : 'items-start'">

            <div class="rounded-2xl px-4 py-3 text-sm shadow-sm" :class="isMine
                ? 'rounded-tr-md bg-[rgb(var(--color-primary))] text-white'
                : 'rounded-tl-md bg-background'">
                <p class="whitespace-pre-wrap">
                    {{ message.message }}
                </p>
            </div>

            <p class="mt-1 px-1 text-[10px] text-muted-foreground" :class="isMine ? 'text-right' : ''">
                {{ formatMessageTime(message.created_at) }}
            </p>

        </div>
    </div>
</template>