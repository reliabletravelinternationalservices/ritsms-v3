<script setup lang="ts">
import { useTourFormStore } from '@/stores/tourForm'
import NavButton from './NavButton.vue';
import OverviewForm from './OverviewSection.vue';

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
            this is itinerary form
        </div>
        <div v-else-if="isCurrentSection(SECTION.INCLUSIONS)">
            this is inclusions form
        </div>
        <div v-else-if="isCurrentSection(SECTION.EXCLUSIONS)">
            this is <em></em> form
        </div>
        <div v-else-if="isCurrentSection(SECTION.PRICING)">
            this is pricing form
        </div>
    </div>
</template>