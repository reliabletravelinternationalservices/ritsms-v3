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
import InboxContent from '@/components/inbox/InboxContent.vue'
import InboxHeader from '@/components/inbox/InboxHeader.vue'
import InboxBody from '@/components/inbox/InboxBody.vue'
import { useConvoInbox } from '@/composables/inbox/conversation/useConvoInbox'
import ConvoNavSearch from '@/components/inbox/conversation/sidebar/NavSearch.vue'
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
import ChatList from '@/components/inbox/conversation/ChatList.vue'
import CardInfo from '@/components/inbox/conversation/body/chat_card/CardInfo.vue'
import Name from '@/components/inbox/conversation/body/chat_card/Name.vue'
import Time from '@/components/inbox/conversation/body/chat_card/Time.vue'
import LatestMessage from '@/components/inbox/conversation/body/chat_card/LatestMessage.vue'
import ChatMessage from '@/components/inbox/conversation/body/chat_box/ChatMessage.vue'
import CreateConvoModal from '@/components/inbox/conversation/create_modal/CreateConvoModal.vue'
import SessionNavSearch from '@/components/inbox/session/sidebar/NavSearch.vue'


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
    isSelectedChat,
    viewChat,
    readMessages,
} = useConvoInbox()

const UASC = useAdminSessionChat();
const mode = ref<Mode>(props.filters.type);


watch(
    () => props.filters.type,
    async (value) => {
        mode.value = value
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
    await UASC.initializeChats();
    await service.initialize();
})

</script>

<template>

    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <InboxContent>
            <InboxHeader :mode="mode" :total-convo="0">
                <SessionChatToggle :mode="mode" :total-new-convo-chat="service.chatStatuses.totalUnreadConvoChat"
                    :total-new-session-chat="service.chatStatuses.totalUnreadSessionChat" @change-mode="changeMode" />
            </InboxHeader>

            <InboxBody>
                <ConvoInbox>
                    <!-- <SessionInbox v-if="mode === 'sessions'" :mode="mode" /> -->
                    <ConvoSidebar>

                        <!-- IF CONVERSATION CHAT -->
                        <ConvoNavSearch v-if="mode === 'chats'"  @search="filterConvo" @create="createConvo" />
                        <ChatList 
                            v-if="mode === 'chats' 
                            && service.isEmptyConvo === false 
                            && service.isConvoLoading === false"
                            >
                            <ChatCard v-for="chat in service.convoDataList" :key="chat.id"
                                :active="isSelectedChat(chat.id)" @view="viewChat(chat.id)">
                                <CardAvatar />

                                <CardInfo>
                                    <div class="flex items-center justify-between gap-2 w-full">
                                        <Name :is-read="isRead(chat.latest_message)" :name="chat.name" />

                                        <Time :created-at="chat.latest_message.created_at" />
                                    </div>

                                    <!-- TODO: GET LATEST MESSAGES THEN GET TOTAL UNSEEN MESSAGES -->
                                    <LatestMessage :is-read="isRead(chat.latest_message)"
                                        :is-mine="isMine(chat.latest_message.sender_id)"
                                        :message="chat.latest_message.message"
                                        :new-message-count="chat.unread_messages_count" />
                                </CardInfo>
                            </ChatCard>
                        </ChatList>


                        <!-- IF SESSIONS CHAT -->
                        <SessionNavSearch v-if="mode === 'sessions'" @search="()=>{}" />
                        <ChatList v-if="mode === 'sessions'">
                            <ChatCard v-for="chat in UASC.getSessionChats" :key="chat.code"
                                :active="false" @view="()=>{}">
                                <CardAvatar />

                                <CardInfo>
                                    <div class="flex items-center justify-between gap-2 w-full">
                                        <Name :is-read="chat.latest_message?.sender_type === 'admin'" :name="chat.code" />

                                        <Time :created-at="chat.latest_message?.created_at" />
                                    </div>
                                    <LatestMessage :is-read="chat.latest_message?.sender_type === 'admin'"
                                        :is-mine="chat.latest_message?.sender_type === 'admin'"
                                        :message="chat.latest_message?.message"
                                        :new-message-count="chat.new_messages_count" />
                                </CardInfo>
                            </ChatCard>
                        </ChatList>


                        <EmptyConvo v-if="service.isEmptyConvo" />
                        <Loading v-if="service.isConvoLoading" />

                    </ConvoSidebar>

                    <ConvoBody>
                        <ChatBox v-if="service.isNoSelectedChat === false && mode === 'chats'">
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
                                <ChatComposer @send="sendMessage" @read="readMessages" />
                            </ComposeContainer>
                        </ChatBox>


                        <!-- FOR SESSION CHAT -->
                        <ChatBox v-if="mode === 'sessions'">
                            <ChatBoxHeader :chat-name="UASC.getSelectedSessionChat?.uuid!" />

                            <MessageContainer ref="messageContainer">
                                <div class="mt-6 space-y-4">
                                    <ChatMessage v-for="message in service.chatMessages" :key="message.id"
                                        :is-mine="isMine(message.sender_id)" :message="message" />
                                </div>
                            </MessageContainer>

                            <ComposeContainer>
                                <ChatComposer @send="sendMessage" @read="readMessages" />
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