<script setup lang="ts">
import { formatDateString } from '@/lib/utils';

interface Props {
    created_at?: string | null
}
defineProps<Props>()

</script>

<template>
    <div>
        <span v-if="created_at">{{ formatDateString(created_at) }}</span>
        <span v-else>N/A</span>
    </div>
</template>