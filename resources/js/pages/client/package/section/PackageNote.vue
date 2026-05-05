<script setup lang="ts">
import { ref, computed } from 'vue';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();

</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-4">
    <div class="max-w-5xl m-auto w-full flex flex-col justify-start gap-2 p-4 bg-[var(--shadow-custom)]">
      <span class="flex items-bottom gap-2">
          <Icon icon="material-symbols:warning" class="text-xl md:text-2xl text-[var(--secondary-custom)] shrink-0" />
          <h4 class="font-bold font-roboto text-md md:text-lg uppercase">Notes</h4>
      </span>
  
      <div class="w-full flex flex-col gap-1">
          <span 
            v-for="(data, index) in props.package.notes_array" 
            :key="index" 
            class="flex items-start gap-2 text-sm md:text-base"
          >
            <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--secondary-custom)] shrink-0"></div>
            <p class="whitespace-pre-line">{{ data }}</p>
          </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Transition logic for smoother appearance */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>