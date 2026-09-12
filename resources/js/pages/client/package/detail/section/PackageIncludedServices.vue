<script setup lang="ts">
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

defineProps<{ package: Package }>();
</script>

<template>
    <section class="w-full relative overflow-hidden px-4 py-2">
        <div class="max-w-5xl mx-auto w-full flex items-center justify-between gap-4">
            
            <div class="flex items-center flex-wrap gap-2 sm:gap-3 w-full">
                
                <div class="flex flex-col w-fit bg-[var(--tag-custom)] text-[var(--primary-custom)] px-3 py-1.5 shrink-0">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 select-none">
                        <Icon icon="ic:twotone-flight" class="text-xl shrink-0" />
                        <span>Flights</span>
                    </span>
                </div>
                
                <div class="flex flex-col w-fit bg-[var(--tag-custom)] text-[var(--primary-custom)] px-4 py-1.5 shrink-0">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 select-none">
                        <Icon icon="mingcute:hotel-fill" class="text-xl shrink-0" />
                        <span>Hotels</span>
                    </span>
                </div>
                
                <div class="flex flex-col w-fit bg-[var(--tag-custom)] text-[var(--primary-custom)] px-4 py-1.5 shrink-0">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 select-none">
                        <Icon icon="lsicon:leaf-filled" class="text-xl shrink-0" />
                        <span>Seasons</span>
                    </span>
                </div>

            </div>
        </div>
    </section>
</template>