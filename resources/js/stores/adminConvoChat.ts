import { defineStore } from "pinia"
import {  computed, ref } from "vue"
import { chatService as CCS, ContactFilters, ConvoFilters } from "@/services/chatService";
import { ChatConvoWithLatestMessage, Message } from "@/types/conversation";
import { CursorPaginated } from "@/types/cursor_paginate";


export const useAdminConvoChat = defineStore('admin-convo-chat', () => {

    const conversations = ref<CursorPaginated<ChatConvoWithLatestMessage>>();
    const messages = ref<CursorPaginated<Message>>();
    const selectedID = ref<number | null>(null)


    const loadingChats = ref(false);
    const loadingMessages = ref(false);
 

        
    //==============================
    // WATCHERS
    //============================


    
    //=====================================
    // COMPUTED
    //=====================================
    const convoDataList= computed(() => conversations.value?.data?? []);

  

    //=====================================
    // FUNCTIONS
    //=====================================
    
    const initializeChat=async()=>{
        await getConversations({});
    }

    const getContactList = async (filters: ContactFilters)=>{
        const paginatedContacts = await fetchContacts(filters);
        return paginatedContacts
    }

    const createNewConvo = async (codes: string[])=>{
        await createConvo(codes);
    }

    const getConversations = async(filters: ConvoFilters)=>{
        const data = await fetchConvos(filters);
        conversations.value = data;
    }

    const selectConvo = (id: number)=>{
        selectedID.value = id;
    }

    const isSelectedConvoID=(id:number)=>{
        return id === selectedID.value;
    }
   

    // ==========================================
    // API SERVICE FUNCTION 
    // ==========================================


    async function fetchContacts(filters: ContactFilters) {
        try{
            const data = await CCS.fetchContacts(filters);
            return data;
        }catch(e){
            console.log('Error creating conversation: ', e);
        }
    }
    
    async function createConvo(codes: string[]) {
        try{
            await CCS.createChat(codes);
        }catch(e){
            console.log('Error creating conversation: ', e);
        }
    }


    async function fetchConvos(filters: ConvoFilters){
        try{
            const data = await CCS.fetchConversations(filters);
            console.log(data);
            return data;
        }catch(e){
            console.log('Error fetching conversation: ', e);
        }
    }





    return {
        getContactList,
        createNewConvo,
        convoDataList,
        initializeChat,
        getConversations,
        selectConvo,
        isSelectedConvoID,
    }
})