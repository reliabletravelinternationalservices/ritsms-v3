<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import AppLogoIcon from './AppClientLogoIcon.vue';
import Button from './ui/button/Button.vue';
import { cn } from '@/lib/utils';
import { route } from 'ziggy-js'
import { Link } from '@inertiajs/vue3';


const isMobileMenuOpen = ref(false);
</script>

<template>
       <header class="w-full p-4 md:p-2 bg-[var(--primary-custom)] text-[var(--secondary-custom)] sticky top-0 z-20 shadow-md">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <a href="#">
                    <AppLogoIcon class="bg-black text-black size-10 fill-current" />
                </a>

                <nav class="hidden md:flex space-x-6 text-xs font-normal font-roboto text-[var(--muted-custom)]">
                    <Link :href="route('client.landing')" :class="cn('font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.landing') })"><span>Home</span></Link>
                    <Link :href="route('client.destination')" :class="cn('font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.destination') })"><span>Destinations</span></Link>
                    <Link :href="route('client.contact')" :class="cn('font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.contact') })"><span>Contact us</span></Link>
                    <Link href="#" :class="cn('font-medium text-[var(--muted-custom)] hover:text-[var(--secondary-custom)] duration-75', { 'text-[var(--tertiary-custom)]': route().current('client.about') })"><span>About us</span></Link>
                </nav>

                <div class="hidden md:flex items-center">
                    <Link href="#">
                        <button class="flex items-center gap-2 px-4 py-4 text-[var(--muted-custom)] h-8 border-2 border-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] hover:border-[var(--tertiary-custom)] ease-in duration-75">
                            <span class="font-roboto text-xs md:text-sm">Account</span>
                            <Icon icon="lucide:key-round" width="20" height="20" />
                        </button>
                    </Link>
                </div>

                <button 
                    @click="isMobileMenuOpen = !isMobileMenuOpen" 
                    class="md:hidden p-2 text-[var(--muted-custom)] transition-transform duration-200 active:scale-90"
                >
                    <Icon :icon="isMobileMenuOpen ? 'material-symbols:close' : 'material-symbols:menu'" width="32" height="32" class="size-8" />
                </button>
            </div>

            <Transition name="fade-slide">
                <div v-if="isMobileMenuOpen" class="md:hidden bg-[var(--primary-custom)] border-t border-[var(--shadow-custom)] p-4 space-y-4 flex flex-col">
                    <Link :href="route('client.landing')" class="text-[var(--tertiary-custom)] font-bold">Home</Link>
                    <Link :href="route('client.destination')" class="text-[var(--muted-custom)] hover:text-[var(--secondary-custom)]">Destinations</Link>
                    <Link :href="route('client.contact')" class="text-[var(--muted-custom)] hover:text-[var(--secondary-custom)]">Contact us</Link>
                    <Link href="#" class="text-[var(--muted-custom)] hover:text-[var(--secondary-custom)]">About us</Link>
                    <hr class="border-[var(--shadow-custom)]" />
                    <Link href="#">
                        <Button class="w-full text-[var(--muted-custom)] border-2 border-[var(--muted-custom)]">
                            <span>Login</span>
                            <Icon icon="material-symbols:login" width="20" height="20" />
                        </Button>
                    </Link>
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
</style>