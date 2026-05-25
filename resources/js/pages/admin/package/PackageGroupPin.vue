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

                    <PackagePinToolbar :isDirty="isDirty" :processing="form.processing" @save="saveOrdering" />
                </div>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div class="lg:col-span-5 space-y-3">
                    <div class="flex items-center justify-between">
                        <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                            <Pin class="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> Pinned Items ({{ pinnedPackages.length }})
                        </h2>
                    </div>

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
                    :canPrevPage="canPrevPage"
                    :canNextPage="canNextPage"
                    @update:searchQuery="value => searchQuery = value"
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