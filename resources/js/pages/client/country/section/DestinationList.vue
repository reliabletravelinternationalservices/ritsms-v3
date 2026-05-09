<script setup lang="ts">
import PackageCard from '@/components/PackageCard.vue';
import { Destination } from '@/types/destination';
import { Package } from '@/types/package';

interface Props {
    destinations: Destination[],
}
const props = defineProps<Props>();
</script>

<template>
    <section class="w-full">
        <div class="max-w-5xl m-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        sadsaddsa
        </div>
    </section>
</template>