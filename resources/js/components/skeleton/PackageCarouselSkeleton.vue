<script setup lang="ts">
import PackageCardSkeleton from './PackageCardSkeleton.vue';



</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <PackageCardSkeleton
        v-for="n in 3"
        :key="n"
        :class="{
          'hidden md:block': n > 1
        }"
      />
    </div>
</template>