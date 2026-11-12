import { conversationService as convoService } from "@/services/conversationService";
import { Type } from "@/types/convo/conversation";
import { Contact } from "@/types/user/contact";
import { ref } from "vue";


export function useCreateConvo() {

    const createModal = ref(false);
    const creatingConvo = ref(false);

    // ==================================
    // COMPUTED
    // ==================================





    // =====================================
    // CREATE CONVO
    // =====================================
    const createConversation = async (list: Contact[]) => {

        if (!createModal.value || 
            list.length === 0 ||  
            creatingConvo.value) {
            return;
        }

        startCreating()
        const contactIds = getContactsID(list);
        const type = isSingleContact(list) ? Type.Private : Type.Group
        const response = await createConvo(contactIds, type)
        
        endCreating()

        return response?.data ?? null
    }
    

    const getContactsID=(list:Contact[])=>{
        return list.map(
            contact => contact.id
        );
    }


    const isSingleContact=(list:Contact[])=>{
        return list.length === 1
    }
    


    const toggleCreate = (value: boolean) => {
        createModal.value = value;
    };


    // =====================================
    // LOADING STATES
    // =====================================
    const startCreating=()=>{
        creatingConvo.value = true
    }

    const endCreating=()=>{
        creatingConvo.value = false
    }


    
    // =====================================
    // REQUEST ABORT FUNCTIONS
    // =====================================


    


    // ======================================
    // FETCH ASYNC
    // ======================================
    async function createConvo(ids:number[], type: Type){
        try {
            const response = await convoService.storeConvo(
                ids,
                type
            );
            
            if(!response || !response.data) return null

            return response
            

        } catch (error) {
            console.error("Error creating conversation", error);
            return null
        }
    }

    return {
        createModal,
        creatingConvo,
        createConversation,
        toggleCreate,
    };
}
