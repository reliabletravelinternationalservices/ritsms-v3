import api from '@/lib/api'
import { CursorPaginated } from '@/types/cursor/cursor-paginated'
import { Contact } from '@/types/user/contact'



export const userService = {
  
    async searchUserContacts(search?: string, cursor?: string | null): Promise<CursorPaginated<Contact>> {
        const { data: response } = await api.get<{
                    data: Contact[]
                    meta: Omit<CursorPaginated<Contact>, 'data'>
                }>(
            route('users.contacts'),
            {
                params: {
                    search,
                    cursor,
                },
            }
        )

      
        return {
            ...response.meta,
            data: response.data,
        }
    }

}



