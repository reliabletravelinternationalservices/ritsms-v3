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
import InquiryForm from '../../home/section/InquiryForm.vue';
import HeadContent from '@/components/HeadContent.vue';


const props = defineProps<{
    package: Package;
    isInbound: boolean;
}>();

const page = usePage<Record<string, any>>();

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

const usdRate: number = page.props.settings?.usd_to_php_rate ?? 1;

const url = computed(() => {
    const routeName = props.isInbound
        ? 'client.inbound.package.detail'
        : 'client.outbound.package.detail';

    return route(routeName, { slug: props.package.slug });
});
</script>

<template>

    <HeadContent 
        :title="props.package.name"
        :description="props.package.description"
        :imageUrl="props.package.primary_image?.url || undefined"
        :url="url"
    />

    <AppLayout>
        <!-- Pass the computed dynamicBreadcrumbs here -->
        <PackageTitleHeaderWithImage :package="props.package" :isInbound="isInbound"
            :breadcrumbs="dynamicBreadcrumbs" />

        <PackageRateAndSchedule :package="props.package" :isInbound="isInbound" :usdRate="usdRate" />
        <PackageIncludedServices :package="props.package" />
        <PackageTravelSchedule :package="props.package" :isInbound="isInbound" :usdRate="usdRate" />
        <PackageDescription :package="props.package" />
        <PackageHighlight :package="props.package" :isInbound="isInbound" />
        <PackageItinerary :package="props.package" :isInbound="isInbound" />
        <PackageInclusion :package="props.package" />
        <PackageExclusion :package="props.package" />
        <PackageNote v-if="props.package.notes_array && props.package.notes_array.length > 0"
            :package="props.package" />

        <InquiryForm />
    </AppLayout>
</template>