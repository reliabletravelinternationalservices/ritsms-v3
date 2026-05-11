<script setup lang="ts">
import { DestinationLocation } from '@/types/destination-location';
import { Icon } from '@iconify/vue';

interface Props {
    locations: DestinationLocation[],
}
const props = defineProps<Props>();
</script>

<template>
    <section class="w-full">
        <div class="max-w-5xl m-auto py-8 flex flex-col gap-6">
            <span v-for="location in props.locations" class="w-full h-[440px] flex flex-col gap-4" >
                <img v-if="location.image && location.image?.url" :src="location.image.url" :alt="location.image.alt_text" class="w-full h-full object-cover shadow-md">
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Icon icon="mdi:image-off" width="48" height="48" class="text-gray-400" />
                </div>
                <div class="flex flex-col gap-2">
                    <h1 class="text-xl md:text-2xl lg:text-3xl font-montserrat font-bold">{{ location.name }}</h1>
                    <p class="text-sm md:text-base font-roboto">{{ location.description }}</p>
                </div>
            </span>
        </div>
    </section>
</template>