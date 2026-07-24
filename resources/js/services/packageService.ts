import api from '@/lib/api'
import type { ApiResponse } from '@/types/api'
import { GroupedPackageWithPackages, GroupPackageFilter } from '@/types/grouped-package'
import { Package, PackageFilter } from '@/types/package-api'


export const packageService = {
    async getAll(filters: PackageFilter = {}): Promise<ApiResponse<Package[]>> {
        const { data } = await api.get<ApiResponse<Package[]>>('/packages', { params: filters })
        return data
    },
}


export const groupedPackageService = {
    async getAll(filters: GroupPackageFilter = {}): Promise<ApiResponse<GroupedPackageWithPackages[]>> {
        const { data } = await api.get<ApiResponse<GroupedPackageWithPackages[]>>('/packages/groups', { params: filters })
        return data
    },
}