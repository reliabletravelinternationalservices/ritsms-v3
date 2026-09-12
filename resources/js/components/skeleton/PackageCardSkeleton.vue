<template>
  <div
    class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse"
  >
    <!-- Image -->
    <div class="relative h-36 w-full bg-gray-300">
      <!-- Special Offer Badge -->
      <div
        class="absolute left-3 top-3 h-6 w-24 rounded bg-gray-400"
      ></div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Duration + Location -->
      <div class="mb-4 flex items-center justify-between gap-3">
        <div class="h-8 w-16 rounded bg-gray-300"></div>

        <div class="flex items-center gap-2 flex-1 justify-end">
          <div class="h-4 w-4 rounded-full bg-gray-300"></div>
          <div class="h-4 w-36 rounded bg-gray-300"></div>
        </div>
      </div>

      <!-- Title -->
      <div class="space-y-2">
        <div class="h-6 w-full rounded bg-gray-300"></div>
        <div class="h-6 w-3/4 rounded bg-gray-300"></div>
      </div>

      <!-- Price -->
      <div class="mt-5 flex items-end gap-2">
        <div class="h-5 w-12 rounded bg-gray-300"></div>
        <div class="h-7 w-36 rounded bg-gray-300"></div>
      </div>

      <!-- Description -->
      <div class="mt-5 space-y-2">
        <div class="h-4 w-full rounded bg-gray-200"></div>
        <div class="h-4 w-full rounded bg-gray-200"></div>
        <div class="h-4 w-2/3 rounded bg-gray-200"></div>
      </div>
    </div>
  </div>
</template>