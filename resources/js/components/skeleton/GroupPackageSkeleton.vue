<script setup lang="ts">
import PackageCardSkeleton from '@/components/skeleton/PackageCardSkeleton.vue'

defineProps<{
  cards?: number
}>()
</script>

<template>
  <section class="w-full animate-pulse">
    <!-- Header -->
    <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div class="space-y-3">
        <!-- Title -->
        <div class="h-9 w-80 rounded bg-gray-300"></div>

        <!-- Description -->
        <div class="h-5 w-96 max-w-full rounded bg-gray-200"></div>

        <!-- Limited Offer Badge -->
        <div class="h-8 w-32 rounded bg-gray-300"></div>
      </div>

      <!-- Explore More -->
      <div class="mt-2 lg:mt-4">
        <div class="h-5 w-36 rounded bg-gray-300"></div>
      </div>
    </div>

    <!-- Cards -->
    <div
      class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      <PackageCardSkeleton
        v-for="n in (cards ?? 3)"
        :key="n"
      />
    </div>
  </section>
</template>