<script setup lang="ts">
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
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 text-foreground"
        @click.self="emit('close', false)">
        <slot />
    </div>
</template>