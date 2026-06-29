<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { formatCurrency, formatPackageDateRange, getPackageDurationLabel, scrollToSection } from '@/lib/utils';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';
import { appModal } from '@/lib/app-modal';

const props = defineProps<{ package: Package, isInbound: boolean, usdRate: number }>();

const handleCheckAvailability = () => {
    appModal.open({
        title: "Online Booking Unavailable",
        description: "Online booking is temporarily unavailable. Please send us an inquiry, and our team will help you confirm availability and complete your booking.",
        confirmText: "Send Inquiry",
        onConfirm() {
            appModal.close();
            scrollToSection('inquiry');
        },
    });
}
</script>

<template>
    <section class="w-full relative overflow-hidden p-2 sm:p-4">
        <div class="max-w-5xl mx-auto w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-[var(--shadow-custom)] p-2 pb-6 md:pb-2">
            
            <div class="grid grid-cols-2 lg:flex lg:items-center lg:justify-between gap-x-4 gap-y-6 md:gap-x-8 lg:gap-11 w-full md:w-auto">
                
                <div class="flex flex-col min-w-0">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium whitespace-nowrap">
                        <Icon icon="tdesign:money" class="text-lg text-[var(--muted-custom)]" />
                        <span>Base Price</span>
                    </span>
                    <h4 class="text-base sm:text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--warning-custom)] break-words">
                        {{ formatCurrency(isInbound ? (props.package.base_price / props.usdRate) : props.package.base_price, props.isInbound ? 'USD' : 'PHP') }}/pax
                    </h4>
                </div>

                <div class="flex flex-col min-w-0">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium whitespace-nowrap">
                        <Icon icon="mingcute:time-duration-fill" class="text-lg text-[var(--muted-custom)]" />
                        <span>Duration</span>
                    </span>
                    <h4 class="text-base sm:text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--secondary-custom)] break-words">
                        {{ getPackageDurationLabel(props.package.duration) }}
                    </h4>
                </div>

                <div class="flex flex-col min-w-0 col-span-2 sm:col-span-1">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium whitespace-nowrap">
                        <Icon icon="mdi:calendar" class="text-lg text-[var(--muted-custom)]" />
                        <span>Selling Period</span>
                    </span>
                    <h4 class="text-base sm:text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--secondary-custom)] break-words">
                        {{ formatPackageDateRange(props.package.selling_start_date, props.package.selling_end_date) }}
                    </h4>
                </div>

                <div class="flex flex-col min-w-0">
                    <span class="flex items-center text-xs md:text-sm font-roboto gap-1 font-medium whitespace-nowrap">
                        <Icon icon="ic:baseline-payment" class="text-lg text-[var(--muted-custom)]" />
                        <span>Down Payment</span>
                    </span>
                    <h4 v-if="props.package.down_payment !== null && props.package.down_payment > 0"
                        class="text-base sm:text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--correct-custom)] break-words">
                        {{ formatCurrency(isInbound ? (props.package.down_payment / props.usdRate) : props.package.down_payment, props.isInbound ? 'USD' : 'PHP') }}/pax
                    </h4>
                    <h4 v-else class="text-base sm:text-lg md:text-xl lg:text-2xl font-roboto font-bold text-[var(--muted-custom)]">
                        N/A
                    </h4>
                </div>
            </div>

            <div class="w-full md:w-auto flex justify-start md:justify-end">
                <Button @click="handleCheckAvailability" size="lg" variant="outline"
                    class="bg-[var(--secondary-custom)] text-[var(--primary-custom)] rounded-none w-full md:w-auto justify-center gap-2">
                    <span>Check Availability</span>
                    <Icon icon="line-md:arrow-right" class="text-2xl flex-shrink-0" />
                </Button>
            </div>
        </div>
    </section>
</template>