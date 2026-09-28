<script setup lang="ts">
import { Icon } from '@iconify/vue'

const emit = defineEmits<{
    mute: []
    archive: []
    delete: []
}>()
</script>

<template>
    <div
        class="absolute right-0 top-11 z-50 w-48 overflow-hidden rounded-lg border border-border bg-background p-1 shadow-lg"
    >
        <button
            type="button"
            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
            @click="emit('mute')"
        >
            <Icon icon="lucide:bell-off" />
            Mute notifications
        </button>

        <button
            type="button"
            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
            @click="emit('archive')"
        >
            <Icon icon="lucide:archive" />
            Archive conversation
        </button>

        <div class="my-1 border-t border-border" />

        <button
            type="button"
            class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
            @click="emit('delete')"
        >
            <Icon icon="lucide:trash-2" />
            Delete conversation
        </button>
    </div>
</template>