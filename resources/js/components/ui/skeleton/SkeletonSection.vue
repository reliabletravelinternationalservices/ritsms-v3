<template>
    <section class="space-y-4 py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonCard v-for="n in count" :key="n" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import SkeletonCard from './SkeletonCard.vue';

const props = defineProps({
    count: { type: Number, default: 3 },
});
</script>
