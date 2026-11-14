<script setup lang="ts">
import { ChatButton, ChatComposer, ChatContent, ChatHeader, ChatList, ChatPlaceholder, ConvoAction, ConvoOptions, ConvoProfile, CreateConvo, CreateHeader, EditConvoModal, EmptyPlaceholder, InboxBody, InboxContent, RightSidebar, Sidebar, SidebarBody, SidebarBodyPlaceholder } from '@/components/inbox';
import ChatBubble from '@/components/inbox/bubble/ChatBubble.vue';
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import LoadingData from '@/components/LoadingData.vue';
import { useInbox } from '@/composables/inbox/useInbox';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { onMounted } from 'vue';




const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('admin.inbox'),
    }
];



const {
    conversationList,
    loadingConvos,
    loadingMoreConvos,
    searchingConvos,
    initializeConvos,
    loadMoreConvo,
    searchConvo,

    messageGroupList,
    loadingMessages,
    loadingMoreMessages,
    loadMoreMessages,

    contactList,
    singleContact,
    isMultipleContact,
    addNewContact,
    removeExistingContact,

    // CREATE CONVO
    openCreateModal,
    creatingConvo,
    createModal,
    createNewConversation,


    // ACTIVE CONVO
    openedConvo,
    openChat,
    isOpenConvoGroup,
    openConvoAvatar,
    openConvoName,
    openInfo,
    infoToggle,
    openEditModal,
    editConvo,
    updateConvoInfo,
    leaveConvo,



    sendMessage,

    selectedReplyMessage,
  
    resetReply,
} = useInbox();


onMounted(async () => {
    await initializeConvos()
})



</script>


<template>

    <Head title="Inbox" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <InboxContent>
            <Sidebar @create="openCreateModal" @search="searchConvo">
                <SidebarBody v-if="conversationList && conversationList.data" :loading="loadingMoreConvos"
                    :has-more="Boolean(conversationList.next_cursor)"
                    @load="loadMoreConvo(conversationList.next_cursor)">

                    <ul class="mt-2 flex w-full min-w-0 flex-col space-y-1">
                        <li v-for="chat in conversationList.data" :key="chat.id"
                            class="w-full min-w-0 overflow-hidden rounded-md px-2 py-1">
                            <ChatButton :is-open="chat.id === openedConvo?.id" :chat="chat" @click="openChat" />
                        </li>
                    </ul>
                </SidebarBody>

                <SidebarBodyPlaceholder v-else>
                    <LoadingData v-if="loadingConvos || searchingConvos" />

                    <EmptyPlaceholder v-else class="flex flex-col items-center justify-center gap-2 h-full"
                        label="Start a new conversation" />

                </SidebarBodyPlaceholder>

            </Sidebar>


            <!-- MAIN INBOX -->
            <InboxBody>
                <ChatContent>
                    <ChatHeader v-if="!createModal && openedConvo" :chat="openedConvo" @info="infoToggle" />

                    <CreateHeader v-if="createModal" :contacts="contactList" @select="addNewContact"
                        @remove="removeExistingContact" />

                    <InfiniteScroll v-if="messageGroupList" class="py-2 w-full h-full overflow-y-auto"
                        :loading="loadingMoreMessages" :has-more="Boolean(messageGroupList.next_cursor)"
                        @load="loadMoreMessages(openedConvo, messageGroupList.next_cursor)" direction="bottom-to-top">
                        <ChatList v-for="messageBatch in messageGroupList.data" :key="messageBatch.id">
                            <ChatBubble :messageBatch="messageBatch" />
                        </ChatList>
                    </InfiniteScroll>

                    <CreateConvo v-else-if="singleContact && !loadingMessages"
                        :message="`Start a conversation with ${singleContact.display_name}`" button-label="Start now"
                        loading-text="Starting..." :loading="creatingConvo" @create="createNewConversation" />

                    <CreateConvo v-else-if="isMultipleContact" message="Create a group conversation"
                        button-label="Create now" loading-text="Creating..." :loading="creatingConvo"
                        @create="createNewConversation" />

                    <ChatPlaceholder v-else>
                        <LoadingData v-if="loadingMessages" />

                        <EmptyPlaceholder v-else
                            class="flex flex-col items-center justify-center gap-2 h-full w-full text-muted-foreground"
                            label="Select a conversation" />
                    </ChatPlaceholder>

                    <ChatComposer v-if="!loadingMessages && openedConvo" :is-reply="selectedReplyMessage !== null"
                        :reply-message="selectedReplyMessage" @cancel-reply="resetReply" @send="sendMessage" />
                </ChatContent>
            </InboxBody>

            <!-- RIGHT SIDEBAR -->
            <RightSidebar v-if="openInfo && openedConvo"> 
                <ConvoProfile
                    :avatar="openConvoAvatar"
                    :name="openConvoName?? 'Unknown User'"
                    :is-group="isOpenConvoGroup"
                />

                <ConvoAction v-if="isOpenConvoGroup" @edit="editConvo"/>
                
                <ConvoOptions 
                    :is-group="isOpenConvoGroup"
                    :chat="openedConvo"
                    @leave-convo="leaveConvo"
                />
            
            </RightSidebar>
        </InboxContent>

        <EditConvoModal
            v-if="openEditModal"
            v-model:open="openEditModal"
            :current-name="openConvoName!"
            :current-photo="openConvoAvatar"
            @save="updateConvoInfo"
        />
    </AppLayout>

</template>