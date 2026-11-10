<script setup lang="ts">
import { MessageCirclePlusIcon, Loader2 } from '@lucide/vue'
import { Button } from '@/components/ui/button'

defineProps<{
    message: string
    buttonLabel: string
    loadingText: string
    loading: boolean
}>()

const emit = defineEmits<{
    create: []
}>()
</script>

<template>
    <div class="h-full">
        <div
            class="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground"
        >
            <MessageCirclePlusIcon class="h-8 w-8" />

            <span class="text-center italic">
                {{ message }}
            </span>

            <Button
                :disabled="loading"
                variant="ghost"
                class="capitalize text-yellow-600 underline"
                @click="emit('create')"
            >
                <template v-if="!loading">
                    {{ buttonLabel }}
                </template>

                <span v-else class="flex items-center gap-2">
                    <Loader2 class="animate-spin" />
                    {{ loadingText }}
                </span>
            </Button>
        </div>
    </div>
</template>