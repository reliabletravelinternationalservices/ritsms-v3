<script setup lang="ts">
// layouts
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import OutboundTitleHeader from './section/OutboundTitleHeader.vue';
import OutboundPackageDisplay from './section/OutboundPackageDisplay.vue';

// TYPES
import { OutbounPageProps } from './types.js';

defineProps<OutbounPageProps>();
</script>

<template>
    <AppLayout>
        <OutboundTitleHeader  />
        <OutboundPackageDisplay :featuredGroups="featured" :normalGroups="regular" :countries="countries"/>
    </AppLayout>     
</template>
