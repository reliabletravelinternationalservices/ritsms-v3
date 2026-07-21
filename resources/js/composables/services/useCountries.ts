import { ref } from 'vue'
import { countryService } from '@/services/countryService'
import type { Country } from '@/types/country'

export function useCountries() {
    const countries = ref<Country[]>([])
    const loading = ref(false)
    const loaded = ref(false)
    const error = ref<string | null>(null)

    const fetchCountries = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await countryService.getAll()

            countries.value = response.data
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

    const refresh = () => fetchCountries()

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