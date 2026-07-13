<script setup lang="ts">

// TYPES
import { PackageGroup } from '@/types/group-package';

// COMPONENTS
import GroupPackage from '@/components/GroupPackage.vue';
import OutboundFilter from './OutboundFilter.vue';
import { useFilteringPackages } from '../useOutboundPage';
import { DURATION_FILTER_OPTIONS, SEASON_FILTER_OPTIONS } from '../constants.js';

const props = defineProps<{
  countries: string[];
  featuredGroups: PackageGroup[];
  normalGroups: PackageGroup[];
}>();

const {
  countryOptions,
  filters,
  filteredNormalGroups,
  noResults,
  noResultsHeading,
  noResultsMessage,
  search,
} = useFilteringPackages(props);
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
          :href="route('client.outbound.group', { id: group.id })" 
        />
      </div>

      <div class="w-full flex flex-col gap-6 md:gap-8">
        <OutboundFilter 
          :country-options="countryOptions" 
          :season-options="SEASON_FILTER_OPTIONS"
          :duration-options="DURATION_FILTER_OPTIONS" 
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
            :href="route('client.outbound.group', { id: group.id })" 
          />
        </div>

        <div 
          v-else-if="noResults"
          class="flex flex-col items-center justify-center gap-3 w-full py-12 px-6 bg-[var(--outbound-opacity-custom-10)] rounded-xl border border-[var(--shadow-custom)] text-center"
        >
          <div class="flex items-center justify-center rounded-full bg-[var(--outbound-custom)] text-white w-12 h-12 md:w-14 md:h-14 shadow-sm" aria-hidden="true">
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