<script setup lang="ts">
// COMPONENTS
import GroupPackage from '@/components/GroupPackage.vue';
import ApiFetchError from '@/components/placeholder/error/ApiFetchError.vue';
import GroupPackageSkeleton from '@/components/skeleton/GroupPackageSkeleton.vue';
import { useGroupPackages } from '@/composables/services/usePackages.js';
import { onMounted } from 'vue';

const { groupedPackages, fetchGroupPackages, loading, loadingMore, loadMore, isLastPage, error } = useGroupPackages();

onMounted(() => {
    fetchGroupPackages({ isOutbound: true, perPage: 10, page: 1 });
});
</script>

<template>
    <section id="outbound-package-display" class="w-full px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-5xl py-6 md:py-10">
            <!-- Initial Loading -->
            <div v-if="loading" class="flex flex-col gap-4 md:gap-6">
                <GroupPackageSkeleton v-for="n in 2" :key="n" />
            </div>

            <ApiFetchError v-else-if="error" :retry="fetchGroupPackages" :description="error" />

            <div v-else class="flex flex-col gap-4 md:gap-6">
                <GroupPackage
                    v-for="group in groupedPackages"
                    :key="group.id"
                    :group="group"
                    :isInbound="false"
                    :href="route('client.outbound.group', { slug: group.slug })"
                />
                <GroupPackageSkeleton v-if="loadingMore" />

                <LoadMoreButton v-else-if="groupedPackages.length && !isLastPage" :loading="loadingMore" @click="loadMore" />
            </div>
        </div>
    </section>
</template>
