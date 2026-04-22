<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import DestinationCarousel from './section/DestinationCarousel.vue';
import TitleHeader from './section/TitleHeader.vue';

</script>

<template>
    <Head title="Explore Most Popular Destinations" />
    <AppLayout>
        <TitleHeader />
        <DestinationCarousel />
    </AppLayout>     
</template>
