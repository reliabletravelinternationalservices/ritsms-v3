<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import DestinationCarousel from './section/DestinationCarousel.vue';
import TitleHeader from './section/TitleHeader.vue';
import FeaturedInboundPackage from './section/FeaturedInboundPackage.vue';
import FeaturedOutboundPackage from './section/FeaturedOutboundPackage.vue';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';

// CONSTANTS
import { SECTION_DELAYS } from './constants';

// TYPES
import { DestinationProps } from './types.js';


defineProps<DestinationProps>();

</script>

<template>

    <AppLayout>
        <TitleHeader />

        <MotionWrapper :delay="SECTION_DELAYS.destinationSection">
            <DestinationCarousel />
        </MotionWrapper>

        <MotionWrapper :delay="SECTION_DELAYS.inboundSection">
            <FeaturedInboundPackage />
        </MotionWrapper>

        <MotionWrapper :delay="SECTION_DELAYS.outboundSection">
            <FeaturedOutboundPackage />
        </MotionWrapper>
    </AppLayout>     
</template>
