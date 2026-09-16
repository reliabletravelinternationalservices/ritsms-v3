<script setup lang="ts">
import { useTourFormStore } from '@/stores/tourForm'
import NavButton from './NavButton.vue';
import OverviewForm from './OverviewSection.vue';
import ItineraryForm from './ItinerarySection.vue';
import FlightAndRouteSection from './FlightAndRouteSection.vue';
import HotelSection from './HotelSection.vue';
import PriceAndSchedule from './PriceAndSchedule.vue';
import ImageAndAssetSection from './ImageAndAssetSection.vue';

withDefaults(defineProps<{
    new: boolean;
    loading: boolean;
}>(), {
  loading: false
})


const tourForm = useTourFormStore()

const { isCurrentSection, setSection, SECTION } = tourForm
</script>

<template>
    <div class="flex gap-2">
        <NavButton :is-loading="loading" v-if="new" :key="tourForm.sections[0].key"
            :label="tourForm.sections[0].label" :active="tourForm.currentSection === tourForm.sections[0].key"
            @click="setSection(tourForm.sections[0].key)"
            :is-error="tourForm.hasSectionErrors(tourForm.sections[0].key)" />

        <NavButton :is-loading="loading" v-else v-for="section in tourForm.sections" :key="section.key"
            :label="section.label" :active="tourForm.currentSection === section.key" @click="setSection(section.key)"
            :is-error="tourForm.hasSectionErrors(section.key)" />

    </div>
    <div v-if="new" class="mt-4 p-4 text-foreground">
        <div v-if="isCurrentSection(SECTION.OVERVIEW)">
            <OverviewForm :is-loading="loading" />
        </div>
    </div>

    <div v-else class="mt-4 p-4 text-foreground">
        <div v-if="isCurrentSection(SECTION.OVERVIEW)">
            <OverviewForm :is-loading="loading" />
        </div>
        <div v-else-if="isCurrentSection(SECTION.ITINERARIES)">
            <ItineraryForm :is-loading="loading" />
        </div>
        <div v-else-if="isCurrentSection(SECTION.ROUTES)">
            <FlightAndRouteSection :is-loading="loading" />
        </div>
        <div v-else-if="isCurrentSection(SECTION.HOTELS)">
            <HotelSection :is-loading="loading" />
        </div>
        <div v-else-if="isCurrentSection(SECTION.PRICE_AND_SCHEDULE)">
            <PriceAndSchedule :is-loading="loading" />
        </div>
        <div v-else-if="isCurrentSection(SECTION.ASSETS_AND_IMAGES)">
            <ImageAndAssetSection :is-loading="loading" />
        </div>
    </div>
</template>