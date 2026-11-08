import api from '@/lib/api'
import { ConvoWithParticipantsAndLatestMessage } from '@/types/convo/conversation'
import { Message } from '@/types/convo/message'
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

    async getConvoMessages(convoID: number, filters: {
        cursor?: string | null
    }): Promise<CursorPaginated<Message>> {
        const { data: response } = await api.get<{
            data: Message[]
            meta: Omit<CursorPaginated<Message>, 'data'>
        }>(route('convo.messages', {convo: convoID}), {
            params: filters,
        })

        return {
            ...response.meta,
            data: response.data,
        }
    },


    async storeConvoMessage(
        convoID: number,
        payload: {
            client_id: string;
            message: string;
            attachments: File[];
        }
    ): Promise<Message> {
        const { data: response } = await api.post<{data: Message}>(
            route('convo.message.store', { convo: convoID }),
            payload
        )

        return response.data
    }


}



