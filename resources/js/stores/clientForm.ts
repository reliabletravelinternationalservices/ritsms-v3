import { ClientGender, ClientSource, ClientStatus, ClientType } from "@/types/client";
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

    setErrors,
    clearErrors,
    errors,


    
  }
})