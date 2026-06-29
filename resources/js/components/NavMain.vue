<script setup lang="ts">
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { type SharedData } from '@/types';
import { Icon } from '@iconify/vue';
import { Link, usePage } from '@inertiajs/vue3';

interface NavChildItem {
    title: string;
    href: string;
    isShow?: boolean;
}

interface NavItem {
    title: string;
    href?: string;
    icon?: string;
    isShow?: boolean;
    children?: NavChildItem[];
}

defineProps<{
    items: NavItem[];
}>();

const page = usePage<SharedData>();

const isDropdownActive = (item: NavItem): boolean => {
    if (!item.children) return false;
    return item.children.some(child => child.href === page.url);
};
</script>

<template>
    <SidebarGroup class="px-2 py-0">
        <SidebarGroupLabel>Main Menu</SidebarGroupLabel>

        <SidebarMenu>
            <template
                v-for="item in items.filter(item => item.isShow ?? true)"
                :key="item.title"
            >
                <!-- NORMAL LINK -->
                <SidebarMenuItem v-if="!item.children">
                    <SidebarMenuButton
                        as-child
                        :is-active="item.href === page.url"
                    >
                        <Link :href="item.href!">
                            <Icon
                                v-if="item.icon"
                                :icon="item.icon"
                                class="text-lg"
                            />
                            <span>{{ item.title }}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <!-- DROPDOWN -->
                <Collapsible
                    v-else
                    :default-open="isDropdownActive(item)"
                    class="group/collapsible"
                >
                    <SidebarMenuItem>
                        <CollapsibleTrigger as-child>
                            <SidebarMenuButton>
                                <Icon
                                    v-if="item.icon"
                                    :icon="item.icon"
                                    class="text-lg"
                                />

                                <span>{{ item.title }}</span>

                                <Icon
                                    icon="lucide:chevron-right"
                                    class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                                />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                            <SidebarMenuSub>
                                <SidebarMenuSubItem
                                    v-for="child in item.children.filter(child => child.isShow ?? true)"
                                    :key="child.title"
                                >
                                    <SidebarMenuSubButton
                                        as-child
                                        :is-active="child.href === page.url"
                                    >
                                        <Link :href="child.href">
                                            <span>{{ child.title }}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </template>
        </SidebarMenu>
    </SidebarGroup>
</template>