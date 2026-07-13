

import { computed, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
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

interface UseFilteringPackagesProps {
  countries: string[];
  featuredGroups: PackageGroup[];
  normalGroups: PackageGroup[];
}

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

const seasonOptions: Option[] = [
  { label: 'Winter', value: 'winter' },
  { label: 'Summer', value: 'summer' },
  { label: 'Autumn', value: 'autumn' },
  { label: 'Spring', value: 'spring' },
];

const durationOptions: Option[] = Array.from({ length: 30 }, (_, index) => {
  const duration = index + 1;
  return {
    label: `${duration} Day${duration === 1 ? '' : 's'}`,
    value: duration,
  };
});

const parseFiltersFromUrl = (pageUrl: string): FilterState => {
  const currentUrl = new URL(pageUrl, window.location.origin);
  const searchParams = currentUrl.searchParams;

  const durationParam = searchParams.get('duration');
  const duration = durationParam ? Number(durationParam) : null;

  return {
    country: normalizeText(searchParams.get('country') ?? ''),
    season: normalizeText(searchParams.get('season') ?? ''),
    duration: Number.isNaN(duration) ? null : duration,
  };
};

export function useFilteringPackages(props: UseFilteringPackagesProps) {
  const page = usePage<Record<string, any>>();

  const countryOptions = computed<Option[]>(() => {
    return Array.from(
      new Set(props.countries.map((country) => normalizeText(country)).filter(Boolean))
    )
      .sort((a, b) => a.localeCompare(b))
      .map((country) => ({ label: toTitleCase(country), value: country }));
  });

  const filters = ref<FilterState>(parseFiltersFromUrl(page.url));
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
    const countryMatch = !filter.country || extractCountry(pkg.destination) === normalizeText(filter.country);
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

  return {
    countryOptions,
    seasonOptions,
    durationOptions,
    filters,
    filteredNormalGroups,
    noResults,
    noResultsHeading,
    noResultsMessage,
    search,
  };
}
