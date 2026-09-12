<template>
  <div
    class="relative w-full h-[420px] overflow-hidden rounded-xl bg-gray-200 animate-pulse"
  >
    <!-- Background -->
    <div class="absolute inset-0 bg-gray-300"></div>

    <!-- Dark Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
    ></div>

    <!-- Bottom Content -->
    <div class="absolute bottom-5 left-5 right-5">
      <div class="flex items-center gap-2 mb-2">
        <!-- Location Icon -->
        <div class="w-5 h-5 rounded-full bg-gray-400"></div>

        <!-- Country -->
        <div class="h-5 w-28 rounded bg-gray-400"></div>
      </div>

      <!-- Vertical Line + Destinations -->
      <div class="flex items-center gap-3">
        <div class="w-[2px] h-8 bg-gray-400"></div>
        <div class="h-4 w-24 rounded bg-gray-400"></div>
      </div>
    </div>
  </div>
</template>