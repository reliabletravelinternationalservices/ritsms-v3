<script setup lang="ts">
import { ChatButton, ChatComposer, ChatContent, ChatHeader, ChatList, InboxBody, InboxContent, Sidebar, SidebarBody, SidebarBodyPlaceholder } from '@/components/inbox';
import ChatBubble from '@/components/inbox/bubble/ChatBubble.vue';
import SelectedContact from '@/components/inbox/create-convo/SelectedContact.vue';
import UserSearch from '@/components/inbox/create-convo/UserSearch.vue';
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import LoadingData from '@/components/LoadingData.vue';
import { Button } from '@/components/ui/button';
import { useInbox } from '@/composables/inbox/useInbox';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { MessageCirclePlusIcon, MessageSquareOff } from '@lucide/vue';
import { onMounted } from 'vue';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('admin.inbox'),
    }
];



const {
    search,
    pagedConversations,
    convoFullLoading,
    openedConvo,
    initializeConvos,
    openChat,
    loadMoreLoading,
    loadMoreConvo,
    searchLoading,
    openedConvoMessages,
    openedConvoMessagesLoading,
    loadMoreMessagesLoading,
    isOwnerChat,
    sendMessage,
    createConvo,
    openCreateConvo,
    loadMoreMessages,
    addContact,
    removeContact,
    selectedContacts
} = useInbox();


onMounted(async () => {
    await initializeConvos()
})



</script>


<template>

    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <InboxContent>
            <Sidebar @create="openCreateConvo" @search="search">
                <SidebarBody v-if="pagedConversations && pagedConversations.data" :loading="loadMoreLoading"
                    :has-more="Boolean(pagedConversations.next_cursor)"
                    @load="() => loadMoreConvo(pagedConversations?.next_cursor)">
                    <ul class="mt-2 space-y-1 w-full">
                        <li v-for="chat in pagedConversations.data" :key="chat.id"
                            class="cursor-pointer rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground">
                            <ChatButton :is-open="chat.id === openedConvo?.id" :chat="chat" @click="openChat" />
                        </li>
                    </ul>
                </SidebarBody>

                <SidebarBodyPlaceholder v-else>
                    <LoadingData v-if="convoFullLoading || searchLoading" />

                    <div v-else class="flex flex-col items-center justify-center gap-2 h-full">
                        <MessageSquareOff class="h-8 w-8" />
                        <span class="italic">Start a new chat</span>
                    </div>
                </SidebarBodyPlaceholder>

            </Sidebar>

            <InboxBody>
                <ChatContent>
                    <ChatHeader v-if="!createConvo && openedConvo" :chat="openedConvo" @info="() => { }" />
                    <div v-else-if="createConvo" class="p-4 text-foreground space-y-2">
                        <UserSearch @select="addContact" />
                        <SelectedContact :contacts="selectedContacts" @remove="removeContact" />
                    </div>

                    <InfiniteScroll v-if="openedConvoMessages" class="py-2 w-full h-full overflow-y-auto"
                        :loading="loadMoreMessagesLoading" :has-more="Boolean(openedConvoMessages.next_cursor)" @load="loadMoreMessages(openedConvoMessages.next_cursor)" direction="bottom-to-top">
                        <ChatList v-for="message in openedConvoMessages.data" :key="message.id">
                            <ChatBubble :message="message" :is-owner="isOwnerChat(message)" />
                        </ChatList>
                    </InfiniteScroll>
                    
                    <div v-else-if="selectedContacts.length > 1" class="h-full">
                       <div class="flex flex-col items-center justify-center gap-2 h-full w-full text-muted-foreground">
                            <MessageCirclePlusIcon class="h-8 w-8" />
                            <span class="italic">Create a group conversation</span>
                            <Button variant="ghost" @click="()=>{}" class="capitalize text-yellow-600 underline">Create now</Button>
                        </div>
                    </div>

                    <div v-else class="h-full">
                        <LoadingData v-if="openedConvoMessagesLoading" />

                       <div v-else class="flex flex-col items-center justify-center gap-2 h-full w-full text-muted-foreground">
                            <MessageSquareOff class="h-8 w-8" />
                            <span class="italic">Select a conversation</span>
                        </div>
                    </div>


                    <ChatComposer v-if="!openedConvoMessagesLoading && openedConvo" @send="sendMessage" />
                </ChatContent>
            </InboxBody>
        </InboxContent>
    </AppLayout>

</template>