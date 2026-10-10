<script setup lang="ts">
import { ref, watch } from 'vue'
import { Head, router } from '@inertiajs/vue3'

import AppLayout from '@/layouts/AppLayout.vue'
import SessionInboxList from '@/components/inbox/session/InboxList.vue'
import ChatBox from '@/components/inbox/session/ChatBox.vue'
import SessionChatToggle from '@/components/inbox/SessionChatToggle.vue'
import NewConversationModal from '@/components/inbox/NewConversationModal.vue'
import NoConvoSelected from '@/components/inbox/NoConvoSelected.vue'

import type { BreadcrumbItem, User } from '@/types'
import { Mode } from '@/types/chat'
import { useReferenceDataStore } from '@/stores/referenceData'

import { Client } from '@/types/client'
import { useAdminChat } from '@/stores/adminChat'

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


const chatboxRef = ref<InstanceType<typeof ChatBox> | null>(null)

const mode = ref<Mode>(props.filters.type)

const adminChat = useAdminChat()
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
        await adminChat.initializeChats(mode.value)
    },
    {
        immediate: true,
    },
)


watch(
    () => adminChat.getSessionMessages,
    async (messages) => {
        
    },
    { deep: true, immediate: true },
)




const selectChat = async (id: string) => {
    await adminChat.selectChat(mode.value, id)
    await chatboxRef.value?.scrollToBottom()
}


/**
 * Send message through the active inbox
 */
function sendMessage(message: string, attachments?: unknown[] | null) {
    if (mode.value === 'sessions') {
        // sessionInbox.sendMessage(message)
    } else {
        // convoInbox.sendMessage(message, attachments)
    }
}


</script>

<template>

    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background">
            <!-- HEADER -->
            <header class="flex shrink-0 items-center justify-between border-b px-5 py-2 text-foreground">
                <div>
                    <h2 class="text-sm font-semibold">
                        {{ mode === 'chats' ? 'Conversations' : 'Sessions' }}
                    </h2>

                    <p class="text-xs text-muted-foreground">
                        {{ adminChat.totalSessionChat }} conversations
                    </p>
                </div>

                <SessionChatToggle :mode="mode" :total-new-convo-chat="0"
                    :total-new-session-chat="adminChat.totalNewUnreadChats" @change-mode="changeMode" />
            </header>

            <!-- CONTENT -->
            <div class="flex min-h-0 flex-1">
                <!-- LEFT -->
                <div class="w-[320px] shrink-0">
                    <SessionInboxList 
                        :mode="mode" 
                        :chats="adminChat.getSessionChats" 
                        :loading="adminChat.isLoadingChats"
                        @select="selectChat" />
                </div>

                <!-- CENTER -->
                <main class="min-w-0 max-h-[calc(100vh-150px)] flex-1">
                    <ChatBox ref="chatboxRef" v-if="!adminChat.isNoSelectedChat" 
                        :mode="mode" 
                        :name="adminChat.getSelectedSessionChat!.code" 
                        initials="SC"
                        :status="adminChat.getSelectedSessionChat!.status" 
                        :messages="adminChat.getSessionMessages"
                        :loading="adminChat.isLoadingChats" @send="sendMessage" />

                    <NoConvoSelected v-else />
                </main>
            </div>
        </div>

        <NewConversationModal v-model:open="createNewModal" :contacts="refData.contacts" />
    </AppLayout>
</template>