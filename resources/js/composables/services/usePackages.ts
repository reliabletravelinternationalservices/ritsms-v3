import { ref } from 'vue'

import { Package } from '@/types/package-api'
import { inboundPackageService, outboundPackageService } from '@/services/packageService'

export function useInboundPackages() {
    const packages = ref<Package[]>([])
    const loading = ref(false)
    const loaded = ref(false)
    const error = ref<string | null>(null)

    const fetchPackages = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await inboundPackageService.getAll()

            packages.value = response.data
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

    const refresh = () => fetchPackages()

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


export function useOutboundPackages() {
    const packages = ref<Package[]>([])
    const loading = ref(false)
    const loaded = ref(false)
    const error = ref<string | null>(null)

    const fetchPackages = async () => {
        loading.value = true
        error.value = null

        try {
            const response = await outboundPackageService.getAll()

            packages.value = response.data
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

    const refresh = () => fetchPackages()

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