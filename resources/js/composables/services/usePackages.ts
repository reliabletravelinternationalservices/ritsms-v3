import { ref } from 'vue'

import { Package, PackageFilter } from '@/types/package-api'
import { packageService } from '@/services/packageService'
import { PaginatedData } from '@/types/api'

export function usePackages() {
    const paginatedPackages = ref<PaginatedData<Package[]>>()
    const packages = ref<Package[]>([])
    
    const loading = ref(false)
    const loaded = ref(false)
    const error = ref<string | null>(null)

    const fetchPackages = async (filters: PackageFilter = {}) => {
        loading.value = true
        error.value = null

        try {
            const response = await packageService.getAll( filters)

            paginatedPackages.value = response.data
            packages.value = response.data.data
            loaded.value = true
        } catch (err: any) {
            error.value =
                err.response?.data?.message ??
                err.message ??
                'Failed to fetch packages.'

            packages.value = []
        } finally {
            loading.value = false
        }
    }

    const refresh = (filters: PackageFilter = {}) => fetchPackages(filters)

    const reset = () => {
        packages.value = []
        loading.value = false
        loaded.value = false
        error.value = null
    }

    return {
        packages,

        loading,
        loaded,
        error,

        fetchPackages,
        refresh,
        reset,
    }
}
