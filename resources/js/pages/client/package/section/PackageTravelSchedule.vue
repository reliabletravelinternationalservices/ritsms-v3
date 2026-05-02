<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import ClientBreadcrumb from '@/components/ClientBreadcrumb.vue';
import { formatCurrency } from '@/lib/utils';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();

</script>

<template>
  <section class="w-full h-auto relative overflow-hidden p-4">
        <div class="max-w-5xl m-auto w-full flex flex-col justify-start gap-1 bg-[var(--outbound-opacity-custom-10)] p-4">
            <h4 class="font-bold font-roboto text-md md:text-lg">TRAVEL SCHEDULE</h4>
            <div class="w-full flex flex-col gap-2">
                <div class="flex items-center justify-between px-2">
                    <h5 class="font-bold">Feb 26, 2026/<span class="text-sm italic text-[var(--warning-custom)] ">Limited Slot Only!</span></h5>
                    <Banner title="Available" class="bg-[var(--correct-custom)]" />
                    <span class="font-bold text-[var(--warning-custom)]">{{ formatCurrency(props.package.base_price, 'PHP') }}/pax</span>
                </div>
                <div class="flex items-center justify-between px-2">
                    <h5 class="font-bold">Feb 26, 2026/<span class="text-sm italic text-[var(--warning-custom)] ">Limited Slot Only!</span></h5>
                    <Banner title="Available" class="bg-[var(--correct-custom)]" />
                    <span class="font-bold text-[var(--warning-custom)]">{{ formatCurrency(props.package.base_price, 'PHP') }}/pax</span>
                </div>
                <div class="flex items-center justify-between px-2">
                    <h5 class="font-bold">Feb 26, 2026/<span class="text-sm italic text-[var(--warning-custom)] ">Limited Slot Only!</span></h5>
                    <Banner title="Available" class="bg-[var(--correct-custom)]" />
                    <span class="font-bold text-[var(--warning-custom)]">{{ formatCurrency(props.package.base_price, 'PHP') }}/pax</span>
                </div>
                <span class="text-sm text-[var(--muted-custom)] font-medium underline italic">Show more...</span>
            </div>
        </div>
  </section>
</template>