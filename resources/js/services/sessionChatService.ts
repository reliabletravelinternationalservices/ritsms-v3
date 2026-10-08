import { ChatSession, ChatSessionWithToken, Message, ValidationResponse } from '@/types/chat'
import type { CountryFilter, CountryWithLocations } from '@/types/country'
import axios from 'axios'

const api = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})



// ============


export const sessionChatService = {
    async fetchChatByUUID(uuid:string): Promise<ChatSession> {
        const { data } = await api.get<ChatSession>(route(''))
        return data
    },
    
    async createChat(): Promise<ChatSessionWithToken> {
        const { data } = await api.post<ChatSessionWithToken>(route('chat.session.store'))
        return data
    },
    


    async fetchChatMessagesByUUID(uuid:string, token: string): Promise<Message[]> {
        const { data } = await api.get<Message[]>(route('chat.session.messages', {
            chatSession: uuid,
        }), 
        {
            headers: {
                'X-Chat-Token': token,
            },
        })
        return data
    },



    async validateSessionChat(
        uuid: string,
        token: string
    ): Promise<ValidationResponse> {
        const { data } = await api.post<ValidationResponse>(
            route('chat.session.validate', {
                chatSession: uuid,
            }),
            {},
            {
                headers: {
                    'X-Chat-Token': token,
                },
            }
        )

        return data
    }


}




