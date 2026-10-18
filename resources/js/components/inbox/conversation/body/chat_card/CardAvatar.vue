<script setup lang="ts">
interface Props {
    avatar?: string
}

const props = defineProps<Props>();

</script>

<template>
    <div class="relative shrink-0">
        <div
            class="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {{ props.avatar ?? 'CC' }}
        </div>

        <!-- STATUS -->
        <!-- <span v-if="chat.status === 'open'"
            class="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-green-500" />

        <span v-else-if="chat.status === 'closed'"
            class="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-gray-500" /> -->
    </div>
</template>