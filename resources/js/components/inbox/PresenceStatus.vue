<script setup lang="ts">
import { computed } from 'vue'

type Status = 'online' | 'away' | 'offline'

interface Props {
    status?: Status
    label?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    status: 'offline',
    label: true,
})

const statusConfig = computed(() => {
    switch (props.status) {
        case 'online':
            return {
                text: 'Online',
                dot: 'bg-green-500',
                pulse: true,
            }

        case 'away':
            return {
                text: 'Away',
                dot: 'bg-yellow-500',
                pulse: false,
            }

        default:
            return {
                text: 'Offline',
                dot: 'bg-muted-foreground',
                pulse: false,
            }
    }
})
</script>

<template>
    <div class="flex items-center gap-1.5">
        <span class="relative flex size-2.5">
            <span
                v-if="statusConfig.pulse"
                class="absolute inline-flex size-full animate-ping rounded-full opacity-60"
                :class="statusConfig.dot"
            />

            <span
                class="relative inline-flex size-2.5 rounded-full"
                :class="statusConfig.dot"
            />
        </span>

        <span
            v-if="label"
            class="text-xs text-muted-foreground"
        >
            {{ statusConfig.text }}
        </span>
    </div>
</template>