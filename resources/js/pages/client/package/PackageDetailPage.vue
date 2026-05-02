<script setup lang="ts">
import ClientBreadcrumb from '@/components/ClientBreadcrumb.vue';
import AppLayout from '@/layouts/ClientAppLayout.vue';
import {  BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Head } from '@inertiajs/vue3';
import PackageTitleHeaderWithImage from './section/PackageTitleHeaderWithImage.vue';
import PackageRateAndSchedule from './section/PackageRateAndSchedule.vue';

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
    </AppLayout>     
</template>
