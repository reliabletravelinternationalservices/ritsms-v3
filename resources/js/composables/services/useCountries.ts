import { ref } from 'vue'
import { countryService } from '@/services/countryService'
import type { CountryFilter, CountryWithLocations } from '@/types/country'
import { PaginatedData } from '@/types/api'

export function useCountry() {
    const paginatedCountries = ref<PaginatedData<CountryWithLocations[]>>()
    const countries = ref<CountryWithLocations[]>([])
    const loading = ref(false)
    const loaded = ref(false)
    const error = ref<string | null>(null)

    const fetchCountries = async (filters: CountryFilter = {}) => {
        loading.value = true
        error.value = null

        try {
            const response = await countryService.getAll(filters)
            paginatedCountries.value = response.data
            countries.value = response.data.data
            loaded.value = true
        } catch (err: any) {
            error.value =
                err.response?.data?.message ??
                err.message ??
                'Failed to fetch countries.'

            countries.value = []
        } finally {
            loading.value = false
        }
    }

    const refresh = (filters: CountryFilter = {}) => fetchCountries(filters)

    const reset = () => {
        countries.value = []
        loading.value = false
        loaded.value = false
        error.value = null
    }

    return {
        countries,

        loading,
        loaded,
        error,

        fetchCountries,
        refresh,
        reset,
    }
}