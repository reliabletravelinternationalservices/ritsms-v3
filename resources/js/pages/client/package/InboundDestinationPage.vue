<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import InboundTitleHeader from './section/InboundTitleHeader.vue';
import InboundPackageDisplay from './section/InboundPackageDisplay.vue';
</script>

<template>
    <Head title="Explore Local Spots Here in The Philippines" />
    <AppLayout>
        <InboundTitleHeader />
        <InboundPackageDisplay />
    </AppLayout>     
</template>
