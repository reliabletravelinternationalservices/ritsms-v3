import { useAdminConvoChatStore } from '@/stores/adminConvoChatStore';
import { SharedData } from '@/types';
import { Message } from '@/types/conversation';
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue'

export function useConvoInbox() {
    
    const service = useAdminConvoChatStore();
    
    const page = usePage<SharedData>();
    const showNewConvoDialog = ref(false);
    




    //===================
    // COMPUTED
    //===================
    const user = computed(()=> page.props.auth.user)
    

    //===================
    // SEARCH CONVO
    //===================
    const filterConvo = async (value: string | number) => {
        await service.getConversations({ search: value.toString() })
    }


    //===================
    // CREATE CONVO
    //===================
    const createConvo = (value: boolean) => showNewConvoDialog.value = value;



    const sendMessage = (message: string) =>{
        return message;
    }


    const isMine = (senderId?: number | null) => {
        if(senderId) return false;

        return senderId === user.value.id
    }

    const isRead = (latestMessage: Message)=> {
        return latestMessage?.reads?.some(
            (reader) =>
                reader.reader_id === user.value.id &&
                reader.reader_type === user.value.role
        )
    }

    return {
        service,
        showNewConvoDialog,
        filterConvo,
        createConvo,
        sendMessage,
        isMine,
        isRead,
    }
}