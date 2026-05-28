<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import TitleHeader from './section/TitleHeader.vue';
import { Destination } from '@/types/destination';
import LocationList from './section/LocationList.vue';

interface Props {
    destination: Destination
}

const props = defineProps<Props>();

</script>

<template>
    <Head :title="props.destination.title" />
    <AppLayout>
        <TitleHeader :title="props.destination.title" :description="props.destination.description"  />
        <LocationList :locations="props.destination.locations" />
    </AppLayout>     
</template>