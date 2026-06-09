<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import GroupPackage from '@/components/GroupPackage.vue';
import OutboundFilter from './OutboundFilter.vue';
import { PackageGroup } from '@/types/group-package';
import { Package } from '@/types/package';

interface FilterState {
  country: string;
  season: string;
  duration: number | null;
}

interface Option {
  label: string;
  value: string | number | null;
}

const props = defineProps<{
  featuredGroups: PackageGroup[];
  normalGroups: PackageGroup[];
}>();

const page = usePage<Record<string, any>>();

const allGroups = computed(() => [...props.featuredGroups, ...props.normalGroups]);

const allPackages = computed<Package[]>(() => {
  return allGroups.value.flatMap((group) => group.packages ?? []);
});

const normalizeText = (value: string | undefined | null) => value?.trim().toLowerCase() ?? '';

const extractCountry = (destination: string) => {
  const normalized = normalizeText(destination);
  if (!normalized) return '';

  const segments = normalized.split(',').map((segment) => segment.trim()).filter(Boolean);
  return segments.length > 1 ? segments.at(-1) ?? segments[0] : segments[0];
};

const toTitleCase = (value: string) => {
  return value
    .split(' ')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
};

const countryOptions = computed<Option[]>(() => {
  return Array.from(new Set(allPackages.value
    .map((pkg) => extractCountry(pkg.destination))
    .filter((country) => Boolean(country))))
    .sort((a, b) => String(a).localeCompare(String(b)))
    .map((country) => ({ label: toTitleCase(country), value: country }));
});

const seasonOptions: Option[] = [
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
    country: normalizeText(searchParams.get('country') ?? ''),
    season: normalizeText(searchParams.get('season') ?? ''),
    duration: Number.isNaN(duration) ? null : duration,
  };
};

const filters = ref<FilterState>(parseFiltersFromUrl());
const appliedFilters = ref<FilterState>({ ...filters.value });

const updateUrl = (nextFilters: FilterState) => {
  const currentUrl = new URL(page.url, window.location.origin);
  const searchParams = currentUrl.searchParams;

  if (nextFilters.country) {
    searchParams.set('country', nextFilters.country);
  } else {
    searchParams.delete('country');
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
  const countryMatch = !filter.country || normalizeText(pkg.destination).includes(filter.country);
  const seasonMatch = !filter.season || normalizeText(pkg.season) === filter.season;
  const durationMatch = filter.duration === null || pkg.duration === filter.duration;

  return countryMatch && seasonMatch && durationMatch;
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
const isFilteringActive = computed(() => {
  return Boolean(
    appliedFilters.value.country ||
    appliedFilters.value.season ||
    appliedFilters.value.duration !== null
  );
});

const noResultsHeading = computed(() => {
  return isFilteringActive.value
    ? 'No packages matched your selected filters'
    : 'No packages are currently available';
});

const noResultsMessage = computed(() => {
  return isFilteringActive.value
    ? 'We couldn’t find any packages matching your selected filters. Clear one or more filters to broaden your search.'
    : 'There are no packages available right now. Please check back later or try a different search.';
});

const noResults = computed(() => filteredNormalGroups.value.length === 0);

const search = (nextFilters: FilterState) => {
  appliedFilters.value = { ...nextFilters };
  filters.value = { ...nextFilters };
  updateUrl(nextFilters);
};
</script>

<template>
  <section id="outbound-package-display" class="w-full px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto py-6 md:py-10 flex flex-col gap-8 md:gap-12">
      
      <div v-if="featuredGroups.length > 0" class="flex flex-col gap-6 md:gap-8">
        <GroupPackage 
          v-for="(group, index) in featuredGroups" 
          :key="`featured-${group.id}-${index}`"
          :title="group.title" 
          :description="group.description" 
          :packages="group.packages" 
          :is-featured="true"
          :is-inbound="false" 
          :usd-rate="null" 
          :tag="group.tag"
          :href="route('client.outbound.package.group', { id: group.id })" 
        />
      </div>

      <div class="w-full flex flex-col gap-6 md:gap-8">
        <OutboundFilter 
          :country-options="countryOptions" 
          :season-options="seasonOptions"
          :duration-options="durationOptions" 
          :initial-filters="filters" 
          @search="search" 
        />

        <div v-if="filteredNormalGroups.length > 0" class="flex flex-col gap-6 md:gap-8">
          <GroupPackage 
            v-for="(group, index) in filteredNormalGroups" 
            :key="`normal-${group.id}-${index}`"
            :title="group.title" 
            :description="group.description" 
            :packages="group.packages"
            :is-featured="false" 
            :is-inbound="false" 
            :usd-rate="null" 
            :tag="group.tag"
            :href="route('client.outbound.package.group', { id: group.id })" 
          />
        </div>

        <div 
          v-else-if="noResults"
          class="flex flex-col items-center justify-center gap-3 w-full py-12 px-6 bg-[var(--outbound-opacity-custom-10)] rounded-xl border border-[var(--shadow-custom)] text-center"
        >
          <div class="flex items-center justify-center rounded-full bg-[var(--outbound-custom)] text-white w-12 h-12 md:w-14 md:h-14 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 md:w-7 md:h-7">
              <path d="M10.5 3a7.5 7.5 0 0 1 6.05 12.12l4.16 4.16a1 1 0 0 1-1.42 1.42l-4.16-4.16A7.5 7.5 0 1 1 10.5 3Zm0 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11Z" />
            </svg>
          </div>
          <h3 class="font-bold uppercase text-xs md:text-sm tracking-[0.15em] text-[var(--primary-custom)] max-w-md leading-tight">
            {{ noResultsHeading }}
          </h3>
          <p class="font-roboto text-xs sm:text-sm md:text-base text-[var(--muted-custom)] max-w-xl leading-relaxed">
            {{ noResultsMessage }}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>