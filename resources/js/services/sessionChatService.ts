import { ChatSessionWithLatestMessage, ChatSessionWithToken, Message, ValidationResponse } from '@/types/chat'
import { CursorPaginated } from '@/types/cursor_paginate'
import axios from 'axios'

const api = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})



// ============


export const sessionChatService = {
    
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


    async storeChatMessage(uuid:string, token: string, payload: {
        message: string;
    }): Promise<Message[]> {
        const { data } = await api.post<Message[]>(route('chat.session.message.store', {
            chatSession: uuid,
        }), 
        {
            ...payload
        },
        {
            headers: {
                'X-Chat-Token': token,
            },
        })
        return data
    },



    async validateSession(uuid: string, token: string): Promise<ValidationResponse> {
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
    },

    async markChatMessagesAsRead(uuid: string, token: string): Promise<number[]> {
        const { data } = await api.post<number[]>(
            route('chat.session.messages.read', {
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
    },


    //-----------------------------
    async fetchChats(): Promise<CursorPaginated<ChatSessionWithLatestMessage>> {
        const { data } = await api.get<CursorPaginated<ChatSessionWithLatestMessage>>(route('admin.inbox.sessions'))
        return data
    },

    async fetchChatMessagesToAdminByUUID(uuid:string): Promise<Message[]> {
        const { data } = await api.get<Message[]>(route('admin.inbox.sessions.show', {
            uuid: uuid
        }))
        return data
    },


    async markSessionChatMessagesAsRead(uuid: string): Promise<number[]> {
        const { data } = await api.post<number[]>(
            route('admin.inbox.session.messages.read', {
                uuid: uuid,
            }),
        )

        return data
    },

    

}




