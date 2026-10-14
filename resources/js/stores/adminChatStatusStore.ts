import { chatService } from "@/services/chatService";
import { ChatStatus } from "@/types/chat";
import { defineStore } from "pinia";
import { computed, ref } from "vue";



export const useAdminChatStatus = defineStore('admin-status-chat', () => {

    const status = ref<ChatStatus>({
        totalUnreadSessionChat: 0,
        totalUnreadConversationChat: 0
    });




    const statusState = computed(()=>status.value)


    const initialize =async()=>{
        await getStatus()
    }
    
    const getStatus = async () => {
        const data = await fetchChatStatus();
        status.value = data ?? { 
            totalUnreadSessionChat: 0,
            totalUnreadConversationChat: 0
         };
    }


    // API
    async function fetchChatStatus() {
        try{
            const data = await chatService.fetchChatStatus();
            return data;
        }catch(e){
            console.error('Cannot fetch all chat status: ',e);
        }
    }

    return {
        initialize,
        statusState,
    };

})