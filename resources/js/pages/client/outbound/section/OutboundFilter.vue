<script setup lang="ts">
import DropdownField from '@/components/DropdownField.vue';
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue';
import { FilterState, Option } from '../types';


const props = defineProps<{
    countryOptions: Option[];
    seasonOptions: Option[];
    durationOptions: Option[];
    initialFilters?: FilterState;
}>();

const emit = defineEmits<{
    (e: 'search', filters: FilterState): void;
}>();

const defaultFilters: FilterState = {
    country: '',
    season: '',
    duration: null,
};

const form = ref<FilterState>({
    country: props.initialFilters?.country ?? defaultFilters.country,
    season: props.initialFilters?.season ?? defaultFilters.season,
    duration: props.initialFilters?.duration ?? defaultFilters.duration,
});

watch(
    () => props.initialFilters,
    (next) => {
        form.value = {
            country: next?.country ?? defaultFilters.country,
            season: next?.season ?? defaultFilters.season,
            duration: next?.duration ?? defaultFilters.duration,
        };
    },
    { deep: true }
);

const searchPackages = () => {
    emit('search', { ...form.value });
};

const clearFilters = () => {
    form.value = { ...defaultFilters };
    emit('search', { ...form.value });
};
</script>

<template>
    <section class="w-full relative flex">
        <div class="max-w-5xl m-auto w-full flex flex-col md:flex-row items-stretch md:items-end justify-start gap-6">

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">

                <div class="space-y-2">
                    <span class="flex items-end text-[var(--secondary-custom)]">
                        <Icon icon="lucide:map-pinned" width="20" height="20" />
                        <label class="ml-2 text-sm font-bold uppercase tracking-wider">Country</label>
                    </span>
                    <DropdownField v-model="form.country" placeholder="All Country" :options="props.countryOptions" />
                </div>

                <div class="space-y-2">
                    <span class="flex items-end text-[var(--secondary-custom)]">
                        <Icon icon="lucide:calendar" width="20" height="20" />
                        <label class="ml-2 text-sm font-bold uppercase tracking-wider">Season</label>
                    </span>
                    <DropdownField v-model="form.season" placeholder="All Season" :options="props.seasonOptions" />
                </div>

                <div class="space-y-2 sm:col-span-2 md:col-span-1">
                    <span class="flex items-end text-[var(--secondary-custom)]">
                        <Icon icon="lucide:clock-4" width="20" height="20" />
                        <label class="ml-2 text-sm font-bold uppercase tracking-wider">Duration</label>
                    </span>
                    <DropdownField v-model="form.duration" placeholder="All Duration"
                        :options="props.durationOptions" />
                </div>
            </div>

            <div class="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <button @click.prevent="searchPackages"
                    class="w-full md:w-auto bg-[var(--outbound-custom)] text-[var(--primary-custom)] h-[50px] md:h-[44px] px-8 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--outbound-opacity-custom)] transition-all duration-200">
                    <span class="whitespace-nowrap uppercase ">Search</span>
                    <Icon icon="material-symbols:search" width="24" height="24" />
                </button>
                <button @click.prevent="clearFilters"
                    class="w-full md:w-auto border border-[var(--shadow-custom)] text-[var(--secondary-custom)] h-[50px] md:h-[44px] px-8 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--soft-custom)] transition-all duration-200">
                    <span class="whitespace-nowrap uppercase">Reset</span>
                </button>
            </div>

        </div>
    </section>
</template>