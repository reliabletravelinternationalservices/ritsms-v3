<script setup lang="ts">
import { Send } from '@lucide/vue'

import { Button } from '@/components/ui/button'
import { useSessionChatbox } from '@/stores/chatbox'
import { Textarea } from '../ui/textarea'

const chatbox = useSessionChatbox();


</script>

<template>
    <div class="border-t p-3">
        <div class="flex items-center gap-2">
            <Textarea
                v-model="chatbox.composedMessage"
                placeholder="Write a message..."
                class="flex-1 max-h-40 overflow-y-auto scrollbar-none"
                :min-height="20"
                :max-height="40"
                @focus="chatbox.markIncomingMessagesAsRead"
                @keydown.enter.exact.prevent="chatbox.sendComposedMessage"
            />

            <Button
                type="button"
                size="icon"
                :disabled="!chatbox.canSendMessage"
                @click="chatbox.sendComposedMessage"
            >
                <Send class="size-4" />
            </Button>
        </div>
    </div>
</template>

<style scoped>
    .scrollbar-none {
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .scrollbar-none::-webkit-scrollbar {
        display: none;
    }
</style>