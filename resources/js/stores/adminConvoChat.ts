import { defineStore } from "pinia"
import {  ref } from "vue"
import { convoChatService as CCS, ContactFilters } from "@/services/convoChatService";
import { ChatConversation, ChatConvoWithLatestMessage, Message } from "@/types/conversation";


export const useAdminConvoChat = defineStore('admin-convo-chat', () => {

    const convoChats = ref<ChatConvoWithLatestMessage[]>([]);
    const convoMessages = ref< Message[]>([]);


    
    const selectedChatID = ref<string| null>();
    const loadingChats = ref(false);
    const loadingMessages = ref(false);
 
    //=====================================
    // COMPUTED
    //=====================================

    
    //==============================
    // WATCHERS
    //============================
  

    //=====================================
    // FUNCTIONS
    //=====================================
    
    const initializeChat=async()=>{
        await getConvos();
    }

    const getContactList = async (filters: ContactFilters)=>{
        const paginatedContacts = await fetchContacts(filters);
        return paginatedContacts
    }

    const createNewConvo = async (codes: string[])=>{
        await createConvo(codes);
    }

    const getConvos= async()=>{
        const paginatedData = await fetchConvos();
        convoChats.value = paginatedData?.data?? [];
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


    async function fetchConvos(){
        try{
            const data = await CCS.fetchConversations();
            return data;
        }catch(e){
            console.log('Error fetching conversation: ', e);
        }
    }





    return {
        getContactList,
        createNewConvo,
        getConvos,
        initializeChat,
    }
})