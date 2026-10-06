<script setup lang="ts">
import { Mode } from '@/types/chat';
import { Icon } from '@iconify/vue'

interface Props {
    mode: Mode
    totalNewSessionChat: number;
    totalNewConvoChat: number;
}

withDefaults(defineProps<Props>(),{
    mode: 'chats',
    totalNewConvoChat: 0,
    totalNewSessionChat: 0
})

const emit = defineEmits<{
    changeMode: [mode: Mode]
}>()



</script>

<template>
    <div class="flex items-center rounded-lg border bg-muted/30 p-1">

        <button
            type="button"
            class="relative flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition"
            :class="mode === 'chats'
                ? 'bg-yellow-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'"
            @click="emit('changeMode', 'chats')"
        >
            <Icon
                icon="lucide:message-circle"
                class="size-3.5"
            />

            Chat

            <span
                v-if="totalNewConvoChat > 0"
                class="flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-semibold text-destructive-foreground"
            >
                {{ totalNewConvoChat > 99 ? '99+' : totalNewConvoChat }}
            </span>
        </button>

        <button
            type="button"
            class="relative flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition"
            :class="mode === 'sessions'
                ? 'bg-yellow-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'"
            @click="emit('changeMode', 'sessions')"
        >
            <Icon
                icon="lucide:messages-square"
                class="size-3.5"
            />

            Session

            <span
                v-if="totalNewSessionChat > 0"
                class="flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-semibold text-destructive-foreground"
            >
                {{ totalNewSessionChat > 99 ? '99+' : totalNewSessionChat }}
            </span>
        </button>

    </div>
</template>