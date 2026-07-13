<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { cn } from '@/lib/utils';
import { PackageDetailProps } from '../../types';

const props = defineProps<PackageDetailProps>();

const showAll = ref(false);

const allHighlights = computed(() => props.package.highlights_array || []);

// Only show the button if there are more than 5 items
const hasMoreHighlights = computed(() => allHighlights.value.length > 5);
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
    <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-2 p-4 border rounded-sm"
      :class="cn(isInbound ? 'border-[var(--inbound-custom)]' : 'border-[var(--outbound-custom)]')">
      <h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Highlights</h2>

      <div class="w-full flex flex-col gap-1">
        <ul class="flex flex-col">
          <li v-for="(data, index) in allHighlights" :key="index"
            class="highlight-item flex items-start gap-2 text-xs sm:text-sm md:text-base min-w-0"
            :class="(!showAll && index >= 5) ? 'highlight-collapsed' : 'highlight-expanded'">
            <Icon icon="material-symbols:check" class="text-xl md:text-2xl shrink-0 mt-0.5"
              :class="cn(isInbound ? 'text-[var(--inbound-custom)]' : 'text-[var(--outbound-custom)]')"
              aria-hidden="true" />
            
            <p class="whitespace-pre-line break-words leading-relaxed w-full text-neutral-800">{{ data }}</p>
          </li>
        </ul>

        <div v-if="hasMoreHighlights" class="mt-2 pt-1">
          <span
            class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer hover:text-[var(--outbound-custom)] transition-colors select-none"
            role="button"
            :aria-expanded="showAll"
            @click="showAll = !showAll">
            {{ showAll ? 'Show less' : 'Show more...' }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.highlight-item {
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.3s ease, transform 0.3s ease, margin 0.35s ease, padding 0.35s ease;
}

.highlight-expanded {
  max-height: 200px;
  opacity: 1;
  transform: translateY(0);
  margin-bottom: 0.25rem;
}

.highlight-collapsed {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>