import api from '@/lib/api'
import type { ApiResponse } from '@/types/api'
import type { CountryFilter, CountryWithLocations } from '@/types/country'

export const countryService = {
    async getAll(filters: CountryFilter = {}): Promise<ApiResponse<CountryWithLocations[]>> {
        const { data } = await api.get<ApiResponse<CountryWithLocations[]>>('/countries', {
            params: filters
        })
        return data
    },


}




