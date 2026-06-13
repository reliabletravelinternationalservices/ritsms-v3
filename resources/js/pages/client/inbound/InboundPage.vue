<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import InboundTitleHeader from './section/InboundTitleHeader.vue';
import InboundPackageDisplay from './section/InboundPackageDisplay.vue';
import { PackageGroup } from '@/types/group-package';
import HeadContent from '@/components/HeadContent.vue';

const appUrl = import.meta.env.VITE_APP_URL;
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

    <HeadContent
        title="Explore Local Spots Here in The Philippines"
        description="Discover the best local spots in the Philippines with our comprehensive guide. From stunning beaches to vibrant cities, explore hidden gems and popular destinations across the country. Plan your next adventure with us and experience the rich culture, breathtaking landscapes, and warm hospitality of the Philippines."
        :imageUrl="`${appUrl}/storage/upload/agency/inbound_image.png`"
        :url="route('client.inbound')"
    />
    <AppLayout>
        <InboundTitleHeader />
        <InboundPackageDisplay :featuredGroups="props.groups.featured" :normalGroups="props.groups.normal"
            :destinationLocations="props.destinationLocations" />
    </AppLayout>
</template>
