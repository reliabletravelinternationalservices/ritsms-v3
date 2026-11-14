import { getAuthUser } from "@/lib/utils";
import { conversationService } from "@/services/conversationService";
import { ConvoWithParticipants, ConvoWithParticipantsAndLatestMessage, Type } from "@/types/convo/conversation";
import { Message } from "@/types/convo/message";
import { computed, ref } from "vue";


export function useConvo() {

    const openedConvo = ref<ConvoWithParticipants | null>(null);
    const openInfo = ref(true);
    const openEditModal = ref(false);

    // ==================================
    // COMPUTED
    // ==================================

    const isNoOpenConvo = computed(()=> openedConvo.value === null)
    const authUser = computed(() => getAuthUser());
    
    const isOpenConvoGroup = computed(() =>
        openedConvo.value?.type === Type.Group
    );
    
    const openConvoPrivateParticipant = computed(() =>
        openedConvo.value!.participants.find(
            (pt) => pt.participant.id !== authUser.value.id
        )?.participant
    );
    const openConvoAvatar = computed(() =>
        isOpenConvoGroup.value
            ? openedConvo.value!.avatar
            : openConvoPrivateParticipant.value!.avatar
    );
    const openConvoName = computed(() =>
        isOpenConvoGroup.value
            ? openedConvo.value!.name
            : openConvoPrivateParticipant.value!.display_name
    );





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



    // =====================================
    // CONVO INFO FUNCTIONS
    // =====================================
    const infoToggle=()=>{
        openInfo.value = !openInfo.value
    }


    // =====================================
    // EDIT CONVO
    // =====================================
    const editConvo=()=>{
        openEditModal.value = true
    }

    const updateConvo= async(
        payload: {
            name:string;
            avatar?:File | null
        })=>{
            if(!openedConvo.value)return
            const id = openedConvo.value.id
            const data = await updateConvoInfo(id, payload)

            if(data){
                openedConvo.value = {
                    ...data
                }
            }
            return openedConvo.value;
    }


    // =====================================
    // LEAVE CONVO
    // =====================================

    const leaveConvo=()=>{
        // leave
    }




    // =====================================
    // ASYNC FUNCTIONS
    // =====================================
    async function updateConvoInfo(
        convoID: number,
        payload: {
            name:string;
            avatar?:File | null
        },
    ){
        try{
            const response = await conversationService.updateConvo(
                convoID,
                payload
            )

            if(response.data){
                return response.data
            }

            return null
        }catch(err){
            console.log('Error updating convo: ', err)
            return null
        }
    }

    return {
        openedConvo,
        isNoOpenConvo,
        assignOpenConvo,
        resetOpenedConvo,
        updateSelectedConvo,

        openInfo,
        infoToggle,

        isOpenConvoGroup,
        openConvoAvatar,
        openConvoName,

        openEditModal,
        updateConvo,
        editConvo,
        leaveConvo,
    };
}
