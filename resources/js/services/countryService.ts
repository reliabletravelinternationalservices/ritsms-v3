import api from '@/lib/api'
import type { ApiResponse } from '@/types/api'
import type { Country } from '@/types/country'

export const countryService = {
    async getAll(): Promise<ApiResponse<Country[]>> {
        const { data } = await api.get<ApiResponse<Country[]>>('/countries')

        return data
    },
}