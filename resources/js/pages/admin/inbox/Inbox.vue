<script setup lang="ts">
import { ChatButton, ChatComposer, ChatContent, ChatHeader, ChatList, InboxBody, InboxContent, Sidebar, SidebarBody, SidebarBodyPlaceholder } from '@/components/inbox';
import ChatBubble from '@/components/inbox/bubble/ChatBubble.vue';
import CreateConversation from '@/components/inbox/create-convo/CreateConversation.vue';
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import LoadingData from '@/components/LoadingData.vue';
import { useInbox } from '@/composables/inbox/useInbox';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { MessageSquareOff, SendIcon } from '@lucide/vue';
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
    isOwnerChat,
    sendMessage,
    createConvo,
    createNewConvo,
} = useInbox();


onMounted(async () => {
    await initializeConvos()
})


</script>


<template>

    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <InboxContent>
            <Sidebar @create="createNewConvo" @search="search">
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

                    <div v-else class="flex flex-col items-center justify-center gap-2">
                        <MessageSquareOff class="h-8 w-8" />
                        <span class="italic">Start a new chat</span>
                    </div>
                </SidebarBodyPlaceholder>

            </Sidebar>

            <InboxBody>

                <div v-if="createConvo" class="text-foreground">
                    <CreateConversation />
                </div>
                <ChatContent v-else-if="openedConvo" :chat="openedConvo">
                    <ChatHeader :chat="openedConvo" @info="() => { }" />

                    <InfiniteScroll v-if="openedConvoMessages" class="py-2 w-full h-full overflow-y-auto"
                        :loading="false" :has-more="false" @load="() => { }" direction="bottom-to-top">
                        <ChatList v-for="message in openedConvoMessages.data" :key="message.id">
                            <ChatBubble :message="message" :is-owner="isOwnerChat(message)" />
                        </ChatList>
                    </InfiniteScroll>

                    <div v-else>
                        <LoadingData v-if="openedConvoMessagesLoading" />

                        <div v-else class="flex flex-col items-center justify-center gap-2">
                            <SendIcon class="h-8 w-8" />
                            <span class="italic">Send a new message</span>
                        </div>
                    </div>


                    <ChatComposer v-if="!openedConvoMessagesLoading" @send="sendMessage" />
                </ChatContent>

                <div v-else class="flex flex-col items-center justify-center gap-2 h-full w-full text-muted-foreground">
                    <MessageSquareOff class="h-8 w-8" />
                    <span class="italic">Select a conversation</span>
                </div>
            </InboxBody>
        </InboxContent>
    </AppLayout>

</template>