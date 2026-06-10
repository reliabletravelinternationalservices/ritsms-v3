<script setup lang="ts">
import { ref, computed } from 'vue';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();

const showAll = ref(false);

const truncatedDescription = computed(() => {
  const desc = props.package.description || '';
  return desc.length > 400 ? desc.substring(0, 400) + '...' : desc;
});

const fullDescription = computed(() => props.package.description || '');
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
        <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-1 p-2 sm:p-4">
            <h4 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">ABOUT THIS PACKAGE</h4>
            
            <div class="w-full flex flex-col gap-2">
                <transition name="expand" mode="out-in">
                    <p 
                      v-if="!showAll" 
                      :key="'truncated'" 
                      class="whitespace-pre-line break-words w-full text-xs sm:text-sm md:text-base text-justify leading-relaxed"
                    >
                      {{ truncatedDescription }}
                    </p>
                    <p 
                      v-else 
                      :key="'full'" 
                      class="whitespace-pre-line break-words w-full text-xs sm:text-sm md:text-base text-justify leading-relaxed"
                    >
                      {{ fullDescription }}
                    </p>
                </transition>
                
                <div class="pt-1">
                  <span 
                    v-if="fullDescription.length > 400" 
                    class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer select-none inline-block" 
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
.expand-enter-active,
.expand-leave-active {
  transition: all 300ms ease-in-out;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>