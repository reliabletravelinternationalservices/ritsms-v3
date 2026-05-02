<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { formatCurrency, formatPackageDateRange, getPackageDurationLabel } from '@/lib/utils';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

const props = defineProps<{ package: Package }>();

</script>

<template>
    <section class="w-full relative overflow-hidden p-4">
        <div class="max-w-5xl m-auto w-full flex items-center justify-between gap-4">
            <div class="flex items-center justify-between gap-2">
                <div class="flex flex-col w-fit bg-[var(--tag-custom)] text-[var(--primary-custom)] px-3 py-1.5">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1">
                        <Icon icon="ic:twotone-flight" class="text-xl" />
                        <span>
                            Flights
                        </span>
                    </span>
                </div>
                <div class="flex flex-col w-fit bg-[var(--tag-custom)] text-[var(--primary-custom)] px-4 py-1.5">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1">
                        <Icon icon="mingcute:hotel-fill" class="text-xl" />
                        <span>
                            Hotels
                        </span>
                    </span>
                </div>
                <div class="flex flex-col w-fit bg-[var(--tag-custom)] text-[var(--primary-custom)] px-4 py-1.5">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1">
                        <Icon icon="lsicon:leaf-filled" class="text-xl" />
                        <span>
                            Seasons
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>
