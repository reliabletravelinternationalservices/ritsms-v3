<script setup lang="ts">
// interface Props {
//     name: string
//     status?: 'open' | 'closed' | undefined
//     messages: Message[]
// }

// defineProps<Props>()

// const emit = defineEmits<{
//     send: [
//         content: string,
//     ]
//     mute: []
//     archive: []
//     delete: []
// }>()


// const messagesContainer = ref<HTMLElement | null>(null)

// const scrollToBottom = () => {
//     nextTick(() => {
//         const container = messagesContainer.value

//         if (!container) return

//         container.scrollTop = container.scrollHeight
//     })
// }

// async function sendMessage(content: string) {
//     emit('send', content)
//     scrollToBottom()
// }


// defineExpose({
//     scrollToBottom,
// })

// onMounted(async () => {
//     scrollToBottom()
// })

</script>

<template>
    <div
        class="flex min-w-0 flex-1 flex-col overflow-hidden text-foreground min-h-[calc(100vh-150px)] max-h-[calc(100vh-150px)]">
        <slot />
    </div>
</template>