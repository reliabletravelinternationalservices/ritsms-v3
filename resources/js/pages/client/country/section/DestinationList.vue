<script setup lang="ts">
import { onMounted } from 'vue'

import CountryCard from '@/components/carousel/country/CountryCard.vue'
import LoadMoreButton from '@/components/LoadMoreButton.vue'
import ApiFetchError from '@/components/placeholder/error/ApiFetchError.vue'
import CountryCarouselSkeleton from '@/components/skeleton/CountryCarouselSkeleton.vue'
import { useCountry } from '@/composables/services/useCountries'

const {
  countries,
  isLastPage,
  lastFilters,
  loading,
  loadingMore,
  error,
  fetchCountries,
  refresh,
  loadMore,
} = useCountry()

onMounted(() => {
  fetchCountries({
    page: 1,
    perPage: 6,
  })
})
</script>

<template>
  <section class="w-full px-4 py-12 sm:px-6 lg:px-8">
    <!-- Initial Loading -->
    <div v-if="loading && !countries.length">
      <CountryCarouselSkeleton
        v-for="n in 2"
        :key="n"
        class="mx-auto flex w-full max-w-5xl items-center justify-center p-6"
      />
    </div>

    <!-- Error -->
    <ApiFetchError
      v-else-if="error"
      class="w-full p-6"
      :description="error"
      :retry="() => refresh({ ...lastFilters })"
    />

    <!-- Content -->
    <template v-else>
      <div
        v-if="countries.length"
        class="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <CountryCard
          v-for="country in countries"
          :key="country.id"
          :country="country"
          :href="route('client.destination.country', { slug: country.slug })"
        />
      </div>

      <CountryCarouselSkeleton
        v-if="loadingMore"
        class="mx-auto flex w-full max-w-5xl items-center justify-center p-6"
      />

      <LoadMoreButton
        v-else-if="countries.length && !isLastPage"
        :loading="loadingMore"
        @click="loadMore"
      />
    </template>
  </section>
</template>