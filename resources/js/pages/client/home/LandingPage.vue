<script setup lang="ts">
import CarouselSection from '@/pages/client/home/section/ImageCarousel.vue';
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import type { Package } from '@/types/package';
import DestinationCarousel from './section/DestinationCarousel.vue';
import InboundPackageCarousel from './section/InboundPackageCarousel.vue';
import OutboundPackageCarousel from './section/OutboundPackageCarousel.vue';
import AgencyServices from './section/AgencyServices.vue';
import AboutAgency from './section/AboutAgency.vue';
import PartnerAgency from './section/PartnerAgency.vue';
import InquiryForm from './section/InquiryForm.vue';
import ClientFeedback from './section/ClientFeedback.vue';

interface LandingPageProps {
    inbound: Package[];
    outbound: Package[];
    [key: string]: any;
}

const page = usePage<LandingPageProps>();
const inboundPackages = computed(() => page.props.inbound ?? []);
const outboundPackages = computed(() => page.props.outbound ?? []);

</script>

<template>
    <Head title="Discover The World With Us" />
    <AppLayout>
        <CarouselSection />
        <DestinationCarousel />
        <InboundPackageCarousel :packages="inboundPackages" :validToForeign="true" />
        <OutboundPackageCarousel :packages="outboundPackages" />
        <AgencyServices />
        <AboutAgency />
        <PartnerAgency />
        <InquiryForm />
        <ClientFeedback />
    </AppLayout>     
</template>
