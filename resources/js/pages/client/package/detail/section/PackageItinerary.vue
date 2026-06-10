<script setup lang="ts">
import { Package } from '@/types/package';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils';

const props = defineProps<{ package: Package, isInbound: boolean }>();
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-2 sm:p-4">
    <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-3 p-2 sm:p-4">
        <h4 class="font-bold font-roboto text-sm md:text-lg uppercase tracking-wide">Itineraries</h4>
        
        <Accordion type="single" collapsible class="w-full" default-value="day-1">
            <AccordionItem 
                v-for="(item, index) in props.package.itineraries_array" 
                :key="index" 
                :value="`day-${item.day}`"
                class="border border-[var(--shadow-custom)] px-3 sm:px-6 mb-1 rounded-sm"
            >
                <AccordionTrigger class="hover:no-underline text-left">
                    <span class="font-bold text-sm sm:text-base text-[var(--secondary-custom)] pr-4">
                      Day {{ item.day }}: {{ item.title }}
                    </span>
                </AccordionTrigger>
                
                <AccordionContent>
                <div class="flex flex-col gap-2.5 py-2 px-1 sm:px-6">
                    <div 
                      v-for="(activity, aIndex) in item.activity" 
                      :key="aIndex" 
                      class="flex items-start gap-2 min-w-0"
                    >
                        <div class="mt-1.5 sm:mt-2 w-1.5 h-1.5 rounded-full shrink-0" :class="cn(isInbound ? 'bg-[var(--inbound-custom)]' : 'bg-[var(--outbound-custom)]')"></div>
                        
                        <p class="text-xs sm:text-sm md:text-base text-[var(--secondary-custom)] leading-relaxed break-words w-full">
                            {{ activity }}
                        </p>
                    </div>
                </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  </section>
</template>