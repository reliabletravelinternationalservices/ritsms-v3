<script setup lang="ts">
import CarouselSection from '@/pages/client/home/section/ImageCarousel.vue';
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { usePage } from '@inertiajs/vue3';
import type { Package } from '@/types/package';
import  DestinationCarousel from './section/DestinationCarousel.vue';
import InboundPackageCarousel from './section/InboundPackageCarousel.vue';
import OutboundPackageCarousel from './section/OutboundPackageCarousel.vue';
import AgencyServices from './section/AgencyServices.vue';
import AboutAgency from './section/AboutAgency.vue';
import PartnerAgency from './section/PartnerAgency.vue';
import InquiryForm from './section/InquiryForm.vue';
import ClientFeedback from './section/ClientFeedback.vue';
import { Destination } from '@/types/destination';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';
import HeadContent from '@/components/HeadContent.vue';

interface PackageResult {
    packages: Package[];
}

interface Props {
    destinations: Destination[];
    inbound: PackageResult;
    outbound: PackageResult;
}


const page = usePage<Record<string, any>>();

const usdRate: number = page.props.settings?.usd_to_php_rate ?? null;

const props = defineProps<Props>();

</script>

<template>

    <HeadContent title="Discover The World With Us" :url="route('client.landing')" />
    <AppLayout>
        <CarouselSection />

        <MotionWrapper :delay="0.05">
            <DestinationCarousel :destinations="destinations" />
        </MotionWrapper>

        <MotionWrapper :delay="0.1">
            <InboundPackageCarousel :packages="props.inbound.packages" :tag="`VALID FOR FOREIGN ONLY!`"
                :usdRate="usdRate" />
        </MotionWrapper>

        <MotionWrapper :delay="0.15">
            <OutboundPackageCarousel :packages="props.outbound.packages" :tag="null" :usdRate="null" />
        </MotionWrapper>

        <MotionWrapper :delay="0.2">
            <AgencyServices />
        </MotionWrapper>

        <MotionWrapper :delay="0.25">
            <AboutAgency />
        </MotionWrapper>

        <MotionWrapper :delay="0.3">
            <PartnerAgency />
        </MotionWrapper>

        <MotionWrapper :delay="0.35">
            <InquiryForm />
        </MotionWrapper>

        <MotionWrapper :delay="0.4">
            <ClientFeedback />
        </MotionWrapper>
    </AppLayout>
</template>
