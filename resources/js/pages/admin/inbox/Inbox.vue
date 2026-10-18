<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Head, router } from '@inertiajs/vue3'

import AppLayout from '@/layouts/AppLayout.vue'
import SessionChatToggle from '@/components/inbox/SessionChatToggle.vue'
import type { BreadcrumbItem, User } from '@/types'
import { Mode } from '@/types/chat'
import { Client } from '@/types/client'
import { useAdminSessionChat } from '@/stores/adminSessionChat'
import SessionInbox from '@/components/inbox/session/SessionInbox.vue'
import ConvoInbox from '@/components/inbox/conversation/ConvoInbox.vue'
import { useAdminChatStatus } from '@/stores/adminChatStatusStore'
import InboxContent from '@/components/inbox/InboxContent.vue'
import InboxHeader from '@/components/inbox/InboxHeader.vue'
import InboxBody from '@/components/inbox/InboxBody.vue'
import { useConvoInbox } from '@/composables/inbox/conversation/useConvoInbox'
import NavSearch from '@/components/inbox/conversation/sidebar/NavSearch.vue'
import EmptyConvo from '@/components/inbox/conversation/sidebar/EmptyConvo.vue'
import Loading from '@/components/inbox/conversation/sidebar/Loading.vue'
import ConvoBody from '@/components/inbox/conversation/body/ConvoBody.vue'
import NoConvoSelected from '@/components/inbox/NoConvoSelected.vue'
import ChatBox from '@/components/inbox/conversation/body/chat_box/ChatBox.vue'
import ChatBoxHeader from '@/components/inbox/conversation/body/chat_box/ChatBoxHeader.vue'
import CardAvatar from '@/components/inbox/conversation/body/chat_card/CardAvatar.vue'
import MessageContainer from '@/components/inbox/conversation/body/chat_box/MessageContainer.vue'
import ChatComposer from '@/components/inbox/conversation/body/chat_box/ChatComposer.vue'
import ComposeContainer from '@/components/inbox/conversation/body/chat_box/ComposeContainer.vue'
import ChatCard from '@/components/inbox/conversation/body/chat_card/ChatCard.vue'
import ConvoSidebar from '@/components/inbox/conversation/ConvoSidebar.vue'
import ChatList from '@/components/inbox/conversation/sidebar/ChatList.vue'
import CardInfo from '@/components/inbox/conversation/body/chat_card/CardInfo.vue'
import Name from '@/components/inbox/conversation/body/chat_card/Name.vue'
import Time from '@/components/inbox/conversation/body/chat_card/Time.vue'
import LatestMessage from '@/components/inbox/conversation/body/chat_card/LatestMessage.vue'
import CreateConvoModal from '@/components/inbox/conversation/CreateConvoModal.vue'
import ChatMessage from '@/components/inbox/conversation/body/chat_box/ChatMessage.vue'


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




const {
    service,
    showNewConvoDialog,
    filterConvo,
    createConvo,
    sendMessage,
    isMine,
    isRead,
} = useConvoInbox()


const ACST = useAdminChatStatus();

const UASC = useAdminSessionChat();
const mode = ref<Mode>(props.filters.type);


watch(
    () => props.filters.type,
    async (value) => {
        mode.value = value
        await ACST.initialize();
        await UASC.initializeChats();
        await service.initializeChat();
    },
    {
        immediate: true,
    },
)




const changeMode = (value: Mode) => {
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




onMounted(async () => {
    await ACST.initialize();
    await UASC.initializeChats()
    await service.initializeChat()
})

</script>

<template>

    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <InboxContent>
            <InboxHeader :mode="mode" :total-convo="0">
                <SessionChatToggle :mode="mode" :total-new-convo-chat="ACST.statusState.totalUnreadConvoChat"
                    :total-new-session-chat="ACST.statusState.totalUnreadSessionChat" @change-mode="changeMode" />
            </InboxHeader>

            <InboxBody>
                <SessionInbox v-if="mode === 'sessions'" :mode="mode" />

                <!-- CONVO -->
                <ConvoInbox v-else>
                    <ConvoSidebar>
                        <NavSearch @search="filterConvo" @create="createConvo" />

                        <ChatList>
                            <ChatCard v-for="chat in service.convoDataList" :key="chat.id" :active="true">
                                <CardAvatar />

                                <CardInfo>
                                    <div class="flex items-center justify-between gap-2">
                                        <Name :is-read="isRead(chat.latest_message)" :name="chat.name" />

                                        <Time :created-at="chat.latest_message.created_at" />
                                    </div>

                                    <LatestMessage :is-read="isRead(chat.latest_message)"
                                        :is-mine="isMine(chat.latest_message.sender_id)"
                                        :message="chat.latest_message.message" />
                                </CardInfo>
                            </ChatCard>

                            <EmptyConvo v-if="service.isEmptyConvo" />

                            <Loading v-if="service.isConvoLoading" />
                        </ChatList>
                    </ConvoSidebar>

                    <!-- CENTER -->
                    <ConvoBody>
                        <ChatBox v-if="!service.isNoSelectedChat">
                            <ChatBoxHeader :chat-name="service.chatSelected!.name" />

                            <MessageContainer ref="messageContainer">
                                <div class="mt-6 space-y-4">
                                    <ChatMessage v-for="message in service.chatMessages" :key="message.id"
                                        :is-mine="isMine(message.sender_id)" :message="message" />
                                </div>
                            </MessageContainer>

                            <!-- Composer always at bottom -->
                            <!-- ADD DRAG AND DROP FILE SOON -->
                            <ComposeContainer>
                                <ChatComposer @send="sendMessage" @read="() => { }" />
                            </ComposeContainer>
                        </ChatBox>

                        <NoConvoSelected v-else />
                    </ConvoBody>


                </ConvoInbox>
            </InboxBody>
        </InboxContent>

        <CreateConvoModal v-model:open="showNewConvoDialog" />
    </AppLayout>
</template>