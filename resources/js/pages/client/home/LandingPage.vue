<script setup lang="ts">
// LAYOUT
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import MotionWrapper from '@/components/ui/MotionWrapper.vue';
import CarouselSection from '@/pages/client/home/section/ImageCarousel.vue';

// SECTIONS
import  DestinationCarousel from './section/DestinationCarousel.vue';
import InboundPackageCarousel from './section/InboundPackageCarousel.vue';
import OutboundPackageCarousel from './section/OutboundPackageCarousel.vue';
import AgencyServices from './section/AgencyServices.vue';
import AboutAgency from './section/AboutAgency.vue';
import PartnerAgency from './section/PartnerAgency.vue';
import InquiryForm from './section/InquiryForm.vue';
import ClientFeedback from './section/ClientFeedback.vue';

//CONSTANTS
import {
    LANDING_DELAYS,
} from './constants';


</script>

<template>

    <AppLayout>
        <CarouselSection />

        <MotionWrapper :delay="LANDING_DELAYS.destinationSection">
            <DestinationCarousel />
        </MotionWrapper>

        <MotionWrapper :delay="LANDING_DELAYS.inboundSection">
            <InboundPackageCarousel  />
        </MotionWrapper>

        <MotionWrapper :delay="LANDING_DELAYS.outboundSection">
            <OutboundPackageCarousel />
        </MotionWrapper>

        <MotionWrapper :delay="LANDING_DELAYS.servicesSection">
            <AgencyServices />
        </MotionWrapper>

        <MotionWrapper :delay="LANDING_DELAYS.aboutSection">
            <AboutAgency />
        </MotionWrapper>

        <MotionWrapper :delay="LANDING_DELAYS.partnerSection">
            <PartnerAgency />
        </MotionWrapper>

        <MotionWrapper :delay="LANDING_DELAYS.inquirySection">
            <InquiryForm />
        </MotionWrapper>

        <MotionWrapper :delay="LANDING_DELAYS.feedbackSection">
            <ClientFeedback />
        </MotionWrapper>
    </AppLayout>
</template>
