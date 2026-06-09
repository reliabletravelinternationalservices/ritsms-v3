<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import DestinationCarousel from './section/DestinationCarousel.vue';
import TitleHeader from './section/TitleHeader.vue';
import FeaturedInboundPackage from './section/FeaturedInboundPackage.vue';
import FeaturedOutboundPackage from './section/FeaturedOutboundPackage.vue';
import InquiryForm from '../home/section/InquiryForm.vue';
import { Destination } from '@/types/destination';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';

interface Props {
    destinations: Destination[];
}
defineProps<Props>();

</script>

<template>
    <Head title="Explore Most Popular Destinations" />
    <AppLayout>
        <TitleHeader />

        <MotionWrapper :delay="0.2">
            <DestinationCarousel :destinations="destinations" />
        </MotionWrapper>

        <MotionWrapper :delay="0.1">
            <FeaturedInboundPackage :destinations="destinations" />
        </MotionWrapper>

        <MotionWrapper :delay="0.1">
            <FeaturedOutboundPackage :destinations="destinations" />
        </MotionWrapper>

        <MotionWrapper :delay="0.15">
            <InquiryForm />
        </MotionWrapper>
    </AppLayout>     
</template>
