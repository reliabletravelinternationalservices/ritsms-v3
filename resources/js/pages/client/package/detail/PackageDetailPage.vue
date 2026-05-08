<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Head, usePage } from '@inertiajs/vue3';
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

const page = usePage<Record<string, any>>();
const props = defineProps<{ package: Package }>();

const dynamicBreadcrumbs = computed((): BreadcrumbItemType[] => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    const crumbs: BreadcrumbItemType[] = [
        {
            title: 'Home',
            href: route('client.landing'),
        }
    ];
    if (segments.includes('outbound')) {
        crumbs.push({
            title: 'Outbound',
            href: route('client.outbound'),
        });
    } else if (segments.includes('inbound')) {
        crumbs.push({
            title: 'Inbound',
            href: route('client.inbound'),
        });
    }
    crumbs.push({
        title: props.package.name,
        href: '',
    });
    return crumbs;
});

const isInbound = computed((): boolean => {
    return dynamicBreadcrumbs.value.some(b => b.title === 'Inbound') ?? false;
});

const usdRate: number = page.props.settings?.usd_to_php_rate ?? 1;

</script>

<template>
    <Head :title="props.package.name" />
    <AppLayout>
        <!-- Pass the computed dynamicBreadcrumbs here -->
        <PackageTitleHeaderWithImage 
            :package="props.package" 
            :isInbound="isInbound"
            :breadcrumbs="dynamicBreadcrumbs" 
        />
        
        <PackageRateAndSchedule 
            :package="props.package"
            :isInbound="isInbound"
            :usdRate="usdRate"
        />
        <PackageIncludedServices :package="props.package" />
        <PackageTravelSchedule :package="props.package" :isInbound="isInbound" :usdRate="usdRate" />
        <PackageDescription :package="props.package" />
        <PackageHighlight :package="props.package" :isInbound="isInbound" />
        <PackageItinerary :package="props.package" :isInbound="isInbound" />
        <PackageInclusion :package="props.package" />
        <PackageExclusion :package="props.package" />
        <PackageNote :package="props.package" />
    </AppLayout>     
</template>