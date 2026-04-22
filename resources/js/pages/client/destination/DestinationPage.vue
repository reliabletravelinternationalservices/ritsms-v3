<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import DestinationCarousel from './section/DestinationCarousel.vue';

</script>

<template>
    <Head title="Explore Most Popular Destinations" />
    <AppLayout>
        <DestinationCarousel />
    </AppLayout>     
</template>
