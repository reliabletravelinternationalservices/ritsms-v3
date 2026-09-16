<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    status: string
}

const props = defineProps<Props>()

const statusConfig = {
    draft: {
        label: 'Draft',
        color: 'bg-gray-500',
        text: 'text-gray-700 dark:text-gray-300',
    },
    sent: {
        label: 'Sent',
        color: 'bg-blue-500',
        text: 'text-blue-700 dark:text-blue-400',
    },
    viewed: {
        label: 'Viewed',
        color: 'bg-purple-500',
        text: 'text-purple-700 dark:text-purple-400',
    },
    accepted: {
        label: 'Accepted',
        color: 'bg-green-500',
        text: 'text-green-700 dark:text-green-400',
    },
    rejected: {
        label: 'Rejected',
        color: 'bg-red-500',
        text: 'text-red-700 dark:text-red-400',
    },
    expired: {
        label: 'Expired',
        color: 'bg-orange-500',
        text: 'text-orange-700 dark:text-orange-400',
    },
    cancelled: {
        label: 'Cancelled',
        color: 'bg-gray-500',
        text: 'text-gray-700 dark:text-gray-400',
    },
} as const

const config = computed(() => {
    return (
        statusConfig[
            props.status.toLowerCase() as keyof typeof statusConfig
        ] ?? {
            label: props.status,
            color: 'bg-gray-500',
            text: 'text-gray-700 dark:text-gray-300',
        }
    )
})
</script>

<template>
    <div
        class="flex items-center gap-2"
        :class="config.text"
    >
        <span
            class="size-2 rounded-full"
            :class="config.color"
        />

        <span class="text-sm font-medium">
            {{ config.label }}
        </span>
    </div>
</template>