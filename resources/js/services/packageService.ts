import api from '@/lib/api'
import type { ApiResponse } from '@/types/api'
import { Package, PackageFilter } from '@/types/package-api'


export const packageService = {
    async getAll(filters: PackageFilter = {}): Promise<ApiResponse<Package[]>> {
        const { data } = await api.get<ApiResponse<Package[]>>('/packages', { params: filters })
        return data
    },
}
