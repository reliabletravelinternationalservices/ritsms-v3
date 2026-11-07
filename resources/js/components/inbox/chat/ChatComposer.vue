<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea';
import { Send } from '@lucide/vue';
import { useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';


const emit = defineEmits<{
    send: [value: string]
}>();


const composerInput = ref('');
const sendMessage = () => useDebounceFn(() => {
    if (!composerInput.value || composerInput.value.trim() === '') return;
    emit('send', composerInput.value);

}, 100)



</script>

<template>
    <div class="w-full border-t border-border p-4 self-end">
        <div class="flex gap-2 items-center">
            <Textarea v-model="composerInput" placeholder="Type a message..." :min-height="5" :max-height="100"
                class="flex-1 rounded-md border border-border p-2 text-foreground" />
            <button @click="sendMessage" type="submit"
                class="rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-700">
                <Send class="h-6 w-6" />
            </button>
        </div>
    </div>
</template>