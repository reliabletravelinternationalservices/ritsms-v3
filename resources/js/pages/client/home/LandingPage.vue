<script setup lang="ts">
import CarouselSection from '@/pages/client/home/section/ImageCarousel.vue';
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import DestinationCarousel from './section/DestinationCarousel.vue';
import InboundPackageCarousel from './section/InboundPackageCarousel.vue';
import OutboundPackageCarousel from './section/OutboundPackageCarousel.vue';
import AgencyServices from './section/AgencyServices.vue';
import AboutAgency from './section/AboutAgency.vue';
import PartnerAgency from './section/PartnerAgency.vue';
import InquiryForm from './section/InquiryForm.vue';
import ClientFeedback from './section/ClientFeedback.vue';

</script>

<template>
    <Head title="Reliable International Travel Services" />
    <AppLayout>
        <CarouselSection />
        <DestinationCarousel />
        <InboundPackageCarousel />
        <OutboundPackageCarousel />
        <AgencyServices />
        <AboutAgency />
        <PartnerAgency />
        <InquiryForm />
        <ClientFeedback />
    </AppLayout>     
</template>
