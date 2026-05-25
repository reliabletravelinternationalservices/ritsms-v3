<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { PackageGroup } from '@/types/group-package';
import { Package } from '@/types/package';

// Shadcn Components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';

// Icons
import { 
    Pin, 
    PinOff, 
    GripVertical, 
    Search, 
    SlidersHorizontal, 
    Calendar, 
    MapPin, 
    CloudSun, 
    Save, 
    Loader2,
    Compass,
    Plus,
    ChevronLeft,
    ChevronRight
} from 'lucide-vue-next';
import { formatDateString } from '@/lib/utils';
import { toast } from 'vue-sonner';

interface Props {
    group: PackageGroup;
    packages?: Package[];
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Package Groups', href: route('admin.packages.groups') },
    { title: 'Pinned Items', href: route('admin.packages.groups.pin', { id: props.group.id }) },
];

const availablePackages = computed<Package[]>(() => props.packages ?? []);
const pinnedPackages = ref<Package[]>(props.group.packages ?? []);

// Keep a snapshot of the initial pinned package IDs so we can detect unsaved changes
const initialPinnedIds = ref<number[]>(props.group.packages?.map(p => p.id) ?? []);

function arraysEqual(a: number[], b: number[]) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const isDirty = computed(() => {
    const current = pinnedPackages.value.map(p => p.id);
    return !arraysEqual(current, initialPinnedIds.value);
});

// --- FILTERS & TOGGLES ---
const searchQuery = ref('');
const filterSeason = ref('all');
const filterDestination = ref('all');
const filterDateRange = ref('');
const showFilters = ref(false); // Clean filter toggle state
const currentPage = ref(1);
const itemsPerPage = 5;

const uniquelyFoundDestinations = computed(() => {
    return ['all', ...new Set(availablePackages.value.map(p => p.destination))];
});

// --- CASE-INSENSITIVE FILTERING LOGIC ---
const filteredCatalogPool = computed(() => {
    return availablePackages.value.filter(pkg => {
        if (pinnedPackages.value.some(p => p.id === pkg.id)) return false;

        const searchTerm = searchQuery.value.toLowerCase();
        const matchQuery = pkg.name.toLowerCase().includes(searchTerm) ||
                           pkg.destination.toLowerCase().includes(searchTerm);

        const matchSeason = filterSeason.value === 'all' || pkg.season.toLowerCase() === filterSeason.value.toLowerCase();
        const matchDest = filterDestination.value === 'all' || pkg.destination.toLowerCase() === filterDestination.value.toLowerCase();

        let matchDate = true;
        if (filterDateRange.value && pkg.selling_start_date && pkg.selling_end_date) {
            const checkDate = new Date(filterDateRange.value).getTime();
            const start = new Date(pkg.selling_start_date).getTime();
            const end = new Date(pkg.selling_end_date).getTime();
            matchDate = (checkDate >= start && checkDate <= end);
        }

        return matchQuery && matchSeason && matchDest && matchDate;
    });
});

const sortedCatalogPool = computed(() => {
    return [...filteredCatalogPool.value].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true })
    );
});

const totalPageCount = computed(() => {
    return Math.max(1, Math.ceil(sortedCatalogPool.value.length / itemsPerPage));
});

const paginatedCatalog = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return sortedCatalogPool.value.slice(start, start + itemsPerPage);
});

const canPrevPage = computed(() => currentPage.value > 1);
const canNextPage = computed(() => currentPage.value < totalPageCount.value);

const prevPage = () => {
    if (canPrevPage.value) {
        currentPage.value -= 1;
    }
};

const nextPage = () => {
    if (canNextPage.value) {
        currentPage.value += 1;
    }
};

watch([searchQuery, filterSeason, filterDestination, filterDateRange], () => {
    currentPage.value = 1;
});

watch(totalPageCount, (pageCount) => {
    if (currentPage.value > pageCount) {
        currentPage.value = pageCount;
    }
});

const pinPackage = (pkg: Package) => {
    if (!pinnedPackages.value.some(p => p.id === pkg.id)) {
        pinnedPackages.value.push(pkg);
    }
};

const unpinPackage = (pkg: Package) => {
    pinnedPackages.value = pinnedPackages.value.filter(p => p.id !== pkg.id);
};

// --- DRAG SORT LOGIC ---
const draggedIndex = ref<number | null>(null);
const onDragStart = (index: number) => { draggedIndex.value = index; };
const onDragOver = (index: number) => {
    if (draggedIndex.value === null || draggedIndex.value === index) return;
    const items = [...pinnedPackages.value];
    const draggedItem = items.splice(draggedIndex.value, 1)[0];
    items.splice(index, 0, draggedItem);
    pinnedPackages.value = items;
    draggedIndex.value = index;
};
const onDragEnd = () => { draggedIndex.value = null; };

// --- FORM SAVE ---
const form = useForm({
    pinned_package_ids: [] as { package_id: number; order_number: number }[]
});

const saveOrdering = () => {
    form.pinned_package_ids = pinnedPackages.value.map((pkg, idx) => ({
        package_id: pkg.id,
        order_number: idx + 1
    }));

    form.put(route('admin.packages.groups.pin.update', { id: props.group.id }), {
        preserveScroll: true,
        onSuccess: () => {
            // Reset the initial snapshot so the UI no longer shows unsaved changes
            initialPinnedIds.value = pinnedPackages.value.map(p => p.id);
            toast.success('Pinned package order updated successfully');
        },
        onError: () => {
            toast.error('Failed to update pinned package order');
        }
    });
};
</script>

