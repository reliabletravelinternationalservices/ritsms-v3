<script setup lang="ts">
// layouts
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import TitleHeader from './section/TitleHeader.vue';
import LocationList from './section/LocationList.vue';
import {  DestinationWithLocations } from '@/types/destination.js';

// TYPES

interface Props {
    destination: DestinationWithLocations
}

defineProps<Props>();

</script>

<template>
    <AppLayout>
        <TitleHeader :title="destination.title" :description="destination.description"  :image="destination.image" />
        <LocationList :locations="destination.locations" />
    </AppLayout>     
</template>