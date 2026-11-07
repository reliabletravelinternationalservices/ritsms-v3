
import { conversationService } from "@/services/conversationService";
import { ConvoWithLatestMessage } from "@/types/convo/conversation";
import { CursorPaginated } from "@/types/cursor/cursor-paginated";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useConversationStore = defineStore('conversation-store', () => {
    const conversations = ref<CursorPaginated<ConvoWithLatestMessage>>() 
    const isConvoLoading = ref(false)
    


    //==========================================
    // FUNCTIONS
    //==========================================
    
    const initializeConvo = async ()=>{
        isConvoLoading.value = true
        const data = await fetchConvos();
        if(!data) return
        
        conversations.value = data
        isConvoLoading.value = false
    }


    //==========================================
    async function fetchConvos(search?: string) {
        try {
            const data = await conversationService.getConvos({
                search: search
            });
            return data
        } catch (e) {
            console.error('Error fetching conversation lists', e)
            return null
        }
    }

    return {
        initializeConvo,
    }
})