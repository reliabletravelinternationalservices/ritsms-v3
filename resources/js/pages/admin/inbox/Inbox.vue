<script setup lang="ts">
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import Input from '@/components/ui/input/Input.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { PenSquareIcon } from '@lucide/vue';
import { ref } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('admin.inbox'),
    }
];




const items = ref<number[]>(Array.from({ length: 20 }, (_, i) => i + 1));

const loading = ref(false);
const hasMore = ref(true);

const loadMore = async () => {
    if (loading.value || !hasMore.value) return;

    loading.value = true;

    try {
        // Simulate API request
        await new Promise(resolve => setTimeout(resolve, 1000));

        const nextItems = Array.from(
            { length: 20 },
            (_, i) => items.value.length + i + 1
        );

        items.value.push(...nextItems);

        if (items.value.length >= 100) {
            hasMore.value = false;
        }
    } finally {
        loading.value = false;
    }
};


</script>



<template>

    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <main class="flex h-full min-h-0 w-full flex-col p-2">
            <aside class="text-foreground border-r h-full w-1/4 py-4">
                <div class="flex items-center justify-between px-3">
                    <h2 class="text-xl font-bold">Chats</h2>
                    <PenSquareIcon class="h-5 w-5 cursor-pointer" />
                </div>
                <div class="px-3">
                    <Input placeholder="Search chat..."
                        class="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>
                <!-- Chat list -->
                <InfiniteScroll class="mt-2 h-[calc(100vh-220px)] overflow-y-auto px-3" :loading="loading"
                    :has-more="hasMore" @load="loadMore">
                    <ul class="mt-2 space-y-1">
                        <li v-for="chat in items" :key="chat"
                            class="cursor-pointer rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground">
                            <button @click="() => { }" class="w-full text-left">
                                <div class="flex items-center justify-between">
                                    <span class="font-bold ">Chat {{ chat }}</span>
                                    <span
                                        class="text-xs text-muted-foreground bg-red-600 rounded-lg p-1 w-4 h-4 flex items-center justify-center text-white">2</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <p class="text-sm text-muted-foreground">Last message preview...</p>
                                    <span class="text-xs text-muted-foreground">12:30 PM</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </InfiniteScroll>
            </aside>


        </main>
    </AppLayout>

</template>