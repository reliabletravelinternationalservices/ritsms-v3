import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { ConversationWithLatestMessage, Message } from "@/types/conversation";




export const useConvoChatbox = defineStore('convo-chatbox', () => {


    const chats = ref<ConversationWithLatestMessage[]>([])
    const messages = ref<Message[]>([])
    const activeID = ref<number | string | null>(null)
    const loadingChats = ref(false)
    const loadingMessages = ref(false)


    //===========================================
    //COMPUTED
    //===========================================
    const selectedActiveChat = computed(() => {
        return chats.value.find(
            chat => String(chat.id) === String(activeID.value),
        ) ?? null
    })

    const getMessages = computed(() => {
        return messages.value
    })

    const isChatsLoading = computed(() => {
        return loadingChats.value
    })

    const isMessagesLoading = computed(() => {
        return loadingMessages.value
    })


    const totalUnreadChatConvo = computed<number>(() =>
        chats.value.filter(chat => chat.new_messages_count > 0).length
    );


    //===========================================
    // FUNCTIONS
    //===========================================

    const initializeConvoChats = () => {
        // INITIALIZE
    }

    const selectChat = (id: number) => {
        // SELECTING CHAT
    }

    const sendMessage = (message: string, attachment?: File[] | null) =>{

    }

    return {
        chats,
        messages,
        activeID,

        getMessages,

        selectedActiveChat,
        totalUnreadChatConvo,

        initializeConvoChats,
        selectChat,
        sendMessage,

        isChatsLoading,
        isMessagesLoading,
    }
})