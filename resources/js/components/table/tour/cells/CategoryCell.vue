<script setup lang="ts">
import Banner from '@/components/Banner.vue';

interface Props {
    label: string
}

defineProps<Props>()
</script>

<template>
    <div class="w-fit">
        <Banner :title="label" class="text-zinc-600 bg-zinc-100 border-2 border-zinc-600 rounded-sm" />
    </div>
</template>