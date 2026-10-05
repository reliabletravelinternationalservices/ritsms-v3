<script setup lang="ts">

import ChatSidebar from '@/components/client/inbox/ChatSidebar.vue';
import ChatWindow from '@/components/client/inbox/ChatWindow.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>

    <main
        class="
            flex h-[calc(100vh)]
            overflow-hidden
            bg-[#0a0a0a]
            text-white
        "
    >
        <Head title="Inbox" />
        
        <ChatSidebar />

        <ChatWindow />
<!-- 
        <NewConversationDialog /> -->
    </main>
</template>