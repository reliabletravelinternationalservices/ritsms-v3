import api from '@/lib/api'
import { CursorPaginated, CursorPaginatedFiltersWithSearch } from '@/types/cursor/cursor-paginated'
import { Contact } from '@/types/user/contact'



export const userService = {
  
    async searchUserContacts(
        filters: CursorPaginatedFiltersWithSearch,
        signal?: AbortSignal    
    ): Promise<CursorPaginated<Contact>> {
        const { data: response } = await api.get<{
                    data: Contact[]
                    meta: Omit<CursorPaginated<Contact>, 'data'>
                }>(
            route('users.contacts'),
            {
                params: filters,
                signal
            }
        )

      
        return {
            ...response.meta,
            data: response.data,
        }
    }

}



