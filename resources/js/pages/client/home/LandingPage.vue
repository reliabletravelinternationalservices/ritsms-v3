<script setup lang="ts">
import CarouselSection from '@/pages/client/home/section/ImageCarousel.vue';
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import type { Package } from '@/types/package';
import type { PackageInUSD } from '@/types/package-usd';
import DestinationCarousel from './section/DestinationCarousel.vue';
import InboundPackageCarousel from './section/InboundPackageCarousel.vue';
import OutboundPackageCarousel from './section/OutboundPackageCarousel.vue';
import AgencyServices from './section/AgencyServices.vue';
import AboutAgency from './section/AboutAgency.vue';
import PartnerAgency from './section/PartnerAgency.vue';
import InquiryForm from './section/InquiryForm.vue';
import ClientFeedback from './section/ClientFeedback.vue';

interface PackageResult {
    packages: Package[];
    is_foreign_only: boolean;
}

interface LandingPageProps {
    inbound: PackageResult;
    outbound: PackageResult;
    settings: Record<string, any>;
    [key: string]: any;
}

const page = usePage<LandingPageProps>();
const inboundPackages = computed(() => page.props.inbound?.packages ?? []);
const inboundIsForeignOnly = computed(() => page.props.inbound?.is_foreign_only ?? false);
const outboundPackages = computed(() => page.props.outbound?.packages ?? []);
const outboundIsForeignOnly = computed(() => page.props.outbound?.is_foreign_only ?? false);

// Convert inbound packages to USD pricing
const inboundPackagesInUSD = computed((): PackageInUSD[] => {
    const usdRate = page.props.settings?.usd_to_php_rate ?? 1;
    return inboundPackages.value.map(pkg => ({
        ...pkg,
        base_price: pkg.base_price / usdRate, // Convert PHP to USD
        original_price_php: pkg.base_price, // Keep original for reference
    }));
});

</script>

<template>
    <Head title="Discover The World With Us" />
    <AppLayout>
        <CarouselSection />
        <DestinationCarousel />
        <InboundPackageCarousel :packages="inboundPackagesInUSD" :validOnlyForForeign="inboundIsForeignOnly" />
        <OutboundPackageCarousel :packages="outboundPackages" :validOnlyForForeign="outboundIsForeignOnly" />
        <AgencyServices />
        <AboutAgency />
        <PartnerAgency />
        <InquiryForm />
        <ClientFeedback />
    </AppLayout>     
</template>
