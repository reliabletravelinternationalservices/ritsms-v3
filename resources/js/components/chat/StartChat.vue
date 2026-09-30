<script setup lang="ts">
interface Props {
    isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
    isLoading: false,
})

const emit = defineEmits<{
    'start': []
}>()

const startChat = () => {
    emit('start')
}
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
            Send us a message directly and we'll get back
            to you.
        </p>

        <Button
            type="button"
            class="w-full"
            :disabled="isLoading"
            @click="startChat"
        >
            <MessageCircle class="mr-2 size-4" />

            {{ isLoading ? 'Starting...' : 'Start Chat' }}
        </Button>
    </div>
</template>