<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import OutboundTitleHeader from './section/OutboundTitleHeader.vue';
import OutboundPackageDisplay from './section/OutboundPackageDisplay.vue';
import { PackageGroup } from '@/types/group-package';


interface Props {
    'groups': {
        'featured' : PackageGroup[],
        'normal' : PackageGroup[],
    }
}

const props = defineProps<Props>();
</script>

<template>
    <Head title="Explore International Destinations With Us" />
    <AppLayout>
        <OutboundTitleHeader  />
        <OutboundPackageDisplay :featuredGroups="props.groups.featured" :normalGroups="props.groups.normal"/>
    </AppLayout>     
</template>
