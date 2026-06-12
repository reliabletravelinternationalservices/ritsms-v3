<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
    <section class="flex flex-col items-center justify-center py-12 md:py-24 w-full bg-black/5 px-4 md:px-6">
        <div class="max-w-5xl w-full">
            <div class="w-full flex flex-col items-center gap-10 md:gap-14">
                
                <div class="flex flex-col items-center text-center space-y-4 max-w-3xl"> 
                    <div class="space-y-3">
                        <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase leading-tight">
                            Connect with Us on Social Media
                        </h1>
                        <p class="text-sm md:text-base font-roboto text-[var(--muted-custom)] max-w-xl mx-auto px-2">
                            Follow us on our social media channels to stay updated with the latest news, offers, and travel inspiration.
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-4 gap-6 md:gap-8 w-full max-w-md sm:max-w-none">
                    
                    <a href="https://www.facebook.com/reliableinternationaltravelservices" target="_blank" class="flex flex-col items-center justify-center p-6 md:p-8 shadow-md bg-[var(--primary-custom)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                        <Icon icon="ic:baseline-facebook" class="text-5xl text-[var(--secondary-custom)] group-hover:text-[#1877F2] transition-colors" />
                        <p class="mt-4 text-sm font-bold font-roboto uppercase tracking-wider text-[var(--secondary-custom)]">Facebook</p>
                    </a>

                    <a href="https://www.instagram.com/reliabletravelph/" target="_blank" class="flex flex-col items-center justify-center p-6 md:p-8 shadow-md bg-[var(--primary-custom)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                        <Icon icon="mdi:instagram" class="text-5xl text-[var(--secondary-custom)] group-hover:text-[#E4405F] transition-colors" />
                        <p class="mt-4 text-sm font-bold font-roboto uppercase tracking-wider text-[var(--secondary-custom)]">Instagram</p>
                    </a>

                    <a href="https://www.tiktok.com/@reliabletravelph" target="_blank" class="flex flex-col items-center justify-center p-6 md:p-8 shadow-md bg-[var(--primary-custom)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                        <Icon icon="ic:baseline-tiktok" class="text-5xl text-[var(--secondary-custom)] group-hover:text-black transition-colors" />
                        <p class="mt-4 text-sm font-bold font-roboto uppercase tracking-wider text-[var(--secondary-custom)]">TikTok</p>
                    </a>

                    <a href="https://www.youtube.com/@reliabletravelservices" target="_blank" class="flex flex-col items-center justify-center p-6 md:p-8 shadow-md bg-[var(--primary-custom)] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group">
                        <Icon icon="mdi:youtube" class="text-5xl text-[var(--secondary-custom)] group-hover:text-red-600 transition-colors" />
                        <p class="mt-4 text-sm font-bold font-roboto uppercase tracking-wider text-[var(--secondary-custom)]">Youtube</p>
                    </a>

                </div>
            </div>
        </div>
    </section>
</template>