<template>
    <Head title="Arrange Pinned Packages" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
            
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b dark:border-zinc-800">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <Badge variant="outline" class="text-xs px-2 bg-zinc-50 dark:bg-zinc-900 font-medium">Pin Layout Settings</Badge>
                        <span class="text-xs text-zinc-400">Last Synced: {{ formatDateString(group.updated_at) }}</span>
                    </div>
                    <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{{ group.title }}</h1>
                </div>
                <div class="flex flex-col items-center gap-3">
                    <Button @click="saveOrdering" :disabled="!isDirty || form.processing" size="sm" class="flex items-center gap-2 shadow-sm">
                        <Loader2 v-if="form.processing" class="w-4 h-4 animate-spin" />
                        <Save v-else class="w-4 h-4" /> Save Sequence
                    </Button>
                    <span v-if="isDirty" class="text-xs text-amber-600">
                        <span class="font-medium">●</span>
                        You have unsaved changes
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div class="lg:col-span-5 space-y-3">
                    <div class="flex items-center justify-between">
                        <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                            <Pin class="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> Pinned Items ({{ pinnedPackages.length }})
                        </h2>
                    </div>

                    <div class="space-y-1.5 max-h-[600px] overflow-y-auto p-2 rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/20 dark:border-zinc-800">
                        <div 
                            v-for="(pkg, idx) in pinnedPackages" 
                            :key="pkg.id"
                            draggable="true"
                            @dragstart="onDragStart(idx)"
                            @dragover.prevent="onDragOver(idx)"
                            @dragend="onDragEnd"
                            class="flex items-center gap-3 p-2 rounded-lg border bg-white dark:bg-zinc-950 dark:border-zinc-800 shadow-sm transition-all cursor-grab active:cursor-grabbing hover:border-zinc-300 dark:hover:border-zinc-700"
                            :class="{ 'opacity-30 border-indigo-500 bg-indigo-50/10': draggedIndex === idx }"
                        >
                            <GripVertical class="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                            
                            <span class="text-xs font-bold text-zinc-400 w-4 text-center">{{ idx + 1 }}</span>

                            <div class="w-8 h-8 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0">
                                <img v-if="pkg.primary_image?.url" :src="pkg.primary_image.url" class="w-full h-full object-cover" />
                                <Compass v-else class="w-4 h-4 m-2 text-zinc-400" />
                            </div>

                            <div class="flex-1 min-w-0">
                                <h4 class="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">{{ pkg.name }}</h4>
                                <p class="text-[11px] text-zinc-400 truncate">{{ pkg.destination }} • <span class="capitalize">{{ pkg.season }}</span></p>
                            </div>

                            <Button @click="unpinPackage(pkg)" variant="ghost" size="icon" class="w-7 h-7 text-zinc-400 hover:text-red-500 shrink-0 rounded-md">
                                <PinOff class="w-3.5 h-3.5" />
                            </Button>
                        </div>

                        <div v-if="pinnedPackages.length === 0" class="text-center py-12 text-zinc-400 text-xs">
                            <Pin class="w-6 h-6 mx-auto opacity-40 mb-1.5" />
                            <p>No packages pinned to this group.</p>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-7 space-y-3">
                    
                    <div class="flex items-center gap-2">
                        <div class="relative flex-1">
                            <Search class="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                            <Input 
                                type="text" 
                                placeholder="Quick search catalog..." 
                                v-model="searchQuery" 
                                class="pl-8 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800"
                            />
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

                    <div v-if="showFilters" class="p-3 rounded-lg border bg-zinc-50/50 dark:bg-zinc-900/40 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-3 transition-all">
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
                                    <SelectItem v-for="dest in uniquelyFoundDestinations" :key="dest" :value="dest">
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
                                Showing <span class="font-semibold text-zinc-900 dark:text-zinc-100">{{ paginatedCatalog.length }}</span> of <span class="font-semibold text-zinc-900 dark:text-zinc-100">{{ sortedCatalogPool.length }}</span> packages
                            </div>
                            <div class="flex items-center gap-2">
                                <Button @click="prevPage" :disabled="!canPrevPage" variant="outline" size="sm" class="h-8 text-xs">
                                    <ChevronLeft class="w-3.5 h-3.5" /> Prev
                                </Button>
                                <div class="text-xs text-zinc-500 dark:text-zinc-400">
                                    Page {{ currentPage }} of {{ totalPageCount }}
                                </div>
                                <Button @click="nextPage" :disabled="!canNextPage" variant="outline" size="sm" class="h-8 text-xs">
                                    Next <ChevronRight class="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>
                        <div class="max-h-[550px] overflow-y-auto divided-y dark:divide-zinc-800">
                            
                            <div 
                                v-for="pkg in paginatedCatalog" 
                                :key="pkg.id" 
                                class="flex items-center justify-between p-2.5 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/40 border-b last:border-0 dark:border-zinc-800 transition"
                            >
                                <div class="flex items-center gap-3 min-w-0 flex-1 pr-4">
                                    <div class="w-8 h-8 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0">
                                        <img v-if="pkg.primary_image?.url" :src="pkg.primary_image.url" class="w-full h-full object-cover" />
                                        <Compass v-else class="w-4 h-4 m-2 text-zinc-400" />
                                    </div>
                                    
                                    <div class="min-w-0 flex-1">
                                        <h3 class="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate leading-snug">
                                            {{ pkg.name }}
                                        </h3>
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
                                    @click="pinPackage(pkg)" 
                                    variant="secondary" 
                                    size="sm" 
                                    class="h-7 text-[11px] font-medium gap-1 shrink-0 px-2.5 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                                >
                                    <Plus class="w-3 h-3" /> Pin
                                </Button>
                            </div>

                            <div v-if="sortedCatalogPool.length === 0" class="text-center py-16 text-zinc-400 text-xs">
                                <Compass class="w-6 h-6 mx-auto opacity-30 mb-2" />
                                <p class="font-medium">No match found inside catalog</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </AppLayout>
</template>