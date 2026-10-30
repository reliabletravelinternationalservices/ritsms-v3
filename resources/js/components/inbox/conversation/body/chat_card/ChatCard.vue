<script setup lang="ts">
interface Props {
    active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
})

const emit = defineEmits<{
    view: [id: number];
}>()

</script>

<template>
    <button type="button" class="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition" :class="props.active
        ? 'bg-muted'
        : 'hover:bg-muted/60'
        " @click="emit('view')">
        <slot />
    </button>
</template>