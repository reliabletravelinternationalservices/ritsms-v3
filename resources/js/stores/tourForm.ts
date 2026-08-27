// stores/tour-form.ts

import { generateId, isMultipleFlight } from '@/lib/utils'
import { Tour, TourWithRelationshipTables } from '@/types/tour'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Itinerary as NewItinerary, Route as NewRoute,  Hotel as NewHotel }  from '@/types/tour'

const SECTION = {
  OVERVIEW: 'overview',
  ITINERARIES: 'itineraries',
  ROUTES: 'routes',
  HOTELS: 'hotels',
  PRICE_AND_SCHEDULE: 'schedules',
  ASSETS_AND_IMAGES: 'assets-and-images',
} as const

// const validationSections = {
//     [SECTION.OVERVIEW]: [
//       'name',
//       'badge',
//       'description',
//       'highlights',
//       'inclusions',
//       'exclusions',
//       'terms_and_conditions',
//       'category',
//       'duration',
//       'itinerary_type',
//     ],

//     [SECTION.ITINERARIES]: [
//       'itineraries',
//     ],

//     [SECTION.ROUTES]: [
//       'routes',
//     ],

//     [SECTION.HOTELS]: [
//       'hotels',
//     ],

//     [SECTION.PRICE_AND_SCHEDULE]: [
//       'selected_dates',
//       'schedules',
//     ],

//     [SECTION.ASSETS_AND_IMAGES]: [
//       'thumbnail',
//       'additional_images',
//     ],
// }

interface TourOverview {
      name: string,
      badge: string,
      description: string,
      highlights: string,
      terms_and_conditions: string,
      inclusions: string,
      exclusions: string,
      category: string,
      duration: string,
      itinerary_type: string,
      booking_deadline?: string
}
interface Itinerary {
  _id: string
  day_no: number
  title: string
  activities: string
}
interface Route {
    departure_country_id: string
    departure_city: string
    destination_country_id: string
    destination_city: string
    sequence: string
  }

interface Hotel {
    name: string
    rate: string
    link: string
  }

interface Schedule {
    departure_date: string,
    base_price: string,
    discounted_price: string,
    airline_name: string,
    departure_flight_no: string,
    return_flight_no: string,
    min_pax: string,
    max_pax: string,
}

type TourSection = typeof SECTION[keyof typeof SECTION]

