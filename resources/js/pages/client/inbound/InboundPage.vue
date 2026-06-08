<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import InboundTitleHeader from './section/InboundTitleHeader.vue';
import InboundPackageDisplay from './section/InboundPackageDisplay.vue';
import { PackageGroup } from '@/types/group-package';

interface Props {
    'groups': {
        'featured': PackageGroup[],
        'normal': PackageGroup[],
    };
    destinationLocations: string[];
}

const props = defineProps<Props>();
</script>

<template>

    <Head title="Explore Local Spots Here in The Philippines" />
    <AppLayout>
        <InboundTitleHeader />
        <InboundPackageDisplay :featuredGroups="props.groups.featured" :normalGroups="props.groups.normal"
            :destinationLocations="props.destinationLocations" />
    </AppLayout>
</template>
