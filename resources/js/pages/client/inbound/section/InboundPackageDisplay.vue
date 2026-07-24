<script setup lang="ts">
import { onMounted } from 'vue';

import GroupPackage from '@/components/GroupPackage.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import ApiFetchError from '@/components/placeholder/error/ApiFetchError.vue';
import GroupPackageSkeleton from '@/components/skeleton/GroupPackageSkeleton.vue';
import { useGroupPackages } from '@/composables/services/usePackages';

const { groupedPackages, fetchGroupPackages, loading, loadingMore, loadMore, isLastPage, error } = useGroupPackages();

onMounted(() => {
    fetchGroupPackages({
        isInbound: true,
        perPage: 3,
        page: 1,
    });
});
</script>

<template>
    <section id="inbound-package-display" class="w-full px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-5xl py-6 md:py-10">
            <!-- Initial Loading -->
            <div v-if="loading" class="flex flex-col gap-4 md:gap-6">
                <GroupPackageSkeleton v-for="n in 2" :key="n" />
            </div>

            <!-- Error -->
            <ApiFetchError v-else-if="error" :description="error" :retry="fetchGroupPackages" />

            <!-- Content -->
            <div v-else class="flex flex-col gap-4 md:gap-6">
                <GroupPackage
                    v-for="group in groupedPackages"
                    :key="group.id"
                    :group="group"
                    :isInbound="true"
                    :href="route('client.inbound.group', { slug: group.slug })"
                />

                <GroupPackageSkeleton v-if="loadingMore" />

                <LoadMoreButton v-else-if="groupedPackages.length && !isLastPage" :loading="loadingMore" @click="loadMore" />
            </div>
        </div>
    </section>
</template>
