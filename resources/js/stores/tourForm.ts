// stores/tour-form.ts

import { generateId, isEmpty, isMultipleFlight } from '@/lib/utils'
import { Departure, Tour, TourWithRelationshipTables } from '@/types/tour'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Itinerary as NewItinerary, Route as NewRoute,  Hotel as NewHotel }  from '@/types/tour'
import { MediaAsset } from '@/types/media-v2'

const SECTION = {
  OVERVIEW: 'overview',
  ITINERARIES: 'itineraries',
  ROUTES: 'routes',
  HOTELS: 'hotels',
  PRICE_AND_SCHEDULE: 'schedules',
  ASSETS_AND_IMAGES: 'assets-and-images',
} as const


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
  activities?: string
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
    link?: string
  }

interface Schedule{
      selected_dates: string[]
      is_customized: boolean,
      def_departure_date: string,
      def_base_price: string,
      def_discounted_price: string,
      def_airline_name: string,
      def_departure_flight_no: string,
      def_return_flight_no: string,
      def_min_pax: string,
      def_max_pax?: string,
      customize: CustomSchedule[]
}
interface CustomSchedule {
    departure_date: string,
    return_date: string,
    base_price: string,
    discounted_price: string,
    airline_name: string,
    departure_flight_no: string,
    return_flight_no: string,
    min_pax: string,
    max_pax?: string,
}


interface Asset {
  images: MediaAsset[],
  video?:  MediaAsset
}

type TourSection = typeof SECTION[keyof typeof SECTION]

