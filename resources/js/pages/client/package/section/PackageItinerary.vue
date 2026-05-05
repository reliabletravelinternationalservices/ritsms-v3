<script setup lang="ts">
import { ref } from 'vue';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();
</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-4">
    <div class="max-w-5xl m-auto w-full flex flex-col justify-start gap-2 p-4">
        <h4 class="font-bold font-roboto text-md md:text-lg uppercase">Itineraries</h4>
        <Accordion type="single" collapsible class="w-full" default-value="day-1">
            <AccordionItem 
                v-for="(item, index) in props.package.itineraries_array" 
                :key="index" 
                :value="`day-${item.day}`"
                class="border border-[var(--shadow-custom)] px-6 mb-1"
            >
                <AccordionTrigger class="hover:no-underline">
                    <span class="font-bold text-[var(--secondary-custom)]">Day {{ item.day }} {{ item.title }}</span>
                </AccordionTrigger>
                
                <AccordionContent>
                <div class="flex flex-col gap-2 py-2 px-6">
                    <!-- If activity is an array of strings -->
                    <div 
                    v-for="(activity, aIndex) in item.activity" 
                    :key="aIndex" 
                    class="flex items-start gap-2"
                    >
                        <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--outbound-custom)] shrink-0"></div>
                        <p class="text-sm md:text-base text-[var(--secondary-custom)] leading-relaxed">
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