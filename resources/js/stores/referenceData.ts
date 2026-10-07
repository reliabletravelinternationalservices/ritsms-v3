import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { SelectOption } from '@/components/SelectMenu.vue'
import { Client } from '@/types/client'
import { Departure, TourWithDepartures } from '@/types/tour'
import { formatDateString } from '@/lib/utils'
import { User } from '@/types'
import { Contact } from '@/types/contact'

export interface Country {
    id: number
    name: string
}

export const useReferenceDataStore = defineStore('reference-data', () => {
    const countries = ref<Country[]>([])
    const clients = ref<Client[]>([])
    const tours = ref<TourWithDepartures[]>([])
    const admins = ref<User[]>([])

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



    //FOR ADMINS
    function setAdmins(data: User[]) {
        admins.value = data
    }



    //FOR CONTACTS
    const contacts = computed<Contact[]>(() => {
        const clientsData = clients.value.map((client, index) => ({
            index,
            id: client.id,
            name: client.name,
            type: 'client' as const,
            email: client.email,
        }))

        const adminsData = admins.value.map((admin, index) => ({
            index: clientsData.length + index,
            id: admin.id,
            name: admin.name,
            type: admin.role,
            email: admin.email,
        }))

        return [...clientsData, ...adminsData]
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

    const getSelectedDeparture = (tourID?: number, departureID?: number) =>
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

        admins,
        setAdmins,

        contacts,

        tours,
        tourOptions,
        setTours,
        getTourDepartureOptions,
        getTourByID,
        getSelectedDeparture,
    }
})