import { ConvoWithParticipants, ConvoWithParticipantsAndLatestMessage } from "@/types/convo/conversation";
import { computed, ref } from "vue";


export function useConvo() {

    const openedConvo = ref<ConvoWithParticipants | null>(null);

    // ==================================
    // COMPUTED
    // ==================================

    const isNoOpenConvo = computed(()=> !openedConvo.value)




    // =====================================
    // FUNTIONS
    // =====================================
    const assignOpenConvo = (chat: ConvoWithParticipantsAndLatestMessage) => {
        openedConvo.value = chat;
    };

    const resetOpenedConvo=()=>{
        openedConvo.value = null;
    }




    // =====================================
    // LOADING STATES
    // =====================================



    
    // =====================================
    // REQUEST ABORT FUNCTIONS
    // =====================================


    


    // ======================================
    // FETCH ASYNC
    // ======================================

    return {
        openedConvo,
        isNoOpenConvo,
        assignOpenConvo,
        resetOpenedConvo,
    };
}
