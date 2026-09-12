<script setup lang="ts">
import { ref } from 'vue';
import { Package } from '@/types/package';

const props = defineProps<{ package: Package }>();

const showAll = ref(false);
const description = props.package.description || '';
const isLong = description.length > 400;
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
        <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-1 p-2 sm:p-4">
            <h2 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">About This Package</h2>
            
            <div class="w-full flex flex-col gap-2">
                <div 
                  class="overflow-hidden transition-[max-height] duration-700 ease-in-out"
                  :class="isLong && !showAll ? 'max-h-[9.3em]' : 'max-h-[2000px]'"
                >
                  <p class="whitespace-pre-line break-words w-full text-xs sm:text-sm md:text-base text-justify leading-relaxed">
                    {{ description }}
                  </p>
                </div>
                
                <div class="pt-1">
                  <span 
                    v-if="isLong" 
                    class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer select-none inline-block" 
                    role="button"
                    :aria-expanded="showAll"
                    @click="showAll = !showAll"
                  >
                    {{ showAll ? 'Show less' : 'Show more...' }}
                  </span>
                </div>
            </div>
        </div>
  </section>
</template>