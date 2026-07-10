<script setup lang="ts">
// layouts
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import TitleHeader from './section/TitleHeader.vue';
import DestinationList from './section/DestinationList.vue';
import HeadContent from '@/components/HeadContent.vue';

// TYPES
import { DestinationProps } from './types.js';


defineProps<DestinationProps>();

</script>


<template>
    <AppLayout>
        <TitleHeader title="Countries And Destinations" description="We included all the countries that included in our services and currently expanding for more tourist destinations" :image="destinations[0].image"  />
        <DestinationList :destinations="destinations" />
    </AppLayout>     
</template>
