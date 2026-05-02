<script setup lang="ts">
import { ref, computed } from 'vue';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();

const showAll = ref(false);

</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-4">
        <div class="max-w-5xl m-auto w-full flex flex-col justify-start gap-2 p-4 border border-[var(--outbound-custom)]">
            <h4 class="font-bold font-roboto text-md md:text-lg">HIGHLIGHTS</h4>
            <div class="w-full flex flex-col gap-1">
                <span class="flex items-start gap-2 text-sm md:text-base">
                    <icon icon="material-symbols:check" class="text-xl md:text-2xl text-[var(--outbound-custom)]" />
                    <p class="whitespace-pre-line">Lorem ipsum, dolor sit amet consectetur adipisicing elit. In nihil iure non corporis ullam quidem exercitationem.</p>
                </span>
                <span class="flex items-start gap-2 text-sm md:text-base">
                    <icon icon="material-symbols:check" class="text-xl md:text-2xl text-[var(--outbound-custom)]" />
                    <p class="whitespace-pre-line">Lorem ipsum, dolor sit amet consectetur adipisicing elit. In nihil iure non corporis ullam quidem exercitationem.</p>
                </span>
                <span class="flex items-start gap-2 text-sm md:text-base">
                    <icon icon="material-symbols:check" class="text-xl md:text-2xl text-[var(--outbound-custom)]" />
                    <p class="whitespace-pre-line">Lorem ipsum, dolor sit amet consectetur adipisicing elit. In nihil iure non corporis ullam quidem exercitationem.</p>
                </span>
                <span class="flex items-start gap-2 text-sm md:text-base">
                    <icon icon="material-symbols:check" class="text-xl md:text-2xl text-[var(--outbound-custom)]" />
                    <p class="whitespace-pre-line">Lorem ipsum, dolor sit amet consectetur adipisicing elit. In nihil iure non corporis ullam quidem exercitationem.</p>
                </span>
                <span  class="text-sm text-[var(--muted-custom)] font-medium underline italic cursor-pointer" @click="showAll = !showAll">{{ showAll ? 'Show less' : 'Show more...' }}</span>
            </div>
        </div>
  </section>
</template>
