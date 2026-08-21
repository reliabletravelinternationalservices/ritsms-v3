<script setup lang="ts">
import { useTourFormStore } from '@/stores/tourForm'
import NavButton from './NavButton.vue';
import OverviewForm from './OverviewSection.vue';
import ItineraryForm from './ItinerarySection.vue';
import FlightAndRouteSection from './FlightAndRouteSection.vue';
import HotelSection from './HotelSection.vue';
import PriceAndSchedule from './PriceAndSchedule.vue';

const tourForm = useTourFormStore()

const { isCurrentSection, setSection, SECTION } = tourForm
</script>

<template>
    <div class="flex gap-4">
        <NavButton v-for="section in tourForm.sections" :key="section.key" :label="section.label"
            :active="tourForm.currentSection === section.key" @click="setSection(section.key)" />

    </div>
    <div class="mt-4 p-4 text-foreground">
        <div v-if="isCurrentSection(SECTION.OVERVIEW)">
            <OverviewForm />
        </div>
        <div v-else-if="isCurrentSection(SECTION.ITINERARIES)">
            <ItineraryForm />
        </div>
        <div v-else-if="isCurrentSection(SECTION.ROUTES)">
            <FlightAndRouteSection />
        </div>
        <div v-else-if="isCurrentSection(SECTION.HOTELS)">
            <HotelSection />
        </div>
        <div v-else-if="isCurrentSection(SECTION.PRICE_AND_SCHEDULE)">
            <PriceAndSchedule />
        </div>
        <div v-else-if="isCurrentSection(SECTION.ASSETS_AND_IMAGES)">
            this is Assets form
        </div>
    </div>
</template>