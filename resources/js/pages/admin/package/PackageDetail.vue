<script setup lang="ts">
import { Head, router, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { formatDateString, truncateText } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Package } from '@/types/package';
import PackageImagesAsset from './section/PackageImagesAsset.vue';
import PackageDescriptionAndHighlight from './section/PackageDescriptionAndHighlight.vue';
import PackageTabInfo from './section/PackageTabInfo.vue';
import PackageAdditionalInfo from './section/PackageAdditionalInfo.vue';
import PackageSellingPeriod from './section/PackageSellingPeriod.vue';
import { Button } from '@/components/ui/button';
import EditIcon from '@iconify-vue/material-symbols/edit';
import DeleteIcon  from '@iconify-vue/material-symbols/delete';
import PackageHeaderTitle from './section/PackageHeaderTitle.vue';

interface Props {
    package: Package;
}

const props = defineProps<Props>();


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Packages',
        href: route('admin.packages'),
    },
    {
        title: truncateText(props.package.name, 20),
        href: route('admin.packages.details', { id: props.package.id }),
    },
];

// Handles partial data reloading cleanly from the backend when raw uploads succeed
const handleRefreshMediaData = () => {
    router.reload({ 
        
        only: ['package'],
    });
};



</script>

<template>
    <Head title="Package Details" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-col gap-6 p-6 max-w-7xl mx-auto w-full">
            
            <!-- Header Section -->
            <PackageHeaderTitle :package="package" />

            <!-- Content Grid Layout -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <!-- Main Body (Left 2 Columns) -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Primary Image Block -->
                    <PackageImagesAsset
                        :package-id="package.id"
                        :images="package.images"
                        :primary-image="package.primary_image"
                        @refresh-data="handleRefreshMediaData"
                    />

                    <!-- Description & Highlights -->
                    <PackageDescriptionAndHighlight :description="package.description" :highlights_array="package.highlights_array" />

                    <!-- Tabbed Dynamic Content Section -->
                    <PackageTabInfo 
                        :itineraries="package.itineraries_array" 
                        :inclusions="package.inclusions_array" 
                        :exclusions="package.exclusions_array"
                        :schedules="package.schedules" 
                        :notes="package.notes_array"
                    />
                </div>

                <!-- Meta Side panel (Right 1 Column) -->
                <div class="space-y-6">
                    <!-- Package Info Metadata Card -->
                    <PackageAdditionalInfo :duration="Number(package.duration)" :season="package.season" :base_price="Number(package.base_price)" />

                    <!-- Selling Window Card -->
                    <PackageSellingPeriod :selling_start_date="package.selling_start_date" :selling_end_date="package.selling_end_date" />

                    <div class="flex flex-col gap-2">
                        <Link :href="route('admin.packages.edit', { id: package.id })" class="w-full">
                            <Button variant="outline" size="sm" class="w-full text-center font-semibold uppercase text-zinc-900 dark:text-zinc-50">
                                <EditIcon class="w-4 h-4" />
                                <span>Edit</span>
                            </Button>
                        </Link>
                        <Link href = "#" class="w-full">
                            <Button variant="destructive" size="sm" class="w-full text-center font-semibold uppercase">
                                <DeleteIcon class="w-4 h-4" />
                                <span>Delete</span>
                            </Button>
                        </Link>
                    </div>

                    <!-- Admin System Timestamps -->
                    <div class="text-center text-xs text-zinc-400 dark:text-zinc-500 space-y-1 pt-2">
                        <p>ID Reference: #{{ package.id }}</p>
                        <p>Created: {{ formatDateString(package.created_at) }}</p>
                        <p>Last Updated: {{ formatDateString(package.updated_at) }}</p>
                    </div>
                </div>

            </div>
        </div>
    </AppLayout>
</template>