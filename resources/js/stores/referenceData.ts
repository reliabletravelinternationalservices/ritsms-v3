import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { SelectOption } from '@/components/SelectMenu.vue'
import { Client } from '@/types/client'
import { Departure, TourWithDepartures } from '@/types/tour'
import { formatDateString } from '@/lib/utils'

export interface Country {
    id: number
    name: string
}

export const useReferenceDataStore = defineStore('reference-data', () => {
    const countries = ref<Country[]>([])
    const clients = ref<Client[]>([])
    const tours = ref<TourWithDepartures[]>([])

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
    



    // FOR CLIENTS
    function setClients(data: Client[]) {
        clients.value = data
    }

    const clientOptions = computed<SelectOption[]>(() => {
        return clients.value.map((client) => ({
            label: `(${client.code}) ${client.name}`,
            value: String(client.id),
        }))
    })


    // FOR TOURS
    function setTours(data: TourWithDepartures[]){
        tours.value = data
    }
    

    const tourOptions = computed<SelectOption[]>(() => {
        return tours.value.map((tour) => ({
            label: `(${tour.code}) ${tour.name}`,
            value: String(tour.id),
        }))
    })

    const getTourDepartureOptions = (id?: number) =>
        computed<SelectOption[]>(() => {
            if(!id) return []
            
            const tour = tours.value.find((tour) => tour.id === id)

            return (
                tour?.departures?.map((dep) => ({
                    label: formatDateString(dep.departure_date),
                    value: String(dep.id),
                })) ?? [] as SelectOption[]
            )
        })

    const getTourByID = (id?: number) =>
        computed<TourWithDepartures | undefined>(() => tours.value.find((tour) => tour.id === id) as TourWithDepartures)

    const getSelectedDeparturePrice = (tourID?: number, departureID?: number) =>
        computed<Departure | undefined>(() => {
            if (!tourID || !departureID) return undefined

            const tour = tours.value.find(tour => tour.id === tourID)
            return tour?.departures.find(
                departure => departure.id === departureID
            )
        }) 

    return {
        countries,
        countryOptions,
        setCountries,

        clients,
        clientOptions,
        setClients,

        tours,
        tourOptions,
        setTours,
        getTourDepartureOptions,
        getTourByID,
        getSelectedDeparturePrice,
    }
})