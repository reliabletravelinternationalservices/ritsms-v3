<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    datetime?: string | null
}

const props = defineProps<Props>()

const formattedDate = computed(() => {
    if (!props.datetime) {
        return '—'
    }

    const date = new Date(props.datetime)

    if (Number.isNaN(date.getTime())) {
        return '—'
    }

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date)
})
</script>

<template>
    <div class="w-fit">
        <span class="text-sm text-foreground">
            {{ formattedDate }}
        </span>
    </div>
</template>