import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import type { ChatCardData } from '@/components/inbox/ChatCard.vue'
import type { ChatMessage, SessionChat } from '@/types/chat'

export type InboxMode = 'chat' | 'session'

export const useInboxStore = defineStore('inbox', () => {
    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const mode = ref<InboxMode>('chat')

    const chats = ref<ChatCardData[]>([
        {
            id: 1,
            name: 'Juan Dela Cruz',
            initials: 'JD',
            message: 'Hi, I would like to ask about my booking.',
            time: '10:42 AM',
            unread: 2,
            status: 'online',
            type: 'chat',
        },
        {
            id: 2,
            name: 'Maria Santos',
            initials: 'MS',
            message: 'Thank you for the quotation.',
            time: '9:18 AM',
            status: 'away',
            type: 'chat',
        },
        {
            id: 3,
            name: 'Pedro Garcia',
            initials: 'PG',
            message: 'Can I change my travel date?',
            time: 'Yesterday',
            unread: 1,
            status: 'offline',
            type: 'chat',
        },
    ])

    const sessionChats = ref<ChatCardData[]>([])

    const messages = ref<ChatMessage[]>([])

    const activeId = ref<number | string | null>(
        chats.value[0]?.id ?? null,
    )

    const loadingChats = ref(false)

    const loadingMessages = ref(false)

    const sendingMessage = ref(false)

    /*
    |--------------------------------------------------------------------------
    | UI State
    |--------------------------------------------------------------------------
    */

    const showNewConversation = ref(false)

    /*
    |--------------------------------------------------------------------------
    | Computed
    |--------------------------------------------------------------------------
    */

    const activeChats = computed(() => {
        return mode.value === 'chat'
            ? chats.value
            : sessionChats.value
    })

    const activeChat = computed(() => {
        return activeChats.value.find(
            chat => String(chat.id) === String(activeId.value),
        ) ?? null
    })

    const sessionUnread = computed(() => {
        return sessionChats.value.reduce(
            (total, chat) => total + (chat.unread ?? 0),
            0,
        )
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
            await loadSessionChats()

            const firstSession = sessionChats.value[0]

            activeId.value = firstSession?.id ?? null

            if (firstSession) {
                await loadSessionMessages(
                    String(firstSession.id),
                )
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

    async function selectChat(chat: ChatCardData) {
        activeId.value = chat.id

        chat.unread = 0

        messages.value = []

        if (mode.value === 'session') {
            await loadSessionMessages(
                String(chat.id),
            )
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Session Chats
    |--------------------------------------------------------------------------
    */

    async function loadSessionChats() {
        loadingChats.value = true

        try {
            const response = await axios.get(
                route('admin.inbox.sessions'),
            )

            sessionChats.value = response.data.map(
                (session: SessionChat) => ({
                    ...session,
                    id: session.uuid,
                }),
            )
        } catch (error) {
            console.error(
                'Failed to load session chats:',
                error,
            )

            sessionChats.value = []
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

    /*
    |--------------------------------------------------------------------------
    | Send Message
    |--------------------------------------------------------------------------
    */

    async function sendMessage(payload: {
        content: string
        attachments: unknown[]
    }) {
        if (
            mode.value !== 'session'
            || activeId.value === null
            || !payload.content.trim()
        ) {
            return
        }

        sendingMessage.value = true

        try {
            const response = await axios.post(
                route(
                    'admin.inbox.sessions.messages.store',
                    {
                        uuid: activeId.value,
                    },
                ),
                {
                    message: payload.content,
                },
            )

            messages.value.push(response.data)

            updateLastMessage(
                payload.content,
            )
        } catch (error) {
            console.error(
                'Failed to send message:',
                error,
            )
        } finally {
            sendingMessage.value = false
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Conversation Preview
    |--------------------------------------------------------------------------
    */

    function updateLastMessage(content: string) {
        const chat = activeChats.value.find(
            item =>
                String(item.id)
                === String(activeId.value),
        )

        if (!chat) {
            return
        }

        const temp = document.createElement('div')

        temp.innerHTML = content

        chat.message =
            temp.innerText || 'Attachment'

        chat.time = 'Just now'
    }

    /*
    |--------------------------------------------------------------------------
    | New Conversation
    |--------------------------------------------------------------------------
    */

    function openNewConversation() {
        showNewConversation.value = true
    }

    function closeNewConversation() {
        showNewConversation.value = false
    }

    function createConversation(payload: {
        type: 'chat' | 'group'
        contacts: {
            id: number
            name: string
            email: string
            initials: string
        }[]
        name?: string
    }) {
        const name =
            payload.type === 'group'
                ? payload.name ?? 'New Group'
                : payload.contacts[0]?.name
                    ?? 'New Conversation'

        const newChat: ChatCardData = {
            id: `new-${Date.now()}`,
            name,
            initials: name
                .split(' ')
                .map(word => word[0])
                .join('')
                .slice(0, 2)
                .toUpperCase(),
            message: 'New conversation',
            time: 'Just now',
            status: 'online',
            type: 'chat',
        }

        chats.value.unshift(newChat)

        mode.value = 'chat'

        activeId.value = newChat.id

        messages.value = []

        closeNewConversation()
    }

    /*
    |--------------------------------------------------------------------------
    | Reset
    |--------------------------------------------------------------------------
    */

    function clearMessages() {
        messages.value = []
    }

    function clearActiveChat() {
        activeId.value = null

        messages.value = []
    }

    /*
    |--------------------------------------------------------------------------
    | Store
    |--------------------------------------------------------------------------
    */

    return {
        // State
        mode,
        chats,
        sessionChats,
        messages,
        activeId,

        // Loading
        loadingChats,
        loadingMessages,
        sendingMessage,

        // UI
        showNewConversation,

        // Computed
        activeChats,
        activeChat,
        sessionUnread,

        // Mode
        changeMode,

        // Conversations
        selectChat,

        // Sessions
        loadSessionChats,
        loadSessionMessages,

        // Messages
        sendMessage,
        updateLastMessage,

        // New conversation
        openNewConversation,
        closeNewConversation,
        createConversation,

        // Utility
        clearMessages,
        clearActiveChat,
    }
})