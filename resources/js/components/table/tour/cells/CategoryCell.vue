<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import { Icon } from '@iconify/vue';

interface Props {
    label: string
    deleted_at?: string | null
}

defineProps<Props>()
</script>

<template>
    <div class="w-fit">
        <Banner
            v-if="!deleted_at"
            :title="label"
            class="text-zinc-600 bg-zinc-100 border-2 border-zinc-600 rounded-sm"
        />

        <Banner
            v-else
            :title="label"
            class="text-zinc-500 bg-zinc-100 border-2 border-zinc-400 rounded-sm opacity-60"
        />
    </div>
</template>