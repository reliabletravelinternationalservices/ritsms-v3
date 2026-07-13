<script setup lang="ts">
import PackageCard from '@/components/PackageCard.vue';
import { Package } from '@/types/package';

interface Props {
    packages: Package[],
    isInbound: boolean,
}
const props = defineProps<Props>();
</script>

<template>
    <section class="w-full flex flex-col justify-center">
        <div class="max-w-5xl m-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6">
            <PackageCard v-for="packageData in props.packages" :key="packageData.id" :package="packageData" :isInbound="props.isInbound" />
        </div>
    </section>
</template>