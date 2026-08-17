// stores/tour-form.ts

import { isMultipleFlight } from '@/lib/utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const SECTION = {
  OVERVIEW: 'overview',
  ITINERARIES: 'itineraries',
  ROUTES: 'routes',
  HOTELS: 'hotels',
  PRICE_AND_SCHEDULE: 'price-and-schedule',
  ASSETS_AND_IMAGES: 'assets-and-images',
} as const


interface Itinerary {
  day_no: number
  title: string
  activity: string
}
interface Route {
    departure_country_id: string
    departure_location: string
    destination_country_id: string
    destination_location: string
  }

interface Hotel {
    name: string
    rate: string
    link: string
  }

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

    itineraries: [] as Itinerary[],

    flightAndHotelItems: {
        routes: [ 
          {
            departure_country_id: '',
            departure_location: '',
            destination_country_id: '',
            destination_location: '',
          }
      ] as Route[],

      hotels: [] as Hotel[],
    },

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
      key: SECTION.ROUTES,
      label: 'Flights & Routes',
    },
    {
      key: SECTION.HOTELS,
      label: 'Hotels',
    },
    {
      key: SECTION.PRICE_AND_SCHEDULE,
      label: 'Price & Schedule',
    },
    {
      key: SECTION.ASSETS_AND_IMAGES,
      label: 'Assets & Images',
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


  function syncRoutes(value: string) {
    if(!isMultipleFlight(value)) {
      form.value.flightAndHotelItems.routes = form.value.flightAndHotelItems.routes.slice(0, 1);
    }
  }

  function setSection(section: TourSection) {
    currentSection.value = section
  }

  function isCurrentSection(section: TourSection) {
    return currentSection.value === section
  }


  function addRoute() {
    form.value.flightAndHotelItems.routes.push({
      departure_country_id: '',
      departure_location: '',
      destination_country_id: '',
      destination_location: '',
    })
  }

  function removeRoute(index: number) {
    if (form.value.flightAndHotelItems.routes.length <= 1) return;
    form.value.flightAndHotelItems.routes.splice(index, 1)
  }


  function addHotel() {
    form.value.flightAndHotelItems.hotels.push({
      name: '',
      rate: '',
      link: '',
    })
  }

  function removeHotel(index: number) {
    form.value.flightAndHotelItems.hotels.splice(index, 1)
  }


  function containsHotel () {
    return form.value.flightAndHotelItems.hotels.length > 0
  }

  function containsItinerary() {
    return form.value.itineraries.length > 0
  }

  function containsItineraryType() {
      return !!form.value.overviewItems.itinerary_type;
  }


  function containsMultipleFlights() {
    return isMultipleFlight(form.value.overviewItems.itinerary_type)
  }

  function isRoundTrip() {
    return form.value.overviewItems.itinerary_type === 'round_trip'
  }

  return {
    SECTION,
    currentSection,
    form,
    sections,
    syncItineraries,
    syncRoutes,
    setSection,
    isCurrentSection,
    isRoundTrip,
    containsItinerary,
    containsItineraryType,
    containsMultipleFlights,
    containsHotel,
    addRoute,
    removeRoute,
    addHotel,
    removeHotel,
  }
})