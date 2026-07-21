<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  title?: string
  description?: string
  retry?: () => void
}>()
</script>

<template>
  <div
    class="flex min-h-[260px] w-full flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-5 py-10 text-center sm:px-8 sm:py-14"
  >
    <!-- Icon -->
    <div
      class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 sm:h-16 sm:w-16"
    >
      <Icon
        icon="solar:cloud-cross-bold"
        class="text-3xl text-red-500 sm:text-4xl"
      />
    </div>

    <!-- Title -->
    <h3
      class="max-w-md text-lg font-semibold text-gray-900 sm:text-xl"
    >
      {{ title ?? 'Unable to load data' }}
    </h3>

    <!-- Description -->
    <p
      class="mt-2 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base"
    >
      {{
        description ??
        'Something went wrong while loading the data. Please try again.'
      }}
    </p>

    <!-- Retry Button -->
    <button
      v-if="retry"
      @click="retry"
      class="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--primary-custom)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95 sm:px-6 sm:py-3 sm:text-base"
    >
      <Icon icon="solar:refresh-bold" class="text-lg" />
      Try Again
    </button>
  </div>
</template>