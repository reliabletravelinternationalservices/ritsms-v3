<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import DestinationCarousel from './section/DestinationCarousel.vue';
import TitleHeader from './section/TitleHeader.vue';
import FeaturedInboundPackage from './section/FeaturedInboundPackage.vue';
import FeaturedOutboundPackage from './section/FeaturedOutboundPackage.vue';
import InquiryForm from '../home/section/InquiryForm.vue';
import { Destination } from '@/types/destination';

interface Props {
    destinations: Destination[];
}

const props = defineProps<Props>();

</script>

<template>
    <Head title="Explore Most Popular Destinations" />
    <AppLayout>
        <TitleHeader />
        <DestinationCarousel :destinations="props.destinations" />
        <FeaturedInboundPackage :destinations="destinations" />
        <FeaturedOutboundPackage :destinations="destinations" />
        <InquiryForm />
    </AppLayout>     
</template>
