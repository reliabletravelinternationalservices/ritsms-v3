<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import OutboundTitleHeader from './section/OutboundTitleHeader.vue';
import OutboundPackageDisplay from './section/OutboundPackageDisplay.vue';
</script>

<template>
    <Head title="Explore International Destinations With Us" />
    <AppLayout>
        <OutboundTitleHeader />
        <OutboundPackageDisplay />
    </AppLayout>     
</template>
