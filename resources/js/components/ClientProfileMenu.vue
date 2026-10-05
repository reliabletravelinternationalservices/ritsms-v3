<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { cn } from '@/lib/utils';
import { route } from 'ziggy-js';
import { Client } from '@/types/client';

interface Props {
    client: Client;
}

defineProps<Props>();

// Temporary notification count
const notificationCount = 99;

</script>

<template>
    <Menu as="div" class="relative">

        <!-- PROFILE BUTTON -->
        <MenuButton
            class="relative flex items-center justify-center size-10 rounded-full text-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] hover:bg-black/10 transition-colors duration-150 focus:outline-none"
            aria-label="Open profile menu"
        >
            <Icon
                icon="lucide:user-round"
                width="22"
                height="22"
            />

            <!-- NOTIFICATION BADGE -->
            <span
                v-if="notificationCount > 0"
                class="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none border-2 border-white"
            >
                {{ notificationCount > 99 ? '99+' : notificationCount }}
            </span>
        </MenuButton>

        <!-- MENU -->
        <MenuItems
            class="absolute right-0 mt-2 w-52 origin-top-right rounded-md bg-white text-black shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden z-50"
        >

            <!-- CLIENT INFORMATION -->
            <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-medium truncate">
                    {{ client.name }}
                </p>

                <p
                    v-if="client.email"
                    class="text-xs text-gray-500 truncate mt-0.5"
                >
                    {{ client.email }}
                </p>
            </div>

            <!-- PROFILE -->
            <MenuItem v-slot="{ active }">
                <a
                    href="route('client.profile')"
                    :class="
                        cn(
                            'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                            {
                                'bg-[var(--primary-custom)] text-[var(--tertiary-custom)]':
                                    active ||
                                    route().current('client.profile'),
                            },
                        )
                    "
                >
                    <Icon
                        icon="lucide:user-round"
                        width="17"
                        height="17"
                    />

                    <span>Profile</span>
                </a>
            </MenuItem>

            <!-- MESSAGES -->
            <MenuItem v-slot="{ active }">
                <a
                    :href="route('client.inbox')"
                    target="_blank"
                    :class="
                        cn(
                            'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                            {
                                'bg-[var(--primary-custom)] text-[var(--tertiary-custom)]':
                                    active ||
                                    route().current('client.profile'),
                            },
                        )
                    "
                >
                    <Icon
                        icon="lucide:message-circle-more"
                        width="17"
                        height="17"
                    />

                    <span class="flex-1">
                        Messages
                    </span>

                    <!-- NOTIFICATION BADGE -->
                    <span
                        v-if="notificationCount > 0"
                        class="min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none"
                    >
                        {{ notificationCount > 99 ? '99+' : notificationCount }}
                    </span>
                </a>
            </MenuItem>

            <!-- LOGOUT -->
            <MenuItem v-slot="{ active }">
                <a
                    :href="route('client.logout')"
                    :class="
                        cn(
                            'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                            {
                                'bg-gray-100': active,
                            },
                        )
                    "
                >
                    <Icon
                        icon="lucide:log-out"
                        width="17"
                        height="17"
                    />

                    <span>Logout</span>
                </a>
            </MenuItem>

        </MenuItems>
    </Menu>
</template>