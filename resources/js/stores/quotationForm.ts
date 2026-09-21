import { defineStore } from "pinia"
import {  computed, ref } from "vue"
import { Client as NewClient } from "@/types/client";
import { TourWithDepartures } from "@/types/tour";
import { QuotationStatus, Quote } from "@/types/quote";
import { Departure as NewDeparture } from "@/types/tour";
interface Client {
  client_id: string;
  primary_client_name: string;
  primary_client_email: string;
  primary_client_phone: string;
}

interface Tour {
  tour_id:string;
  tour_code:string;
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
  const initialFormSnapshot = ref('')

  const form = ref<Quotation>({  
      client: {} as Client,
      tour: {} as Tour,
      departure: { is_custom_date: false } as Departure,
      pricing: {
        subtotal: '0',
        discount_total: '0',
        tax_total: '0',
        grand_total: '0'
      } as Pricing,
      other: {} as Other,
  })

  const hasChanges = computed(() => (
    initialFormSnapshot.value !== JSON.stringify(form.value)
  ))

  function clearHasChanges(){
    initialFormSnapshot.value = ''
  }

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
    form.value.tour.tour_code = tour.code.toString()
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
    form.value.tour.tour_code = ''
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
  function fillForm(quote: Quote) {
    clearForm()
    fillClient(quote)
    fillTour(quote)
    fillDeparture(quote)
    fillPricing(quote)
    fillOther(quote)
    initialFormSnapshot.value = JSON.stringify(form.value)
}

function fillClient(quote:Quote){
      const client = {
        client_id: quote.client_id?.toString()?? '',
        primary_client_name: quote.primary_client_name,
        primary_client_email: quote.primary_client_email,
        primary_client_phone: quote.primary_client_phone,
    } as Client

    form.value.client=client
}

  function fillTour(quote: Quote){
    const tour = {
        tour_id: quote.tour_id?.toString()?? '',
        tour_code: quote.code.toString(),
        tour_name: quote.tour_name,
        tour_duration: quote.tour_duration.toString()
    } as Tour

    form.value.tour=tour
  }

  function fillDeparture(quote: Quote){
      const departure = {
        tour_departure_id: quote.tour_departure_id?.toString()??'',
        departure_date: quote.departure_date,
        return_date: quote.return_date,
        total_pax: quote.total_pax.toString(),
        is_custom_date: !quote.tour_departure_id
    } as Departure

    form.value.departure = departure
  }

  function fillPricing(quote: Quote){
      const subtotal = Number(quote.subtotal) || 0
      const discountTotal = Number(quote.discount_total) || 0
      const taxTotal = Number(quote.tax_total) || 0

      // Discount percentage
      const discountPercentage = subtotal > 0
          ? (discountTotal / subtotal) * 100
          : 0

      // Tax is calculated after discount
      const taxableAmount = subtotal - discountTotal

      const taxPercentage = taxableAmount > 0
          ? (taxTotal / taxableAmount) * 100
          : 0

      const pricing = {
          subtotal: subtotal.toString(),
          discount_total: discountTotal.toString(),
          tax_total: taxTotal.toString(),
          discount_percentage: discountPercentage.toString(),
          tax_percentage: taxPercentage.toString(),
          grand_total: quote.grand_total.toString(),
      } as Pricing

      form.value.pricing=pricing
  }

  function fillOther(quote:Quote){
    const other = {
      status: quote.status,
      valid_until: quote.valid_until,
      remarks:quote.remarks,
      notes: quote.notes,

      sent_at: quote.sent_at,
      viewed_at:quote.viewed_at,
      accepted_at:quote.accepted_at
    } as Other

    form.value.other=other
  }

  function clearForm(){
      form.value.client = {} as Client
      form.value.tour = {} as Tour
      form.value.departure = { is_custom_date: false } as Departure
      form.value.pricing = {
        subtotal: '0',
        discount_total: '0',
        tax_total: '0',
        grand_total: '0'
      } as Pricing
      form.value.other = {} as Other
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
    clearForm,
    hasChanges,
    clearHasChanges,

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