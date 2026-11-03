<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import { Icon } from '@iconify/vue'


const emit = defineEmits<{
    search: [value: string];
}>();


const search = useDebounceFn(async (value: string) => {
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

            <input type="text" placeholder="Search session Id..." @update:model-value="search"
                class="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring" />
        </div>
    </div>
</template>