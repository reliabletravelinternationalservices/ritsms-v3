<script setup lang="ts">
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

defineProps<{ package: Package }>();
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
    <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-2 sm:p-4">
        <h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Exclusions</h2>
        
        <ul class="w-full flex flex-col gap-2 px-1 sm:px-6">
            <li 
                v-for="(data, index) in package.exclusions_array" 
                :key="index" 
                class="flex items-start gap-2 text-xs sm:text-sm md:text-base text-neutral-800 min-w-0"
            >
                <Icon icon="mdi:remove" class="text-xl md:text-2xl text-[var(--warning-custom)] shrink-0 mt-0.5" aria-hidden="true" />
                
                <p class="whitespace-pre-line break-words leading-relaxed w-full">{{ data }}</p>
            </li>
        </ul>
    </div>
  </section>
</template>