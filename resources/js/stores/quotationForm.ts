import { defineStore } from "pinia"
import {  computed, ref } from "vue"
import { Client as NewClient } from "@/types/client";
import { TourWithDepartures } from "@/types/tour";
import { QuotationStatus } from "@/types/quote";
import { Departure as NewDeparture } from "@/types/tour";
interface Client {
  client_id: string;
  primary_client_name: string;
  primary_client_email: string;
  primary_client_phone: string;
}

interface Tour {
  tour_id:string;
  tour_name:string;
  tour_duration: string;
}

interface Departure {
  tour_departure_id:string;
  departure_date:string;
  return_date:string;
  total_pax:string;
  is_custom_date: boolean;
}

interface Other {
  status?: QuotationStatus;
  valid_until: string;
  remarks: string;
  notes: string;

  sent_at: string;
  viewed_at: string;
  accepted_at: string;
}

interface Pricing {
  subtotal: string;
  discount_total: string;
  tax_total: string;
  grand_total: string;

  discount_percentage: string;
  tax_percentage: string;
}

interface Quotation {
  client: Client;
  tour: Tour;
  departure: Departure;
  pricing: Pricing;
  other: Other;
}

export const useQuotationFormStore = defineStore('quotation-form', () => {
  const errors = ref<Record<string, string>>({})


  const form = ref<Quotation>({  
      client: {} as Client,
      tour: {} as Tour,
      departure: { is_custom_date: false } as Departure,
      pricing: {} as Pricing,
      other: {} as Other,
  })

  // const hasChanges = computed(() => (
  //   initialFormSnapshot.value !== JSON.stringify(form.value)
  // ))


  function toggleCustomDate (value?: boolean) {
      if(value === form.value.departure.is_custom_date) return
      clearSelectedDepartureDates()
      form.value.departure.is_custom_date = value!
  }



  function addCustomDate(departureDate: string, returnDate:string) {
    form.value.departure.tour_departure_id = ''
    form.value.departure.departure_date = departureDate
    form.value.departure.return_date = returnDate
  }

  function addDeparture(departure: NewDeparture){
    form.value.departure.tour_departure_id = departure.id.toString()
    form.value.departure.departure_date = departure.departure_date
    form.value.departure.return_date = departure.return_date
    setSubtotalPrice(departure.base_price)
  } 

  function getTourDuration(tour?:TourWithDepartures){
    clearTour()
    if(!tour) return
    form.value.tour.tour_duration = tour.duration.toString()
    form.value.tour.tour_id = tour.id.toString()
    form.value.tour.tour_name = tour.name
  }

function clearSelectedDepartureDates() {
    form.value.departure.tour_departure_id = ''
    form.value.departure.departure_date = ''
    form.value.departure.return_date = ''
}


function clearTour(){
    form.value.tour.tour_duration = ''
    form.value.tour.tour_id = ''
    form.value.tour.tour_name = ''
}

function setSubtotalPrice(price?: number){
  form.value.pricing.subtotal = price?.toString()?? '';
  calculatePricing()
}


function calculatePricing() {
    
    const subtotal = Number(form.value.pricing.subtotal) || 0
    if(!subtotal || subtotal < 0 ){
      clearCalculation()
    }
    const discountPercentage = Number(form.value.pricing.discount_percentage) || 0
    const taxPercentage = Number(form.value.pricing.tax_percentage) || 0

    // Discount
    const discountTotal = subtotal * (discountPercentage / 100)

    // Amount after discount
    const taxableAmount = subtotal - discountTotal

    // Tax
    const taxTotal = taxableAmount * (taxPercentage / 100)

    // Final total
    const total = taxableAmount + taxTotal

    form.value.pricing.discount_total = discountTotal.toString()
    form.value.pricing.tax_total = taxTotal.toString()
    form.value.pricing.grand_total = total.toString()
}


function clearCalculation(){
    form.value.pricing.subtotal= ''
    form.value.pricing.discount_total = ''
    form.value.pricing.tax_total =''
    form.value.pricing.grand_total =''

}
  // CLIENT
  function getSelectedClient(id?: number, clients?: NewClient[]) {
      if (!clients?.length) {
          form.value.client = {} as Client
          return
      }

      if (!id) {
          form.value.client = {} as Client
          return 
      }

      const client = clients.find(client => client.id === id);

      form.value.client = {
        client_id: client?.id?.toString(),
        primary_client_name: client?.name,
        primary_client_email: client?.email,
        primary_client_phone: client?.phone, 
      } as Client
  }
  

  const isCustomDate = computed<boolean>(() => form.value.departure.is_custom_date)
  const hasSelectedTour  = computed<boolean>(()=> !!form.value.tour.tour_id)
  const hasSelectedClient = computed<boolean>(()=> !!form.value.client.client_id)

  // ==============================================================
  // FILL FORM functions
  // ==============================================================
  function fillForm(){
    
    resetForm()
    
    // const basic = {
    //   type: client.type,
    //   name: client.name,
    //   email: client.email,
    //   phone: client.phone,
    //   address: client.address,
    //   gender: client.gender,
    // } as BasicInformation

    // const classification = {
    //   status: client.status,
    //   source: client.source
    // } as Classification

    // const profile = {
    //   facebook_link: client.facebook_link,
    //   website_link: client.website_link
    // } as Profile

    // const followup = {
    //   last_contacted: client.last_contacted_at,
    //   notes: client.note,
    //   accept_marketing: client.accept_marketing,
    // } as Followup

    // form.value.basicInformation = basic;
    // form.value.classification = classification;
    // form.value.followup = followup;
    // form.value.profile = profile;

  }

  function resetForm(){
    // form.value.basicInformation = {} as BasicInformation
    // form.value.classification = {} as Classification
    // form.value.followup = {} as Followup
    // form.value.profile = {} as Profile
  }
  

  // ==============================================================
  // validation functions
  // ==============================================================

  function setErrors(value: Record<string, string>) {
      errors.value = value
  }

  function clearErrors() {
      errors.value = {}
  }

  return {
    form,
    fillForm,
    setErrors,
    clearErrors,
    errors,

    getSelectedClient,
    hasSelectedClient,
    // 
    toggleCustomDate,
    isCustomDate,
    addDeparture,

    hasSelectedTour,
    getTourDuration,
    addCustomDate,
    setSubtotalPrice,
    calculatePricing,
  }
})