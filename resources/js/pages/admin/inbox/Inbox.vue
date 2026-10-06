<script setup lang="ts">
import { ref, watch } from 'vue'
import { Head, router } from '@inertiajs/vue3'

import AppLayout from '@/layouts/AppLayout.vue'
import InboxList from '@/components/inbox/InboxList.vue'
import ChatBox from '@/components/inbox/ChatBox.vue'
import SessionChatToggle from '@/components/inbox/SessionChatToggle.vue'
import NewConversationModal from '@/components/inbox/NewConversationModal.vue'

import type { BreadcrumbItem } from '@/types'
import NoConvoSelected from '@/components/inbox/NoConvoSelected.vue'
import { Mode } from '@/types/chat'
import { useChatSessionStore } from '@/stores/chatSession'

interface Props {
    filters: {
        type:  Mode
    }
}


const props = defineProps<Props>();


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('admin.inbox'),
    },
]

const sessionInbox = useChatSessionStore()
const mode = ref<Mode>(props.filters.type)


function changeMode(value: Mode) {
    if (mode.value === value) {
        return
    }
    
    router.get(route('admin.inbox', { type: value }))
}

watch(
    () => props.filters.type,
    (value) => {
        mode.value = value

        if (value === 'sessions') {
            sessionInbox.initializeSessionChats()
        }
    },
    { immediate: true },
)

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
                        5 conversations
                    </p>

                </div>
                <SessionChatToggle
                    :mode="mode",
                    @change-mode="changeMode"
                    :total-new-convo-chat="0"
                    :total-new-session-chat="sessionInbox.totalUnreadChatSessions"
                />

            </header>

            <!-- CONTENT -->
            <div class="flex min-h-0 flex-1">
                <!-- LEFT -->
                <div class="w-[320px] shrink-0">
                    <InboxList
                        :mode="mode"
                        :chats="sessionInbox.chats"
                        :active-id="sessionInbox.activeUUID"
                        :loading="sessionInbox.isChatsLoading"
                        @select="sessionInbox.selectChat"
                        
                    />
                </div>

                <!-- CENTER -->
                <main class="min-w-0 flex-1 max-h-[calc(100vh-150px)]">
                    <ChatBox
                        v-if="sessionInbox.selectedActiveChat"
                        :mode="mode"
                        :name="sessionInbox.selectedActiveChat.code"
                        initials="WV"
                        :status="sessionInbox.selectedActiveChat.status"
                        :messages="sessionInbox.getMessages"
                        :has-new-messages="sessionInbox.selectedActiveChat.new_messages_count > 0"
                        :loading="sessionInbox.isMessagesLoading"
                        @send="sessionInbox.sendMessage"
                    />


                    <NoConvoSelected v-else />
                </main>
            </div>
        </div>

        <!-- <NewConversationModal
            v-model:open="inbox.showNewConversation"
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
            @create="inbox.createConversation"
        /> -->
    </AppLayout>
</template>