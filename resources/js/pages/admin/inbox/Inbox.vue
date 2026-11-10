<script setup lang="ts">
import AvatarPlaceholder from '@/components/AvatarPlaceholder.vue';
import { ChatButton, ChatComposer, ChatContent, ChatHeader, ChatList, ChatPlaceholder, CreateConvo, CreateHeader, EmptyPlaceholder, InboxBody, InboxContent, Sidebar, SidebarBody, SidebarBodyPlaceholder } from '@/components/inbox';
import ChatBubble from '@/components/inbox/bubble/ChatBubble.vue';
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import LoadingData from '@/components/LoadingData.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInbox } from '@/composables/inbox/useInbox';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { onMounted } from 'vue';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Camera, Ellipsis, Info, LogOut, Pen, Settings, Users } from '@lucide/vue';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('admin.inbox'),
    }
];



const {
    searchConvo,
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
    selectedContacts,
    createConversation,
    loadingCreatingConvo,
} = useInbox();


onMounted(async () => {
    await initializeConvos()
})



</script>


<template>
    <Head title="Inbox" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <InboxContent>
            <Sidebar @create="openCreateConvo" @search="searchConvo">
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

                    <EmptyPlaceholder
                        v-else
                        class="flex flex-col items-center justify-center gap-2 h-full"
                        label="Start a new conversation"
                    />

                </SidebarBodyPlaceholder>

            </Sidebar>

            <InboxBody>
                <ChatContent>
                    <ChatHeader 
                        v-if="!createConvo && openedConvo" 
                        :chat="openedConvo" 
                        @info="() => { }" 
                    />

                    <CreateHeader 
                        v-if="createConvo" 
                        :contacts="selectedContacts" 
                        @select="addContact" 
                        @remove="removeContact"
                    />

                    <InfiniteScroll v-if="openedConvoMessages" class="py-2 w-full h-full overflow-y-auto"
                        :loading="loadMoreMessagesLoading" :has-more="Boolean(openedConvoMessages.next_cursor)" @load="loadMoreMessages(openedConvoMessages.next_cursor)" direction="bottom-to-top">
                        <ChatList v-for="message in openedConvoMessages.data" :key="message.id">
                            <ChatBubble :message="message" :is-owner="isOwnerChat(message)" />
                        </ChatList>
                    </InfiniteScroll>
                    
                    <CreateConvo 
                        v-else-if="selectedContacts.length === 1 && selectedContacts[0].private_conversation === null"
                        :message="`Start a conversation with ${selectedContacts[0].display_name}`"
                        button-label="Start now"
                        loading-text="Starting..."
                        :loading="loadingCreatingConvo"
                        @create="createConversation"
                    /> 

                    <CreateConvo
                        v-else-if="selectedContacts.length > 1"
                        message="Create a group conversation"
                        button-label="Create now"
                        loading-text="Creating..."
                        :loading="loadingCreatingConvo"
                        @create="createConversation"
                    />

                    <ChatPlaceholder v-else>
                        <LoadingData v-if="openedConvoMessagesLoading" />

                        <EmptyPlaceholder
                            v-else
                            class="flex flex-col items-center justify-center gap-2 h-full w-full text-muted-foreground"
                            label="Select a conversation"
                        />
                    </ChatPlaceholder>
                    
                    <ChatComposer v-if="!openedConvoMessagesLoading && openedConvo" @send="sendMessage" />
                </ChatContent>
            </InboxBody>

            <div
                class="flex h-[calc(100vh-80px)] w-1/4 shrink-0 flex-col gap-5 overflow-y-auto border-l bg-background p-4 text-foreground"
            >
                <!-- Conversation Profile -->
                <div class="flex flex-col items-center gap-3 py-4">
                    <Avatar class="h-20 w-20 overflow-hidden rounded-full border bg-sidebar">
                        <AvatarImage
                            v-if="openedConvo?.avatar"
                            :src="openedConvo.avatar"
                            :alt="openedConvo.name"
                        />
                        <AvatarFallback class="rounded-full">
                            <AvatarPlaceholder class="h-full w-full" />
                        </AvatarFallback>
                    </Avatar>

                    <div class="w-full space-y-1 text-center">
                        <h2 class="break-words text-lg font-bold leading-tight">
                            {{ openedConvo?.name }}
                        </h2>

                        <p class="text-xs text-muted-foreground">
                            {{ openedConvo?.type === 'group' ? 'Group conversation' : 'Private conversation' }}
                        </p>
                    </div>
                </div>

                <!-- Customize Actions -->
                <div class="flex items-center justify-center gap-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    class="h-10 w-10 rounded-full"
                                >
                                    <Pen class="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Change name
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger as-child>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    class="h-10 w-10 rounded-full"
                                >
                                    <Camera class="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Change photo
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <!-- Conversation Details -->
                <Accordion
                    type="multiple"
                    class="w-full"
                    default-value="information"
                >
                    <!-- Information -->
                    <AccordionItem value="information">
                        <AccordionTrigger class="text-sm font-semibold hover:no-underline">
                            <div class="flex items-center gap-2">
                                <Info class="h-4 w-4 text-muted-foreground" />
                                Chat Information
                            </div>
                        </AccordionTrigger>

                        <AccordionContent>
                            <div class="space-y-4 pt-2">
                                <div class="space-y-1">
                                    <p class="text-xs text-muted-foreground">Created by</p>
                                    <p class="text-sm font-medium">
                                        {{ openedConvo?.created_by.display_name }}
                                    </p>
                                    <p class="text-xs capitalize text-muted-foreground">
                                        {{ openedConvo?.created_by.role }}
                                    </p>
                                </div>

                                <div class="space-y-1">
                                    <p class="text-xs text-muted-foreground">Created at</p>
                                    <p class="text-sm font-medium">
                                        Jan 12, 2027
                                    </p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <!-- Members -->
                    <AccordionItem value="members">
                        <AccordionTrigger class="text-sm font-semibold hover:no-underline">
                            <div class="flex items-center gap-2">
                                <Users class="h-4 w-4 text-muted-foreground" />
                                Chat Members
                                <span class="text-xs font-normal text-muted-foreground">
                                    ({{ openedConvo?.participants?.length ?? 0 }})
                                </span>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent>
                            <div class="space-y-1 pt-2">
                                <button
                                    v-for="participant in openedConvo?.participants ?? []"
                                    :key="participant.id"
                                    class="group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                                >
                                    <Avatar class="h-10 w-10 shrink-0">
                                        <AvatarImage
                                            v-if="participant.participant.avatar"
                                            :src="participant.participant.avatar"
                                            :alt="participant.participant.display_name"
                                        />
                                        <AvatarFallback>
                                            <AvatarPlaceholder class="h-full w-full" />
                                        </AvatarFallback>
                                    </Avatar>

                                    <div class="min-w-0 flex-1">
                                        <p class="truncate text-sm font-medium">
                                            {{ participant.participant.display_name }}
                                        </p>

                                        <p class="text-xs capitalize text-muted-foreground">
                                            {{ participant.role }}
                                        </p>
                                    </div>

                                    <button
                                        class="rounded-md p-1.5 opacity-0 transition-opacity hover:bg-background group-hover:opacity-100"
                                        @click.stop
                                    >
                                        <Ellipsis class="h-4 w-4" />
                                    </button>
                                </button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <!-- More Options -->
                    <AccordionItem value="options">
                        <AccordionTrigger class="text-sm font-semibold hover:no-underline">
                            <div class="flex items-center gap-2">
                                <Settings class="h-4 w-4 text-muted-foreground" />
                                More Options
                            </div>
                        </AccordionTrigger>

                        <AccordionContent>
                            <div class="space-y-1 pt-2">
                                <button
                                    class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
                                >
                                    <LogOut class="h-4 w-4" />
                                    Leave Group
                                </button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </InboxContent>
    </AppLayout>

</template>