<template>
  <div class="w-full animate-pulse">
    <!-- Hero Image -->
    <div
      class="relative h-[220px] overflow-hidden rounded-lg bg-gray-300 sm:h-[350px] lg:h-[500px]"
    >
      <!-- Left Arrow -->
      <div
        class="absolute left-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-gray-400"
      ></div>

      <!-- Right Arrow -->
      <div
        class="absolute right-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-gray-400"
      ></div>

      <!-- Image shimmer -->
      <div class="absolute inset-0 skeleton-shimmer"></div>
    </div>

    <!-- Thumbnail Navigation -->
    <div
      class="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-6"
    >
      <div
        v-for="n in 6"
        :key="n"
        class="relative h-16 overflow-hidden rounded-md bg-gray-300 sm:h-20 lg:h-24"
      >
        <!-- Active Thumbnail -->
        <div
          v-if="n === 1"
          class="absolute inset-0 border-2 border-[var(--primary-custom)]"
        ></div>

        <!-- Country Label -->
        <div
          class="absolute bottom-2 left-1/2 h-4 w-20 -translate-x-1/2 rounded bg-gray-400"
        ></div>

        <div class="absolute inset-0 skeleton-shimmer"></div>
      </div>
    </div>
  </div>
</template>