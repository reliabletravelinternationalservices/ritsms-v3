<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import GroupPackage from '@/components/GroupPackage.vue';
import InboundFilter from './InboundFilter.vue';
import { PackageGroup } from '@/types/group-package';
import { Package } from '@/types/package';

interface FilterState {
    destination: string;
    season: string;
    duration: number | null;
}

interface Option {
    label: string;
    value: string | number | null;
}

const page = usePage<Record<string, any>>();

const props = defineProps<{
    featuredGroups: PackageGroup[];
    normalGroups: PackageGroup[];
    destinationLocations: string[];
}>();

const usdRate: number = page.props.settings?.usd_to_php_rate ?? null;

const allGroups = computed(() => [...props.featuredGroups, ...props.normalGroups]);

const allPackages = computed<Package[]>(() => {
    return allGroups.value.flatMap((group) => group.packages ?? []);
});

const normalizeText = (value: string | undefined | null) => value?.trim().toLowerCase() ?? '';

const destinationOptions = computed<Option[]>(() => {
    return props.destinationLocations
        .map((destination) => ({
            label: destination ?? '',
            value: normalizeText(destination ?? ''),
        }))
        .filter((option) => Boolean(option.label))
        .sort((a, b) => String(a.label).localeCompare(String(b.label)));
});

const seasonOptions: Option[] = [
    { label: 'All Season', value: '' },
    { label: 'Winter', value: 'winter' },
    { label: 'Summer', value: 'summer' },
    { label: 'Autumn', value: 'autumn' },
    { label: 'Spring', value: 'spring' },
];

const durationOptions = computed<Option[]>(() => {
    return Array.from(new Set(allPackages.value
        .map((pkg) => pkg.duration)
        .filter((duration): duration is number => duration !== null && duration !== undefined)))
        .sort((a, b) => a - b)
        .map((duration) => ({ label: `${duration} Days`, value: duration }));
});

const parseFiltersFromUrl = (): FilterState => {
    const currentUrl = new URL(page.url, window.location.origin);
    const searchParams = currentUrl.searchParams;
    const durationParam = searchParams.get('duration');
    const duration = durationParam ? Number(durationParam) : null;

    return {
        destination: normalizeText(searchParams.get('destination') ?? ''),
        season: normalizeText(searchParams.get('season') ?? ''),
        duration: Number.isNaN(duration) ? null : duration,
    };
};

const filters = ref<FilterState>(parseFiltersFromUrl());
const appliedFilters = ref<FilterState>({ ...filters.value });

const updateUrl = (nextFilters: FilterState) => {
    const currentUrl = new URL(page.url, window.location.origin);
    const searchParams = currentUrl.searchParams;

    if (nextFilters.destination) {
        searchParams.set('destination', nextFilters.destination);
    } else {
        searchParams.delete('destination');
    }

    if (nextFilters.season) {
        searchParams.set('season', nextFilters.season);
    } else {
        searchParams.delete('season');
    }

    if (nextFilters.duration !== null && !Number.isNaN(nextFilters.duration)) {
        searchParams.set('duration', String(nextFilters.duration));
    } else {
        searchParams.delete('duration');
    }

    const queryString = searchParams.toString();
    const newUrl = `${currentUrl.pathname}${queryString ? `?${queryString}` : ''}`;
    window.history.replaceState({}, '', newUrl);
};

const matchesFilter = (pkg: Package, filter: FilterState) => {
    const destinationMatch = !filter.destination || normalizeText(pkg.destination).includes(filter.destination);
    const seasonMatch = !filter.season || normalizeText(pkg.season) === filter.season;
    const durationMatch = filter.duration === null || pkg.duration === filter.duration;

    return destinationMatch && seasonMatch && durationMatch;
};

const filterGroups = (groups: PackageGroup[]) => {
    return groups
        .map((group) => {
            const packages = group.packages?.filter((pkg) => matchesFilter(pkg, appliedFilters.value)) ?? [];
            return { ...group, packages };
        })
        .filter((group) => (group.packages?.length ?? 0) > 0);
};

const filteredNormalGroups = computed(() => filterGroups(props.normalGroups));
const noResults = computed(() => filteredNormalGroups.value.length === 0);

const search = (nextFilters: FilterState) => {
    appliedFilters.value = { ...nextFilters };
    filters.value = { ...nextFilters };
    updateUrl(nextFilters);
};
</script>

<template>
    <section id="inbound-package-display" class="w-full">
        <div class="max-w-5xl m-auto py-8">
            <GroupPackage v-for="(group, index) in props.featuredGroups" :key="`featured-${group.id}-${index}`"
                :title="group.title" :description="group.description" :packages="group.packages" :is-featured="true"
                :is-inbound="true" :usd-rate="usdRate" :tag="group.tag"
                :href="route('client.inbound.package.group', { id: group.id })" />

            <div class="w-full py-12 mt-4">
                <InboundFilter :destination-options="destinationOptions" :season-options="seasonOptions"
                    :duration-options="durationOptions" :initial-filters="filters" @search="search" />

                <span v-if="filteredNormalGroups.length > 0">
                    <GroupPackage v-for="(group, index) in filteredNormalGroups" :key="`normal-${group.id}-${index}`"
                        :title="group.title" :description="group.description" :packages="group.packages"
                        :is-featured="false" :is-inbound="true" :usd-rate="usdRate" :tag="group.tag"
                        :href="route('client.inbound.package.group', { id: group.id })" />
                </span>

                <span v-else-if="noResults"
                    class="flex flex-col items-center justify-center gap-2 w-full py-12 bg-[var(--inbound-opacity-custom-10)] mt-8 rounded-xl border border-[var(--shadow-custom)]">
                    <span
                        class="flex items-center justify-center rounded-full bg-[var(--inbound-custom)] text-white w-14 h-14">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
                            <path
                                d="M10.5 3a7.5 7.5 0 0 1 6.05 12.12l4.16 4.16a1 1 0 0 1-1.42 1.42l-4.16-4.16A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11Z" />
                        </svg>
                    </span>
                    <p class="font-bold uppercase text-sm tracking-[0.15em] text-[var(--primary-custom)]">No packages
                        found</p>
                    <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)] text-center max-w-xl">
                        We couldn’t find any packages matching your selected filters. Clear a filter or try a broader
                        search.
                    </p>
                </span>
            </div>
        </div>
    </section>
</template>
