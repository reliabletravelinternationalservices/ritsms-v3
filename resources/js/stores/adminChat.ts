import { defineStore } from "pinia"
import { computed, ref, watch } from "vue"
import { ChatSessionWithLatestMessage, Message as SessionMessage, MessageWithSessionUUID, Mode } from "@/types/chat";
import { ConversationWithLatestMessage, Message as ConvoMessage } from "@/types/conversation";
import echo from "@/echo";
import { sessionChatService as SCS } from "@/services/sessionChatService";
import { CursorPaginated } from "@/types/cursor_paginate";


export const useAdminChat = defineStore('admin-chat', () => {

    const convoChats = ref<ConversationWithLatestMessage[]>([]);
    const convoMessages = ref< ConvoMessage[]>([]);

    const sessionChats = ref<ChatSessionWithLatestMessage[]>([]);
    const sessionMessages = ref<SessionMessage[]>([]);
    const totalUnreadSessionChat = ref(0);
    
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

    
    const totalSessionChat = computed(()=> sessionChats.value.length)




    //==============================
    // WATCHERS
    //============================
    // watch(
    //     [
    //         () => sessionChats.value,
    //     ]
    //     (value) => {
    //         mas
    //     },
    //     {
    //         immediate: true,
    //     },
    // )


    //=====================================
    // FUNCTIONS
    //=====================================


    const initializeChats = async () => {
        
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
        refreshTotalUnreadSesionChat();
    }


    const refreshTotalUnreadSesionChat=()=>{
        totalUnreadSessionChat.value = sessionChats.value.
            filter(chat => chat.new_messages_count > 0).length;
    }
    

    const fetchAllConversationChats = async () => {
        //TODO: GET ALL CHATS CONVO
    }



    const selectChat = async (mode: Mode, id:string) =>{
        if(id === selectedChatID.value){
            return;
        }
        if(mode === 'sessions'){
            loadingChats.value=true;
            selectedChatID.value=id;
            await fetchSessionChatMessages(id);
            loadingChats.value=false;
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

        const tempID = storeLocalSessionMessage(message);

        const data = await storeSessionMessage(chatId, {
            message
        });

        
        const index = sessionMessages.value.findIndex(item => item.id === tempID)

        if(!data || index === -1){
            sessionMessages.value[index].status = 'failed';
            return;
        }
        
        sessionMessages.value[index].status = 'sent';

        const chat = sessionChats.value.find((item) => item.uuid === chatId)

        if (!chat) return;
        
        chat.latest_message = data
        sessionChats.value = [
            chat,
            ...sessionChats.value.filter((item) => item.uuid !== chatId),
        ]
    }

    const storeLocalSessionMessage=(message:string,)=>{
        const tempId = `temp-${Date.now()}`

        const tempMessage: SessionMessage = {
            id: tempId,
            message,
            created_at: new Date().toISOString(),
            sender_type: 'admin',
            status: 'sending',
            state: 'unread'
        }

        sessionMessages.value.push(tempMessage)
        sessionMessages.value
        return tempId;
    }



    const markMessagesAsRead = async () => {

        if(isNoSelectedChat.value) return;
        if(isEmptySessionMessages.value) return;
        readLocalMessages();
        await markMessagesRead(selectedChatID.value!)
    }


    const readLocalMessages=()=>{
        sessionMessages.value = sessionMessages.value.map(message =>
            sessionMessages.value.some(m => m.id === message.id && m.state === 'unread')
                ? { ...message, state: 'read' }
                : message
        );
        console.log(sessionMessages.value)
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


    async function storeSessionMessage(uuid:string, payload:{
        message: string
    }) {
        try{
            const data = await SCS.sendAdminSessionMessage(uuid, payload.message)
            return data;
        }catch(e){
            console.log('Error to send message: ', e);
            return null;
        }
    }
    
    function subscribeToSessionChat() {
        echo
            .channel('chat.admin')
            .listen('.message.sent', (event: MessageWithSessionUUID) => {
                
                const isSessionMessage = event.sender_type === 'session'; 
                if(!isSessionMessage){
                    return;
                }

                const chat = sessionChats.value.find(
                    (item) => item.uuid === event.uuid,
                )

                if (!chat) return

                const message: SessionMessage = {
                    ...event,
                }

                chat.latest_message = message

                if (isSessionMessage && message.state === 'unread') {
                    chat.new_messages_count += 1
                }

                sessionChats.value = [
                    chat,
                    ...sessionChats.value.filter(
                        (item) => item.uuid !== event.uuid,
                    ),
                ]

                refreshTotalUnreadSesionChat();

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

        totalUnreadSessionChat,
        totalSessionChat,
        isLoadingChats,
        isNoSelectedChat,
    }
})