<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted } from 'vue';

import CountryCard from '@/components/carousel/country/CountryCard.vue';
import ApiFetchError from '@/components/placeholder/error/ApiFetchError.vue';
import CountryCarouselSkeleton from '@/components/skeleton/CountryCarouselSkeleton.vue';
import { useCountry } from '@/composables/services/useCountries';

const {
    countries,
    isLastPage,

    loading,
    loadingMore,
    loaded,
    error,

    fetchCountries,
    refresh,
    loadMore,
} = useCountry();

onMounted(() => {
    fetchCountries({
        page: 1,
        perPage: 6,
    });
});
</script>

<template>
    <section class="w-full px-4 py-12 sm:px-6 lg:px-8">
        <!-- Initial Loading -->
        <div v-if="loading && !countries.length">
          <CountryCarouselSkeleton v-if="loading && !loaded" class="m-auto flex w-full max-w-5xl items-center justify-center p-6" />
          <CountryCarouselSkeleton v-if="loading && !loaded" class="m-auto flex w-full max-w-5xl items-center justify-center p-6" />
        </div>

        <!-- Error -->
        <ApiFetchError v-else-if="error" class="w-full p-6" :retry="refresh" :description="error" />

        <!-- Content -->
        <template v-else>
            <div v-if="countries.length" class="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="country in countries" :key="country.id">
                    <CountryCard
                        :country="country"
                        :href="
                            route('client.destination.country', {
                                destination: country.id,
                            })
                        "
                    />
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="py-20 text-center text-slate-500">No destinations found.</div>

            <!-- Load More -->
            <CountryCarouselSkeleton v-if="loadingMore" class="m-auto flex w-full max-w-5xl items-center justify-center p-6" />

            <div v-if="countries.length && !isLastPage && !loadingMore" class="mt-8 flex justify-center">
                <button
                    @click="loadMore"
                    :disabled="loadingMore"
                    class="group inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 transition hover:bg-slate-50 disabled:opacity-60"
                >
                    <Icon v-if="loadingMore" icon="svg-spinners:180-ring" class="h-5 w-5" />

                    <template v-else>
                        <span class="text-sm font-semibold">Show More</span>
                        <Icon icon="codicon:fold-down" class="h-4 w-4 transition-transform group-hover:animate-pulse" />
                    </template>
                </button>
            </div>
        </template>
    </section>
</template>
