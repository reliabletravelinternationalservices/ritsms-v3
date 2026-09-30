<script setup lang="ts">
import { MessageCircle, X } from '@lucide/vue'

import { Button } from '@/components/ui/button'
import AppLogoIcon from '../AppLogoIcon.vue';

interface Props {
    online?: boolean
}

withDefaults(defineProps<Props>(), {
    online: true,
})

const emit = defineEmits<{
    close: []
}>()
</script>

<template>
    <div class="flex items-center justify-between border-b px-4 py-3">
        <div class="flex items-center gap-2">
            <div class="h-10 w-10">
                <AppLogoIcon class="fill-current w-full h-full" />
            </div>
            <div>
                <h3 class="font-semibold">
                    Chat
                </h3>

                <div
                    class="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                    <span
                        v-if="online"
                        class="size-2 rounded-full bg-green-500"
                    />

                    <MessageCircle
                        v-else
                        class="size-3"
                    />

                    <p>
                        {{ online ? 'Online' : 'Start a Session Conversation' }}
                    </p>
                </div>
            </div>
        </div>

        <Button
            type="button"
            size="icon"
            variant="ghost"
            @click="emit('close')"
        >
            <X class="size-4" />
        </Button>
    </div>
</template>