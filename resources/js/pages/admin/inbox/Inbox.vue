<script setup lang="ts">
import { computed, ref } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { BreadcrumbItem } from '@/types'

import InboxList from '@/components/inbox/InboxList.vue'
import ChatBox from '@/components/inbox/ChatBox.vue'
import SessionChatToggle from '@/components/inbox/SessionChatToggle.vue'
import NewConversationModal from '@/components/inbox/NewConversationModal.vue'

import type { ChatCardData } from '@/components/inbox/ChatCard.vue'
import { Head } from '@inertiajs/vue3'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('admin.inbox'),
    },
]

type Mode = 'chat' | 'session'

const mode = ref<Mode>('chat')

const showNewConversation = ref(false)

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

const sessionChats = ref<ChatCardData[]>([
    {
        id: 'session-1',
        name: 'Website Visitor',
        initials: 'WV',
        message: 'I want to ask about Japan tours.',
        time: '11:03 AM',
        unread: 1,
        status: 'online',
        type: 'session',
    },
    {
        id: 'session-2',
        name: 'Website Visitor',
        initials: 'WV',
        message: 'Do you have Korea packages?',
        time: '10:57 AM',
        status: 'online',
        type: 'session',
    },
])

const activeId = ref<number | string | null>(
    chats.value[0]?.id ?? null,
)

const activeChats = computed(() => {
    return mode.value === 'chat'
        ? chats.value
        : sessionChats.value
})

const activeChat = computed(() => {
    return activeChats.value.find(
        chat => chat.id === activeId.value,
    )
})

const messages = ref([
    {
        id: 1,
        sender: 'them' as const,
        content: 'Hi, I would like to ask about my booking.',
        time: '10:41 AM',
    },
    {
        id: 2,
        sender: 'me' as const,
        content: 'Sure! How can I help you with your booking?',
        time: '10:42 AM',
    },
])

const sessionUnread = computed(() =>
    sessionChats.value.reduce(
        (total, chat) => total + (chat.unread ?? 0),
        0,
    ),
)

function changeMode(value: Mode) {
    mode.value = value

    const firstChat = activeChats.value[0]

    activeId.value = firstChat?.id ?? null
}

function selectChat(chat: ChatCardData) {
    activeId.value = chat.id

    chat.unread = 0
}

function sendMessage(payload: {
    content: string
    attachments: unknown[]
}) {
    messages.value.push({
        id: Date.now(),
        sender: 'me',
        content: payload.content,
        time: new Date().toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        }),
    })

    updateLastMessage(payload.content)
}

function updateLastMessage(content: string) {
    const chat = activeChats.value.find(
        item => item.id === activeId.value,
    )

    if (!chat) {
        return
    }

    const temp = document.createElement('div')
    temp.innerHTML = content

    chat.message = temp.innerText || 'Attachment'
    chat.time = 'Just now'
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
            : payload.contacts[0]?.name ?? 'New Conversation'

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
}
</script>

<template>
    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">

        <div
            class="flex h-full min-h-0 w-full overflow-hidden rounded-xl border border-border bg-background"
        >

            <!-- LEFT -->
            <InboxList
                :chats="activeChats"
                :active-id="activeId"
                :title="mode === 'chat' ? 'Inbox' : 'Session Chats'"
                @select="selectChat"
                @create="showNewConversation = true"
            />

            <!-- CENTER -->
            <ChatBox
                v-if="activeChat"
                :name="activeChat.name"
                :initials="activeChat.initials"
                :status="activeChat.status"
                :messages="messages"
                @send="sendMessage"
            />

            <!-- Empty chat -->
            <div
                v-else
                class="flex flex-1 items-center justify-center"
            >
                <div class="text-center">
                    <p class="font-medium">
                        No conversation selected
                    </p>

                    <p class="mt-1 text-sm text-muted-foreground">
                        Select a conversation to start chatting.
                    </p>
                </div>
            </div>

            <!-- RIGHT -->
            <SessionChatToggle
                :model-value="mode"
                :session-unread="sessionUnread"
                @update:model-value="changeMode"
            />

        </div>

        <!-- New conversation -->
        <NewConversationModal
            v-model:open="showNewConversation"
            :contacts="[
                {
                    id: 1,
                    name: 'Juan Dela Cruz',
                    email: 'juan@example.com',
                    initials: 'JD',
                },
                {
                    id: 2,
                    name: 'Maria Santos',
                    email: 'maria@example.com',
                    initials: 'MS',
                },
                {
                    id: 3,
                    name: 'Pedro Garcia',
                    email: 'pedro@example.com',
                    initials: 'PG',
                },
            ]"
            @create="createConversation"
        />

    </AppLayout>
</template>