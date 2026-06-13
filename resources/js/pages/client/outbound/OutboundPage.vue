<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import OutboundTitleHeader from './section/OutboundTitleHeader.vue';
import OutboundPackageDisplay from './section/OutboundPackageDisplay.vue';
import { PackageGroup } from '@/types/group-package';
import HeadContent from '@/components/HeadContent.vue';

const apiUrl = import.meta.env.VITE_APP_API_URL;
interface Props {
    'groups': {
        'featured' : PackageGroup[],
        'normal' : PackageGroup[],
    }
}

const props = defineProps<Props>();
</script>

<template>
    <HeadContent
        title="Explore International Destinations With Us"
        description="Discover our exclusive outbound travel packages, featuring top destinations worldwide. Whether you're seeking adventure, culture, or relaxation, we have the perfect package for you. Explore our featured and normal groups to find your next unforgettable travel experience."
        :imageUrl="`${apiUrl}/storage/upload/agency/outbound_image.png`"
        :url="route('client.outbound')"
    />
    
    <AppLayout>
        <OutboundTitleHeader  />
        <OutboundPackageDisplay :featuredGroups="props.groups.featured" :normalGroups="props.groups.normal"/>
    </AppLayout>     
</template>
