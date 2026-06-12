<script setup lang="ts">
import { ref, computed } from 'vue';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';
import { cn } from '@/lib/utils';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[], isInbound: boolean }>();

const showAll = ref(false);

// Logic changed from schedules to highlights
const visibleHighlights = computed(() => {
  const highlights = props.package.highlights_array || [];
  return showAll.value ? highlights : highlights.slice(0, 5);
});

// Only show the button if there are more than 5 items
const hasMoreHighlights = computed(() => {
  return (props.package.highlights_array?.length || 0) > 5;
});
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
    <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-2 p-4 border rounded-sm"
      :class="cn(isInbound ? 'border-[var(--inbound-custom)]' : 'border-[var(--outbound-custom)]')">
      <h4 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Highlights</h4>

      <div class="w-full flex flex-col gap-1">
        <transition-group name="list" tag="div" class="flex flex-col gap-1">
          <div v-for="(data, index) in visibleHighlights" :key="index"
            class="flex items-start gap-2 text-xs sm:text-sm md:text-base min-w-0">
            <Icon icon="material-symbols:check" class="text-xl md:text-2xl shrink-0 mt-0.5"
              :class="cn(isInbound ? 'text-[var(--inbound-custom)]' : 'text-[var(--outbound-custom)]')" />
            
            <p class="whitespace-pre-line break-words leading-relaxed w-full text-neutral-800">{{ data }}</p>
          </div>
        </transition-group>

        <div v-if="hasMoreHighlights" class="mt-2 pt-1">
          <span
            class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer hover:text-[var(--outbound-custom)] transition-colors select-none"
            @click="showAll = !showAll">
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