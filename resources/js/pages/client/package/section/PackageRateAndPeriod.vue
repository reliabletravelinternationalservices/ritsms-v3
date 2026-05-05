<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { formatCurrency, formatPackageDateRange, getPackageDurationLabel } from '@/lib/utils';
import { Package } from '@/types/package';
import { PackageInUSD } from '@/types/package-usd';
import { Icon } from '@iconify/vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps<{ package: Package, isInbound: boolean, usdRate: number }>();


</script>

<template>
    <section class="w-full relative overflow-hidden p-4">
        <div class="max-w-5xl m-auto w-full flex items-center justify-between gap-4 border-b border-[var(--shadow-custom)] p-2">
            <div class="flex items-center justify-between gap-11">
                <div class="flex flex-col">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium">
                        <Icon icon="tdesign:money" class="text-lg text-[var(--muted-custom)]" />
                        <span>
                            Base Price
                        </span>
                    </span>
                    <h4 class="text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--warning-custom)]">
                        {{ formatCurrency(isInbound? (props.package.base_price/props.usdRate) : props.package.base_price, props.isInbound? 'USD' : 'PHP') }}/pax
                    </h4>
                </div>
                <div class="flex flex-col">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium">
                        <Icon icon="mingcute:time-duration-fill" class="text-lg text-[var(--muted-custom)]" />
                        <span>
                            Duration
                        </span>
                    </span>
                    <h4 class="text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--secondary-custom)]">
                        {{ getPackageDurationLabel(props.package.duration) }}
                    </h4>
                </div>
                <div class="flex flex-col">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium">
                        <Icon icon="mdi:calendar" class="text-lg text-[var(--muted-custom)]" />
                        <span>
                            Selling Period
                        </span>
                    </span>
                    <h4 class="text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--secondary-custom)]">
                        {{ formatPackageDateRange(props.package.selling_start_date, props.package.selling_end_date) }}
                    </h4>
                </div>
                <div class="flex flex-col">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium">
                        <Icon icon="ic:baseline-payment" class="text-lg text-[var(--muted-custom)]" />
                        <span>
                            Down Payment
                        </span>
                    </span>
                    <h4 v-if="props.package.down_payment !== null" class="text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--correct-custom)]">
                        {{ formatCurrency(isInbound? (props.package.down_payment/props.usdRate) : props.package.down_payment, props.isInbound? 'USD' : 'PHP') }}/pax
                    </h4>
                </div>
            </div>
            <div>
                <Button size="lg" variant="outline" class="bg-[var(--secondary-custom)] text-[var(--primary-custom)] rounded-none">
                    <span>Check Availability</span>
                    <Icon icon="line-md:arrow-right" class="text-2xl"/>
                </Button>
            </div>
        </div>
    </section>
</template>
