<script setup lang="ts">
import { formatCurrency } from '@/lib/utils'

interface Props {
    deleted_at?: string | null
    total?: number | null
}

defineProps<Props>()
</script>

<template>
    <div>
        <span
            v-if="total !== null && total !== undefined"
            :class="deleted_at ? 'text-zinc-400' : ''"
        >
            {{ formatCurrency(total, 'PHP', 2) }}
        </span>

        <span v-else class="text-zinc-600">
            N/A
        </span>
    </div>
</template>