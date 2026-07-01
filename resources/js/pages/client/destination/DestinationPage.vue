<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import DestinationCarousel from './section/DestinationCarousel.vue';
import TitleHeader from './section/TitleHeader.vue';
import FeaturedInboundPackage from './section/FeaturedInboundPackage.vue';
import FeaturedOutboundPackage from './section/FeaturedOutboundPackage.vue';
import { Destination } from '@/types/destination';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';
import HeadContent from '@/components/HeadContent.vue';

interface Props {
    destinations: Destination[];
}
defineProps<Props>();

</script>

<template>
    <HeadContent
        title="Explore Most Popular Destinations"
        description="Discover the most popular destinations for your next adventure!"
        :url="route('client.destination')"
    />
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
    </AppLayout>     
</template>
