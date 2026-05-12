<script setup lang="ts">
import { getPackageDurationLabel } from '@/lib/utils';

interface Props {
    duration: number;
}

defineProps<Props>();
</script>

<template>
    <div class="flex flex-col">
        <span class="font-semibold">
            {{ getPackageDurationLabel(duration) }}
        </span>
    </div>
</template>