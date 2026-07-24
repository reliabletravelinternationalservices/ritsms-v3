<script setup lang="ts">
import { onMounted } from 'vue';

import LoadMoreButton from '@/components/LoadMoreButton.vue';
import PackageCard from '@/components/PackageCard.vue';
import ApiFetchError from '@/components/placeholder/error/ApiFetchError.vue';
import PackageCarouselSkeleton from '@/components/skeleton/PackageCarouselSkeleton.vue';
import { usePackages } from '@/composables/services/usePackages';

interface Props {
    groupID: number;
    isInbound: boolean;
}

const props = defineProps<Props>();

const { packages, fetchPackages, loading, loadingMore, loadMore, isLastPage, error } = usePackages();

onMounted(() => {
    fetchPackages({
        page: 1,
        perPage: 6,
        groupID: props.groupID,
    });
});
</script>

<template>
    <section class="flex w-full flex-col justify-center py-6">
        <!-- Initial Loading -->
        <div v-if="loading" class="mx-auto flex flex-col w-full max-w-5xl justify-center py-8 gap-6">
            <PackageCarouselSkeleton v-for="i in 2" :key="i" />
        </div>

        <!-- Error -->
        <ApiFetchError v-else-if="error" :description="error" :retry="fetchPackages" />

        <!-- Content -->
        <template v-else>
            <div v-if="packages.length" class="mx-auto grid max-w-5xl grid-cols-1 gap-12 py-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                <PackageCard v-for="pkg in packages" :key="pkg.id" :package="pkg" :isInbound="isInbound" />
            </div>

            <!-- Empty State -->
            <div v-else class="py-20 text-center text-slate-500">No packages found.</div>

            <!-- Loading More -->
            <div v-if="loadingMore" class="flex w-full justify-center py-8">
                <PackageCarouselSkeleton />
            </div>

            <!-- Load More -->
            <LoadMoreButton v-else-if="packages.length && !isLastPage" :loading="loadingMore" @click="loadMore" />
        </template>
    </section>
</template>
