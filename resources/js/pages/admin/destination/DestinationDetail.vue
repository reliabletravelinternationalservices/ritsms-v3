<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { type BreadcrumbItem } from '@/types';
import { type Destination } from '@/types/destination';

interface Props {
    destination: Destination;
}

const props = defineProps<Props>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Destinations',
        href: route('admin.destinations'),
    },
    {
        title: props.destination.title,
        href: route('admin.destinations.show', { destination: props.destination.id }),
    },
];
</script>

<template>
    <Head title="Destination Details" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="space-y-6 p-4">
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 class="text-2xl font-semibold">
                        {{ destination.title }}
                    </h1>
                    <p class="text-sm text-muted-foreground">
                        {{ destination.country }}
                    </p>
                </div>

                <Link
                    :href="route('admin.destinations')"
                    class="text-sm font-medium italic underline text-[var(--tertiary-custom)]"
                >
                    Back to Destinations
                </Link>
            </div>

            <div class="grid gap-4 lg:grid-cols-3">
                <div class="rounded-xl border border-sidebar-border/70 p-4">
                    <h2 class="text-lg font-medium">Details</h2>
                    <div class="mt-3 space-y-2 text-sm text-muted-foreground">
                        <div>
                            <span class="font-semibold">Title:</span>
                            <span>{{ destination.title }}</span>
                        </div>
                        <div>
                            <span class="font-semibold">Country:</span>
                            <span>{{ destination.country }}</span>
                        </div>
                        <div>
                            <span class="font-semibold">Tag:</span>
                            <span>{{ destination.tag ?? '—' }}</span>
                        </div>
                        <div>
                            <span class="font-semibold">Locations:</span>
                            <span>{{ destination.locations.length }}</span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2 rounded-xl border border-sidebar-border/70 p-4">
                    <h2 class="text-lg font-medium">Description</h2>
                    <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {{ destination.description }}
                    </p>
                </div>
            </div>

            <div class="rounded-xl border border-sidebar-border/70 p-4">
                <h2 class="text-lg font-medium">Locations</h2>
                <div class="mt-3 grid gap-3 sm:grid-cols-2">
                    <div
                        v-for="location in destination.locations"
                        :key="location.id"
                        class="rounded-xl border border-border p-4"
                    >
                        <h3 class="font-semibold">{{ location.name }}</h3>
                        <p class="mt-2 text-sm text-muted-foreground line-clamp-3">
                            {{ location.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
