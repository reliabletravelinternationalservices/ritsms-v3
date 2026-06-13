<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import TitleHeader from './section/TitleHeader.vue';
import { Destination } from '@/types/destination';
import DestinationList from './section/DestinationList.vue';
import HeadContent from '@/components/HeadContent.vue';

interface Props {
    destinations: Destination[];
};

const props = defineProps<Props>();

</script>


<template>
    <HeadContent
        title="Countries & Destinations We Serve"
        description="We included all the countries that included in our services and currently expanding for more tourist destinations"
        :url="route('client.destination.country')"
    />
    <AppLayout>
        <TitleHeader title="Countries And Destinations" description="We included all the countries that included in our services and currently expanding for more tourist destinations" :image="destinations[0].image"  />
        <DestinationList :destinations="props.destinations" />
    </AppLayout>     
</template>
