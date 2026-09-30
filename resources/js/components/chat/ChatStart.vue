<script setup lang="ts">
import { MessageCircle } from '@lucide/vue'

import { Button } from '@/components/ui/button'

interface Props {
    starting: boolean;
}

defineProps<Props>()

const emit = defineEmits<{
    start: []
}>()
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
            Start a conversation
        </h4>

        <p class="mb-5 text-sm text-muted-foreground">
            Send us a message and we'll get back to you.
        </p>

        <Button
            type="button"
            class="w-full"
            :disabled="starting"
            @click="emit('start')"
        >
            <MessageCircle class="mr-2 size-4" />

            {{ starting? 'Starting...' : 'Start Session' }}
        </Button>
    </div>
</template>