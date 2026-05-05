<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import {  BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Head } from '@inertiajs/vue3';
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

const props = defineProps<{ package: Package }>();

const breadcrumbs: BreadcrumbItemType[] = [
    {
        title: 'Home',
        href: route('client.landing'),
    },
    {
        title: 'Outbound',
        href: route('client.outbound'),
    },
    {
        title: props.package.name,
        href: '',
    },
];

</script>



<template>
    <Head :title="props.package.name" />
    <AppLayout>
        <PackageTitleHeaderWithImage :package="props.package" :breadcrumbs="breadcrumbs" />
        <PackageRateAndSchedule :package="props.package" />
        <PackageIncludedServices :package="props.package" />
        <PackageTravelSchedule :package="props.package" />
        <PackageDescription :package="props.package" />
        <PackageHighlight :package="props.package" />
        <PackageItinerary :package="props.package" />
        <PackageInclusion :package="props.package" />
        <PackageExclusion :package="props.package" />
        <PackageNote :package="props.package" />
    </AppLayout>     
</template>
