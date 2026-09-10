<script setup lang="ts">
import { formatDateString } from '@/lib/utils';

interface Props {
    deleted_at?: string | null
}
defineProps<Props>()

</script>

<template>
    <div>
        <span v-if="deleted_at" class="text-sm text-red-600 italic">Deleted at {{ formatDateString(deleted_at) }}</span>
        <span v-else>N/A</span>
    </div>
</template>