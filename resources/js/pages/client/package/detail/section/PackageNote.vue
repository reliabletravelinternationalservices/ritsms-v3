<script setup lang="ts">
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

const props = defineProps<{ package: Package }>();
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
    <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-4 bg-[var(--shadow-custom)] rounded-lg">
      
      <div class="flex items-center gap-2">
          <Icon icon="material-symbols:warning" class="text-xl md:text-2xl text-[var(--secondary-custom)] shrink-0" aria-hidden="true" />
          <h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Notes</h2>
      </div>
  
      <ul class="w-full flex flex-col gap-2">
          <li 
            v-for="(data, index) in props.package.notes_array" 
            :key="index" 
            class="flex items-start gap-2 text-xs sm:text-sm md:text-base text-neutral-700 min-w-0"
          >
            <div class="mt-1.5 sm:mt-2 w-1.5 h-1.5 rounded-full bg-[var(--secondary-custom)] shrink-0" aria-hidden="true"></div>
            
            <p class="whitespace-pre-line break-words leading-relaxed w-full">{{ data }}</p>
          </li>
      </ul>
      
    </div>
  </section>
</template>