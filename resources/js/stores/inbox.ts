import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import type { ChatSessionWithLatestMessage, Message } from '@/types/chat'
import echo from '@/echo'

export type InboxMode = 'chat' | 'session'

export const useInboxStore = defineStore('inbox', () => {
    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const mode = ref<InboxMode>('chat')

    const chats = ref<ChatSessionWithLatestMessage[]>([])
    const messages = ref<Message[]>([])
    
    
    // first chat id
    const activeId = ref<number | string | null>(null)


    const loadingChats = ref(false)
    const loadingMessages = ref(false)





    /*
    |--------------------------------------------------------------------------
    | Computed
    |--------------------------------------------------------------------------
    */

    const activeChats = computed(() => {
        return chats.value.filter(
            chat => chat.status === 'open',
        )
    })

    const selectedActiveChat = computed(() => {
        return activeChats.value.find(
            chat => String(chat.id) === String(activeId.value),
        ) ?? null
    })

    const sessionUnreadChats = computed(() => {
        return messages.value.reduce(
            (total, chat) => total + (chat.state === 'unread' ? 1 : 0),
            0,
        )
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




    /*
    |--------------------------------------------------------------------------
    | Mode
    |--------------------------------------------------------------------------
    */

    async function changeMode(value: InboxMode) {
        if (mode.value === value) {
            return
        }

        mode.value = value

        messages.value = []

        const firstChat = activeChats.value[0]

        activeId.value = firstChat?.id ?? null

        if (value === 'session') {
            await loadChats()

            const firstSession = chats.value[0]

            activeId.value = firstSession?.id ?? null

            if (firstSession) {
                await loadMessages(String(firstSession.uuid))
            }

            return
        }

        if (firstChat) {
            messages.value = []
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Conversation Selection
    |--------------------------------------------------------------------------
    */

    async function selectChat(chat: ChatSessionWithLatestMessage) {
        activeId.value = chat.id

        messages.value = []
        
        if (mode.value === 'session') {
            await loadMessages(String(chat.uuid))
        }else {
            messages.value = []
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Session Chats
    |--------------------------------------------------------------------------
    */

    async function loadChats() {
        loadingChats.value = true

        try {
            const response = await axios.get(
                route('admin.inbox.sessions'),
            )

            chats.value = response.data.map(
                (session: ChatSessionWithLatestMessage) => ({ ...session }),
            )

            loadMessages(String(chats.value[0]?.uuid))

        } catch (error) {
            console.error(
                'Failed to load session chats:',
                error,
            )

            messages.value = []

        } finally {
            loadingChats.value = false
        }
    }

    async function loadMessages(uuid: string) {
        loadingMessages.value = true

        try {
            const response = await axios.get(
                route('admin.inbox.sessions.show', {
                    uuid,
                }),
            )

            messages.value = response.data.messages ?? []
        } catch (error) {
            console.error(
                'Failed to load chat messages:',
                error,
            )

            messages.value = []
            
        } finally {
            loadingMessages.value = false
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Send Message
    |--------------------------------------------------------------------------
    */

     function sendMessage(){

     }

    // async function sendMessage(payload: {
    //     content: string
    //     attachments: unknown[]
    // }) {
    //     if (
    //         mode.value !== 'session'
    //         || activeId.value === null
    //         || !payload.content.trim()
    //     ) {
    //         return
    //     }

    //     sendingMessage.value = true

    //     try {
    //         const response = await axios.post(
    //             route(
    //                 'admin.inbox.sessions.messages.store',
    //                 {
    //                     uuid: activeId.value,
    //                 },
    //             ),
    //             {
    //                 message: payload.content,
    //             },
    //         )

    //         messages.value.push(response.data)

    //         updateLastMessage(
    //             payload.content,
    //         )
    //     } catch (error) {
    //         console.error(
    //             'Failed to send message:',
    //             error,
    //         )
    //     } finally {
    //         sendingMessage.value = false
    //     }
    // }

    /*
    |--------------------------------------------------------------------------
    | Conversation Preview
    |--------------------------------------------------------------------------
    */

    // function updateLastMessage(content: string) {
    //     const chat = activeChats.value.find(
    //         item =>
    //             String(item.id)
    //             === String(activeId.value),
    //     )

    //     if (!chat) {
    //         return
    //     }

    //     const temp = document.createElement('div')

    //     temp.innerHTML = content

    // }

    /*
    |--------------------------------------------------------------------------
    | New Conversation
    |--------------------------------------------------------------------------
    */

    // function openNewConversation() {
    //     showNewConversation.value = true
    // }

    // function closeNewConversation() {
    //     showNewConversation.value = false
    // }

    // function createConversation(payload: {
    //     type: 'chat' | 'group'
    //     contacts: {
    //         id: number
    //         name: string
    //         email: string
    //         initials: string
    //     }[]
    //     name?: string
    // }) {
    //     const name =
    //         payload.type === 'group'
    //             ? payload.name ?? 'New Group'
    //             : payload.contacts[0]?.name
    //                 ?? 'New Conversation'

    //     const newChat: ChatCardData = {
    //         id: `new-${Date.now()}`,
    //         name,
    //         initials: name
    //             .split(' ')
    //             .map(word => word[0])
    //             .join('')
    //             .slice(0, 2)
    //             .toUpperCase(),
    //         message: 'New conversation',
    //         time: 'Just now',
    //         status: 'online',
    //         type: 'chat',
    //     }

    //     chats.value.unshift(newChat)

    //     mode.value = 'chat'

    //     activeId.value = newChat.id

    //     messages.value = []

    //     closeNewConversation()
    // }

    // /*
    // |--------------------------------------------------------------------------
    // | Reset
    // |--------------------------------------------------------------------------
    // */

    // function clearMessages() {
    //     messages.value = []
    // }

    // function clearActiveChat() {
    //     activeId.value = null

    //     messages.value = []
    // }




    // const subscribeToChatSession = (sessionUuid: string) => {
    //     const channelName = `chat.session.${sessionUuid}`

    //     console.log('Subscribing to:', channelName)

    //     echo
    //         .channel(channelName)
    //         .listen('.message.sent', (event: Message) => {
    //             console.log('Message received:', event)

    //             // Prevent duplicate messages
    //             const exists = messages.value.some(
    //                 message => message.id === event.id
    //             )

    //             if (exists) return

    //             messages.value.push({
    //                 ...event,
    //                 status: 'sent',
    //                 state: event.state ?? (
    //                     event.sender_type === 'admin' ? 'unread' : 'read'
    //                 ),
    //             })
    //         })
    // }





    return {
        // State
        mode,
        chats,
        activeId,
        getMessages,

        // // Loading
        isMessagesLoading,
        isChatsLoading,
        // loadingMessages,
        // sendingMessage,

        // // UI
        // showNewConversation,

        // // Computed
        // activeChats,
        activeChats,
        selectedActiveChat,
        sessionUnreadChats,

        // Mode
        changeMode,

        // Conversations
        selectChat,

        // Sessions
        loadChats,
        // loadSessionMessages,

        // // Messages
        sendMessage,
        // updateLastMessage,

        // // New conversation
        // openNewConversation,
        // closeNewConversation,
        // createConversation,

        // // Utility
        // clearMessages,
        // clearActiveChat,
        // subscribeToSession,
    }
})