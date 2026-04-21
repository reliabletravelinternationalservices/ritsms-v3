<script setup lang="ts">
import { Icon } from '@iconify/vue';




</script>

<template>
    <footer class="w-full bg-[var(--secondary-custom)] ">
        <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 py-8 md:py-24">
            <div class="col-span-1 flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <img src="http://127.0.0.1:8000/storage/upload/agency/logo.png" alt="Logo" class="w-28 h-28 object-cover" />

                    <button class="w-28 bg-[var(--tertiary-custom)] py-2 text-[var(--secondary-custom)] font-bold hover:bg-[var(--tertiary-hover-custom)] duration-75 ease-in" type="button" >Book Now</button>
                </div>
                <div>
                    <h1 class="text-[var(--primary-custom)] font-normal font-roboto text-sm"><span class="text-[var(--tertiary-custom)]">GUARANTEED</span> professionally curated itineraries and a <span class="text-[var(--tertiary-custom)]">RELIABLE TRAVEL AGENCY</span></h1>
                </div>
                <div class="flex flex-col gap-1">
                    <h3 class="text-[var(--primary-custom)] font-bold font-roboto text-sm">PAYMENT GATEWAYS</h3>
                    <span class="flex items-center justify-start gap-2">
                        <img src="https://media.assettype.com/sunstar/2025-11-12/8w4ntbmy/visa-logo-800x450.webp?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true" alt="visa" class="w-12 h-8 object-cover" />
                        <img src="https://assets.weforum.org/organization/image/GemGrF1XC3LnXx0EZyxkj-9HEzPpYqkIsjwF9MiDTo0.jpg" alt="visa" class="w-12 h-8 object-cover" />
                        <img src="https://www.brodneil.com/wp-content/uploads/2022/05/gcash-logo-1.png" alt="visa" class="w-12 h-8 object-cover" />
                    </span>
                </div>
            </div>

            <div class="col-span-1 flex flex-col gap-4">
                <h2 class="text-[var(--primary-custom)] font-bold font-roboto text-sm uppercase">QUICK LINKS</h2>
                <ul class="flex flex-col gap-2 text-[var(--primary-custom)] font-roboto text-xs w-min">
                    <li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a href="#">Home</a></li>
                    <li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a href="#">Destinations</a></li>
                    <li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a href="#">Contact Us</a></li>
                    <li class="hover:text-[var(--tertiary-custom)] duration-75 ease-in"><a href="#">Blog</a></li>
                </ul>
            </div>

            <div class="col-span-2 grid grid-cols-2 gap-4 ">
                <div class="col-span-1 flex flex-col gap-4">
                    <h2 class="text-[var(--primary-custom)] font-bold font-roboto text-sm uppercase">CALL US NOW</h2>
                    <span class="flex flex-col gap-2 w-full">
                        <span class="flex items-center gap-2 text-[var(--primary-custom)] font-roboto text-xs">
                            <Icon icon="material-symbols:call" width="20" height="20" class="text-[var(--tertiary-custom)]" />
                            <a href="tel:+639123456789" class="underline hover:text-[var(--tertiary-custom)] duration-75 ease-in"> +63 912 345 6789</a>
                        </span>
                        <span class="flex items-center gap-2 text-[var(--primary-custom)] font-roboto text-xs">
                            <Icon icon="material-symbols:call" width="20" height="20" class="text-[var(--tertiary-custom)]" />
                            <a href="tel:+639123456789" class="underline hover:text-[var(--tertiary-custom)] duration-75 ease-in"> +63 912 345 6789</a>
                        </span>
                    </span>
                </div>
                <div class="col-span-1 flex flex-col gap-4">
                    <h2 class="text-[var(--primary-custom)] font-bold font-roboto text-sm uppercase">SEND US EMAIL</h2>
                    <span class="flex flex-col gap-2">
                        <span class="flex items-center gap-2 text-[var(--primary-custom)] font-roboto text-xs">
                            <Icon icon="ic:baseline-email" width="20" height="20" class="text-[var(--tertiary-custom)]" />
                            <a href="mailto:reliabletravelinfo@gmail.com" class="underline hover:text-[var(--tertiary-custom)] duration-75 ease-in"> reliabletravelinfo@gmail.com</a>
                        </span>
                    </span>
                </div>
                <div class="col-span-2 flex flex-col gap-4">
                    <span class="flex flex-col gap-1 text-[var(--primary-custom)] font-roboto text-xs">
                        <span class="flex items-center gap-2">
                            <Icon icon="mdi:location" width="20" height="20" class="text-[var(--tertiary-custom)]" />
                            <h4 class="font-bold font-roboto text-sm uppercase">CAVITE BRANCH</h4>
                        </span>
                        <a href="#" class="ml-6 underline hover:text-[var(--tertiary-custom)] duration-75 ease-in">JJSS Commercial Building Brgy Navarro General Trias, Cavite, Philippines</a>
                    </span>

                    <span class="flex flex-col gap-1 text-[var(--primary-custom)] font-roboto text-xs">
                        <span class="flex items-center gap-2">
                            <Icon icon="mdi:location" width="20" height="20" class="text-[var(--tertiary-custom)]" />
                            <h4 class="font-bold font-roboto text-sm uppercase">PANGASINAN BRANCH</h4>
                        </span>
                        <a href="#" class="ml-6 underline hover:text-[var(--tertiary-custom)] duration-75 ease-in">Nomangonan, San Manuel, Pangasinan</a>
                    </span>
                </div>
            </div>
        </div>

        <div class="max-w-5xl mx-auto py-6 border-t border-[var(--shadow-custom)] mt-8 flex items-center justify-center">
            <h2 class="text-[var(--muted-custom)] font-medium font-roboto text-sm md:text-base">Copyright © 2026 Reliable International Travel Services. All rights reserved.</h2>
        </div>
    </footer>
</template>
