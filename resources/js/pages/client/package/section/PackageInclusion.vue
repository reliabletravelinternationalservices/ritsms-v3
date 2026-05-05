<script setup lang="ts">
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-4">
    <div class="max-w-5xl m-auto w-full flex flex-col justify-start gap-2 p-4">
        <h4 class="font-bold font-roboto text-md md:text-lg uppercase">Inclusions</h4>
        <div class="w-full flex flex-col gap-1 px-4">
            <span 
                v-for="(data, index) in props.package.inclusions_array" 
                :key="index" 
                class="flex items-start gap-2 text-sm md:text-base"
                >
                <Icon icon="material-symbols:check" class="text-xl md:text-2xl text-[var(--correct-custom)] shrink-0" />
                <p class="whitespace-pre-line">{{ data }}</p>
            </span>
        </div>
    </div>
  </section>
</template>