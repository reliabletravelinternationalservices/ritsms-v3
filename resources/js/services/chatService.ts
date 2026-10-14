import { ChatStatus } from '@/types/chat'
import { Contact } from '@/types/contact'
import { ChatConversation, ChatConvoWithLatestMessage } from '@/types/conversation'
import { CursorPaginated } from '@/types/cursor_paginate'
import axios from 'axios'

const api = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})


export interface ContactFilters {
    search?: string | null
    cursor?: string | null
}

export interface ConvoFilters {
    search?: string | null
    cursor?: string | null
}
// ============


export const chatService = {
    

    // =====================================================
    // ALL CHAT STATUS
    // =====================================================
    async fetchChatStatus(): Promise<ChatStatus> {
        const { data } = await api.get<ChatStatus>(route('admin.inbox.chat.status'));
        return data
    },


    // =====================================================
    // CONVERSATION "CHAT MESSAGE"
    // =====================================================
    async createChat(codes: string[]): Promise<CursorPaginated<ChatConversation>> {
        const { data } = await api.post<CursorPaginated<ChatConversation>>(route('admin.inbox.convo.store'),{
            codes: codes
        });
        return data
    },
    
    async fetchConversations(filters: ConvoFilters): Promise<CursorPaginated<ChatConvoWithLatestMessage>> {
        const { data } = await api.get<CursorPaginated<ChatConvoWithLatestMessage>>(route('admin.inbox.convo'),{
            params: {
                search: filters.search || undefined,
                cursor: filters.cursor || undefined,
            },
        });
        return data
    },
    




    // GET CONTACTS
    async fetchContacts(filters: ContactFilters):  Promise<CursorPaginated<Contact>> {
        const { data } = await api.get<CursorPaginated<Contact>>(route('admin.inbox.contacts'),{
            params: {
                search: filters.search || undefined,
                cursor: filters.cursor || undefined,
            },
        });
        return data
    },
    

}


