<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';

import { Message, MessageGroup, Type } from '@/types/convo/message';
import { cn, formatTimestamp, getAuthUser, getFirstName } from '@/lib/utils';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';

import AvatarPlaceholder from '@/components/AvatarPlaceholder.vue';

import {
    CornerUpLeft,
    EllipsisVertical,
    Copy,
    Pen,
    Trash2,
} from '@lucide/vue';

interface Props {
    messageBatch: MessageGroup;
}

type ChatMessage = MessageGroup['messages'][number];
type MessageAction = 'reply' | 'copy' | 'edit' | 'delete';

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'reply', message: ChatMessage): void;
    (e: 'edit', message: ChatMessage): void;
    (e: 'delete', message: ChatMessage): void;
}>();

const authUser = getAuthUser();

const messages = computed(() => props.messageBatch.messages);
const sender = computed(() => props.messageBatch.sender);

const isNoSender = computed(() => sender.value === null);

const isOwner = computed(() =>
    sender.value !== null && sender.value.id === authUser.id
);

const isSystemBatchMessageOnly = computed(() =>
    messages.value.length > 0 &&
    messages.value.every(message => message.type === Type.System)
);

const messageAlignment = computed(() =>
    isOwner.value ? 'items-end' : 'items-start'
);


// --------------------------------------------------
// MESSAGE BUBBLE CORNERS
// --------------------------------------------------

const bubbleClass = (index: number) => {
    const total = messages.value.length;

    if (total <= 1) {
        return 'rounded-2xl';
    }

    if (index === 0) {
        return isOwner.value
            ? 'rounded-2xl rounded-br-md'
            : 'rounded-2xl rounded-bl-md';
    }

    if (index === total - 1) {
        return isOwner.value
            ? 'rounded-2xl rounded-tr-md'
            : 'rounded-2xl rounded-tl-md';
    }

    return isOwner.value
        ? 'rounded-l-2xl rounded-r-md'
        : 'rounded-r-2xl rounded-l-md';
};

// --------------------------------------------------
// MORE OPTIONS MENU
// --------------------------------------------------

const menuOpenId = ref<number | null>(null);

const toggleMenu = (messageId: number) => {
    menuOpenId.value =
        menuOpenId.value === messageId ? null : messageId;
};

const closeMenu = () => {
    menuOpenId.value = null;
};

// Close dropdown when clicking outside the component
const handleOutsideClick = () => {
    closeMenu();
};

onMounted(() => {
    document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleOutsideClick);
});

// --------------------------------------------------
// MESSAGE ACTIONS
// --------------------------------------------------

const handleAction = async (
    action: MessageAction,
    message: ChatMessage
) => {
    closeMenu();

    switch (action) {
        case 'reply':
            emit('reply', message);
            break;

        case 'copy':
            try {
                await navigator.clipboard.writeText(message.body ?? '');
            } catch (error) {
                console.error('Failed to copy message:', error);
            }
            break;

        case 'edit':
            if (message.type !== Type.Text || !isOwner.value) return;

            emit('edit', message);
            break;

        case 'delete':
            if (!isOwner.value) return;

            emit('delete', message);
            break;
    }
};

const getReplyPreview = (message: ChatMessage) => {
    const reply = message.reply_to;

    if (!reply) return '';

    if (reply.deleted_at) {
        return 'This message was deleted';
    }

    switch (reply.type) {
        case Type.Text:
            return reply.body || 'Message';

        case Type.Image:
            return '📷 Photo';

        case Type.Video:
            return '🎥 Video';

        case Type.File:
            return '📎 File';

        case Type.System:
            return reply.body || 'System message';

        default:
            return 'Message';
    }
};

const getReplySender = (message: ChatMessage) => {
    const reply = message.reply_to;

    if (!reply?.sender) return 'Unknown';

    return reply.sender.id === authUser.id
        ? 'You'
        : getFirstName(reply.sender.display_name);
};



