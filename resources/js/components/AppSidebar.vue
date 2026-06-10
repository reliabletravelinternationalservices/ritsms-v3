<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/vue3';
import AppLogo from './AppLogo.vue';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
        icon: 'si:grid-duotone',
    },
    {
        title: 'Packages',
        icon: 'lucide:package',
        children: [
            {
                title: 'Packages List',
                href: route('admin.packages'),
            },
            {
                title: 'Groups',
                href: route('admin.packages.groups'),
            },
        ],
    },
    {
        title: 'Destinations',
        icon: 'lucide:map',
        children: [
            {
                title: 'Countries List',
                href: route('admin.destinations'),
            }
        ],
    },
    {
        title: 'Bookings',
        href: route('admin.bookings'),
        icon: 'ant-design:book-outlined',
    },
    {
        title: 'Inquiries',
        href: route('admin.inquiries'),
        icon: 'ix:inquiry',
    },
    {
        title: 'Users',
        icon: 'lucide:users',
        children: [
            {
                title: 'Admins',
                href: route('admin.users.admins'),
            },
            {
                title: 'Clients',
                href: route('admin.users.clients'),
            }
        ],
    },
    {
        title: 'Logs',
        href: route('admin.logs'),
        icon: 'streamline-sharp:reset-clock',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Github Repo',
        href: 'https://github.com/reliabletravelinternationalservices/ritsms-v3',
        icon: 'mdi:github',
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: 'tabler:book',
    },
];
</script>

<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="route('admin.dashboard')">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
