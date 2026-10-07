import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import type { ChatSessionWithLatestMessage, Message, MessageWithSessionUIID } from '@/types/chat'
import echo from '@/echo'
import { CursorPaginated } from '@/types/cursor_paginate'

export const useChatSessionStore = defineStore('chat-session', () => {
   
    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const chats = ref<ChatSessionWithLatestMessage[] >([])
    const messages = ref<Message[]>([])

    
    // first chat id
    const activeUUID = ref<number | string | null>(null)


    const loadingChats = ref(false)
    const loadingMessages = ref(false)
    const sendingMessage = ref(false)
    const seenMessageIds = new Set<string>()
    let isAdminInboxSubscribed = false




    /*
    |--------------------------------------------------------------------------
    | Computed
    |--------------------------------------------------------------------------
    */


    const totalUnreadChatSessions = computed<number>(() =>
        chats.value.filter(chat => chat.new_messages_count > 0).length
    );


    const selectedActiveChat = computed(() => {
        return chats.value.find(
            chat => String(chat.uuid) === String(activeUUID.value),
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



    /*
    |--------------------------------------------------------------------------
    | Conversation Selection
    |--------------------------------------------------------------------------
    */

    async function selectChat(uuid: string) {
        activeUUID.value =uuid
        messages.value = []
        await loadSessionMessages(String(uuid))
    }

    /*
    |--------------------------------------------------------------------------
    | Chats
    |--------------------------------------------------------------------------
    */



    const initializeSessionChats = async () => {
        await loadSessionChats()
        subscribeToAdminInbox();
    }

    // SESSIONS
    async function loadSessionChats() {
        loadingChats.value = true

        try {
            const response = await axios.get<CursorPaginated<ChatSessionWithLatestMessage>>(
                route('admin.inbox.sessions'),
            )

            const value = response.data

            chats.value = value.data.map(
                (session: ChatSessionWithLatestMessage) => ({ ...session }),
            )



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




    async function loadSessionMessages(uuid: string) {
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


    function addMessageToSession(sessionUuid: string, message: Message) {
        const session = chats.value.find(
            chat => chat.uuid === sessionUuid,
        )

        if (session) {
            session.latest_message = message
        }
    }


    const markIncomingMessagesAsRead = async () => {
        if (!activeUUID) return
        console.log(activeUUID.value)
        try {
            const response = await axios.post(
                route(
                    'admin.inbox.session.messages.read',
                    {uuid: activeUUID},
                ),
            )

            const readMessageIds = new Set<string>(
                response.data.read_message_ids.map(
                    (id: number | string) => String(id),
                ),
            )

            messages.value = messages.value.map((message) =>
                readMessageIds.has(String(message.id))
                    ? { ...message, state: 'read' }
                    : message,
            )
        } catch (error) {
            console.error(
                'Failed to mark chat messages as read:',
                error,
            )
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Send Message
    |--------------------------------------------------------------------------
    */



    async function sendMessage(message: string) {
        if (activeUUID.value === null
            || !message.trim()
        ) {
            return
        }

        sendingMessage.value = true

        try {
            const response = await axios.post(
                route(
                    'admin.inbox.sessions.messages.store',
                    {
                        uuid: activeUUID.value,
                    },
                ),
                {
                    message: message,
                },
            )

            messages.value.push(response.data)

        } catch (error) {
            console.error(
                'Failed to send message:',
                error,
            )
        } finally {
            sendingMessage.value = false
        }
    }



    const subscribeToAdminInbox = () => {
        if (isAdminInboxSubscribed) {
            return
        }

        isAdminInboxSubscribed = true
        echo
            .channel('chat.admin')
            .listen('.message.sent', (event: MessageWithSessionUIID) => {
                const messageKey = `${event.uuid}:${event.id}`

                if (seenMessageIds.has(messageKey)) {
                    return
                }

                seenMessageIds.add(messageKey)

                const message: Message = {
                    ...event,
                    status: 'sent',
                    state: event.state ?? (
                        event.sender_type === 'session' ? 'unread' : 'read'
                    ),
                }
                const chat = chats.value.find((item) => item.uuid === event.uuid)

                if (chat) {
                    chat.latest_message = message
                    chats.value = [
                        chat,
                        ...chats.value.filter((item) => item.uuid !== event.uuid),
                    ]
                    
                    if (event.sender_type === 'session' && message.state === 'unread') {
                        chat.new_messages_count += 1
                    }
                }

                if (selectedActiveChat.value?.uuid !== event.uuid) {
                    return
                }

                const messageAlreadyVisible = messages.value.some(
                    (item) => item.id === event.id,
                )

                if (!messageAlreadyVisible) {
                    messages.value.push(message)
                }
            })
    }




    return {
        // State
        chats,
        activeUUID,
        getMessages,
        totalUnreadChatSessions,

        // // Loading
        isMessagesLoading,
        isChatsLoading,
        // loadingMessages,
        // sendingMessage,

        // // UI
        // showNewConversation,

        // // Computed
        // activeChats,
        selectedActiveChat,

        // Conversations
        selectChat,

        // Sessions
        loadSessionChats,
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
        markIncomingMessagesAsRead,
        initializeSessionChats,
    }
})