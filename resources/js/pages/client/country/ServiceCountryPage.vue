<script setup lang="ts">
// layouts
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import TitleHeader from './section/TitleHeader.vue';
import DestinationList from './section/DestinationList.vue';
import { getImageUrl } from '@/lib/utils.js';


</script>


<template>
    <AppLayout>
        <TitleHeader title="Countries And Destinations" description="We included all the countries that included in our services and currently expanding for more tourist destinations" :image="getImageUrl('upload/agency/outbound_image.png')" />
        <DestinationList />
    </AppLayout>     
</template>
