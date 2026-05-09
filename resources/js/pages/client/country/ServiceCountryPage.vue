<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import TitleHeader from './section/TitleHeader.vue';
import { Destination } from '@/types/destination';
import DestinationList from './section/DestinationList.vue';

interface Props {
    destinations: Destination[];
};

const props = defineProps<Props>();

</script>


<template>
    <Head title="Your Gateway to the World: Covered Countries & Destinations" />
    <AppLayout>
        <TitleHeader title="Countries And Destinations" description="We included all the countries that included in our services and currently expanding for more tourist destinations"  />
        <DestinationList :destinations="props.destinations" />
    </AppLayout>     
</template>
