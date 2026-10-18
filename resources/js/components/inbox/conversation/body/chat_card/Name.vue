<script setup lang="ts">

interface Props {
    isRead: boolean
    name: string
}


const props = withDefaults(defineProps<Props>(), {
    isRead: () => false,
    name: () => 'New Chat',
})

</script>



<template>
    <p class="truncate text-sm" :class="props.isRead
        ? 'font-medium' : 'font-semibold'">
        {{ props.name }}
    </p>
</template>