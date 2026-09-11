import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { SelectOption } from '@/components/SelectMenu.vue'
import { Client } from '@/types/client'

export interface Country {
    id: number
    name: string
}

export const useReferenceDataStore = defineStore('reference-data', () => {
    const countries = ref<Country[]>([])
    const clients = ref<Client[]>([])

    // COUNTRIES
    function setCountries(data: Country[]) {
        countries.value = data
    }

    const countryOptions = computed<SelectOption[]>(() => {
        return countries.value.map((country) => ({
            label: country.name,
            value: String(country.id),
        }))
    })
    
    function setClients(data: Client[]) {
        clients.value = data
    }

    const clientOptions = computed<SelectOption[]>(() => {
        return clients.value.map((client) => ({
            label: `(${client.code}) ${client.name}`,
            value: String(client.id),
        }))
    })

    return {
        countries,
        countryOptions,
        setCountries,

        clients,
        clientOptions,
        setClients,
    }
})