<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/vue';
import { Head } from '@inertiajs/vue3';
import { PenSquareIcon } from '@lucide/vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('admin.inbox'),
    }
];


</script>



<template>

    <Head title="Inbox" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <main class="flex h-full min-h-0 w-full flex-col p-2">
            <aside class="text-foreground border-r h-full w-1/4 px-3 py-2">
                <div class="flex items-center justify-between">
                    <h2 class="text-xl font-bold">Chats</h2>
                    <PenSquareIcon class="h-5 w-5 cursor-pointer" />
                </div>
                <div>
                    <Input
                        placeholder="Search chat..."
                        class="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
            </aside>
        </main>
    </AppLayout>

</template>