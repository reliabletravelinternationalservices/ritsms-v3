<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import OutboundTitleHeader from './section/OutboundTitleHeader.vue';
import OutboundFilter from './section/OutboundFilter.vue';
import PackageDisplay from './section/PackageDisplay.vue';
</script>

<template>
    <Head title="Explore International Destinations With Us" />
    <AppLayout>
        <OutboundTitleHeader />
        <PackageDisplay />
    </AppLayout>     
</template>
