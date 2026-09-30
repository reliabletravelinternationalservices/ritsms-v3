import { defineStore } from "pinia"
import { computed, ref } from "vue"
import axios from 'axios'
import { ChatSession, ChatSessionWithToken, Message } from "@/types/chat";




export const useSessionChatbox = defineStore('session-chatbox', () => {
    const SESSION_KEY = 'reliable_chat_session';

    const openChatbox = ref(false)
    const session = ref<ChatSession | null>(null)
    const composedMessage = ref('')

    // LOADING
    const initializingLoad = ref(false)
    const chatStartLoad = ref(false)

    const messages = ref<Message[]>([
        {
            id: 1,
            message: 'Hello! I would like to ask about your Japan tour packages.',
            created_at: '2026-09-30T09:30:00',
            sender: 'session',
        },
        {
            id: 2,
            message:
                'Hi! Sure, we would be happy to help. May I know your preferred travel date?',
            created_at: '2026-09-30T09:32:00',
            sender: 'admin',
        },
        {
            id: 3,
            message: 'Around December. Do you have Tokyo packages available?',
            created_at: '2026-09-30T09:35:00',
            sender: 'session',
        },
        {
            id: 4,
            message:
                'Yes! We currently have several Tokyo packages available. You can check the details here: https://reliabletravelph.com/tours',
            created_at: '2026-09-30T09:37:00',
            sender: 'session',
        },
    ])



    //===========================================
    //COMPUTED
    //===========================================
    const isChatboxOpen = computed<boolean>(()=> openChatbox.value);
    const isHasSession = computed<boolean>(()=> !!session.value);
    const canSendMessage = computed<boolean>(() => composedMessage.value.trim().length > 0)
    const isEmptyMessage  = computed(()=> messages.value.length <= 0)
    const isChatStarting = computed(()=> chatStartLoad.value)
    const isInitializing = computed(()=> initializingLoad.value)

    const getChatSessionDetails = computed<ChatSession | null>(()=> session.value)
    const getMessages = computed<Message[]>(()=> messages.value)

    //===========================================
    // FUNCTIONS
    //===========================================
    const chatboxToggle = (isOpen: boolean) => openChatbox.value = isOpen 

    const initializeChatSession = async () => {

        initializingLoad.value = true
        const stored = localStorage.getItem(SESSION_KEY)

        if (!stored) return;

        try {
            const chatSession = JSON.parse(stored)
            const response = await axios.get(
                route('chat.session.show', {
                    uuid: chatSession.uuid,
                }),
                {
                    headers: {
                        'X-Chat-Token': chatSession.token,
                    },
                },
            )

            session.value = response.data as ChatSession

        } catch (error) {
            console.error('Failed to initialize chat session:', error)
        }finally{
            initializingLoad.value = false
        }
    }

    
    //TODO: THIS IS WHERE SESSION START/CREATE
    const startChat = async () => {
        try {
            chatStartLoad.value = true

            const response = await axios.post(route('chat.session.store'))
            
            const data = response.data as ChatSessionWithToken
            
            session.value = data

            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify({
                    uuid: data.uuid,
                    token: data.token,
                }),
            )
        } catch (error) {
            console.error('Failed to start chat session:', error)
        } finally {
            chatStartLoad.value = false
        }
    }




    // TODO: THIS IS WHERE I SEND A MESSAGE 
    const sendComposedMessage = () => {
        if (!canSendMessage.value) return;

        if (!composedMessage.value.trim()) return

        messages.value.push({
            id: Date.now(),
            message: composedMessage.value.trim(),
            created_at: new Date().toISOString(),
            sender: 'session',
        })

        composedMessage.value = ''
    }



    return {

        initializeChatSession,
        isChatboxOpen,
        isHasSession,
        isEmptyMessage,
        isChatStarting,
        isInitializing,

        canSendMessage,
        chatboxToggle,
        startChat,
        sendComposedMessage,
        composedMessage,
        getChatSessionDetails,
        getMessages
    }
})