import { computed, ref } from 'vue'

import { Package, PackageFilter } from '@/types/package-api'
import { groupedPackageService, packageService } from '@/services/packageService'
import { PaginatedData } from '@/types/api'
import { GroupedPackage, GroupPackageFilter } from '@/types/grouped-package'

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



export function useGroupPackages() {
    const pagination = ref<PaginatedData<GroupedPackage[]> | null>(null)


    const groupedPackages = ref<GroupedPackage[]>([])

    const loading = ref(false)
    const loadingMore = ref(false)
    const loaded = ref(false)
    const error = ref<string | null>(null)

    const lastFilters = ref<GroupPackageFilter>({})

    const isLastPage = computed(() => {
        if (!pagination.value) return true

        return pagination.value.current_page >= pagination.value.last_page
    })

    const fetchGroupPackages = async (
        filters: GroupPackageFilter = {},
        append = false
    ) => {
        if (append) {
            loadingMore.value = true
        } else {
            loading.value = true
        }

        error.value = null
        
        try {

            lastFilters.value = { ...filters }
            const response = await groupedPackageService.getAll(filters)

            pagination.value = response.data
            
            if (append) {
                groupedPackages.value.push(...response.data.data)
            } else {
                groupedPackages.value = response.data.data
            }

            loaded.value = true
        } catch (err: any) {
            error.value =
                err.response?.data?.message ??
                err.message ??
                'Failed to fetch group packages.'

            if (append) {
                groupedPackages.value = []
                pagination.value = null
            }
        } finally {
            loading.value = false
            loadingMore.value = false
        }
    }

    const refresh = (filters: GroupPackageFilter = {}) => 
        fetchGroupPackages({
            ...filters, 
            page: 1,
        })

    const loadMore = async () => {
        if (!pagination.value || isLastPage.value) return

        await fetchGroupPackages(
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

        await fetchGroupPackages({
            ...lastFilters.value,
            page: pagination.value.current_page + 1,
            perPage: pagination.value.per_page,
        })
    }

    const prevPage = async () => {
        if (!pagination.value?.prev_page_url) return

        await fetchGroupPackages({
            ...lastFilters.value,
            page: pagination.value.current_page - 1,
            perPage: pagination.value.per_page,
        })
    }

    const reset = () => {
        groupedPackages.value = []
        pagination.value = null

        loading.value = false
        loadingMore.value = false
        loaded.value = false
        error.value = null

        lastFilters.value = {}
    }

    return {
        groupedPackages,
        pagination,

        loading,
        loadingMore,
        loaded,
        error,

        isLastPage,
        loadMore,
        nextPage,
        prevPage,

        fetchGroupPackages,
        refresh,
        reset,
    }
}

