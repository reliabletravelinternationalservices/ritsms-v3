<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
    title?: string
    description?: string
}

const emit = defineEmits<{
    'close': [value: boolean]
}>()

withDefaults(defineProps<Props>(), {
    title: () => 'New Conversation',
    description: () => 'Select a client and add agents if needed.',
});
</script>

<template>
    <div class="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
        <div>
            <h2 class="font-semibold">
                {{ title }}
            </h2>

            <p class="text-xs text-muted-foreground">
                {{ description }}
            </p>
        </div>

        <button type="button" class="rounded-lg p-2 text-muted-foreground hover:bg-muted" @click="emit('close', false)">
            <Icon icon="lucide:x" class="size-4" />
        </button>
    </div>
</template>