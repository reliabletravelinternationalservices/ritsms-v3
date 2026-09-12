<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import Button from './ui/button/Button.vue';
import { cn } from '@/lib/utils';
import { route } from 'ziggy-js'
import AppLogoIcon from './AppLogoIcon.vue';


const isMobileMenuOpen = ref(false);
const isMobilePackagesOpen = ref(false);
</script>

<template>
    <header
        class="w-full p-4 md:p-2 bg-[var(--primary-custom)] text-[var(--secondary-custom)] sticky top-0 z-20 shadow-md">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <a :href="route('client.landing')" aria-label="Reliable International Travel Services home">
                 <AppLogoIcon class="bg-black text-black size-10 fill-current" />
            </a>

            <nav class="hidden md:flex space-x-6 text-xs font-normal font-roboto text-[var(--muted-custom)]">
                <a :href="route('client.landing')"
                    :class="cn('font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.landing') })">
                    <span>Home</span>
                </a>
                <Menu as="div" class="relative">
                    <MenuButton
                        class="menu-button flex items-center gap-2 font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75">
                        <span>Packages</span>
                        <Icon class="rotate-icon transition-transform duration-150"
                            icon="material-symbols:keyboard-arrow-down" width="18" height="18" />
                    </MenuButton>

                    <MenuItems
                        class="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <MenuItem v-slot="{ active }">
                            <a :href="route('client.inbound')" 
                            :class="cn('block px-4 py-2 text-sm', { 'bg-[var(--primary-custom)] text-[var(--tertiary-custom)]': route().current('client.inbound') || active })">
                                Inbound Packages</a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <a :href="route('client.outbound')" class="block px-4 py-2 text-sm"
                                :class="cn('block px-4 py-2 text-sm', { 'bg-[var(--primary-custom)] text-[var(--tertiary-custom)]': route().current('client.outbound') || active })">
                                Outbound Packages</a>
                        </MenuItem>
                    </MenuItems>
                </Menu>
                <a :href="route('client.destination')"
                    :class="cn('font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.destination') })">
                    <span>Destinations</span>
                </a>
                <a :href="route('client.contact')"
                    :class="cn('font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.contact') })">
                    <span>Contact us</span>
                </a>
                <a :href="route('client.about')"
                    :class="cn('font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.about') })">
                    <span>About us</span>
                </a>
            </nav>

            <div class="hidden md:flex items-center">
                <a href="#" aria-label="Open account portal">
                    <button
                        class="flex items-center gap-2 px-4 py-4 text-[var(--muted-custom)] h-8 border-2 border-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] hover:border-[var(--tertiary-custom)] ease-in duration-75">
                        <span class="font-roboto text-xs md:text-sm">Account</span>
                        <Icon icon="lucide:key-round" width="20" height="20" />
                    </button>
                </a>
            </div>

            <button @click="isMobileMenuOpen = !isMobileMenuOpen; if (!isMobileMenuOpen) isMobilePackagesOpen = false"
                class="md:hidden p-2 text-[var(--muted-custom)] transition-transform duration-200 active:scale-90"
                :aria-label="isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'">
                <Icon :icon="isMobileMenuOpen ? 'material-symbols:close' : 'material-symbols:menu'" width="32"
                    height="32" class="size-8" />
            </button>
        </div>

        <Transition name="fade-slide">
            <div v-if="isMobileMenuOpen"
                class="md:hidden bg-[var(--primary-custom)] border-t border-[var(--shadow-custom)] p-4 space-y-4 flex flex-col">
                <a :href="route('client.landing')" 
                    :class="cn('font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.landing') })"
                    >Home</a>
                <a :href="route('client.destination')"
                    :class="cn('font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.destination') })"
                    >Destinations</a>
                <div class="pt-2">
                    <button type="button" @click="isMobilePackagesOpen = !isMobilePackagesOpen"
                        class="flex w-full items-center justify-between text-left font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] transition-colors duration-150">
                        <span>Packages</span>
                        <Icon
                            :icon="isMobilePackagesOpen ? 'material-symbols:keyboard-arrow-up' : 'material-symbols:keyboard-arrow-down'"
                            width="20" height="20" class="transition-transform duration-150" />
                    </button>

                    <Transition name="fade-slide">
                        <div v-if="isMobilePackagesOpen" class="mt-2 space-y-2 pl-4">
                            <a :href="route('client.inbound')"
                                :class="cn('block text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.inbound') })">
                                Inbound Packages
                            </a>
                            <a :href="route('client.outbound')"
                                :class="cn('block text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.outbound') })">
                                Outbound Packages
                            </a>
                        </div>
                    </Transition>
                </div>
                <a :href="route('client.contact')"
                    :class="cn('text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.contact') })">
                    Contact us
                </a>
                <a :href="route('client.about')"
                    :class="cn('text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.about') })">
                    About us
                </a>
                <hr class="border-[var(--shadow-custom)]" />
                <a href="#">
                    <Button class="w-full text-[var(--muted-custom)] border-2 border-[var(--muted-custom)]">
                        <span>Login</span>
                        <Icon icon="material-symbols:login" width="20" height="20" />
                    </Button>
                </a>
            </div>
        </Transition>
    </header>
</template>


<style scoped>
/* Fade + Slide Transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.menu-button[aria-expanded="true"] .rotate-icon {
    transform: rotate(180deg);
}
</style>