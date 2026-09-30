<script setup lang="ts">
import { MessageCircle, LoaderCircle } from '@lucide/vue'

interface Props {
    initializing: boolean
}

defineProps<Props>()
</script>

<template>
    <div
        class="flex flex-1 flex-col items-center justify-center px-6 text-center"
    >
        <div
            class="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10"
        >
            <MessageCircle class="size-7 text-primary" />
        </div>

        <h4 class="mb-1 font-semibold">
            Starting a conversation
        </h4>

        <div
            class="flex items-center gap-2 text-sm text-muted-foreground"
        >
            <LoaderCircle class="size-4 animate-spin" />

            <span>
                Loading recent chat sessions...
            </span>
        </div>
    </div>
</template>