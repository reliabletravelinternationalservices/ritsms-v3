<script setup lang="ts">
import { formatDateString } from '@/lib/utils'

interface Props {
    deleted_at?: string | null
    date?: string
}

defineProps<Props>()
</script>

<template>
    <div>
        <span
            v-if="date"
            :class="deleted_at ? 'text-red-500 line-through' : ''"
        >
            {{ formatDateString(date) }}
        </span>

        <span v-else class="text-zinc-600">
            N/A
        </span>

        <span
            v-if="deleted_at"
            class="ml-2 text-xs font-medium text-red-500"
        >
            Deleted
        </span>
    </div>
</template>