import { QuotationStatus } from "@/types/quote";
import { defineStore } from "pinia"
import { ref } from "vue"
import { Client as NewClient } from "@/types/client";
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Tour {
  id:string;
  name:string;
  total_pax:string;
  departure_date:string;
  return_date:string;
  departure_id: string 
}



interface Quotation {
  client: Client;
  tour: Tour;
  status: QuotationStatus;
  valid_until: string;
  subtotal: string;
  discount_total: string;
  tax_total: string;
  grand_total: string;
  notes: string;
  sent_at: string;
  viewed_at: string;
  accepted_at: string;
}

export const useQuotationFormStore = defineStore('quotation-form', () => {
  const errors = ref<Record<string, string>>({})


  const form = ref({  
      client: {} as Client,
      tour: {} as Tour,
      status: '',
      valid_until: '',
      subtotal: '',
      discount_total: '',
      tax_total: '',
      grand_total: '',
      notes: '',
      sent_at: '',
      viewed_at: '',
      accepted_at: '',
  })

  // const hasChanges = computed(() => (
  //   initialFormSnapshot.value !== JSON.stringify(form.value)
  // ))


  
  // CLIENT
  function getClient(id?: number, clients?: NewClient[]) {
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
        id: client?.id?.toString(),
        name: client?.name,
        email: client?.email,
        phone: client?.phone, 
      } as Client
  }
    

  // ==============================================================
  // FILL FORM functions
  // ==============================================================
  function fillForm(client: Client){

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

    getClient,
    
  }
})