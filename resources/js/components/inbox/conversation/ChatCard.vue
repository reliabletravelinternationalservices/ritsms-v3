<script setup lang="ts">
import { computed } from 'vue'
import { formatMessageTime } from '@/lib/utils'

const page = usePage<SharedData>()
import { ChatConvoWithLatestMessage } from '@/types/conversation';
import { usePage } from '@inertiajs/vue3';
import { SharedData } from '@/types';
interface Props {
    chat: ChatConvoWithLatestMessage
    active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
})


// const isSystemMessage = computed(() => props.chat.latest_message.type === MessageType.System);
const hasUnreadMessages = computed(() => props.chat.unread_messages_count > 0)
const isMyMessage = computed(() => props.chat.latest_message.sender_id === page.props.auth.user.id);
const isNotRead = computed(() =>
    !props.chat.latest_message?.reads?.some(
        (reader) =>
            reader.reader_id === page.props.auth.user.id &&
            reader.reader_type === page.props.auth.user.role
    )
);

</script>

<template>
    <button type="button" class="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition" :class="props.active
        ? 'bg-muted'
        : 'hover:bg-muted/60'
        ">
        <!-- AVATAR -->
        <div class="relative shrink-0">
            <div
                class="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                SC
            </div>

            <!-- STATUS -->
            <!-- <span v-if="chat.status === 'open'"
                class="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-green-500" />

            <span v-else-if="chat.status === 'closed'"
                class="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-gray-500" /> -->
        </div>

        <!-- INFO -->
        <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
                <!-- NAME -->
                <p class="truncate text-sm" :class="isNotRead
                    ? 'font-semibold'
                    : 'font-medium'
                    ">
                    {{ chat.name }}
                </p>

                <!-- TIME -->
                <span v-if="chat.latest_message?.created_at" class="shrink-0 text-[10px] text-muted-foreground">
                    {{ formatMessageTime(chat.latest_message.created_at) }}
                </span>
            </div>

            <!-- LAST MESSAGE -->
            <div class="mt-1 flex items-center gap-2">
                <p class="min-w-0 flex-1 truncate text-xs" :class="isNotRead
                    ? 'font-semibold text-foreground'
                    : 'text-muted-foreground'
                    ">
                    <span v-if="isMyMessage">You:</span>
                    {{ chat.latest_message?.message || 'No messages yet' }}
                </p>

                <!-- UNREAD COUNT -->
                <span v-if="hasUnreadMessages"
                    class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {{ chat.unread_messages_count }}
                </span>
            </div>
        </div>
    </button>
</template>