export const useTourFormStore = defineStore('tour-form', () => {
  const currentSection = ref<TourSection>(SECTION.OVERVIEW)
  const errors = ref<Record<string, string>>({})
  const oldValues = ref<TourWithRelationshipTables>()

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
      booking_deadline: undefined,
    } as TourOverview,

    itineraries: [] as Itinerary[],

    routes: [] as Route[],

    hotels: [] as Hotel[],

    schedules: {
      selected_dates: [],
      is_customized: true,
      def_departure_date: '',
      def_base_price: '',
      def_discounted_price: '',
      def_airline_name: '',
      def_departure_flight_no: '',
      def_return_flight_no: '',
      def_booking_deadline: '',
      def_min_pax: '1',
      def_max_pax: '',
      customize: [] as Schedule[],
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
  // OVERVIEW FUNCTIONS
  // ===============================================================
  function getTourDuration(){
    return parseInt(form.value.overviewItems.duration?? '0')
  }

  function containsItineraryType() {
      return !!form.value.overviewItems.itinerary_type;
  }

  function containsMultipleFlights() {
    return isMultipleFlight(form.value.overviewItems.itinerary_type)
  }

  function containsOneToTwoFlight() {
    const oneRoutes = ['round_trip', 'one_way']
    return oneRoutes.includes(form.value.overviewItems.itinerary_type)
  }

  function fillOverview(tour: Tour){
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
          booking_deadline: tour.booking_deadline?? undefined
      }  
  }

  function isRoundTrip(){
    return form.value.overviewItems.itinerary_type === 'round_trip'
  }


  // ================================================================
  // ITINERARY FUNCTIONS
  // ===============================================================

  function addItineraryDay(){
    if(isExeedItineraryDurationConstaint('max')) return;

    const count = form.value.itineraries.length + 1
    form.value.itineraries.push({
      _id: generateId(),
      day_no: count,
      title:  '',
      activities:'',
    })
  }

  function removeItineraryDay(dayNo: number) {
      if (isExeedItineraryDurationConstaint('min')) return

      form.value.itineraries = form.value.itineraries
          .filter(itinerary => itinerary.day_no !== dayNo)
          .map((itinerary, index) => ({
              ...itinerary,
              day_no: index + 1,
          }))
  }

  function reorderItineraryDays() {
      form.value.itineraries = form.value.itineraries.map(
          (itinerary, index) => ({
              ...itinerary,
              day_no: index + 1,
          })
      )
  }

  function isExeedItineraryDurationConstaint(type: 'min' | 'max'){
      const count = getItineraryCount()
      const duration = getTourDuration()
      const MIN = 0
      if (type == 'min' &&  count < MIN ) return true
      if (type == 'max' &&  count == duration ) return true
      return false
  }

  function getItineraryCount(){
    return form.value.itineraries.length;
  }
  
  function containsItinerary() {
    return form.value.itineraries.length > 0
  }

  function resetItinerary(){
    form.value.itineraries = []
  }

  function fillItinerary(itineraries: NewItinerary[]){
    resetItinerary()
    itineraries.map((itinerary)=>{
       form.value.itineraries.push({
        _id: generateId(),
        day_no: itinerary.day_no,
        title: itinerary.title,
        activities: itinerary.activities
       })
    })
  }




  // ===============================================================
  // ROUTE FUNCTIONS
  // ===============================================================
  function addRoute() {
    const count = getRouteCount()
    if (isOnRouteLimit()) return

    form.value.routes.push({
      departure_country_id: '',
      departure_city: '',
      destination_country_id: '',
      destination_city: '',
      sequence: count.toString()
    })
  }

  function removeRoute(index: number) {
    form.value.routes.splice(index, 1)
  }

  function getRouteCount(){
    return form.value.routes.length
  }

  function containsRoute(){
    return getRouteCount() > 0;
  }

  function resetRoute(){
    form.value.routes = []
  }

  function getRouteTypeLimit(){
    if(containsOneToTwoFlight()) return 2
    return null
  }

  function isOnRouteLimit(){
    const count = getRouteCount()
    const typeLimit = getRouteTypeLimit()
    return (typeLimit && count >= typeLimit)
  }

  function fillRoute(routes: NewRoute[]){
    resetRoute()
    routes.map((route) => {
      form.value.routes.push({
        departure_country_id: route.departure_country_id.toString(),
        destination_country_id: route.destination_country_id.toString(),
        departure_city: route.departure_city,
        destination_city: route.destination_city,
        sequence: route.sequence.toString()
      })
    })
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

  function resetHotel(){
    form.value.hotels = []
  }

  function fillHotel(hotels: NewHotel[]){
    resetHotel()
    hotels.map((hotel) => {
      form.value.hotels.push({
         name:  hotel.name,
         rate: hotel.rate.toString(),
         link: hotel.link?? ''
      })
    })
  }


  // ===============================================================
  // PRICE & SCHEDULE FUNCTIONS
  // ===============================================================
  function clearSelectedDates() {
    form.value.schedules.selected_dates = []
  }

  function resetCustomizeSchedule (){
    form.value.schedules.customize = []
  } 
  const containsSelectedDates = () => {
    return form.value.schedules.selected_dates.length > 0
  }

  function syncSchedules(values: string[]) {
    resetCustomizeSchedule()
    values.map((value)=>{
      form.value.schedules.customize.push({
        departure_date: value,
        departure_flight_no: '',
        return_flight_no: '',
        base_price: '',
        discounted_price: '',
        airline_name: '',
        min_pax: '',
        max_pax: ''

      })
    })
  }

  function handleCustomizeChange(value: boolean) {
    form.value.schedules.is_customized = value

      console.log('Customize:', value)

      if (value) {
          // Customize checked
          console.log('Using customized schedules')
      } else {
          // Customize unchecked
          console.log('Using default schedule details')
      }
  }

  function transformSchedules() {
    const schedules = form.value.schedules

    if (schedules.is_customized) {
      return schedules.customize
    }

    return schedules.selected_dates.map((departureDate) => ({
        base_price: schedules.def_base_price,
        discounted_price: schedules.def_discounted_price,
        min_pax: schedules.def_min_pax,
        max_pax: schedules.def_max_pax,

        departure_date: departureDate,
        booking_deadline: schedules.def_booking_deadline,
        airline_name: schedules.def_airline_name,
        departure_flight_no: schedules.def_departure_flight_no,
        return_flight_no: schedules.def_return_flight_no,
        is_active: true,
      }))
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
  function fillFormWithTourData(tour: TourWithRelationshipTables) {
    fillOverview(tour)
    fillItinerary(tour.itineraries)
    fillRoute(tour.routes)
    fillHotel(tour.hotels)
    backupOldValues(tour)
  }

  function backupOldValues(tour: TourWithRelationshipTables){
      oldValues.value =  tour;
  }

  function resetFormChanges(){
    if (!containsOldFormValues()) return
    fillFormWithTourData(oldValues.value!)
  }

  function containsOldFormValues(){
    return !!oldValues.value
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
    setSection,
    isCurrentSection,


    getTourDuration,
    containsItineraryType,
    containsMultipleFlights,
    containsOneToTwoFlight,
    isRoundTrip,
    


    addItineraryDay,
    removeItineraryDay,
    reorderItineraryDays,
    isExeedItineraryDurationConstaint,
    containsItinerary,
    resetItinerary,


    addRoute,
    removeRoute,
    containsRoute,
    resetRoute,
    isOnRouteLimit,


    containsHotel,
    addHotel,
    removeHotel,


    syncSchedules,
    clearSelectedDates,
    containsSelectedDates,
    handleCustomizeChange,
    transformSchedules,

    
    addImage,
    removeImage,
    setThumbnail,


    fillFormWithTourData,
    resetFormChanges,
    containsOldFormValues,

    hasSectionErrors,
    setErrors,
    clearErrors,
    errors,


    
  }
})