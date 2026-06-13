<script setup lang="ts">
import { computed } from 'vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Package } from '@/types/package';
import { formatDateString } from '@/lib/utils';
import {
  Search,
  SlidersHorizontal,
  CloudSun,
  Calendar,
  MapPin,
  Compass,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-vue-next';

const props = defineProps<{
  searchQuery: string;
  showFilters: boolean;
  filterSeason: string;
  filterDestination: string;
  filterDateRange: string;
  uniquelyFoundDestinations: string[];
  paginatedCatalog: Package[];
  sortedCatalogPoolLength: number;
  currentPage: number;
  totalPageCount: number;
  canPrevPage: boolean;
  canNextPage: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:searchQuery', value: string): void;
  (event: 'search'): void; // Added search trigger event
  (event: 'update:showFilters', value: boolean): void;
  (event: 'update:filterSeason', value: string): void;
  (event: 'update:filterDestination', value: string): void;
  (event: 'update:filterDateRange', value: string): void;
  (event: 'prev'): void;
  (event: 'next'): void;
  (event: 'pin', pkg: Package): void;
}>();

const showFilters = computed({
  get: () => props.showFilters,
  set: value => emit('update:showFilters', value)
});

const filterSeason = computed({
  get: () => props.filterSeason,
  set: value => emit('update:filterSeason', value)
});

const filterDestination = computed({
  get: () => props.filterDestination,
  set: value => emit('update:filterDestination', value)
});

const filterDateRange = computed({
  get: () => props.filterDateRange,
  set: value => emit('update:filterDateRange', value)
});
</script>

<template>
  <div class="lg:col-span-7 space-y-3">
    <div class="flex items-center gap-2">
      <div class="relative flex-1">
        <Search class="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
        <Input
          type="text"
          placeholder="Quick search catalog..."
          :value="props.searchQuery"
          @input="(event: { target: { value: string } }) => emit('update:searchQuery', event.target.value)"
          @keyup.enter="emit('search')" 
          class="pl-8 pr-16 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800"
        />
        <Button 
          variant="ghost" 
          size="sm" 
          class="absolute right-0 top-0 h-9 px-3 text-xs"
          @click="emit('search')"
        >
          Search
        </Button>
      </div>

      <Button
        variant="outline"
        size="sm"
        @click="showFilters = !showFilters"
        class="h-9 gap-1.5 text-xs dark:bg-zinc-950 dark:border-zinc-800"
        :class="{ 'bg-zinc-100 dark:bg-zinc-800 border-zinc-400': showFilters }"
      >
        <SlidersHorizontal class="w-3.5 h-3.5" /> Filter Settings
      </Button>
    </div>

    <div v-if="props.showFilters" class="p-3 rounded-lg border bg-zinc-50/50 dark:bg-zinc-900/40 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-3 transition-all">
      <div class="space-y-1">
        <Label class="text-[11px] font-medium text-zinc-400 flex items-center gap-1"><CloudSun class="w-3 h-3" /> Season</Label>
        <Select v-model="filterSeason">
          <SelectTrigger class="h-8 text-xs dark:bg-zinc-950 dark:border-zinc-800">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent class="dark:bg-zinc-950 dark:border-zinc-800">
            <SelectItem value="all">All Seasons</SelectItem>
            <SelectItem value="spring">Spring</SelectItem>
            <SelectItem value="summer">Summer</SelectItem>
            <SelectItem value="autumn">Autumn</SelectItem>
            <SelectItem value="winter">Winter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-1">
        <Label class="text-[11px] font-medium text-zinc-400 flex items-center gap-1"><MapPin class="w-3 h-3" /> Location</Label>
        <Select v-model="filterDestination">
          <SelectTrigger class="h-8 text-xs dark:bg-zinc-950 dark:border-zinc-800">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent class="dark:bg-zinc-950 dark:border-zinc-800">
            <SelectItem v-for="dest in props.uniquelyFoundDestinations" :key="dest" :value="dest">
              <span class="capitalize">{{ dest === 'all' ? 'All Locations' : dest }}</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="space-y-1">
        <Label class="text-[11px] font-medium text-zinc-400 flex items-center gap-1"><Calendar class="w-3 h-3" /> Active Date</Label>
        <Input type="date" v-model="filterDateRange" class="h-8 text-xs dark:bg-zinc-950 dark:border-zinc-800" />
      </div>
    </div>

    <div class="border rounded-xl bg-white dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden shadow-sm">
      <div class="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between bg-zinc-50/80 dark:bg-zinc-900/50 border-b dark:border-zinc-800">
        <div class="text-xs text-zinc-500 dark:text-zinc-400">
          Showing <span class="font-semibold text-zinc-900 dark:text-zinc-100">{{ props.paginatedCatalog.length }}</span> of <span class="font-semibold text-zinc-900 dark:text-zinc-100">{{ props.sortedCatalogPoolLength }}</span> packages
        </div>
        <div class="flex items-center gap-2">
          <Button @click="emit('prev')" :disabled="!props.canPrevPage" variant="outline" size="sm" class="h-8 text-xs">
            <ChevronLeft class="w-3.5 h-3.5" /> Prev
          </Button>
          <div class="text-xs text-zinc-500 dark:text-zinc-400">
            Page {{ props.currentPage }} of {{ props.totalPageCount }}
          </div>
          <Button @click="emit('next')" :disabled="!props.canNextPage" variant="outline" size="sm" class="h-8 text-xs">
            Next <ChevronRight class="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div class="max-h-[550px] overflow-y-auto divide-y dark:divide-zinc-800">
        <div
          v-for="pkg in props.paginatedCatalog"
          :key="pkg.id"
          class="flex items-center justify-between p-2.5 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 border-b last:border-0 dark:border-zinc-800 transition"
        >
          <div class="flex items-center gap-3 min-w-0 flex-1 pr-4">
            <div class="w-8 h-8 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0">
              <img v-if="pkg.primary_image?.url" :src="pkg.primary_image.url" class="w-full h-full object-cover" />
              <Compass v-else class="w-4 h-4 m-2 text-zinc-400" />
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate leading-snug">{{ pkg.name }}</h3>
              <div class="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400 whitespace-nowrap overflow-hidden">
                <span class="flex items-center gap-0.5"><MapPin class="w-2.5 h-2.5" /> {{ pkg.destination }}</span>
                <span>•</span>
                <span class="capitalize">{{ pkg.season }}</span>
                <span>•</span>
                <span>Sales: {{ formatDateString(pkg.selling_start_date) }} - {{ formatDateString(pkg.selling_end_date) }}</span>
              </div>
            </div>
          </div>
          <Button
            @click="() => emit('pin', pkg)"
            variant="secondary"
            size="sm"
            class="h-7 text-[11px] font-medium gap-1 shrink-0 px-2.5 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            <Plus class="w-3 h-3" /> Pin
          </Button>
        </div>
        <div v-if="props.sortedCatalogPoolLength === 0" class="text-center py-16 text-zinc-400 text-xs">
          <Compass class="w-6 h-6 mx-auto opacity-30 mb-2" />
          <p class="font-medium">No match found inside catalog</p>
        </div>
      </div>
    </div>
  </div>
</template>