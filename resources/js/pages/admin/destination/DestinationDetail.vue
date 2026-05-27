<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { openDeleteDialog } from '@/stores/deleteDialog';
import { toast } from 'vue-sonner';
import { type BreadcrumbItem } from '@/types';
import { type Destination } from '@/types/destination';
import { truncateText } from '@/lib/utils';

// Shadcn Components
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DestinationLocation } from '@/types/destination-location';

// Icons
import {
    MapPin,
    Globe,
    Tag,
    Compass,
    Map,
    FileText,
    Edit,
    Trash2,
    Plus,
    ChevronLeft
} from 'lucide-vue-next';

interface Props {
    destination: Destination;
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Destinations', href: route('admin.destinations') },
    { title: truncateText(props.destination.title, 20), href: route('admin.destinations.details', { id: props.destination.id }) },
];

const onDelete = () => {
    openDeleteDialog({
        title: 'Delete destination',
        message: `Are you sure you want to delete "${props.destination.title}"? This action cannot be undone.`,
        confirmText: 'Delete destination',
        cancelText: 'Cancel',
        onConfirm: () => {
            router.delete(route('admin.destinations.destroy', { id: props.destination.id }), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Destination deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete destination. Please try again.');
                },
            });
        },
    });
};

const onDeleteLocation = ({ location }: { location: DestinationLocation }) => {
    openDeleteDialog({
        title: 'Delete Location',
        message: `Are you sure you want to delete "${location.name}"? This action cannot be undone.`,
        confirmText: 'Delete location',
        cancelText: 'Cancel',
        onConfirm: () => {
            router.delete(route('admin.destinations.locations.destroy', { destID: props.destination.id, id: location.id }), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Location deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete location. Please try again.');
                },
            });
        },
    });
};
</script>

