<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { PackageGroup } from '@/types/group-package';
import { Package } from '@/types/package';
import PackagePinToolbar from '@/components/admin/package/PackagePinToolbar.vue';
import PinnedPackageList from '@/components/admin/package/PinnedPackageList.vue';
import PackageCatalogList from '@/components/admin/package/PackageCatalogList.vue';
import { Badge } from '@/components/ui/badge';
import { Pin } from 'lucide-vue-next';
import { formatDateString } from '@/lib/utils';
import { toast } from 'vue-sonner';
import { Destination } from '@/types/destination';

interface Props {
    destinations: Destination[];
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
const initialPinnedIds = ref<number[]>(props.group.packages?.map(p => p.id) ?? []);

const isDirty = computed(() => {
    const current = pinnedPackages.value.map(p => p.id);
    if (current.length !== initialPinnedIds.value.length) return true;
    return !current.every((id, index) => id === initialPinnedIds.value[index]);
});

// --- FILTERS & TOGGLES ---
const searchQuery = ref('');      // Used for input buffer
const activeSearchQuery = ref(''); // Used for actual filtering
const filterSeason = ref('all');
const filterDestination = ref('all');
const filterDateRange = ref('');
const showFilters = ref(false);
const currentPage = ref(1);
const itemsPerPage = 5;

// FIXED: Using props.destinations as requested
const uniquelyFoundDestinations = computed(() => {
    return ['all', ...props.destinations.map(d => d.country)];
});

// Trigger search on demand
const performSearch = () => {
    activeSearchQuery.value = searchQuery.value;
    currentPage.value = 1;
};

// --- CASE-INSENSITIVE FILTERING LOGIC ---
const filteredCatalogPool = computed(() => {
    return availablePackages.value.filter(pkg => {
        if (pinnedPackages.value.some(p => p.id === pkg.id)) return false;

        const term = activeSearchQuery.value.toLowerCase();
        const matchQuery = pkg.name.toLowerCase().includes(term) ||
                           pkg.destination.toLowerCase().includes(term);

        const matchSeason = filterSeason.value === 'all' || pkg.season.toLowerCase() === filterSeason.value.toLowerCase();
        const matchDest = filterDestination.value === 'all' || pkg.destination.toLowerCase().includes(filterDestination.value.toLowerCase());

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

const totalPageCount = computed(() => Math.max(1, Math.ceil(sortedCatalogPool.value.length / itemsPerPage)));

const paginatedCatalog = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return sortedCatalogPool.value.slice(start, start + itemsPerPage);
});

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPageCount.value) currentPage.value++; };

// Reset page on filter changes (excluding search query)
watch([filterSeason, filterDestination, filterDateRange], () => {
    currentPage.value = 1;
});

const pinPackage = (pkg: Package) => {
    if (!pinnedPackages.value.some(p => p.id === pkg.id)) pinnedPackages.value.push(pkg);
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
const form = useForm({ pinned_package_ids: [] as { package_id: number; order_number: number }[] });

const saveOrdering = () => {
    form.pinned_package_ids = pinnedPackages.value.map((pkg, idx) => ({
        package_id: pkg.id,
        order_number: idx + 1
    }));

    form.put(route('admin.packages.groups.pin.update', { id: props.group.id }), {
        preserveScroll: true,
        onSuccess: () => {
            initialPinnedIds.value = pinnedPackages.value.map(p => p.id);
            toast.success('Pinned package order updated successfully');
        },
        onError: () => toast.error('Failed to update pinned package order')
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
                <PackagePinToolbar :isDirty="isDirty" :processing="form.processing" @save="saveOrdering" />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div class="lg:col-span-5 space-y-3">
                    <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                        <Pin class="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> Pinned Items ({{ pinnedPackages.length }})
                    </h2>
                    <PinnedPackageList
                        :packages="pinnedPackages"
                        :draggedIndex="draggedIndex"
                        @drag-start="onDragStart"
                        @drag-over="onDragOver"
                        @drag-end="onDragEnd"
                        @unpin="unpinPackage"
                    />
                </div>

                <PackageCatalogList
                    :searchQuery="searchQuery"
                    :showFilters="showFilters"
                    :filterSeason="filterSeason"
                    :filterDestination="filterDestination"
                    :filterDateRange="filterDateRange"
                    :uniquelyFoundDestinations="uniquelyFoundDestinations"
                    :paginatedCatalog="paginatedCatalog"
                    :sortedCatalogPoolLength="sortedCatalogPool.length"
                    :currentPage="currentPage"
                    :totalPageCount="totalPageCount"
                    :canPrevPage="currentPage > 1"
                    :canNextPage="currentPage < totalPageCount"
                    @update:searchQuery="value => searchQuery = value"
                    @search="performSearch"
                    @update:showFilters="value => showFilters = value"
                    @update:filterSeason="value => filterSeason = value"
                    @update:filterDestination="value => filterDestination = value"
                    @update:filterDateRange="value => filterDateRange = value"
                    @prev="prevPage"
                    @next="nextPage"
                    @pin="pinPackage"
                />
            </div>
        </div>
    </AppLayout>
</template>