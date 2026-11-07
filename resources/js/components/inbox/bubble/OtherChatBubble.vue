<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { EllipsisVertical, CornerUpLeft, Copy } from '@lucide/vue';
import AvatarPlaceholder from '@/components/AvatarPlaceholder.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Props {
    message: string;
    time: string;
    avatar?: string | null;
    isEdited?: boolean;
}

withDefaults(defineProps<Props>(), {
    isEdited: false
});

const emit = defineEmits<{
    reply: [];
    copy: [];
    delete: [];
    edit: [];
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

const handleAction = (action: 'reply' | 'copy') => {
    emit(action as keyof typeof emit);
    menuOpen.value = false;
};
</script>

<template>
    <div class="group flex items-end gap-2">

        <!-- AVATAR -->
        <Avatar class="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-sidebar-border bg-sidebar">
            <AvatarImage v-if="avatar" :src="avatar" alt="avatar-user" />
            <AvatarFallback class="rounded-full text-white">
                <AvatarPlaceholder class="aspect-square h-full w-full" />
            </AvatarFallback>
        </Avatar>

        <!-- MESSAGE -->
        <div class="flex flex-col w-fit min-w-0 max-w-[85%] sm:max-w-[75%] lg:max-w-[60%]">

            <span v-if="isEdited" class="text-xs text-muted-foreground w-full text-start">
                Edited
            </span>

            <div class="w-full rounded-2xl rounded-bl-sm bg-zinc-200 p-3 transition-colors">
                <div class="flex flex-col gap-2">

                    <p class="break-words whitespace-pre-wrap text-left text-sm text-zinc-800">
                        {{ message }}
                    </p>

                    <div class="flex items-center gap-1">
                        <span class="text-xs text-muted-foreground">
                            {{ time }}
                        </span>
                    </div>

                </div>
            </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="flex shrink-0 items-center gap-1 self-center text-foreground
            opacity-0 invisible translate-y-1
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
                        class="absolute left-0 top-full z-50 mt-2 w-40 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg">
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

                        <!-- <div class="my-1 border-t border-border" />

                        <button @click="handleAction('edit')"
                            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent">
                            <Pen class="h-4 w-4" />
                            Edit
                        </button>

                        <button @click="handleAction('delete')"
                            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
                            <Trash2 class="h-4 w-4" />
                            Delete
                        </button> -->
                    </div>
                </Transition>

            </div>
        </div>
    </div>
</template>
