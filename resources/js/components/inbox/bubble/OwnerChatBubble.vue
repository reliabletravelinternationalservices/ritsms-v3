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
} from '@lucide/vue';
import { Message } from '@/types/convo/message';
import { formatTimestamp } from '@/lib/utils';

interface Props {
    message: Message
}

const props = defineProps<Props>();

const emit = defineEmits<{
    reply: [];
    copy: [];
    delete: [];
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
    emit(action as keyof typeof emit);
    menuOpen.value = false;
};
</script>

<template>
    <div class="group flex flex-row-reverse items-end gap-2">

        <!-- MESSAGE -->
        <div class="flex flex-col w-fit min-w-0 max-w-[85%] sm:max-w-[75%] lg:max-w-[60%]">
            <span v-if="props.message.is_edited" class="text-xs text-muted-foreground w-full text-end">
                Edited
            </span>
            <div class="w-full rounded-2xl rounded-br-sm bg-yellow-400 p-3 transition-colors ">
                <div class="flex flex-col gap-2">
                    <p class="break-words whitespace-pre-wrap text-left text-sm text-zinc-800">
                        {{ message.body }}
                    </p>

                    <div v-if="message.sent_at" class="flex items-center justify-end gap-1">
                        <span class="text-xs text-muted-foreground">
                            {{ formatTimestamp(message.sent_at) }}
                        </span>

                        <!-- READ / SENT INDICATOR -->
                        <span class="text-muted-foreground">
                            <CheckCheck v-if="message.is_read" class="h-3 w-3" />
                            <Check v-else class="h-3 w-3" />
                        </span>
                    </div>

                </div>
            </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="flex shrink-0 flex-row-reverse items-center gap-1 self-center text-foreground
            invisible translate-y-1 opacity-0
            transition-all duration-200
            group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
            group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
            :class="menuOpen ? 'visible translate-y-0 opacity-100' : ''">

            <!-- REPLY -->
            <button @click="handleAction('reply')" title="Reply"
                class="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-accent hover:text-accent-foreground">
                <CornerUpLeft class="h-4 w-4" />
            </button>

            <!-- CUSTOM MENU -->
            <div ref="menuRef" class="relative">

                <button @click.stop="menuOpen = !menuOpen" title="More options"
                    class="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-accent hover:text-accent-foreground"
                    :class="menuOpen ? 'bg-accent text-accent-foreground' : ''">
                    <EllipsisVertical class="h-4 w-4" />
                </button>

                <!-- DROPDOWN -->
                <Transition enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                    <div v-if="menuOpen"
                        class="absolute right-0 top-full z-50 mt-2 w-40 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg">
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

                        <div class="my-1 border-t border-border" />

                        <button @click="handleAction('edit')"
                            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent">
                            <Pen class="h-4 w-4" />
                            Edit
                        </button>

                        <button @click="handleAction('delete')"
                            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
                            <Trash2 class="h-4 w-4" />
                            Delete
                        </button>
                    </div>
                </Transition>

            </div>
        </div>
    </div>
</template>
