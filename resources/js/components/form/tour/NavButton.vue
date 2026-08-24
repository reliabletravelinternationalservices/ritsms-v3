<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
    label: string
    active?: boolean
    isError?: boolean
}>()

const emit = defineEmits<{
    click: []
}>()
</script>

<template>
    <button type="button" :class="[
        'relative px-4 py-2.5 text-sm font-medium transition-all duration-150 rounded-t-md',
        'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-all',

        active
            ? [
                'text-foreground',
                'bg-[rgb(var(--color-primary)/0.08)]',
                'after:bg-[rgb(var(--color-primary))]',
            ]
            : [
                'text-muted-foreground',
                'hover:bg-muted/60 hover:text-foreground',
                'after:bg-transparent',
            ],
    ]" @click="emit('click')">
        <span>{{ label }}</span>
        <Icon v-if="isError" icon="material-symbols:error-outline-rounded" class="absolute top-1 right-1 text-red-500 animate-pulse" />
    </button>
</template>