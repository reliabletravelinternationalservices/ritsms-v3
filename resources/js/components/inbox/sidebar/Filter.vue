<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { useDebounceFn } from '@vueuse/core';


const emit = defineEmits<{
    search: [e?: string];
}>();


const onChange = useDebounceFn((e: string | number) => {
    emit('search', e.toString());
}, 300);


</script>


<template>
    <div class="px-3">
        <Input @update:modelValue="onChange" placeholder="Search chat..."
            class="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
    </div>
</template>