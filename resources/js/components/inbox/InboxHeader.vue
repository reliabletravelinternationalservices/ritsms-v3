<script setup lang="ts">
import { Mode } from '@/types/chat';
interface Props {
    totalConvo?: number
    mode: Mode
}

const props = withDefaults(defineProps<Props>(), {
    totalConvo: () => 0,
    mode: () => 'chats'
});
</script>

<template>
    <header class="flex shrink-0 items-center justify-between border-b px-5 py-2 text-foreground">
        <div>
            <h2 class="text-sm font-semibold">
                {{ props.mode === 'chats' ? 'Conversations' : 'Sessions' }}
            </h2>

            <p class="text-xs text-muted-foreground">
                {{ props.totalConvo }} conversations
            </p>
        </div>

        <slot />
    </header>
</template>