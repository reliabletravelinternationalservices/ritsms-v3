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

// Icons
import { Plus, Sparkles, Compass } from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Package Groups', href: route('admin.packages.groups') },
];

// Accept server-provided groups (Inertia prop) and fall back to empty array
const props = defineProps<{ groups?: PackageGroup[] }>()

const packageGroups = ref<PackageGroup[]>(props.groups ?? [])

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
    return packageGroups.value
        .filter(g => !isRecent(g.updated_at || g.created_at))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
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
                <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">All Collections</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PackageGroupCard
                        v-for="group in olderGroups"
                        :key="group.id"
                        :group="group"
                    />
                </div>
                
                <!-- Empty State Fallback -->
                <div v-if="olderGroups.length === 0 && recentGroups.length === 0" class="text-center py-12 border border-dashed rounded-xl dark:border-zinc-800">
                    <Compass class="w-10 h-10 mx-auto text-zinc-400 stroke-[1.25] mb-2" />
                    <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-50">No collections found</h3>
                    <p class="text-xs text-zinc-500 mt-1">Get started by creating your first package group container.</p>
                </div>
            </div>

        </div>
    </AppLayout>
</template>