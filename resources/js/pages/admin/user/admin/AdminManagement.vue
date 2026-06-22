<script setup lang="ts">
import StatsCard from '@/components/statistic/StatsCard.vue';
import AdminTable from '@/components/table/admin/AdminTable.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { User, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';


const props = defineProps<{ admins: User[] }>();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Admin Management',
        href: route('admin.users.admins'),
    },
];
</script>

<template>

    <Head title="Admin Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="relative h-auto">
                     <StatsCard
                        title="Total Admin Accounts"
                        :value="10"
                        icon="solar:user-outline"
                        :delay="0.05"
                    />
                </div>
                <div class="relative h-auto">
                    <StatsCard
                        title="Total Active"
                        :value="8"
                        icon="tabler:user-key"
                        :delay="0.05"
                    />
                </div>
                <div class="relative h-auto">
                    <StatsCard
                        title="Total Inactive"
                        :value="2"
                        icon="boxicons:user-x"
                        :delay="0.05"
                    />
                </div>
            </div>
            <div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <AdminTable :users="admins" />
            </div>
        </div>
    </AppLayout>
</template>




