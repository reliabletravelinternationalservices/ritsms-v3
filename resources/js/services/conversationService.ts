import api from '@/lib/api'
import { ConvoWithParticipantsAndLatestMessage } from '@/types/convo/conversation'
import { CursorPaginated } from '@/types/cursor/cursor-paginated'

export const conversationService = {
    async getConvos(filters: {
        search?: string
        cursor?: string | null
    }): Promise<CursorPaginated<ConvoWithParticipantsAndLatestMessage>> {
        const { data } = await api.get<CursorPaginated<ConvoWithParticipantsAndLatestMessage>>(route('convo.list'), {
            params: filters
        })
        return data
    },


}




