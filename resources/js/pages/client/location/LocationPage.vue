<script setup lang="ts">
// layouts
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import TitleHeader from './section/TitleHeader.vue';
import LocationList from './section/LocationList.vue';

// TYPES
import { DestinationProps } from './types.js';


defineProps<DestinationProps>();

</script>

<template>
    <AppLayout>
        <TitleHeader :title="destination.title" :description="destination.description"  :image="destination.image" />
        <LocationList :locations="destination.locations" />
    </AppLayout>     
</template>