<script setup lang="ts">
import { Send } from '@lucide/vue'

import { Button } from '@/components/ui/button'
import { Textarea } from '../ui/textarea'
import { useSessionChat } from '@/stores/sessionChat'
import { ref, computed } from 'vue'

const sessionChat = useSessionChat();


const composedMessage = ref('');
const attachment = ref<unknown[]|null>(null);

const emit = defineEmits<{
    send: [message:string, attachment:unknown[]|null]
}>()


const canSendMessage = computed(() => {
    return composedMessage.value.trim() !== ''
})

function sendMessage() {
    if (!canSendMessage.value) return
    emit('send', composedMessage.value, attachment.value)
    composedMessage.value = '';
}
</script>

<template>
    <div class="border-t p-3">
        <div class="flex items-center gap-2">
            <Textarea v-model="composedMessage" placeholder="Write a message..."
                class="flex-1 max-h-40 overflow-y-auto scrollbar-none" :min-height="20" :max-height="40"
                @focus="sessionChat.markMessagesAsRead" @keydown.enter.exact.prevent="sendMessage" />

            <Button type="button" size="icon" :disabled="!canSendMessage" @click="sendMessage">
                <Send class="size-4" />
            </Button>
        </div>
    </div>
</template>