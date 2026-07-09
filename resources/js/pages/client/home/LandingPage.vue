<script setup lang="ts">
// LAYOUT
import AppLayout from '@/layouts/ClientAppLayout.vue';

// PROPS
import { type LandingPageProps } from './types';

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

//logic
import { useLanding } from './useLanding';

const  { delays, VALID_FOR_FOREIGN_ONLY_TAG } = useLanding();

defineProps<LandingPageProps>();

</script>

<template>

    <AppLayout>
        <CarouselSection />

        <MotionWrapper :delay="delays.destination">
            <DestinationCarousel :destinations="destinations" />
        </MotionWrapper>

        <MotionWrapper :delay="delays.inbound">
            <InboundPackageCarousel :packages="inbound.packages" :tag="VALID_FOR_FOREIGN_ONLY_TAG" />
        </MotionWrapper>

        <MotionWrapper :delay="delays.outbound">
            <OutboundPackageCarousel :packages="outbound.packages" />
        </MotionWrapper>

        <MotionWrapper :delay="delays.services">
            <AgencyServices />
        </MotionWrapper>

        <MotionWrapper :delay="delays.about">
            <AboutAgency />
        </MotionWrapper>

        <MotionWrapper :delay="delays.partner">
            <PartnerAgency />
        </MotionWrapper>

        <MotionWrapper :delay="delays.inquiry">
            <InquiryForm />
        </MotionWrapper>

        <MotionWrapper :delay="delays.feedback">
            <ClientFeedback />
        </MotionWrapper>
    </AppLayout>
</template>