export const useTourFormStore = defineStore('tour-form', () => {
  const currentSection = ref<TourSection>(SECTION.OVERVIEW)
  const errors = ref<Record<string, string>>({})
  const oldValues = ref<TourWithRelationshipTables>()

  const form = ref({
    overviewItems: {} as TourOverview,

    itineraries: [] as Itinerary[],

    routes: [] as Route[],

    hotels: [] as Hotel[],

    schedules: {} as Schedule,

    assets: {
        images: [],
        video: undefined,
    } as Asset
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

  function transformOverview() {
    const data = form.value.overviewItems

    return {
      ...data,
      booking_deadline: data.booking_deadline ?? null,
    }
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

  function transformItinerary() {
    return form.value.itineraries.map((itinerary) => ({
      day_no: itinerary.day_no,
      title: itinerary.title,
      activities: itinerary.activities ?? null,
    }))
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

  function transformRoute(){
    return form.value.routes
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

  function transformHotel(){
    return form.value.hotels.map((hotel) => ({
        name: hotel.name,
        rate: hotel.rate,
        link: hotel.link?? null
    }))
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
    return form.value.schedules.selected_dates && form.value.schedules.selected_dates.length > 0
  }

  function syncSchedules(values: string[]) {
    resetCustomizeSchedule()
    values.map((value)=>{
      form.value.schedules.customize.push({
        departure_date: value,
        return_date: '',
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
  }

  function transformSchedules() {
    const schedules = form.value.schedules

    if (!schedules.selected_dates)  return
    if (schedules.is_customized) {
      return schedules.customize.map((sched)=>({
         base_price: sched.base_price,
          discounted_price: isEmpty(sched.discounted_price)
            ? null :  sched.discounted_price,
          min_pax: sched.min_pax!,
          max_pax: isEmpty(sched.max_pax)
            ? null : sched.max_pax!,

          departure_date: sched.departure_date,
          return_date:  getReturnDate(sched.departure_date),
          airline_name: sched.airline_name,
          departure_flight_no: sched.departure_flight_no,
          return_flight_no: sched.return_flight_no,
          is_active: true,
      }))
    }

    return schedules.selected_dates.map((departureDate) => ({
        base_price: schedules.def_base_price,
        discounted_price: isEmpty(schedules.def_discounted_price)
            ? null :  schedules.def_discounted_price!,
        min_pax: schedules.def_min_pax,
        max_pax: isEmpty(schedules.def_max_pax)
            ? null :  schedules.def_max_pax!,

        departure_date: departureDate,
        return_date:  getReturnDate(departureDate),
        airline_name: schedules.def_airline_name,
        departure_flight_no: schedules.def_departure_flight_no,
        return_flight_no: schedules.def_return_flight_no,
        is_active: true,
      }))
  }

  function getReturnDate(date: string) {
    const duration = getTourDuration()

    const departureDate = new Date(date)
    departureDate.setDate(departureDate.getDate() + duration - 1)

    return departureDate.toISOString().split('T')[0]
  }

  function fillSchedule(departures: Departure[]) {
    if (!departures.length) {
      return {
        selected_dates: [],
        is_customized: false,
        def_departure_date: '',
        def_base_price: '',
        def_discounted_price: '',
        def_airline_name: '',
        def_departure_flight_no: '',
        def_return_flight_no: '',
        def_min_pax: '',
        def_max_pax: '',
        customize: [],
      }
    }

    const first = departures[0]

    const isCustomized = isCustomizeSchedule(departures)

    form.value.schedules =  {
      selected_dates: departures.map(
        departure => departure.departure_date
      ),

      is_customized: isCustomized,

      def_departure_date: first.departure_date,
      def_base_price: String(first.base_price),
      def_discounted_price: first.discounted_price != null
        ? String(first.discounted_price)
        : '',

      def_airline_name: first.airline_name,
      def_departure_flight_no: first.departure_flight_no,
      def_return_flight_no: first.return_flight_no,

      def_min_pax: String(first.min_pax),
      def_max_pax: first.max_pax != null
        ? String(first.max_pax)
        : '',

      customize: departures.map(departure => ({
        departure_date: departure.departure_date,
        return_date: departure.return_date,

        base_price: String(departure.base_price),
        discounted_price: departure.discounted_price != null
          ? String(departure.discounted_price)
          : '',

        min_pax: String(departure.min_pax),
        max_pax: departure.max_pax != null
          ? String(departure.max_pax)
          : '',

        airline_name: departure.airline_name,
        departure_flight_no: departure.departure_flight_no,
        return_flight_no: departure.return_flight_no,
      })),
    }
  }


  function isCustomizeSchedule(departures: Departure[]){
    const first = departures[0]

    return departures.some((departure) =>
      departure.base_price !== first.base_price ||
      departure.discounted_price !== first.discounted_price ||
      departure.min_pax !== first.min_pax ||
      departure.max_pax !== first.max_pax ||
      departure.airline_name !== first.airline_name ||
      departure.departure_flight_no  !== first.departure_flight_no ||
      departure.return_flight_no !== first.return_flight_no
    )
  }

  
  // ===============================================================
  // IMAGES & ASSETS FUNCTIONS
  // ===============================================================
  
  function addImages(files: File[]) {
      const images: MediaAsset[] = files.map((file) => ({
          key: generateId(),
          status: 'new',
          file,
      }))

      form.value.assets.images.push(...images)
  }

  function removeImage(index: number) {
    form.value.assets.images.splice(index, 1)
  }

  function addVideo(file: File){
    const video: MediaAsset = {
      key: generateId(),
      status: 'new',
      file: file
    }

    form.value.assets.video = video
  }

  function removeVideo(){
    form.value.assets.video = undefined
  }

  function  transformAsset(){
    return form.value.assets
  }


  // ==============================================================
  // FILL FORM WITH EXISTING TOUR DATA
  // ==============================================================
  function fillFormWithTourData(tour: TourWithRelationshipTables) {
    fillOverview(tour)
    fillItinerary(tour.itineraries)
    fillRoute(tour.routes)
    fillHotel(tour.hotels)
    fillSchedule(tour.departures)
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

    transformOverview,


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
    transformItinerary,


    addRoute,
    removeRoute,
    containsRoute,
    resetRoute,
    isOnRouteLimit,
    transformRoute,


    containsHotel,
    addHotel,
    removeHotel,
    transformHotel,


    syncSchedules,
    clearSelectedDates,
    containsSelectedDates,
    handleCustomizeChange,
    transformSchedules,
    fillSchedule,

    
    addImages,
    removeImage,
    addVideo,
    removeVideo,
    transformAsset,


    fillFormWithTourData,
    resetFormChanges,
    containsOldFormValues,

    hasSectionErrors,
    setErrors,
    clearErrors,
    errors,


    
  }
})