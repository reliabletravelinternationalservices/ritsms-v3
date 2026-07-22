<script setup lang="ts">
// layouts
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import OutboundTitleHeader from './section/OutboundTitleHeader.vue';
import OutboundPackageDisplay from './section/OutboundPackageDisplay.vue';

// TYPES
import { OutbounPageProps } from './types.js';

</script>

<template>
    <AppLayout>
        <OutboundTitleHeader  />
        <OutboundPackageDisplay />
    </AppLayout>     
</template>
