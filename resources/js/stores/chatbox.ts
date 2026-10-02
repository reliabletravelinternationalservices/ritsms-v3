import { defineStore } from "pinia"
import { computed, ref } from "vue"
import axios from 'axios'
import { ChatSession, ChatSessionWithToken, Message, MessageWithSessionUIID } from "@/types/chat";
import echo from "@/echo";




export const useSessionChatbox = defineStore('session-chatbox', () => {
    const SESSION_KEY = 'reliable_chat_session';

    const openChatbox = ref(false)
    const session = ref<ChatSessionWithToken | null>(null)
    const composedMessage = ref('')

    // LOADING
    const initializingLoad = ref(false)
    const loadingMessages = ref(false)
    const chatStartLoad = ref(false)
    const messageSendLoad = ref(false)

    const messages = ref<Message[]>([])




    //===========================================
    //COMPUTED
    //===========================================
    const isChatboxOpen = computed<boolean>(()=> openChatbox.value);
    const isHasSession = computed<boolean>(()=> !!session.value);
    const canSendMessage = computed<boolean>(() => composedMessage.value.trim().length > 0)
    const isEmptyMessage  = computed(()=> messages.value.length <= 0)
    const isChatStarting = computed(()=> chatStartLoad.value)
    const isInitializing = computed(()=> initializingLoad.value)
    const isLoadingMessages = computed(()=> loadingMessages.value)
    const isSendingMessage = computed(()=> messageSendLoad.value)
    const unreadMessageCount = computed(() => messages.value.filter(
        message => message.sender_type === 'admin' && message.state === 'unread'
    ).length)

    const getChatSessionDetails = computed<ChatSession | null>(()=> session.value)
    const getMessages = computed<Message[]>(()=> messages.value)




    //===========================================
    // FUNCTIONS
    //===========================================
    const chatboxToggle = (isOpen: boolean) => {
        openChatbox.value = isOpen 
    }

    const initializeChatSession = async () => {
        initializingLoad.value = true

        const stored = localStorage.getItem(SESSION_KEY)

        if (!stored) {
            initializingLoad.value = false
            return
        }

        try {
            const chatSession = JSON.parse(stored)

            const response = await axios.get(
                route('chat.session.show', {
                    chatSession: chatSession.uuid,
                }),
                {
                    headers: {
                        'X-Chat-Token': chatSession.token,
                    },
                },
            )

            session.value = {
                ...response.data,
                token: chatSession.token,
            }

            subscribeToChatSession(chatSession.uuid)

        } catch (error) {
            console.error(
                'Failed to initialize chat session:',
                error
            )
        } finally {
            await loadSessionMessages()
            initializingLoad.value = false
        }
    }


    const loadSessionMessages = async () => {
        if (!session.value?.uuid || !session.value?.token) return

        loadingMessages.value = true
        try {
            const response = await axios.get(
                route('chat.session.messages.index', {
                    chatSession: session.value.uuid,
                }),
                {
                    headers: {
                        'X-Chat-Token': session.value.token,
                    },
                },
            )

            messages.value = response.data

        } catch (error) {
            console.error('Failed to load session messages:', error)
        }finally {
            loadingMessages.value = false
        }
    }

    
    //TODO: THIS IS WHERE SESSION START/CREATE
    const startChat = async () => {
        try {
            chatStartLoad.value = true

            const response = await axios.post(route('chat.session.store'))
        
            session.value = response.data

            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify({
                    uuid: response.data.uuid,
                    token: response.data.token,
                }),
            )

            subscribeToChatSession(response.data.uuid)
        } catch (error) {
            console.error('Failed to start chat session:', error)
        } finally {
            chatStartLoad.value = false
        }
    }




    // TODO: THIS IS WHERE I SEND A MESSAGE 

    const sendComposedMessage = async () => {
        if (!canSendMessage.value) return

        const message = composedMessage.value.trim()

        if (!message || !session.value) return
        
        const tempId = `temp-${Date.now()}`

        const tempMessage: Message = {
            id: tempId,
            message,
            created_at: new Date().toISOString(),
            sender_type: 'session',
            status: 'sending',
        }

        // Immediately show the message
        messages.value.push(tempMessage)

        // Clear composer immediately
        composedMessage.value = ''

        try {
            const response = await axios.post(
                route('chat.session.message.store', {
                    uuid: session.value.uuid,
                }),
                {
                    sender_type: 'session',
                    message,
                },
                {
                    headers: {
                        'X-Chat-Token': session.value.token,
                    },
                }
            )

            const index = messages.value.findIndex(
                item => item.id === tempId
            )

            if (index !== -1) {
                messages.value[index] = {
                    ...response.data,
                    status: 'sent',
                }
            }

        } catch (error) {

            const index = messages.value.findIndex(
                item => item.id === tempId
            )

            if (index !== -1) {
                messages.value[index].status = 'failed'
            }

            console.error('Failed to send message:', error)
        }
    }



    const subscribeToChatSession = (sessionUuid: string) => {
        const channelName = `chat.session.${sessionUuid}`

        echo
            .channel(channelName)
            .listen('.message.sent', (event: MessageWithSessionUIID) => {

                // Prevent duplicate messages
                const exists = messages.value.some(
                    message => message.id === event.id
                )

                if (exists) return

                messages.value.push({
                    ...event,
                    status: 'sent',
                    state: event.state ?? (
                        event.sender_type === 'admin' ? 'unread' : 'read'
                    ),
                })
            })
    }

    const markIncomingMessagesAsRead = async () => {
        if (
            !session.value?.uuid ||
            !session.value?.token ||
            unreadMessageCount.value === 0
        ) return

        try {
            const response = await axios.post(
                route('chat.session.messages.read', {
                    chatSession: session.value.uuid,
                }),
                {},
                {
                    headers: {
                        'X-Chat-Token': session.value.token,
                    },
                },
            )

            const readMessageIds = new Set<string>(
                response.data.read_message_ids.map(
                    (id: number | string) => String(id)
                )
            )

            messages.value = messages.value.map(message =>
                readMessageIds.has(String(message.id))
                    ? { ...message, state: 'read' }
                    : message
            )
        } catch (error) {
            console.error('Failed to mark chat messages as read:', error)
        }
    }

    return {

        initializeChatSession,
        isChatboxOpen,
        isHasSession,
        isEmptyMessage,
        isChatStarting,
        isInitializing,
        isSendingMessage,
        isLoadingMessages,
        unreadMessageCount,
        canSendMessage,
        chatboxToggle,
        startChat,
        sendComposedMessage,
        markIncomingMessagesAsRead,
        composedMessage,
        getChatSessionDetails,
        getMessages,
    }
})