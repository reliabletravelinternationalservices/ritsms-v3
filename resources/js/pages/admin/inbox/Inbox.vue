<script setup lang="ts">
import { onMounted } from 'vue'
import { Head } from '@inertiajs/vue3'

import AppLayout from '@/layouts/AppLayout.vue'
import InboxList from '@/components/inbox/InboxList.vue'
import ChatBox from '@/components/inbox/ChatBox.vue'
import SessionChatToggle from '@/components/inbox/SessionChatToggle.vue'
import NewConversationModal from '@/components/inbox/NewConversationModal.vue'

import type { BreadcrumbItem } from '@/types'
import { useInboxStore } from '@/stores/inbox'
import NoConvoSelected from '@/components/inbox/NoConvoSelected.vue'
import { Mode } from '@/types/chat'

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

const inbox = useInboxStore()

inbox.setCurrentMode(props.filters.type);


onMounted(() => {
    inbox.loadSessionChats()
})
</script>

<template>
    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div
            class="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-background"
        >
            <!-- HEADER -->
            <header
                class="flex shrink-0 items-center justify-between border-b px-5 py-3 text-foreground"
            >
                <div>
                    <h1 class="text-base font-semibold">
                        Inbox
                    </h1>

                    <p class="text-xs text-muted-foreground">
                        Manage your conversations
                    </p>
                </div>

                <SessionChatToggle />
            </header>

            <!-- CONTENT -->
            <div class="flex min-h-0 flex-1">
                <!-- LEFT -->
                <div class="w-[320px] shrink-0">
                    <InboxList
                        :chats="inbox.activeChats"
                        :active-id="inbox.activeId"
                        :title="
                            inbox.mode === 'chats'
                                ? 'Conversations'
                                : 'Sessions'
                        "
                        :loading="inbox.isChatsLoading"
                        @select="inbox.selectChat"
                        
                    />
                </div>

                <!-- CENTER -->
                <main class="min-w-0 flex-1 max-h-[calc(100vh-150px)]">
                    <ChatBox
                        v-if="inbox.selectedActiveChat"
                        :name="inbox.selectedActiveChat.code"
                        initials="WV"
                        :status="inbox.selectedActiveChat.status"
                        :messages="inbox.getMessages"
                        :loading="inbox.isMessagesLoading"
                        @send="inbox.sendMessage"
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