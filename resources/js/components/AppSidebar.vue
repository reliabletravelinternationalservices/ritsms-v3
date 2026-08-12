<script setup lang="ts">
// import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/vue3';
import AppLogo from './AppLogo.vue';


// const page = usePage<SharedData>();

const statisticsNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
        url: route('admin.dashboard', undefined, false),
        icon: 'lucide:home',
    },
    {
        title: 'Inbox',
        href: route('admin.inbox'),
        url: route('admin.inbox', undefined, false),
        icon: 'lucide:inbox',
    },
    {
        title: 'Quotes',
        href: route('admin.quotations'),
        url: route('admin.quotations', undefined, false),
        icon: 'lucide:clipboard-list',
    },
];

const toursNavItems: NavItem[] = [
    {
        title: 'Tour Management',
        href: route('admin.tours'),
        url: route('admin.tours', undefined, false),
        icon: 'lucide:plane',
    },

];

// const mainNavItems: NavItem[] = [
//     {
//         title: 'Dashboard',
//         href: route('admin.dashboard'),
//         url: route('admin.dashboard', undefined, false),
//         icon: 'si:grid-duotone',
//     },
//     {
//         title: 'Packages',
//         icon: 'lucide:package',
//         children: [
//             {
//                 title: 'Packages List',
//                 href: route('admin.packages'),
//             },
//             {
//                 title: 'Groups',
//                 href: route('admin.packages.groups'),
//             },
//         ],
//     },
//     {
//         title: 'Destinations',
//         icon: 'lucide:map',
//         children: [
//             {
//                 title: 'Countries List',
//                 href: route('admin.destinations'),
//             }
//         ],
//     },
//     {
//         title: 'Bookings',
//         href: route('admin.bookings'),
//         url: route('admin.bookings', undefined, false),
//         icon: 'ant-design:book-outlined',
//     },
//     {
//         title: 'Inquiries',
//         url: route('admin.inquiries', undefined, false),
//         href: route('admin.inquiries'),
//         icon: 'ix:inquiry',
//     },
//     {
//         title: 'Users',
//         icon: 'lucide:users',
//         isShow: page.props.auth.user?.role === 'admin',
//         children: [
//             {
//                 title: 'Admins',
//                 href: route('admin.users.admins'),
//             },
//             {
//                 title: 'Clients',
//                 href: route('admin.users.clients'),
//             }
//         ],
//     },
//     {
//         title: 'Logs',
//         url: route('admin.logs', undefined, false),
//         href: route('admin.logs'),
//         icon: 'streamline-sharp:reset-clock',
//     },
// ];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Github Repo',
//         href: 'https://github.com/reliabletravelinternationalservices/ritsms-v3',
//         icon: 'mdi:github',
//         isShow: page.props.auth.user?.role === 'admin',
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits',
//         icon: 'tabler:book',
//         isShow: page.props.auth.user?.role === 'admin',
//     },
// ];
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
            <NavMain group-title="Statistics" :items="statisticsNavItems" />
            <NavMain group-title="Tours" :items="toursNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <!-- <NavFooter :items="footerNavItems" /> -->
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
