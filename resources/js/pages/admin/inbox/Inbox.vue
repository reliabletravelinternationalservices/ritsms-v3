<script setup lang="ts">
import { ChatButton, ChatContent, ChatList, InboxBody, InboxContent, Sidebar, SidebarBody, SidebarBodyPlaceholder } from '@/components/inbox';
import OtherChatBubble from '@/components/inbox/bubble/OtherChatBubble.vue';
import OwnerChatBubble from '@/components/inbox/bubble/OwnerChatBubble.vue';
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import LoadingData from '@/components/LoadingData.vue';
import { useInbox } from '@/composables/inbox/useInbox';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { MessageSquareOff } from '@lucide/vue';
import { onMounted } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('admin.inbox'),
    }
];



const {
    create,
    search,
    pagedConversations,
    loadingInitConvo,
    openedConvo,
    initializeConvos,
    openChat,
    loadingConversations,
    loadConvos,
} = useInbox();


onMounted(async () => {
    await initializeConvos()
})


</script>


<template>

    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <InboxContent>
            <Sidebar @create="create" @search="search">
                <SidebarBody v-if="pagedConversations && pagedConversations.data" :loading="loadingConversations"
                    :has-more="true" @load="() => loadConvos({
                        nextCursor: pagedConversations?.next_cursor
                    })">
                    <ul class="mt-2 space-y-1 w-full">
                        <li v-for="chat in pagedConversations.data" :key="chat.id"
                            class="cursor-pointer rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground">
                            <ChatButton :is-open="chat.id === openedConvo?.id" :chat="chat" @click="openChat" />
                        </li>
                    </ul>
                </SidebarBody>

                <SidebarBodyPlaceholder v-else>
                    <LoadingData v-if="loadingInitConvo" />

                    <div v-else class="flex flex-col items-center justify-center gap-2">
                        <MessageSquareOff class="h-8 w-8" />
                        <span class="italic">Start a new chat</span>
                    </div>
                </SidebarBodyPlaceholder>

            </Sidebar>

            <InboxBody>
                <ChatContent v-if="openedConvo" :chat="openedConvo" @info="() => { }">
                    <InfiniteScroll class="py-2 w-full h-full overflow-y-auto" :loading="false" :has-more="false"
                        @load="() => { }" direction="bottom-to-top">
                        <ChatList>
                            <OtherChatBubble class="self-start" message="Hello! How are you?" time="10:30 AM"
                                :is-edited="true" />
                            <OwnerChatBubble class="self-end" message="Hi! I'm good, thanks for asking. How about you?"
                                time="10:31 AM" :isRead="true" />
                            <OtherChatBubble message="I'm good, thanks! How about you?" time="10:32 AM" />
                            <OwnerChatBubble class="self-end" message="I'm doing well too. Just working on a project."
                                time="10:33 AM" :isRead="true" />
                            <OtherChatBubble message="That's great! What kind of project are you working on?"
                                time="10:34 AM" />
                            <OwnerChatBubble class="self-end"
                                message="It's a web application for managing tasks and projects." time="10:34 AM"
                                :isRead="true" />
                            <OtherChatBubble message="That sounds interesting! Good luck with your project."
                                time="10:35 AM" />
                            <OwnerChatBubble class="self-end" message="Thank you! I appreciate it." time="10:35 AM"
                                :isRead="true" />
                            <OtherChatBubble message="By the way, have you tried the new feature in our app?"
                                time="10:35 AM" />
                            <OwnerChatBubble class="self-end"
                                message="Yes, I have. It's really useful and saves a lot of time." time="10:35 AM"
                                :isRead="true" />
                            <OtherChatBubble
                                message="I'm glad to hear that! We put a lot of effort into making it user-friendly."
                                time="10:35 AM" />
                            <OwnerChatBubble class="self-end"
                                message="Absolutely! The interface is intuitive and easy to navigate." time="10:35 AM"
                                :isRead="true" />
                            <OtherChatBubble
                                message="That's great feedback! We'll continue to improve and add more features in the future."
                                time="10:35 AM" />
                            <OwnerChatBubble class="self-end"
                                message="I'm looking forward to seeing what you come up with next!" time="10:35 AM"
                                :isRead="true" />
                            <OtherChatBubble message="Thank you for your support! It means a lot to us."
                                time="10:35 AM" />
                            <OwnerChatBubble class="self-end" message="You're welcome! Keep up the good work."
                                time="10:35 AM" :isRead="true" />
                            <OtherChatBubble
                                message="Thanks! We'll keep striving to make our app even better for our users."
                                time="10:35 AM" />
                            <OwnerChatBubble class="self-end"
                                message="I'm sure you will. Your dedication is evident in the quality of the app."
                                time="10:35 AM" :isRead="true" />
                            <OtherChatBubble message="We appreciate your kind words! It motivates us to keep improving."
                                time="10:35 AM" />
                            <OwnerChatBubble class="self-end"
                                message="I'm happy to provide feedback. It's important to recognize the hard work that goes into creating a great product."
                                time="10:35 AM" :isRead="true" />
                            <OtherChatBubble
                                message="Absolutely! Your feedback helps us understand what our users value and what we can do better."
                                time="10:35 AM" />
                            <OwnerChatBubble class="self-end"
                                message="I'm glad to be of help. Keep up the excellent work!" time="10:35 AM"
                                :isRead="true" />
                        </ChatList>
                    </InfiniteScroll>
                </ChatContent>
            </InboxBody>
        </InboxContent>
    </AppLayout>

</template>