import api from '@/lib/api'
import { ConvoWithParticipants, ConvoWithParticipantsAndLatestMessage, Type } from '@/types/convo/conversation'
import { Message, MessageGroup } from '@/types/convo/message'
import { CursorPaginated, CursorPaginatedFiltersWithSearch } from '@/types/cursor/cursor-paginated'

export const conversationService = {
    async getConvos(
        filters: CursorPaginatedFiltersWithSearch,
        signal?: AbortSignal
    ): 
        Promise<CursorPaginated<ConvoWithParticipantsAndLatestMessage>> {
        const { data: response } = await api.get<{
            data: ConvoWithParticipantsAndLatestMessage[]
            meta: Omit<CursorPaginated<ConvoWithParticipantsAndLatestMessage>, 'data'>
        }>(route('convo.list'), {
            params: filters,
            signal,
        })

        return {
            ...response.meta,
            data: response.data,
        }
    },

    async getPrivateConvoByUserID(
        userID: number,
        convoType: Type,
        signal?: AbortSignal
    ): 
        Promise<{data: ConvoWithParticipantsAndLatestMessage}> {
        const { data: response } = await api.get<{
            data: ConvoWithParticipantsAndLatestMessage
        }>(route('convo.user.private'), {
            params: {
                user_id: userID,
                type: convoType,
            },
            signal,
        })

        return {
            data: response.data
        }
    },


    async updateConvo(
        convoID: number,
        payload: {
            name: string;
            avatar?: File | null;
            removeAvatar?: boolean;
        },
        signal?: AbortSignal
    ): Promise<{data: ConvoWithParticipants}> {
        const formData = new FormData();
        formData.append('name', payload.name);

        if (payload.avatar) {
            formData.append('avatar', payload.avatar);
        }

        if (payload.removeAvatar) {
            formData.append('remove_avatar', '1');
        }

        const { data: response } = await api.post<{
            data: ConvoWithParticipants
        }>(route('convo.update', { convo: convoID }), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            signal,
        });

        return response;
    },


   async getConvoMessages(
        convoID: number,
        filters: CursorPaginatedFiltersWithSearch,
        signal?: AbortSignal
    ): Promise<CursorPaginated<MessageGroup>> {
        const { data: response } = await api.get<{
            data: MessageGroup[]
            meta: Omit<CursorPaginated<MessageGroup>, 'data'>
        }>(route('convo.messages', { convo: convoID }), {
            params: filters,
            signal,
        })

        return {
            ...response.meta,
            data: response.data,
        }
    },

   
    async storeConvo(
        participantsID: number[],
        convoType: Type,
        signal?: AbortSignal
    ): Promise<{ data: ConvoWithParticipantsAndLatestMessage }> {
        const { data: response } = await api.post<{data: ConvoWithParticipantsAndLatestMessage}>(
            route('convo.store'),
            {
                participant_ids: participantsID,
                convo_type: convoType,
            },
            {
                signal,
            }
        )

        return response
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
    },



}



