<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { Icon } from '@iconify/vue'


const emit = defineEmits<{
    search: [value: string | number];
    create: [value: boolean];
}>();


const search = useDebounceFn(async (value: string | number) => {
    if (!value) {
        return
    }
    emit('search', value);
}, 300)
</script>


<template>
    <div class="flex shrink-0 items-center gap-2 px-3 pb-3">
        <div class="relative w-full">
            <Icon icon="lucide:search" class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input type="text" placeholder="Search convo name..." @update:model-value="search"
                class="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring" />
        </div>

        <!-- NEW CONVERSATION -->
        <button type="button"
            class="flex size-8 items-center justify-center rounded-md hover:bg-muted border border-foreground-muted text-muted-foreground transition-colors"
            title="New conversation" @click="emit('create', true)">
            <Icon icon="lucide:plus" class="size-4" />
        </button>
    </div>
</template>