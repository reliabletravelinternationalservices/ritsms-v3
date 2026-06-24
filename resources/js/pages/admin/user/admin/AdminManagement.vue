<script setup lang="ts">
import StatsCard from '@/components/statistic/StatsCard.vue';
import AdminTable from '@/components/table/admin/AdminTable.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { User, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';


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

const adminCountsByStatus = computed(() => {
    let activeCount = 0;
    let inactiveCount = 0;

    props.admins.forEach((admin) => {
        if (admin.status === 'active') activeCount++;
        if (admin.status === 'inactive') inactiveCount++;
    });

    return {
        active: activeCount,
        inactive: inactiveCount,
        total: props.admins.length
    };
    });
</script>

<template>

    <Head title="Admin Management" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="relative h-auto">
                     <StatsCard
                        title="Total Admin Accounts"
                        :value="adminCountsByStatus.total"
                        icon="solar:user-outline"
                        :delay="0.05"
                    />
                </div>
                <div class="relative h-auto">
                    <StatsCard
                        title="Total Active"
                        :value="adminCountsByStatus.active"
                        icon="tabler:user-key"
                        :delay="0.05"
                    />
                </div>
                <div class="relative h-auto">
                    <StatsCard
                        title="Total Inactive"
                        :value="adminCountsByStatus.inactive"
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




