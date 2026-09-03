<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import { Link } from '@inertiajs/vue3';

    interface Props {
        label: string
    }

    defineProps<Props>()
</script>

<template>
    <div class="w-fit">
        <Banner :title="label" class="text-zinc-400 bg-zinc-100 border-2 border-zinc-400 rounded-sm" />
    </div>
</template>