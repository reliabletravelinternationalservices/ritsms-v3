import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import { Mode } from "@/types/chat";
import echo from "@/echo";
import { convoChatService as CCS, ContactFilters } from "@/services/convoChatService";
import { ChatConversation, Message } from "@/types/conversation";


export const useAdminConvoChat = defineStore('admin-convo-chat', () => {

    const convoChats = ref<ChatConversation[]>([]);
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
    
    const getContactList = async (filters: ContactFilters)=>{
        const paginatedContacts = await fetchContacts(filters);
        return paginatedContacts
    }

    const createNewConvo = async (codes: string[])=>{
        const paginatedData = await createConvo(codes);
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
            const data = await CCS.createChat(codes);
        }catch(e){
            console.log('Error creating conversation: ', e);
        }
    }





    return {
        getContactList,
        createNewConvo,
    }
})