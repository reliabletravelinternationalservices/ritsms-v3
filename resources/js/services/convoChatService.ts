import { ApiResponse } from '@/types/api'
import { Contact } from '@/types/contact'
import { ChatConversation } from '@/types/conversation'
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


// ============


export const convoChatService = {
    
    async createChat(codes: string[]): Promise<CursorPaginated<ChatConversation>> {
        const { data } = await api.post<CursorPaginated<ChatConversation>>(route('admin.inbox.convo.store'),{
            codes: codes
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


