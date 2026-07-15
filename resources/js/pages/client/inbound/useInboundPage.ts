import { computed, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import type { PackageGroup } from '@/types/group-package';
import type { Package } from '@/types/package';
import { normalizeText, toTitleCase } from '@/lib/utils';
import { FilterState, Option } from './types';



export interface UseInboundFilteringPackagesProps {
  destinationLocations: string[];
  featuredGroups: PackageGroup[];
  normalGroups: PackageGroup[];
}

const parseFiltersFromUrl = (pageUrl: string): FilterState => {
  const currentUrl = new URL(pageUrl, window.location.origin);
  const searchParams = currentUrl.searchParams;
  const durationParam = searchParams.get('duration');
  const duration = durationParam ? Number(durationParam) : null;

  return {
    destination: normalizeText(searchParams.get('destination') ?? ''),
    season: normalizeText(searchParams.get('season') ?? ''),
    duration: Number.isNaN(duration) ? null : duration,
  };
};

export function useFilteringPackages(props: UseInboundFilteringPackagesProps) {
  const page = usePage<Record<string, any>>();

  const destinationOptions = computed<Option[]>(() => {
    return props.destinationLocations
      .map((destination) => normalizeText(destination))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
      .map((destination) => ({ label: toTitleCase(destination), value: destination }));
  });

  const allGroups = computed(() => [...props.featuredGroups, ...props.normalGroups]);
  const allPackages = computed<Package[]>(() => allGroups.value.flatMap((group) => group.packages ?? []));

  const durationOptions = computed<Option[]>(() => {
    return Array.from(
      new Set(allPackages.value
        .map((pkg) => pkg.duration)
        .filter((duration): duration is number => duration !== null && duration !== undefined))
    )
      .sort((a, b) => a - b)
      .map((duration) => ({ label: `${duration} Days`, value: duration }));
  });

  const filters = ref<FilterState>(parseFiltersFromUrl(page.url));
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

  const isFilteringActive = computed(() => {
    return Boolean(
      appliedFilters.value.destination ||
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
    destinationOptions,
    durationOptions,
    filters,
    filteredNormalGroups,
    noResults,
    noResultsHeading,
    noResultsMessage,
    search,
  };
}
