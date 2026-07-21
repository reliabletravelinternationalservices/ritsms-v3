import api from '@/lib/api'
import type { ApiResponse } from '@/types/api'
import { Package } from '@/types/package-api'


// export const packageService = {
//     async getAll(): Promise<ApiResponse<Package[]>> {
//         const { data } = await api.get<ApiResponse<Package[]>>('/packages')

//         return data
//     },
// }


export const inboundPackageService = {
    async getAll(): Promise<ApiResponse<Package[]>> {
        const { data } = await api.get<ApiResponse<Package[]>>('/packages/inbound')

        return data
    },
}
export const outboundPackageService = {
    async getAll(): Promise<ApiResponse<Package[]>> {
        const { data } = await api.get<ApiResponse<Package[]>>('/packages/outbound')

        return data
    },
}