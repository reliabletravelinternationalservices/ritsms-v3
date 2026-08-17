// stores/tour-form.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'

const SECTION = {
  OVERVIEW: 'overview',
  ITINERARIES: 'itineraries',
  INCLUSIONS: 'inclusions',
  EXCLUSIONS: 'exclusions',
  PRICING: 'pricing',
} as const

type TourSection = typeof SECTION[keyof typeof SECTION]

export const useTourFormStore = defineStore('tour-form', () => {
  const currentSection = ref<TourSection>(SECTION.OVERVIEW)
  const previousDuration = ref(0)

  const form = ref({
    overviewItems: {
      name: '',
      badge: '',
      description: '',
      highlights: '',
      terms_and_conditions: '',
      inclusions: '',
      exclusions: '',

      category: '',
      duration: '',
      itinerary_type: '',
    },

    itineraries: [] as {
      day_no: number
      title: string
      activity: string
    }[],

    pricing: {
      adult: 0,
      child: 0,
    },
  })

  const sections = [
    {
      key: SECTION.OVERVIEW,
      label: 'Overview',
    },
    {
      key: SECTION.ITINERARIES,
      label: 'Itineraries',
    },
    {
      key: SECTION.INCLUSIONS,
      label: 'Inclusions',
    },
    {
      key: SECTION.EXCLUSIONS,
      label: 'Exclusions',
    },
    {
      key: SECTION.PRICING,
      label: 'Pricing',
    },
  ]

  function syncItineraries(value: string) {
    const duration = Number(value || 0)

    // Only sync when duration actually changed
    if (duration === previousDuration.value) {
      return
    }

    previousDuration.value = duration

    if (duration <= 0) {
      form.value.itineraries = []
      return
    }

    const itineraries = form.value.itineraries

    // Add new itinerary days
    while (itineraries.length < duration) {
      const dayNo = itineraries.length + 1

      itineraries.push({
        day_no: dayNo,
        title: '',
        activity: '',
      })
    }

    // Remove extra itinerary days
    if (itineraries.length > duration) {
      itineraries.splice(duration)
    }
  }

  function setSection(section: TourSection) {
    currentSection.value = section
  }

  function isCurrentSection(section: TourSection) {
    return currentSection.value === section
  }

  function containsItinerary() {
    return form.value.itineraries.length > 0
  }

  return {
    SECTION,
    currentSection,
    form,
    sections,
    syncItineraries,
    setSection,
    isCurrentSection,
    containsItinerary,
  }
})