import { Client, ClientGender, ClientSource, ClientStatus, ClientType } from "@/types/client";
import { defineStore } from "pinia"
import { ref } from "vue"

interface  BasicInformation {
    type: ClientType;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    gender: ClientGender;
}

interface Classification {
   status: ClientStatus;
   source: ClientSource;
}

interface Profile {
  facebook_link?: string;
  website_link?: string;
}

interface Followup  {
  last_contacted?: string;
  notes?: string;
  accept_marketing: boolean;
}

export const useClientFormStore = defineStore('client-form', () => {
  const errors = ref<Record<string, string>>({})


  const form = ref({
      basicInformation: {} as BasicInformation,
      classification: {} as Classification,
      profile: {} as Profile,
      followup:  {} as Followup,
  })

  // const hasChanges = computed(() => (
  //   initialFormSnapshot.value !== JSON.stringify(form.value)
  // ))


  
  

  // ==============================================================
  // FILL FORM functions
  // ==============================================================
  function fillForm(client: Client){

    resetForm()
    
    const basic = {
      type: client.type,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      gender: client.gender,
    } as BasicInformation

    const classification = {
      status: client.status,
      source: client.source
    } as Classification

    const profile = {
      facebook_link: client.facebook_link,
      website_link: client.website_link
    } as Profile

    const followup = {
      last_contacted: client.last_contacted_at,
      notes: client.note,
      accept_marketing: client.accept_marketing,
    } as Followup

    form.value.basicInformation = basic;
    form.value.classification = classification;
    form.value.followup = followup;
    form.value.profile = profile;

  }

  function resetForm(){
    form.value.basicInformation = {} as BasicInformation
    form.value.classification = {} as Classification
    form.value.followup = {} as Followup
    form.value.profile = {} as Profile
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


    
  }
})