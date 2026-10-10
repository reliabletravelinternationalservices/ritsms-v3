import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { ChatSessionWithLatestMessage, Message as SessionMessage, MessageWithSessionUUID, Mode } from "@/types/chat";
import { ConversationWithLatestMessage, Message as ConvoMessage } from "@/types/conversation";
import echo from "@/echo";
import { sessionChatService as SCS } from "@/services/sessionChatService";
import { CursorPaginated } from "@/types/cursor_paginate";


export const useAdminChat = defineStore('admin-chat', () => {

    const convoChats = ref<ConversationWithLatestMessage[]>([]);
    const sessionChats = ref<ChatSessionWithLatestMessage[]>([]);

    const convoMessages = ref< ConvoMessage[]>([]);
    const sessionMessages = ref<SessionMessage[]>([]);
    const selectedChatID = ref<string| null>();
    const loadingChats = ref(false);
    const loadingMessages = ref(false);
 
    //=====================================
    // COMPUTED
    //=====================================

    const getSessionMessages = computed(()=> sessionMessages.value)

    const getSessionChats = computed(()=> sessionChats.value)

    const isEmptySessionChat = computed(()=> !sessionChats.value)

    const isEmptySessionMessages = computed(()=> !getSessionMessages.value)

    const getSelectedChatID = computed(()=> selectedChatID.value);

    const isNoSelectedChat = computed(()=> !getSelectedChatID.value)

    
    const getSelectedSessionChat = computed(() => {
        if (isEmptySessionChat.value) return null;

        return sessionChats.value.find(
            chat => chat.uuid === getSelectedChatID.value
        ) ?? null;
    });

    const isLoadingChats = computed(()=> loadingChats.value);

    const totalNewUnreadChats = computed<number>(() => {
        return sessionChats.value.filter(
            chat => chat.new_messages_count > 0
        ).length;
    });
    
    const totalSessionChat = computed(()=> sessionChats.value.length)


    //=====================================
    // FUNCTIONS
    //=====================================


    const initializeChats = async (mode: Mode) => {
        
        await fetchAllSessionChats();
        await fetchAllConversationChats();

        subscribeToConversationChat();
        subscribeToSessionChat();
    }

    const fetchAllSessionChats = async () =>{
        loadingChats.value = true;
        const pagedData = await fetchSessionChats();
     
        if(!pagedData){
            loadingChats.value =false;
            return;
        }

        sessionChats.value = pagedData.data;
        loadingChats.value = false;
    }
    

    const fetchAllConversationChats = async () => {
        //TODO: GET ALL CHATS CONVO
    }



    const selectChat = async (mode: Mode, id:string) =>{
        if(id === selectedChatID.value){
            return;
        }
        if(mode === 'sessions'){
            selectedChatID.value=id;
            await fetchSessionChatMessages(id);
            return;
        }

        if(mode === 'chats'){
            selectedChatID.value=id;
            await fetchConvoChatMessages(id)
            return;
        }
    }


    const fetchSessionChatMessages = async (uuid:string) => {
        loadingMessages.value=true;
        const data = await fetchSessionMessages(uuid) 
        sessionMessages.value = data;
        loadingMessages.value=false;
    }

    const fetchConvoChatMessages = (id:string) => {
        //TODO: FETCH CONVO MESSAGE BY ID
    }

    const sendSessionMessage = async (message: string) => {
        const chatId = selectedChatID.value

        if (!chatId || !message.trim()) {
            return
        }

        try {
            const sentMessage = await SCS.sendAdminSessionMessage(chatId, message.trim())
            const messageWithStatus: SessionMessage = {
                ...sentMessage,
                status: 'sent',
            }

            sessionMessages.value = [...sessionMessages.value, messageWithStatus]

            const chat = sessionChats.value.find((item) => item.uuid === chatId)

            if (chat) {
                chat.latest_message = messageWithStatus
                sessionChats.value = [
                    chat,
                    ...sessionChats.value.filter((item) => item.uuid !== chatId),
                ]
            }
        } catch (error) {
            console.error('Failed to send chat message:', error)
        }
    }


    const markMessagesAsRead = async () => {

        if(isNoSelectedChat.value) return;
        if(isEmptySessionMessages.value) return;
        sessionMessages.value = sessionMessages.value.map(message =>
                sessionMessages.value.some(m => m.id === message.id && m.state === 'unread' && m.sender_type === 'session')
                    ? { ...message, state: 'read' }
                    : message
            );

        await markMessagesRead(selectedChatID.value!)
    }



    // ==========================================
    // API SERVICE FUNCTION 
    // ==========================================

    async function fetchSessionChats(){
        try{
            const paginatedData = await SCS.fetchChats()
            return paginatedData;
        }catch(e){
            console.log('Error fetching session chats: ', e)
            return null;
        }
    }

    async function fetchSessionMessages(uuid:string){
        try{
            const data = await SCS.fetchChatMessagesToAdminByUUID(uuid)
            return data;
        }catch(e){
            console.log('Error fetching session messages: ', e)
            return [];
        }
    }

    async function markMessagesRead(uuid:string) {
        try {
            await SCS.markSessionChatMessagesAsRead(uuid);
        } catch (error) {
            console.error('Failed to mark chat messages as read:', error)
        }
    }

    function subscribeToConversationChat(){
        //TODO: FOR CONVO WEBSOCKET CONNCTION
    }
    
    function subscribeToSessionChat() {
        echo
            .channel('chat.admin')
            .listen('.message.sent', (event: MessageWithSessionUUID) => {
                const message: SessionMessage = {
                    ...event,
                    status: 'sent',
                }

                const chat = sessionChats.value.find(
                    (item) => item.uuid === event.uuid,
                )

                if (!chat) return

                chat.latest_message = message

                if (
                    event.sender_type === 'session' &&
                    message.state === 'unread'
                ) {
                    chat.new_messages_count += 1
                }

                sessionChats.value = [
                    chat,
                    ...sessionChats.value.filter(
                        (item) => item.uuid !== event.uuid,
                    ),
                ]

                const isActiveSession = selectedChatID.value === event.uuid
                const messageExists = sessionMessages.value.some(
                    (item) => item.id === message.id,
                )

                if (isActiveSession && !messageExists) {
                    sessionMessages.value = [
                        ...sessionMessages.value,
                        message,
                    ]
                }
            })
    }

    return {
        initializeChats,
        selectChat,
        sessionMessages,
        getSessionMessages,
        getSessionChats,
        getSelectedChatID,
        getSelectedSessionChat,
        markMessagesAsRead,
        sendSessionMessage,

        totalNewUnreadChats,
        totalSessionChat,
        isLoadingChats,
        isNoSelectedChat,
    }
})