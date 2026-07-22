<script setup lang="ts">
// layouts
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import OutboundTitleHeader from './section/OutboundTitleHeader.vue';
import OutboundPackageDisplay from './section/OutboundPackageDisplay.vue';


</script>

<template>
    <AppLayout>
        <OutboundTitleHeader  />
        <OutboundPackageDisplay />
    </AppLayout>     
</template>
