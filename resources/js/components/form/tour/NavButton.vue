<script setup lang="ts">
defineProps<{
    label: string
    active?: boolean
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
        {{ label }}
    </button>
</template>