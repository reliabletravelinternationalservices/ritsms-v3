import { ConvoWithParticipants, ConvoWithParticipantsAndLatestMessage } from "@/types/convo/conversation";
import { Message } from "@/types/convo/message";
import { computed, ref } from "vue";


export function useConvo() {

    const openedConvo = ref<ConvoWithParticipants | null>(null);

    // ==================================
    // COMPUTED
    // ==================================

    const isNoOpenConvo = computed(()=> openedConvo.value === null)


    // =====================================
    // FUNCTIONS
    // =====================================
    const assignOpenConvo = (chat: ConvoWithParticipantsAndLatestMessage) => {
        openedConvo.value = chat;
    };

    const resetOpenedConvo=()=>{
        openedConvo.value = null;
    }

    const updateSelectedConvo = (
        conversations: ConvoWithParticipantsAndLatestMessage[],
        message: Message,
        convo: ConvoWithParticipants,
    ) => {
        
        const index = conversations.findIndex(
            item => item.id === convo.id
        );

        if (index !== -1) {
            conversations.splice(index, 1);
        }


        const participants = convo.participants;

        const senderIndex = participants.findIndex(
            p => p.participant.id === message.sender?.id
        );

        if (senderIndex !== -1) {
            participants[senderIndex].last_read_at = new Date().toISOString();
            participants[senderIndex].total_unread = 0;
        }

        conversations.unshift({
            ...convo,
            latest_message: message,
            participants,
        });
    };


    return {
        openedConvo,
        isNoOpenConvo,
        assignOpenConvo,
        resetOpenedConvo,
        updateSelectedConvo,
    };
}
