<script setup lang="ts">
// import TourTable from '@/components/table/tour/TourTable.vue';
import TourForm from '@/components/form/tour/TourForm.vue';
import PublishStatusDropdown from '@/components/PublishStatusDropdown.vue';
import ScrollToTopButton from '@/components/ScrollToTopButton.vue';
import Button from '@/components/ui/button/Button.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/vue';
import { Head } from '@inertiajs/vue3';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tour Management',
        href: route('admin.tours'),
    },
    {
        title: 'Create',
        href: route('admin.tours.create'),
    },
];


</script>


<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Create Tour" />
        <div class="text-foreground">
            <div class="flex justify-end gap-4 border-y py-2 px-6 border-border">
                <Button variant="default"
                    class="flex items-center gap-2 bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary)/0.8)] text-white">
                    <Icon icon="lucide:save-check" class="text-xl" />
                    <span>Save</span>
                </Button>

                <PublishStatusDropdown />
            </div>
            <div class="p-6">
                <TourForm />
            </div>
            <ScrollToTopButton />
        </div>
    </AppLayout>
</template>