const getMessageStatus = (
    message: Message,
    isIncludeTime = false
): string => {
    let status = 'Sending';

    if (message.is_read) {
        status = 'Delivered';
    } else if (message.sent_at) {
        status = 'Sent';
    }

    if (isIncludeTime && message.sent_at) {
        return `${status} at ${formatTimestamp(message.sent_at)}`;
    }

    return status;
};

</script>

<template>
    <!-- SYSTEM MESSAGES -->
    <div v-if="isNoSender && isSystemBatchMessageOnly" class="flex w-full flex-col items-center gap-2 py-2">
        <div v-for="message in messages" :key="message.id"
            class="max-w-[85%] rounded-full bg-muted px-4 py-2 text-center text-xs text-muted-foreground">
            {{ message.body }}
        </div>
    </div>

    <!-- NORMAL MESSAGES -->
    <div v-else class="flex w-full min-w-0 flex-col gap-2" @click="closeMenu">
        <!-- GROUP TIMESTAMP -->
        <div v-if="messageBatch.sent_at" class="flex w-full justify-center py-1">
            <span class="text-[11px] font-medium text-muted-foreground">
                {{ formatTimestamp(messageBatch.sent_at) }}
            </span>
        </div>

        <!-- MESSAGE ROW -->
        <div :class="cn(
            'flex w-full min-w-0 items-end gap-2',
            isOwner ? 'justify-end' : 'justify-start'
        )">
            <!-- SENDER AVATAR -->
            <Avatar v-if="!isOwner && !isNoSender"
                class="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-sidebar-border bg-sidebar">
                <AvatarImage v-if="sender?.avatar" :src="sender.avatar" :alt="sender.display_name" />

                <AvatarFallback class="rounded-full text-white">
                    <AvatarPlaceholder class="aspect-square h-full w-full" />
                </AvatarFallback>
            </Avatar>

            <!-- MESSAGE CONTENT -->
            <div :class="cn(
                'flex min-w-0 max-w-[80%] flex-col gap-1',
                messageAlignment
            )">
                <!-- SENDER NAME -->
                <span v-if="!isNoSender && !isOwner" class="px-1 text-xs font-medium text-muted-foreground">
                    {{ getFirstName(sender!.display_name!) }}
                </span>

                <!-- GROUPED MESSAGES -->
                <div class="flex w-full flex-col gap-[2px]">
                    <div v-for="(message, index) in messages" :key="message.id" :class="cn(
                        'group relative flex min-w-0 items-center gap-1',
                        isOwner ? 'flex-row-reverse' : 'flex-row'
                    )">
                        <!-- MESSAGE BUBBLE -->
                        <div class="min-w-0 max-w-full" :title="getMessageStatus(message, true)">
                            <!-- EDITED LABEL -->
                            <div v-if="message.is_edited" :class="cn(
                                'mb-1 text-[10px] text-muted-foreground',
                                isOwner ? 'text-right' : 'text-left'
                            )">
                                Edited
                            </div>

                            <!-- REPLY PREVIEW -->
                            <div v-if="message.reply_to" :class="cn(
                                'mb-1 max-w-full overflow-hidden rounded-lg border-l-[3px] px-3 py-2',
                                isOwner
                                    ? 'border-primary-foreground/60 bg-black/10'
                                    : 'border-primary bg-background/70'
                            )">
                                <!-- REPLY SENDER -->
                                <div :class="cn(
                                    'mb-0.5 text-[11px] font-semibold',
                                    isOwner
                                        ? 'text-primary-foreground/90'
                                        : 'text-foreground'
                                )">
                                    {{ getReplySender(message) }}
                                </div>

                                <!-- REPLY CONTENT -->
                                <p :class="cn(
                                    'line-clamp-2 break-words text-xs',
                                    isOwner
                                        ? 'text-primary-foreground/75'
                                        : 'text-muted-foreground'
                                )">
                                    {{ getReplyPreview(message) }}
                                </p>
                            </div>

                            <!-- TEXT -->
                            <p v-if="message.type === Type.Text" :class="cn(
                                'w-fit max-w-full cursor-default whitespace-pre-wrap break-words px-3 py-2 text-sm leading-relaxed',
                                bubbleClass(index),
                                isOwner
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-foreground'
                            )">
                                {{ message.body }}
                            </p>

                            <!-- FILE -->
                            <div v-else-if="message.type === Type.File" :class="cn(
                                'w-fit max-w-full bg-muted px-3 py-2 text-sm',
                                bubbleClass(index)
                            )">
                                {{ message.body }}
                            </div>

                            <!-- VIDEO -->
                            <div v-else-if="message.type === Type.Video" :class="cn(
                                'w-fit max-w-full overflow-hidden bg-muted px-3 py-2 text-sm',
                                bubbleClass(index)
                            )">
                                {{ message.body }}
                            </div>

                            <!-- IMAGE -->
                            <div v-else-if="message.type === Type.Image" :class="cn(
                                'w-fit max-w-full overflow-hidden bg-muted',
                                bubbleClass(index)
                            )">
                                {{ message.body }}
                            </div>

                            <!-- OTHER TYPES -->
                            <div v-else :class="cn(
                                'w-fit max-w-full bg-muted px-3 py-2 text-sm',
                                bubbleClass(index)
                            )">
                                {{ message.body }}
                            </div>
                        </div>
                        
                        <!-- MESSAGE ACTIONS -->
                        <div :class="cn(
                            'flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100',
                            isOwner ? 'flex-row-reverse' : 'flex-row'
                        )">
                            <!-- REPLY -->
                            <button type="button" title="Reply" @click.stop="handleAction('reply', message)"
                                class="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                                <CornerUpLeft class="h-4 w-4" />
                            </button>

                            <!-- MORE OPTIONS -->
                            <div class="relative" @click.stop>
                                <button type="button" title="More options" :aria-expanded="menuOpenId === message.id"
                                    @click="toggleMenu(message.id)" :class="cn(
                                        'flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                                        menuOpenId === message.id && 'bg-accent text-accent-foreground'
                                    )">
                                    <EllipsisVertical class="h-4 w-4" />
                                </button>

                                <!-- DROPDOWN -->
                                <Transition enter-active-class="transition duration-150 ease-out"
                                    enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
                                    leave-active-class="transition duration-100 ease-in"
                                    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                                    <div v-if="menuOpenId === message.id" :class="cn(
                                        'absolute top-full z-50 mt-2 w-40 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg',
                                        isOwner ? 'right-0 origin-top-right' : 'left-0 origin-top-left'
                                    )">
                                        <!-- REPLY -->
                                        <button type="button" @click="handleAction('reply', message)"
                                            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent">
                                            <CornerUpLeft class="h-4 w-4" />
                                            Reply
                                        </button>

                                        <!-- COPY -->
                                        <button type="button" @click="handleAction('copy', message)"
                                            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent">
                                            <Copy class="h-4 w-4" />
                                            Copy
                                        </button>

                                        <!-- OWNER ACTIONS -->
                                        <template v-if="isOwner">
                                            <div class="my-1 border-t border-border" />

                                            <!-- EDIT -->
                                            <button type="button" :disabled="message.type !== Type.Text"
                                                @click="handleAction('edit', message)"
                                                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-40">
                                                <Pen class="h-4 w-4" />
                                                Edit
                                            </button>

                                            <!-- DELETE -->
                                            <button type="button" @click="handleAction('delete', message)"
                                                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10">
                                                <Trash2 class="h-4 w-4" />
                                                Delete
                                            </button>
                                        </template>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                    <div v-if="isOwner" class="text-xs text-muted-foreground w-min self-end">
                        <span>{{ getMessageStatus(messages[messages.length -1]) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
