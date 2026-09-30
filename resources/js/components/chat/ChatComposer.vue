<script setup lang="ts">
import { computed, ref } from 'vue'
import { Send } from '@lucide/vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSessionChatbox } from '@/stores/chatbox'

const chatbox = useSessionChatbox();


</script>

<template>
    <div class="border-t p-3">
        <div class="flex items-center gap-2">
            <Input
                v-model="chatbox.composedMessage"
                placeholder="Write a message..."
                class="flex-1"
                @keyup.enter="chatbox.sendComposedMessage"
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