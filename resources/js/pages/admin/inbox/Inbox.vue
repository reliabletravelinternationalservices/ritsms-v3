<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Head, router } from '@inertiajs/vue3'

import AppLayout from '@/layouts/AppLayout.vue'
import SessionChatToggle from '@/components/inbox/SessionChatToggle.vue'

import type { BreadcrumbItem, User } from '@/types'
import { Mode } from '@/types/chat'

import { Client } from '@/types/client'
import { useAdminChat } from '@/stores/adminChat'
import SessionInbox from '@/components/inbox/session/SessionInbox.vue'

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

const UAC = useAdminChat();
const mode = ref<Mode>(props.filters.type);


watch(
    () => props.filters.type,
    async (value) => {
        mode.value = value
        await UAC.initializeChats()
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
    await UAC.initializeChats()
})


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
                        {{ UAC.totalSessionChat }} conversations
                    </p>
                </div>

                <SessionChatToggle :mode="mode" :total-new-convo-chat="0"
                    :total-new-session-chat="UAC.totalUnreadSessionChat" @change-mode="changeMode" />
            </header>

            <!-- CONTENT -->
            <div class="flex min-h-0 flex-1">
                <SessionInbox v-if="mode === 'sessions'" :mode="mode" />
            </div>
        </div>

        <!-- <NewConversationModal v-model:open="createNewModal" :contacts="refData.contacts" /> -->
    </AppLayout>
</template>