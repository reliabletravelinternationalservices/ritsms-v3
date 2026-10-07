<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Head, router } from '@inertiajs/vue3'

import AppLayout from '@/layouts/AppLayout.vue'
import InboxList from '@/components/inbox/InboxList.vue'
import ChatBox from '@/components/inbox/ChatBox.vue'
import SessionChatToggle from '@/components/inbox/SessionChatToggle.vue'
import NewConversationModal from '@/components/inbox/NewConversationModal.vue'
import NoConvoSelected from '@/components/inbox/NoConvoSelected.vue'

import type { BreadcrumbItem, User } from '@/types'
import { Mode, ChatSessionWithLatestMessage } from '@/types/chat'
import { useChatSessionStore } from '@/stores/chatSession'
import { useConvoChatbox } from '@/stores/conversationChat'
import { useReferenceDataStore } from '@/stores/referenceData'

import { Client } from '@/types/client'
import { Conversation } from '@/types/conversation'

interface Props {
    clients: Client[]
    admins: User[]
    filters: {
        type: Mode
    }
}

const props = defineProps<Props>()

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('admin.inbox'),
    },
]

const mode = ref<Mode>(props.filters.type)

const sessionInbox = useChatSessionStore()
const convoInbox = useConvoChatbox()
const refData = useReferenceDataStore()

const createNewModal = ref(false)

refData.setClients(props.clients)
refData.setAdmins(props.admins)

/**
 * Change inbox mode
 */
function changeMode(value: Mode) {
    if (mode.value === value) {
        return
    }

    router.get(
        route('admin.inbox', {
            type: value,
        }),
        {},
        {
            preserveState: true,
            preserveScroll: true,
        },
    )
}

/**
 * Initialize only the store belonging to the current mode.
 */
watch(
    () => props.filters.type,
    async (value) => {
        mode.value = value

        if (value === 'sessions') {
            await sessionInbox.initializeSessionChats()
        } else if (value === 'chats') {
            await convoInbox.initializeConvoChats()
        }
    },
    {
        immediate: true,
    },
)

/**
 * Active inbox list
 */
const activeChats = computed(() => {
    if (mode.value === 'sessions') {
        return sessionInbox.chats
    }

    return convoInbox.chats
})

/**
 * Active selected chat
 */
const activeChat = computed(() => {
    if (mode.value === 'sessions') {
        return sessionInbox.selectedActiveChat
    }

    return convoInbox.selectedActiveChat
})

/**
 * Active chat messages
 */
const activeMessages = computed(() => {
    if (mode.value === 'sessions') {
        return sessionInbox.getMessages
    }

    return convoInbox.getMessages
})

/**
 * Active loading state
 */
const isChatsLoading = computed(() => {
    if (mode.value === 'sessions') {
        return sessionInbox.isChatsLoading
    }

    return convoInbox.isChatsLoading
})

const isMessagesLoading = computed(() => {
    if (mode.value === 'sessions') {
        return sessionInbox.isMessagesLoading
    }

    return convoInbox.isMessagesLoading
})

/**
 * Active selected ID
 */
const activeId = computed(() => {
    if (mode.value === 'sessions') {
        return sessionInbox.activeUUID
    }

    return convoInbox.activeID
})

/**
 * Select chat from the active inbox
 */
function selectChat(id: string) {
    if (mode.value === 'sessions') {
        sessionInbox.selectChat(id)
    } else {
        convoInbox.selectChat(Number(id))
    }
}

/**
 * Send message through the active inbox
 */
function sendMessage(message: string) {
    if (mode.value === 'sessions') {
        sessionInbox.sendMessage(message)
    } else {
        convoInbox.sendMessage(message)
    }
}

/**
 * New message indicator
 */
// const hasNewMessages = computed(() => {
//     if (!activeChat.value) {
//         return false
//     }

//     return activeChat.value.new_messages_count > 0
// })
</script>

<template>
    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div
            class="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background"
        >
            <!-- HEADER -->
            <header
                class="flex shrink-0 items-center justify-between border-b px-5 py-2 text-foreground"
            >
                <div>
                    <h2 class="text-sm font-semibold">
                        {{ mode === 'chats' ? 'Conversations' : 'Sessions' }}
                    </h2>

                    <p class="text-xs text-muted-foreground">
                        {{ activeChats.length }} conversations
                    </p>
                </div>

                <SessionChatToggle
                    :mode="mode"
                    :total-new-convo-chat="convoInbox.totalUnreadChatConvo"
                    :total-new-session-chat="sessionInbox.totalUnreadChatSessions"
                    @change-mode="changeMode"
                />
            </header>

            <!-- CONTENT -->
            <div class="flex min-h-0 flex-1">
                <!-- LEFT -->
                <div class="w-[320px] shrink-0">
                    <InboxList
                        :mode="mode"
                        :chats="activeChats"
                        :active-id="activeId"
                        :loading="isChatsLoading"
                        @select="selectChat"
                        @create="createNewModal = true"
                    />
                </div>

                <!-- CENTER -->
                <main
                    class="min-w-0 max-h-[calc(100vh-150px)] flex-1"
                >
                    <ChatBox
                        v-if="activeChat"
                        :mode="mode"
                        :name="
                            mode === 'sessions'
                                ? activeChat.code
                                : activeChat.name
                        "
                        initials="WV"
                        :status="activeChat.status"
                        :messages="activeMessages"
                        :has-new-messages="hasNewMessages"
                        :loading="isMessagesLoading"
                        @send="sendMessage"
                    />

                    <NoConvoSelected v-else />
                </main>
            </div>
        </div>

        <NewConversationModal
            v-model:open="createNewModal"
            :contacts="refData.contacts"
        />
    </AppLayout>
</template>