<script setup lang="ts">
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
    <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-2 sm:p-4">
        <h4 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Inclusions</h4>
        
        <div class="w-full flex flex-col gap-2 px-1 sm:px-4">
            <div 
                v-for="(data, index) in props.package.inclusions_array" 
                :key="index" 
                class="flex items-start gap-2 text-xs sm:text-sm md:text-base text-neutral-800 dark:text-neutral-200 min-w-0"
            >
                <Icon icon="material-symbols:check" class="text-xl md:text-2xl text-[var(--correct-custom)] shrink-0 mt-0.5" />
                
                <p class="whitespace-pre-line break-words leading-relaxed w-full">{{ data }}</p>
            </div>
        </div>
    </div>
  </section>
</template>