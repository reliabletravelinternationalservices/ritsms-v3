<script setup lang="ts">
import CountryCard from '@/components/CountryCard.vue';
import { Destination } from '@/types/destination';

interface Props {
    destinations: Destination[],
}
defineProps<Props>();
</script>

<template>
    <section class="w-full">
        <div class="max-w-5xl m-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CountryCard v-for="destination in destinations" :key="destination.id" :destination="destination" :href="route('client.destination.country.destination', { destination: destination.id})" />
        </div>
    </section>
</template>