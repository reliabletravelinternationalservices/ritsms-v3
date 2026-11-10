<script setup lang="ts">
import { MessageSquareOff } from '@lucide/vue'
import { cn } from '@/lib/utils'

defineProps<{
    label: string
    class?: string
}>()
</script>

<template>
    <div
        :class="cn(
            'flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground',
            $props.class
        )"
    >
        <MessageSquareOff class="h-8 w-8" />
        <span class="text-center italic">{{ label }}</span>
    </div>
</template>