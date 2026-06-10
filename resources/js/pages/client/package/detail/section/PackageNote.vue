<script setup lang="ts">
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
    <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-4 bg-[var(--shadow-custom)] rounded-lg">
      
      <div class="flex items-center gap-2">
          <Icon icon="material-symbols:warning" class="text-xl md:text-2xl text-[var(--secondary-custom)] shrink-0" />
          <h4 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Notes</h4>
      </div>
  
      <div class="w-full flex flex-col gap-2">
          <div 
            v-for="(data, index) in props.package.notes_array" 
            :key="index" 
            class="flex items-start gap-2 text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 min-w-0"
          >
            <div class="mt-1.5 sm:mt-2 w-1.5 h-1.5 rounded-full bg-[var(--secondary-custom)] shrink-0"></div>
            
            <p class="whitespace-pre-line break-words leading-relaxed w-full">{{ data }}</p>
          </div>
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