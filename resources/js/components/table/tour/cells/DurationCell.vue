<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import { getPackageDurationLabel } from '@/lib/utils';

interface Props {
    duration: number
}

defineProps<Props>()
</script>

<template>
    <div class="w-fit">
        <span>{{ getPackageDurationLabel(duration) }}</span>
    </div>
</template>