<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import InboundTitleHeader from './section/InboundTitleHeader.vue';
import InboundPackageDisplay from './section/InboundPackageDisplay.vue';
</script>

<template>
    <Head title="Explore International Destinations With Us" />
    <AppLayout>
        <InboundTitleHeader />
        <InboundPackageDisplay />
    </AppLayout>     
</template>
