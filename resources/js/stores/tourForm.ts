// stores/tour-form.ts

import { isMultipleFlight } from '@/lib/utils'
import { TourWithItinerary } from '@/types/tour'
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

const validationSections = {
    [SECTION.OVERVIEW]: [
      'name',
      'badge',
      'description',
      'highlights',
      'inclusions',
      'exclusions',
      'terms_and_conditions',
      'category',
      'duration',
      'itinerary_type',
    ],

    [SECTION.ITINERARIES]: [
      'itineraries',
    ],

    [SECTION.ROUTES]: [
      'routes',
    ],

    [SECTION.HOTELS]: [
      'hotels',
    ],

    [SECTION.PRICE_AND_SCHEDULE]: [
      'selected_dates',
      'schedules',
    ],

    [SECTION.ASSETS_AND_IMAGES]: [
      'thumbnail',
      'additional_images',
    ],
}

interface Itinerary {
  day_no: number
  title: string
  activities: string
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

interface Schedule {
    departure_date: '',
    price: '',
    discounted_price: '',
    airline_name: '',
    departure_flight_no: '',
    return_flight_no: '',
}

type TourSection = typeof SECTION[keyof typeof SECTION]

export const useTourFormStore = defineStore('tour-form', () => {
  const currentSection = ref<TourSection>(SECTION.OVERVIEW)
  const previousDuration = ref(0)
  const errors = ref<Record<string, string>>({})

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

    routes: [ 
          {
            departure_country_id: '',
            departure_location: '',
            destination_country_id: '',
            destination_location: '',
          }
      ] as Route[],

    hotels: [] as Hotel[],

    priceAndScheduleItems: {
      selected_dates: [],
      def_departure_date: '',
      def_price: '',
      def_discounted_price: '',
      def_airline_name: '',
      def_departure_flight_no: '',
      def_return_flight_no: '',
      def_booking_deadline: '',
      schedules: [] as Schedule[],
    },

    imageAndAssetItems: {
      thumbnail: null as number | null,
      additional_images: [] as File[],
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
      label: 'Routes',
    },
    {
      key: SECTION.PRICE_AND_SCHEDULE,
      label: 'Price & Schedule',
    },
    {
      key: SECTION.HOTELS,
      label: 'Hotels',
    },
    {
      key: SECTION.ASSETS_AND_IMAGES,
      label: 'Assets & Images',
    },
  ]


  // ===============================================================
  // SECTION FUNCTIONS
  // ===============================================================
  function setSection(section: TourSection) {
    currentSection.value = section
  }

  function isCurrentSection(section: TourSection) {
    return currentSection.value === section
  }


  // ===============================================================
  // ROUTE FUNCTIONS
  // ===============================================================
  function addRoute() {
    form.value.routes.push({
      departure_country_id: '',
      departure_location: '',
      destination_country_id: '',
      destination_location: '',
    })
  }

  function removeRoute(index: number) {
    if (form.value.routes.length <= 1) return;
    form.value.routes.splice(index, 1)
  }

  function syncRoutes(value: string) {
    if(!isMultipleFlight(value)) {
      form.value.routes = form.value.routes.slice(0, 1);
    }
  }



  // ===============================================================
  // HOTEL FUNCTIONS
  // ===============================================================
  function addHotel() {
    form.value.hotels.push({
      name: '',
      rate: '',
      link: '',
    })
  }

  function removeHotel(index: number) {
    form.value.hotels.splice(index, 1)
  }


  function containsHotel () {
    return form.value.hotels.length > 0
  }



  // ================================================================
  // ITINERARY FUNCTIONS
  // ===============================================================
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
        activities: '',
      })
    }

    // Remove extra itinerary days
    if (itineraries.length > duration) {
      itineraries.splice(duration)
    }
  }



  // ===============================================================
  // PRICE & SCHEDULE FUNCTIONS
  // ===============================================================
  const clearSelectedDates = () => {
    form.value.priceAndScheduleItems.selected_dates = []
  }

  const containsSelectedDates = () => {
    return form.value.priceAndScheduleItems.selected_dates.length > 0
  }

  function syncSchedules(values: string[]) {
    //TODO: SYNCHRONIZE SCHEDULE
  }


  
  // ===============================================================
  // IMAGES & ASSETS FUNCTIONS
  // ===============================================================
  
  function addImage(file: File) {
    form.value.imageAndAssetItems.additional_images.push(file)
  }

  function removeImage(index: number) {
    form.value.imageAndAssetItems.additional_images.splice(index, 1)
  }

  function setThumbnail(index: number) {
    if (index === form.value.imageAndAssetItems.thumbnail) {
      form.value.imageAndAssetItems.thumbnail = null
      return
    }
    form.value.imageAndAssetItems.thumbnail = index
  }



  // ==============================================================
  // FILL FORM WITH EXISTING TOUR DATA
  // ==============================================================
    function fillFormWithTourData(tour: TourWithItinerary) {
      form.value.overviewItems = {
          name: tour.name,
          badge: tour.badge ?? '',
          description: tour.description ?? '',
          highlights: tour.highlights ?? '',
          terms_and_conditions: tour.terms_and_conditions ?? '',
          inclusions: tour.inclusions ?? '',
          exclusions: tour.exclusions ?? '',
          category: tour.category,
          duration: String(tour.duration),
          itinerary_type: tour.itinerary_type,
      }

      syncItineraries(String(tour.duration))

      if (Array.isArray(tour.itineraries)) {
          form.value.itineraries = tour.itineraries.map((itinerary) => ({
              day_no: itinerary.day_no,
              title: itinerary.title,
              activities: itinerary.activities,
          }))
      }
  }


  // ==============================================================
  // validation functions
  // ==============================================================
  function hasSectionErrors(section: TourSection): boolean {
    return Object.keys(errors.value).some(
        key => key.startsWith(`${section}.`)
    )
  }

  function setErrors(value: Record<string, string>) {
      errors.value = value
  }

  function clearErrors() {
      errors.value = {}
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
    syncSchedules,
    clearSelectedDates,
    containsSelectedDates,
    addImage,
    removeImage,
    setThumbnail,
    fillFormWithTourData,
    hasSectionErrors,
    setErrors,
    clearErrors,
    errors,
  }
})