<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import TitleHeader from './section/TitleHeader.vue';
import { Destination } from '@/types/destination';
import LocationList from './section/LocationList.vue';
import HeadContent from '@/components/HeadContent.vue';

interface Props {
    destination: Destination
}

const props = defineProps<Props>();

</script>

<template>
    <AppLayout>
        <TitleHeader :title="props.destination.title" :description="props.destination.description"  :image="props.destination.image" />
        <LocationList :locations="props.destination.locations" />
    </AppLayout>     
</template>