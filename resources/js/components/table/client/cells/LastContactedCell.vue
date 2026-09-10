<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
    datetime?: string | null
    deleted_at?: string | null
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
    <div
        class="flex flex-col items-start gap-0.5 w-fit"
        :class="{ 'opacity-60': deleted_at }"
    >
        <span
            class="text-sm"
            :class="deleted_at ? 'text-zinc-500' : 'text-foreground'"
        >
            {{ formattedDate }}
        </span>
    </div>
</template>