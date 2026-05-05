<script setup lang="ts">
import { ref, computed } from 'vue';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();

const showAll = ref(false);

// Logic changed from schedules to highlights
const visibleHighlights = computed(() => {
  const highlights = props.package.highlights_array || [];
  return showAll.value ? highlights : highlights.slice(0, 10);
});

// Only show the button if there are more than 5 items
const hasMoreHighlights = computed(() => {
  return (props.package.highlights_array?.length || 0) > 10;
});
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-4">
    <div class="max-w-5xl m-auto w-full flex flex-col justify-start gap-2 p-4 border border-[var(--outbound-custom)]">
      <h4 class="font-bold font-roboto text-md md:text-lg uppercase">Highlights</h4>
      
      <div class="w-full flex flex-col gap-1">
        <transition-group name="list" tag="div" class="flex flex-col gap-1">
          <span 
            v-for="(data, index) in visibleHighlights" 
            :key="index" 
            class="flex items-start gap-2 text-sm md:text-base"
          >
            <Icon icon="material-symbols:check" class="text-xl md:text-2xl text-[var(--outbound-custom)] shrink-0" />
            <p class="whitespace-pre-line">{{ data }}</p>
          </span>
        </transition-group>

        <!-- Only show button if count > 5 -->
        <div v-if="hasMoreHighlights" class="mt-2">
          <span 
            class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer hover:text-[var(--outbound-custom)] transition-colors" 
            @click="showAll = !showAll"
          >
            {{ showAll ? 'Show less' : 'Show more...' }}
          </span>
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