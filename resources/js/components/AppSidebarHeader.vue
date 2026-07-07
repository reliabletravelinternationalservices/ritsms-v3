<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItemType } from '@/types';
import NotificationDropdown, { type NotificationItem } from '@/components/NotificationDropdown.vue';

defineProps<{
    breadcrumbs?: BreadcrumbItemType[];
}>();



const sampleNotifications : NotificationItem[] = [
  {
    id: 1,
    title: 'New Inquiry Received',
    description: 'You have a new inquiry from John Doe.',
    time: '2 hours ago',
    unread: true,
    type: 'info',
  },
  {
    id: 2,
    title: 'Booking Confirmed',
    description: 'Your booking for Paris has been confirmed.',
    time: '1 day ago',
    unread: false,
    type: 'success',
  },
  {
    id: 3,
    title: 'Payment Failed',
    description: 'Payment for your recent booking failed.',
    time: '3 days ago',
    unread: true,
    type: 'error',
  },
];

</script>

<template>
    <header
        class="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/70 px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:px-4"
    >
        <div class="flex items-center gap-2 flex-1">
            <SidebarTrigger class="-ml-1" />
            <template v-if=" breadcrumbs && breadcrumbs.length > 0">
                <Breadcrumb>
                    <BreadcrumbList>
                        <template v-for="(item, index) in breadcrumbs" :key="index">
                            <BreadcrumbItem>
                                <template v-if="index === breadcrumbs.length - 1">
                                    <BreadcrumbPage>{{ item.title }}</BreadcrumbPage>
                                </template>
                                <template v-else>
                                    <BreadcrumbLink :href="item.href">
                                        {{ item.title }}
                                    </BreadcrumbLink>
                                </template>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator v-if="index !== breadcrumbs.length - 1" />
                        </template>
                    </BreadcrumbList>
                </Breadcrumb>
            </template>
            <div class="ml-auto flex items-center">
                <NotificationDropdown :notifications="sampleNotifications" />
            </div>
        </div>
    </header>
</template>
