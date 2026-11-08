<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {
    Check,
    CheckCheck,
    EllipsisVertical,
    CornerUpLeft,
    Copy,
    Trash2,
    Pen,
    Download,
    FileText,
    Loader2,
} from '@lucide/vue';

import AvatarPlaceholder from '@/components/AvatarPlaceholder.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Type, type Message } from '@/types/convo/message';
import { formatTimestamp } from '@/lib/utils';

interface Props {
    message: Message;
    isOwner: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    reply: [message: Message];
    copy: [message: Message];
    edit: [message: Message];
    delete: [message: Message];
}>();

const menuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
    if (!menuRef.value?.contains(event.target as Node)) {
        menuOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

const handleAction = (action: 'reply' | 'copy' | 'edit' | 'delete') => {
    emit(action as keyof typeof emit, props.message);
    menuOpen.value = false;
};

// Assuming body contains the file URL for image/video/file messages.
const fileUrl = (props: Message) => props.body ?? '';

const handleDownload = () => {
    if (props.message.body) {
        window.open(props.message.body, '_blank');
    }
};
</script>

<template>
    <!-- SYSTEM MESSAGE -->
    <div v-if="message.type === Type.System" class="flex justify-center py-2">
        <div class="max-w-[85%] rounded-full bg-muted px-4 py-2 text-center text-xs text-muted-foreground">
            {{ message.body }}
        </div>
    </div>

    <!-- NORMAL MESSAGE -->
    <div v-else class="group flex items-end gap-2" :class="isOwner ? 'flex-row-reverse' : ''">
        <!-- AVATAR: RECEIVED ONLY -->
        <Avatar v-if="!isOwner"
            class="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-sidebar-border bg-sidebar">
            <AvatarImage v-if="message.sender?.avatar" :src="message.sender.avatar" alt="avatar-user" />
            <AvatarFallback class="rounded-full text-white">
                <AvatarPlaceholder class="aspect-square h-full w-full" />
            </AvatarFallback>
        </Avatar>

        <!-- MESSAGE CONTENT -->
        <div class="flex w-fit min-w-0 max-w-[85%] flex-col sm:max-w-[75%] lg:max-w-[60%]">
            <!-- EDITED -->
            <span v-if="message.is_edited" class="w-full text-xs text-muted-foreground"
                :class="isOwner ? 'text-end' : 'text-start'">
                Edited
            </span>

            <!-- BUBBLE -->
            <div class="w-full rounded-2xl p-3 transition-colors" :class="[
                isOwner
                    ? 'rounded-br-sm bg-yellow-400'
                    : 'rounded-bl-sm bg-zinc-200'
            ]">
                <div class="flex flex-col gap-2">

                    <!-- TEXT -->
                    <p v-if="message.type === Type.Text"
                        class="break-words whitespace-pre-wrap text-left text-sm text-zinc-800">
                        {{ message.body }}
                    </p>

                    <!-- IMAGE -->
                    <div v-else-if="message.type === Type.Image">
                        <a :href="fileUrl(message)" target="_blank" rel="noopener noreferrer">
                            <img :src="fileUrl(message)" alt="Message image"
                                class="max-h-80 max-w-full rounded-lg object-contain" />
                        </a>
                    </div>

                    <!-- VIDEO -->
                    <div v-else-if="message.type === Type.Video">
                        <video :src="fileUrl(message)" controls preload="metadata"
                            class="max-h-80 max-w-full rounded-lg" />
                    </div>

                    <!-- FILE -->
                    <div v-else-if="message.type === Type.File" class="flex min-w-[180px] items-center gap-3">
                        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/70">
                            <FileText class="h-5 w-5 text-zinc-700" />
                        </div>

                        <div class="min-w-0 flex-1">
                            <p class="truncate text-sm font-medium text-zinc-800">
                                {{ fileUrl(message).split('/').pop() || 'Attachment' }}
                            </p>
                            <span class="text-xs text-zinc-600">
                                Attachment
                            </span>
                        </div>

                        <button @click="handleDownload" title="Open attachment"
                            class="rounded-full p-2 transition-colors hover:bg-black/10">
                            <Download class="h-4 w-4 text-zinc-700" />
                        </button>
                    </div>

                    <!-- TIMESTAMP / STATUS -->
                    <div v-if="message.sent_at" class="flex items-center gap-1"
                        :class="isOwner ? 'justify-end' : 'justify-start'">
                        <span class="text-xs text-zinc-600">
                            {{ formatTimestamp(message.sent_at) }}
                        </span>

                        <span v-if="isOwner" class="text-zinc-600">
                            <CheckCheck v-if="message.is_read" class="h-3 w-3" />
                            <Check v-else class="h-3 w-3" />
                        </span>
                    </div>

                    <div v-else class="flex items-center" :class="isOwner ? 'justify-end' : 'justify-start'">
                        <span v-if="isOwner" class="text-zinc-600">
                            <Loader2 class="h-3 w-3 animate-spin" />
                        </span>
                    </div>

                </div>
            </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div v-if="message.sent_at" class="flex shrink-0 items-center gap-1 self-center text-foreground
                invisible translate-y-1 opacity-0
                transition-all duration-200
                group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
                group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100" :class="[
                    isOwner ? 'flex-row-reverse' : '',
                    menuOpen ? 'visible translate-y-0 opacity-100' : ''
                ]">
            <!-- REPLY -->
            <button @click="handleAction('reply')" title="Reply"
                class="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-accent hover:text-accent-foreground">
                <CornerUpLeft class="h-4 w-4" />
            </button>

            <!-- MORE OPTIONS -->
            <div ref="menuRef" class="relative">
                <button @click.stop="menuOpen = !menuOpen" title="More options"
                    class="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-accent hover:text-accent-foreground"
                    :class="menuOpen ? 'bg-accent text-accent-foreground' : ''">
                    <EllipsisVertical class="h-4 w-4" />
                </button>

                <Transition enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                    <div v-if="menuOpen"
                        class="absolute top-full z-50 mt-2 w-40 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg"
                        :class="isOwner ? 'right-0' : 'left-0'">
                        <button @click="handleAction('reply')"
                            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent">
                            <CornerUpLeft class="h-4 w-4" />
                            Reply
                        </button>

                        <button @click="handleAction('copy')"
                            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent">
                            <Copy class="h-4 w-4" />
                            Copy
                        </button>

                        <!-- OWNER ACTIONS -->
                        <template v-if="isOwner">
                            <div class="my-1 border-t border-border" />

                            <button @click="handleAction('edit')" :disabled="message.type !== Type.Text"
                                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent disabled:pointer-events-none disabled:opacity-40">
                                <Pen class="h-4 w-4" />
                                Edit
                            </button>

                            <button @click="handleAction('delete')"
                                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
                                <Trash2 class="h-4 w-4" />
                                Delete
                            </button>
                        </template>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>
