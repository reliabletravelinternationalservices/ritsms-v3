<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import InboundTitleHeader from './section/InboundTitleHeader.vue';
import InboundPackageDisplay from './section/InboundPackageDisplay.vue';
import { InboundPageProps } from '../outbound/types.js';


defineProps<InboundPageProps>();
</script>

<template>

    <AppLayout>
        <InboundTitleHeader />
        <InboundPackageDisplay :featuredGroups="featured" :normalGroups="regular"
            :destinationLocations="locations" />
    </AppLayout>
</template>
