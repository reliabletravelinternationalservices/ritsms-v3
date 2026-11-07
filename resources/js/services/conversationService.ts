import api from '@/lib/api'
import { ConvoWithParticipantsAndLatestMessage } from '@/types/convo/conversation'
import { CursorPaginated } from '@/types/cursor/cursor-paginated'

export const conversationService = {
    async getConvos(filters: {
        search?: string
        cursor?: string | null
    }): Promise<CursorPaginated<ConvoWithParticipantsAndLatestMessage>> {
        const { data: response } = await api.get<{
            data: ConvoWithParticipantsAndLatestMessage[]
            meta: Omit<CursorPaginated<ConvoWithParticipantsAndLatestMessage>, 'data'>
        }>(route('convo.list'), {
            params: filters,
        })

        return {
            ...response.meta,
            data: response.data,
        }
    },


}



