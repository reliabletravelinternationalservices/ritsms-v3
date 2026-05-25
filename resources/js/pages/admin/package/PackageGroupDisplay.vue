<script setup lang="ts">
import { ref, computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { PackageGroup } from '@/types/group-package';
import PackageGroupCard from '@/components/PackageGroupCard.vue';

// Shadcn Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

// Icons
import { Plus, Sparkles, Compass, Search, X } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Package Groups', href: route('admin.packages.groups') },
];

// Accept server-provided groups (Inertia prop) and fall back to empty array
const props = defineProps<{ groups?: PackageGroup[] }>()

const packageGroups = ref<PackageGroup[]>(props.groups ?? [])

// Search & Filter state
const searchTerm = ref('')
const appliedSearchTerm = ref('')
const selectedType = ref('') // '', 'featured', 'inbound', 'outbound'

const applySearch = () => {
    appliedSearchTerm.value = (searchTerm.value ?? '').trim().toLowerCase()
}

const clearSearch = () => {
    searchTerm.value = ''
    appliedSearchTerm.value = ''
}

const setType = (type: string) => {
    selectedType.value = type
}

// --- FILTERING & SEPARATION LOGIC ---
const fortyEightHoursAgo = new Date().getTime() - (48 * 60 * 60 * 1000);

const isRecent = (dateString: string) => {
    return new Date(dateString).getTime() > fortyEightHoursAgo;
};

// Top shelf: newly created or updated items ordered by latest activity
const recentGroups = computed(() => {
    return packageGroups.value
        .filter(g => isRecent(g.updated_at || g.created_at))
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
});

// Regular shelf: standard catalog items
const olderGroups = computed(() => {
    const list = packageGroups.value
        .filter(g => !isRecent(g.updated_at || g.created_at));

    // Type filter
    const typeFiltered = list.filter(g => {
        if (!selectedType.value) return true;
        if (selectedType.value === 'featured') return !!g.is_featured;
        if (selectedType.value === 'inbound') return !!g.include_as_inbound;
        if (selectedType.value === 'outbound') return !!g.include_as_outbound;
        return true;
    });

    // Search filter applies only when submitted (enter or click)
    const searched = appliedSearchTerm.value
        ? typeFiltered.filter(g => (g.title ?? '').toLowerCase().includes(appliedSearchTerm.value))
        : typeFiltered;

    return searched.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
});
</script>

<template>
    <Head title="Package Groups Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full">
            
            <!-- Page Header -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Package Groups</h1>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Manage your curated marketing bundles and package catalog collections.
                    </p>
                </div>
                <Link :href="route('admin.packages.groups.create')">
                    <Button class="sm:w-auto w-full flex items-center gap-2 shadow-sm">
                        <Plus class="w-4 h-4" /> New Package Group
                    </Button>
                </Link>
            </div>

            <!-- SECTION 1: NEWLY CREATED OR UPDATED (Top Shelf Feature) -->
            <div v-if="recentGroups.length > 0" class="space-y-4">
                <div class="flex items-center gap-2">
                    <div class="p-1 rounded bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/40">
                        <Sparkles class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Recently Edited Groups</h2>
                    <Badge variant="outline" class="text-[11px] bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/30">
                        Last 48 Hours
                    </Badge>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PackageGroupCard
                        v-for="group in recentGroups"
                        :key="group.id"
                        :group="group"
                        highlighted
                    />
                </div>
            </div>

            <!-- SECTION 2: REGULAR CATALOG LIST -->
            <div class="space-y-4 mt-2">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">All Collections</h2>

                    <div class="flex items-center gap-2 w-full sm:w-auto">
                        <div class="flex items-center gap-2">
                            <Label for="group-search" class="sr-only">Search groups</Label>
                            <Input
                                id="group-search"
                                v-model="searchTerm"
                                placeholder="Search collections by name"
                                @keydown.enter="applySearch"
                                class="w-56"
                            />
                            <Button variant="outline" size="sm" @click="applySearch" class="p-2">
                                <Search class="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" @click="clearSearch" class="p-2">
                                <X class="w-4 h-4 text-zinc-400" />
                            </Button>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger as-child>
                                <Button variant="outline" size="sm" class="ml-2">
                                    <span v-if="!selectedType">All types</span>
                                    <span v-else-if="selectedType === 'featured'">Featured</span>
                                    <span v-else-if="selectedType === 'inbound'">Inbound</span>
                                    <span v-else>Outbound</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem @click="setType('')">All types</DropdownMenuItem>
                                <DropdownMenuItem @click="setType('featured')">Featured</DropdownMenuItem>
                                <DropdownMenuItem @click="setType('inbound')">Inbound</DropdownMenuItem>
                                <DropdownMenuItem @click="setType('outbound')">Outbound</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div v-if="olderGroups.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PackageGroupCard
                        v-for="group in olderGroups"
                        :key="group.id"
                        :group="group"
                    />
                </div>

                <!-- Per-section empty label when there are recent groups but no older groups -->
                <div v-else-if="recentGroups.length > 0 && olderGroups.length === 0" class="text-center py-8 rounded-xl border border-dashed dark:border-zinc-800">
                    <Compass class="w-8 h-8 mx-auto text-zinc-400 stroke-[1.25] mb-2" />
                    <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-50">No older collections</h3>
                    <p class="text-xs text-zinc-500 mt-1">All recent edits are shown above — create more collections to populate this area.</p>
                </div>

                <!-- Global Empty State Fallback when there are no groups at all -->
                <div v-if="olderGroups.length === 0 && recentGroups.length === 0" class="text-center py-12 border border-dashed rounded-xl dark:border-zinc-800">
                    <Compass class="w-10 h-10 mx-auto text-zinc-400 stroke-[1.25] mb-2" />
                    <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-50">No collections found</h3>
                    <p class="text-xs text-zinc-500 mt-1">Get started by creating your first package group container.</p>
                </div>
            </div>

        </div>
    </AppLayout>
</template>