import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { SelectOption } from '@/components/SelectMenu.vue'

export interface Country {
    id: number
    name: string
}

export const useReferenceDataStore = defineStore('reference-data', () => {
    const countries = ref<Country[]>([])

    function setCountries(data: Country[]) {
        countries.value = data
    }

    const countryOptions = computed<SelectOption[]>(() => {
        return countries.value.map((country) => ({
            label: country.name,
            value: String(country.id),
        }))
    })

    return {
        countries,
        countryOptions,
        setCountries,
    }
})