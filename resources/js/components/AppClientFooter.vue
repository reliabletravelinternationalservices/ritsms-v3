<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { route } from 'ziggy-js';

const appUrl = import.meta.env.VITE_APP_URL;

interface Props {
    email?: string;
    inquiryLink?: string;
    instagramLink?: string;
    facebookLink?: string;
    tiktokLink?: string;
}

withDefaults(defineProps<Props>(), {
    email: 'reliabletravelinfo@gmail',
    inquiryLink: '#',
    instagramLink: '#',
    facebookLink: '#',
    tiktokLink: '#',
});


</script>

<template>
    <footer class="w-full bg-[var(--secondary-custom)] px-4">
        <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12 md:py-24">
            
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <img :src="appUrl + '/storage/upload/agency/logo.png'" alt="Agency Logo" class="w-28 h-28 object-cover" />
                    <button class="w-28 bg-[var(--tertiary-custom)] py-2 text-[var(--secondary-custom)] font-bold hover:bg-[var(--tertiary-hover-custom)] duration-75 ease-in" type="button">Book Now</button>
                </div>
                <div>
                    <h1 class="text-[var(--primary-custom)] font-normal font-roboto text-sm">
                        <span class="text-[var(--tertiary-custom)]">GUARANTEED</span> professionally curated itineraries and a 
                        <span class="text-[var(--tertiary-custom)]">RELIABLE TRAVEL AGENCY</span>
                    </h1>
                </div>
                <div class="flex flex-col gap-1">
                    <h3 class="text-[var(--primary-custom)] font-bold font-roboto text-sm">PAYMENT GATEWAYS</h3>
                    <span class="flex items-center justify-start gap-2">
                        <img :src="appUrl + '/storage/upload/agency/visa_logo.png'" alt="visa" class="w-12 h-8 object-cover" />
                        <img :src="appUrl + '/storage/upload/agency/paypal_logo.png'" alt="paypal" class="w-12 h-8 object-cover" />
                        <img :src="appUrl + '/storage/upload/agency/gcash_logo.png'" alt="gcash" class="w-12 h-8 object-cover" />
                    </span>
                </div>
            </div>

            <div class="flex flex-col gap-4">
                <h2 class="text-[var(--primary-custom)] font-bold font-roboto text-sm uppercase">QUICK LINKS</h2>
                <ul class="flex flex-col gap-2 text-[var(--primary-custom)] font-roboto text-xs w-min">
                    <li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a :href="route('client.landing')">Home</a></li>
                    <li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a :href="route('client.destination')">Destinations</a></li>
                    <li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a :href="route('client.contact')">Contact Us</a></li>
                    <li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a :href="route('client.about')">About Us</a></li>
                </ul>
            </div>

            <div class="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-4">
                <div class="flex flex-col gap-4">
                    <h2 class="text-[var(--primary-custom)] font-bold font-roboto text-sm uppercase">CALL US NOW</h2>
                    <span class="flex flex-col gap-2 w-full">
                        <span class="flex items-center gap-2 text-[var(--primary-custom)] font-roboto text-xs">
                            <Icon icon="material-symbols:call" width="20" height="20" class="text-[var(--tertiary-custom)]" />
                            <a href="tel:+639123456789" class="underline hover:text-[var(--tertiary-custom)] duration-75 ease-in">+63 912 345 6789</a>
                        </span>
                        <span class="flex items-center gap-2 text-[var(--primary-custom)] font-roboto text-xs">
                            <Icon icon="material-symbols:call" width="20" height="20" class="text-[var(--tertiary-custom)]" />
                            <a href="tel:+639123456789" class="underline hover:text-[var(--tertiary-custom)] duration-75 ease-in">+63 912 345 6789</a>
                        </span>
                    </span>
                </div>

                <div class="flex flex-col gap-4">
                    <h2 class="text-[var(--primary-custom)] font-bold font-roboto text-sm uppercase">SEND US EMAIL</h2>
                    <span class="flex flex-col gap-2">
                        <span class="flex items-center gap-2 text-[var(--primary-custom)] font-roboto text-xs">
                            <Icon icon="ic:baseline-email" width="20" height="20" class="text-[var(--tertiary-custom)]" />
                            <a href="mailto:reliabletravelinfo@gmail.com" class="underline hover:text-[var(--tertiary-custom)] duration-75 ease-in">reliabletravelinfo@gmail.com</a>
                        </span>
                    </span>
                </div>

                <div class="sm:col-span-2 flex flex-col gap-6 lg:gap-4">
                    <span class="flex flex-col gap-1 text-[var(--primary-custom)] font-roboto text-xs">
                        <span class="flex items-center gap-2">
                            <Icon icon="mdi:location" width="20" height="20" class="text-[var(--tertiary-custom)]" />
                            <h4 class="font-bold font-roboto text-sm uppercase">CAVITE BRANCH</h4>
                        </span>
                        <a href="#" class="ml-6 underline hover:text-[var(--tertiary-custom)] duration-75 ease-in leading-relaxed">JJSS Commercial Building Brgy Navarro General Trias, Cavite, Philippines</a>
                    </span>

                    <span class="flex flex-col gap-1 text-[var(--primary-custom)] font-roboto text-xs">
                        <span class="flex items-center gap-2">
                            <Icon icon="mdi:location" width="20" height="20" class="text-[var(--tertiary-custom)]" />
                            <h4 class="font-bold font-roboto text-sm uppercase">PANGASINAN BRANCH</h4>
                        </span>
                        <a href="#" class="ml-6 underline hover:text-[var(--tertiary-custom)] duration-75 ease-in leading-relaxed">Nomangonan, San Manuel, Pangasinan</a>
                    </span>
                </div>
            </div>
        </div>

        <div class="max-w-5xl mx-auto py-8 border-t border-[var(--shadow-custom)] flex flex-col md:flex-row items-center justify-between gap-6">
            <span class="flex space-x-4 items-center font-roboto text-xs order-2 md:order-1">
                <a :href="instagramLink">
                    <Icon icon="mdi:instagram" width="24" height="24" class="text-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] duration-75" />
                </a>
                <a :href="facebookLink">
                    <Icon icon="basil:facebook-solid" width="24" height="24" class="text-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] duration-75" />
                </a>
                <a :href="tiktokLink">
                    <Icon icon="ic:baseline-tiktok" width="24" height="24" class="text-[var(--muted-custom)] hover:text-[var(--tertiary-custom)] duration-75" />
                </a>
            </span>
            <span class="text-center md:text-right order-1 md:order-2">
                <h2 class="text-[var(--muted-custom)] font-medium font-roboto text-xs md:text-sm">Copyright © 2026 Reliable International Travel Services. All rights reserved.</h2>
            </span>
        </div>
    </footer>
</template>
