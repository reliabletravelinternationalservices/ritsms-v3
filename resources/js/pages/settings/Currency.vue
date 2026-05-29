<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import MaintenanceOverlay from '@/components/MaintenanceOverlay.vue'; // Injected layer template
import { TransitionRoot } from '@headlessui/vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

import HeadingSmall from '@/components/HeadingSmall.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type BreadcrumbItem } from '@/types';

interface Props {
    className?: string;
}

defineProps<Props>();

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Currency settings',
        href: '/settings/currency',
    },
];

// Set this reactive boolean control handle to true if you need to display maintenance overlay block 
const isCurrencyModuleUpdating = false;

// Component HTML references
const currencyInputRef = ref<HTMLInputElement | null>(null);

// Pull values safely out of the layout global context pipeline
const page = usePage<Record<string, any>>();
const initialUsdRate = page.props.settings?.usd_to_php_rate ?? '';

// Build form tracking payload matching key/value structural demands
const form = useForm({
    key: 'usd_to_php_rate',
    value: initialUsdRate.toString(),
    type: 'currency',
});

// Sync data reactively if backend state mutates during initialization frame
onMounted(() => {
    if (initialUsdRate) {
        form.value = initialUsdRate.toString();
    }
});

const updateCurrency = () => {
    form.put(route('currency.update'), {
        preserveScroll: true,
        onSuccess: () => {
            // Keep current value visible instead of blanking out form completely
        },
        onError: (errors: any) => {
            if (errors.value && currencyInputRef.value instanceof HTMLInputElement) {
                currencyInputRef.value.focus();
            }
        },
    });
};
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbItems">
        <Head title="Currency settings" />

        <SettingsLayout>
            <template v-if="isCurrencyModuleUpdating">
                <MaintenanceOverlay 
                    title="Currency configurations are under update"
                    description="We are updating our live FX streaming pipelines and modifying database precision indexes. Realtime conversion editing is locked."
                    mode="optimization"
                    estimatedTime="~5 mins"
                />
            </template>

            <template v-else>
                <div class="space-y-6">
                    <HeadingSmall 
                        title="Exchange Rate Configuration" 
                        description="Defines the value of 1 US Dollar (USD) in Philippine Peso (PHP) used across all transaction calculations."
                    />

                    <form @submit.prevent="updateCurrency" class="space-y-6 max-w-xl">
                        <div class="grid gap-2">
                            <Label for="currency_rate">
                                Exchange Rate (PHP per 1 USD)
                            </Label>
                            
                            <div class="relative flex items-center">
                                <span class="absolute left-3 text-md text-zinc-400 font-mono select-none">
                                    ₱
                                </span>
                                <Input
                                    id="currency_rate"
                                    ref="currencyInputRef"
                                    v-model="form.value"
                                    type="number"
                                    step="0.0001"
                                    class="pl-7 block w-full font-mono"
                                    placeholder="e.g. 56.45"
                                    required
                                />
                            </div>
                            
                            <p class="text-[11px] text-muted-foreground">
                                Current live state detected inside session context: <span class="font-mono font-medium text-zinc-800 dark:text-zinc-200">{{ initialUsdRate || 'None configured' }}</span>
                            </p>
                            
                            <InputError :message="form.errors.value" />
                            <InputError :message="form.errors.key" />
                        </div>

                        <div class="flex items-center gap-4">
                            <Button :disabled="form.processing">
                                {{ form.processing ? 'Saving...' : 'Update Currency Rate' }}
                            </Button>

                            <TransitionRoot
                                :show="form.recentlySuccessful"
                                enter="transition ease-in-out duration-300"
                                enter-from="opacity-0 translate-y-1"
                                leave="transition ease-in-out duration-300"
                                leave-to="opacity-0"
                            >
                                <div class="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                    <span>Rate saved successfully</span>
                                </div>
                            </TransitionRoot>
                        </div>
                    </form>
                </div>
            </template>
        </SettingsLayout>
    </AppLayout>
</template>