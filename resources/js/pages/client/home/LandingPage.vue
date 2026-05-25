<script setup lang="ts">
import CarouselSection from '@/pages/client/home/section/ImageCarousel.vue';
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import type { Package } from '@/types/package';
import DestinationCarousel from './section/DestinationCarousel.vue';
import InboundPackageCarousel from './section/InboundPackageCarousel.vue';
import OutboundPackageCarousel from './section/OutboundPackageCarousel.vue';
import AgencyServices from './section/AgencyServices.vue';
import AboutAgency from './section/AboutAgency.vue';
import PartnerAgency from './section/PartnerAgency.vue';
import InquiryForm from './section/InquiryForm.vue';
import ClientFeedback from './section/ClientFeedback.vue';
import { Destination } from '@/types/destination';

interface PackageResult {
    packages: Package[];
}

interface Props {
    destinations: Destination[];
    inbound: PackageResult;
    outbound: PackageResult;
}


const page = usePage<Record<string, any>>();

const usdRate: number = page.props.settings?.usd_to_php_rate?? null;

const props = defineProps<Props>();

</script>

<template>
    <Head title="Discover The World With Us" />
    <AppLayout>
        <CarouselSection />
        <DestinationCarousel :destinations="destinations" />
        <InboundPackageCarousel :packages="props.inbound.packages" tag="VALID FOR FOREIGN ONLY!" :usdRate="usdRate" />
        <OutboundPackageCarousel :packages="props.outbound.packages" :tag="null" :usdRate="null" />
        <AgencyServices />
        <AboutAgency />
        <PartnerAgency />
        <InquiryForm />
        <ClientFeedback />
    </AppLayout>     
</template>