<template>

    <Head :title="`${destination.title} - Details`" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="p-6 max-w-7xl mx-auto w-full space-y-6">

            <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b dark:border-zinc-800">
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border dark:border-zinc-800 shrink-0">
                        <Compass class="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <div class="flex items-center gap-2 mb-0.5">
                            <span class="text-xs text-zinc-400">Destination ID: #{{ destination.id }}</span>
                            <Badge v-if="destination.tag" variant="secondary"
                                class="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0">
                                {{ destination.tag }}
                            </Badge>
                        </div>
                        <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{{
                            destination.title }}</h1>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
                    <Button variant="outline" size="sm" as-child
                        class="h-9 text-xs bg-white dark:bg-zinc-950 dark:border-zinc-800">
                        <Link :href="route('admin.destinations')">
                            <ChevronLeft class="w-3.5 h-3.5 mr-1" /> Back
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm"
                        class="h-9 text-xs gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                        @click="onDelete">
                        <Trash2 class="w-3.5 h-3.5" /> Delete
                    </Button>
                    <Button size="sm" as-child class="h-9 text-xs gap-1.5 shadow-sm">
                        <Link :href="route('admin.destinations.edit', { id: destination.id })">
                            <Edit class="w-3.5 h-3.5" /> Edit
                        </Link>
                    </Button>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                <div class="lg:col-span-4 space-y-4">
                    <Card class="dark:border-zinc-800 shadow-sm overflow-hidden">
                        <div
                            class="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900 border-b dark:border-zinc-800">
                            <img v-if="destination.image?.url" :src="destination.image.url"
                                alt="Destination Showcase Media Graphic" class="w-full h-full object-cover" />
                            <div v-else
                                class="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-1.5">
                                <Compass class="w-8 h-8 stroke-[1.25] opacity-40" />
                                <span class="text-xs">No cover image uploaded</span>
                            </div>
                        </div>

                        <CardContent class="p-4 space-y-4">
                            <div class="space-y-2 text-xs">
                                <div
                                    class="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-900">
                                    <span class="text-zinc-400 flex items-center gap-1.5">
                                        <Globe class="w-3.5 h-3.5" /> Country
                                    </span>
                                    <span class="font-semibold text-zinc-800 dark:text-zinc-200">{{ destination.country
                                        }}</span>
                                </div>
                                <div
                                    class="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-900">
                                    <span class="text-zinc-400 flex items-center gap-1.5">
                                        <Tag class="w-3.5 h-3.5" /> Segment Tag
                                    </span>
                                    <span class="font-mono text-zinc-600 dark:text-zinc-400">{{ destination.tag ?? '—'
                                        }}</span>
                                </div>
                            </div>

                            <Separator class="dark:bg-zinc-800" />

                            <div class="space-y-1.5">
                                <h3 class="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                                    <FileText class="w-3.5 h-3.5" /> Detailed Description
                                </h3>
                                <p
                                    class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap bg-zinc-50/50 dark:bg-zinc-900/30 p-3 rounded-lg border dark:border-zinc-900">
                                    {{ destination.description }}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div class="lg:col-span-8 space-y-6">

                    <Card class="dark:border-zinc-800 shadow-sm">
                        <CardHeader
                            class="p-4 pb-3 flex flex-row items-center justify-between space-y-0 border-b dark:border-zinc-800">
                            <div>
                                <CardTitle
                                    class="text-sm font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                                    <MapPin class="w-4 h-4 text-indigo-500" /> Locations ({{
                                        destination.locations?.length ?? 0 }})
                                </CardTitle>
                                <CardDescription class="text-[11px] mt-0.5">Specific drop-off locations, historical
                                    landmarks, or hotel hubs tied to this region.</CardDescription>
                            </div>
                            <Button size="sm" variant="outline" as-child
                                class="h-8 text-xs gap-1 bg-white dark:bg-zinc-950 dark:border-zinc-800">
                                <Link :href="route('admin.destinations.locations.create', { destID: destination.id })">
                                    <Plus class="w-3.5 h-3.5" /> Add Location
                                </Link>
                            </Button>
                        </CardHeader>

                        <CardContent class="p-0">
                            <div class="divide-y dark:divide-zinc-800">
                                <div v-for="location in destination.locations" :key="location.id"
                                    class="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition">
                                    <div class="flex items-start gap-3 min-w-0 flex-1">
                                        <div
                                            class="w-12 h-12 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0">
                                            <img v-if="location.image?.url" :src="location.image.url"
                                                class="w-full h-full object-cover" />
                                            <MapPin v-else class="w-5 h-5 m-3 text-zinc-400" />
                                        </div>

                                        <div class="min-w-0 flex-1 space-y-0.5">
                                            <h4
                                                class="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate flex items-center gap-1.5">
                                                {{ location.name }}
                                            </h4>
                                            <p
                                                class="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                                {{ location.description }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-1 self-end sm:self-center shrink-0 pl-15 sm:pl-0">
                                        <a :href="location.map_link" target="_blank" rel="noopener noreferrer"
                                            title="View Map">
                                            <Button v-if="location.map_link" variant="ghost" size="icon" as-child
                                                class="w-8 h-8 text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50">
                                                <Map class="w-3.5 h-3.5" />
                                            </Button>
                                        </a>

                                        <Link
                                            :href="route('admin.destinations.locations.edit', { destID: destination.id, id: location.id })">
                                            <Button variant="ghost" size="icon" as-child
                                                class="w-5 h-5 text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50">
                                                <Edit class="w-4.5 h-4.5" />
                                            </Button>
                                        </Link>

                                        <Button variant="ghost" size="icon" as-child
                                            class="w-5 h-5 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                            @click="onDeleteLocation({ location })">
                                            <Trash2 class="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>

                                <div v-if="!destination.locations || destination.locations.length === 0"
                                    class="text-center py-12 text-zinc-400 text-xs">
                                    <MapPin class="w-6 h-6 mx-auto opacity-30 mb-2 stroke-[1.25]" />
                                    <p class="font-medium">No secondary locations added</p>
                                    <p class="text-[11px] text-zinc-500 mt-0.5">Add mapped target spaces to link
                                        packages smoothly.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>

        </div>
    </AppLayout>
</template>