<script setup lang="ts">
import { computed } from 'vue'

interface Message {
    id: number | string
    sender: 'me' | 'them'
    content: string
    time: string
}

const props = defineProps<{
    message: Message
}>()

const isMine = computed(() => props.message.sender === 'me')
</script>

<template>
    <div
        class="flex"
        :class="isMine ? 'justify-end' : 'justify-start'"
    >
        <div
            class="max-w-[70%]"
            :class="isMine ? 'items-end' : 'items-start'"
        >

            <div
                class="rounded-2xl px-4 py-3 text-sm shadow-sm"
                :class="isMine
                    ? 'rounded-tr-md bg-[rgb(var(--color-primary))] text-white'
                    : 'rounded-tl-md bg-background'"
                v-html="message.content"
            />

            <p
                class="mt-1 px-1 text-[10px] text-muted-foreground"
                :class="isMine ? 'text-right' : ''"
            >
                {{ message.time }}
            </p>

        </div>
    </div>
</template>