import { defineStore } from "pinia"
import {  computed, ref } from "vue"
import { chatService as CCS, ContactFilters, ConvoFilters } from "@/services/chatService";
import { ChatConvoWithLatestMessage, Message } from "@/types/conversation";
import { CursorPaginated } from "@/types/cursor_paginate";


export const useAdminConvoChatStore = defineStore('admin-convo-chat-store', () => {

    const conversations = ref<CursorPaginated<ChatConvoWithLatestMessage>>();
    const messages = ref<CursorPaginated<Message>>();
    const selectedID = ref<number | null>(null)


    const loadingConvos= ref(false);
    const loadingMessages = ref(false);
 

        
    //==============================
    // WATCHERS
    //============================


    
    //=====================================
    // COMPUTED
    //=====================================
    const convoDataList= computed(() => conversations.value?.data?? []);
    const isConvoLoading = computed(() => loadingConvos.value);
    const isEmptyConvo = computed(()=>  conversations.value?.data.length === 0 && loadingConvos.value === false);

    const isNoSelectedChat = computed(()=> !selectedID.value );
    const chatSelected = computed(() =>
        conversations.value?.data.find(chat => chat.id === selectedID.value)
    )
    
    const chatMessages = computed(()=> messages.value?.data?? []);
    const isMessagesLoading = computed(()=> loadingMessages.value);

    //=====================================
    // FUNCTIONS
    //=====================================
    
    const initializeChat=async()=>{
        loadingConvos.value =true;
        await getConversations({});
        loadingConvos.value = false;
    }

    const getContactList = async (filters: ContactFilters)=>{
        const paginatedContacts = await fetchContacts(filters);
        return paginatedContacts
    }

    const createNewConvo = async (codes: string[])=>{
        const convo = await createConvo(codes);
        if(!convo) return;
        
        conversations.value?.data.push(convo);
        return convo;
    }

    const getConversations = async(filters: ConvoFilters)=>{
        loadingConvos.value = true;
        const data = await fetchConvos(filters);
        conversations.value = data;
        loadingConvos.value = false;
    }

    const selectConvo = async (id: number)=>{
        selectedID.value = id;
        loadingMessages.value = true;
        messages.value = await getConvoMessages(id);
        loadingMessages.value = false;
    }

    const isSelectedConvoID=(id:number)=>{
        return id === selectedID.value;
    }


    const markMessageAsRead = async()=>{
        if(!selectedID.value) return;
        await markConvoAsRead(selectedID.value);
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
            const convo = await CCS.createChat(codes);
            return convo;
        }catch(e){
            console.log('Error creating conversation: ', e);
        }
    }


    async function fetchConvos(filters: ConvoFilters){
        try{
            const data = await CCS.fetchConversations(filters);
            return data;
        }catch(e){
            console.log('Error fetching conversation: ', e);
        }
    }


    async function getConvoMessages(id:number){
        try{
            const data = await CCS.fetchConvoMessages(id);
            return data;
        }catch(e){
            console.log('Error fetching convo: ', e);
        }
    }

    async function markConvoAsRead(id:number) {
        try{
            const data = await CCS.readConversation(id);
            return data;
        }catch(e){
            console.log('Error marking convo messages as read: ', e);
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
        isConvoLoading,
        isEmptyConvo,
        isNoSelectedChat,
        chatSelected,
        chatMessages,
        isMessagesLoading,
        markMessageAsRead,
    }
}) 