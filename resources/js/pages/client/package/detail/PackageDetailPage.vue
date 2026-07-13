<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import {  usePage } from '@inertiajs/vue3';
import PackageTitleHeaderWithImage from './section/PackageTitleHeaderWithImage.vue';
import PackageRateAndSchedule from './section/PackageRateAndPeriod.vue';
import PackageIncludedServices from './section/PackageIncludedServices.vue';
import PackageTravelSchedule from './section/PackageTravelSchedule.vue';
import PackageDescription from './section/PackageDescription.vue';
import PackageHighlight from './section/PackageHighlight.vue';
import PackageItinerary from './section/PackageItinerary.vue';
import PackageInclusion from './section/PackageInclusion.vue';
import PackageExclusion from './section/PackageExclusion.vue';
import PackageNote from './section/PackageNote.vue';
import { computed } from 'vue';
import InquiryForm from '../../home/section/InquiryForm.vue';
import { PackageDetailProps } from '../types';


const props = defineProps<PackageDetailProps>();


const dynamicBreadcrumbs = computed((): BreadcrumbItemType[] => {
    const crumbs: BreadcrumbItemType[] = [
        { title: 'Home', href: route('client.landing') }
    ];

    if (props.isInbound) {
        crumbs.push({ title: 'Inbound', href: route('client.inbound') });
    } else {
        crumbs.push({ title: 'Outbound', href: route('client.outbound') });
    }

    crumbs.push({ title: props.package.name, href: '' });

    return crumbs;
});


</script>

<template>
    <AppLayout>
        <!-- Pass the computed dynamicBreadcrumbs here -->
        <PackageTitleHeaderWithImage :package="package" :isInbound="isInbound"
            :breadcrumbs="dynamicBreadcrumbs" />

        <PackageRateAndSchedule :package="package" :isInbound="isInbound" />
        <PackageIncludedServices :package="package" />
        <PackageTravelSchedule :package="package" :isInbound="isInbound" />
        <PackageDescription :package="package" />
        <PackageHighlight :package="package" :isInbound="isInbound" />
        <PackageItinerary :package="package" :isInbound="isInbound" />
        <PackageInclusion :package="package" />
        <PackageExclusion :package="package" />
        <PackageNote v-if="package.notes_array && package.notes_array.length > 0"
            :package="package" />

        <InquiryForm />
    </AppLayout>
</template>