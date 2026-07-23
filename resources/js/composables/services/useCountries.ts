import { computed, ref } from 'vue'

import { countryService } from '@/services/countryService'

import type { PaginatedData } from '@/types/api'
import type { CountryFilter, CountryWithLocations } from '@/types/country'

export function useCountry() {
    const countries = ref<CountryWithLocations[]>([])
    const pagination = ref<PaginatedData<CountryWithLocations[]> | null>(null)

    const loading = ref(false)
    const loadingMore = ref(false)
    const loaded = ref(false)
    const error = ref<string | null>(null)

    const lastFilters = ref<CountryFilter>({})

    const isLastPage = computed(() => {
        if (!pagination.value) return true

        return pagination.value.current_page >= pagination.value.last_page
    })

    const fetchCountries = async (
        filters: CountryFilter = {},
        append = false
    ) => {
        append
            ? (loadingMore.value = true)
            : (loading.value = true)

        error.value = null

        try {
            lastFilters.value = { ...filters }

            const response = await countryService.getAll(filters)

            pagination.value = response.data

            if (append) {
                countries.value.push(...response.data.data)
            } else {
                countries.value = response.data.data
            }

            loaded.value = true
        } catch (err: any) {
            error.value =
                err.response?.data?.message ??
                err.message ??
                'Failed to fetch countries.'

            if (!append) {
                countries.value = []
                pagination.value = null
            }
        } finally {
            loading.value = false
            loadingMore.value = false
        }
    }

    const refresh = (filters: CountryFilter = {}) =>
        fetchCountries({
            ...lastFilters.value,
            page: 1,
        })

    const loadMore = async () => {
        if (!pagination.value || isLastPage.value) return

        await fetchCountries(
            {
                ...lastFilters.value,
                page: pagination.value.current_page + 1,
                perPage: pagination.value.per_page,
            },
            true
        )
    }

    const nextPage = async () => {
        if (!pagination.value?.next_page_url) return

        await fetchCountries({
            ...lastFilters.value,
            page: pagination.value.current_page + 1,
            perPage: pagination.value.per_page,
        })
    }

    const prevPage = async () => {
        if (!pagination.value?.prev_page_url) return

        await fetchCountries({
            ...lastFilters.value,
            page: pagination.value.current_page - 1,
            perPage: pagination.value.per_page,
        })
    }

    const reset = () => {
        countries.value = []
        pagination.value = null

        loading.value = false
        loadingMore.value = false
        loaded.value = false
        error.value = null

        lastFilters.value = {}
    }

    return {
        countries,
        pagination,

        loading,
        loadingMore,
        loaded,
        error,

        isLastPage,

        fetchCountries,
        refresh,
        loadMore,
        nextPage,
        prevPage,
        reset,
    }
}