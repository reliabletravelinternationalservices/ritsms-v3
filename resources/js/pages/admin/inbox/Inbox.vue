<script setup lang="ts">
import Title from '@/components/inbox/Title.vue';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Icon } from '@iconify/vue';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('admin.inbox'),
    }
];


</script>



<template>

    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full rounded-xl text-foreground w-full">
            <div class="w-5/12 border border-border">
                <Title title="Inquiries" />
                <div class="p-4">
                    <div class="flex items-center justify-between gap-2">
                        <button type="button"
                            class="p-1 border-2 border-[rgb(var(--color-primary))] rounded-md text-[rgb(var(--color-primary))]">
                            <Icon icon="lucide:plus" class="text-xl" />
                        </button>
                        <Input type="text" placeholder="Search name..."
                            class="w-full border-2 border-foreground-muted" />
                        <Icon icon="lucide:filter" class="text-3xl text-foreground-muted" />
                    </div>
                    <div>
                        All Filters
                    </div>

                </div>
                <div>
                    List of chats
                </div>
            </div>
            <div class="w-full border border-border">
                Chatbox
            </div>
            <div class="border border-border p-2">
                <button type="button"
                    class="p-3 bg-[rgb(var(--color-primary)/0.2)] border-2 border-[rgb(var(--color-primary))] rounded-md text-[rgb(var(--color-primary))]">
                    <Icon icon="lucide:message-circle-more" class="text-2xl" />
                </button>
            </div>
        </div>
    </AppLayout>

</template>