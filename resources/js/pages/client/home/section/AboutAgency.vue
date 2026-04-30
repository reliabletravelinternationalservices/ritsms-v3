<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button';
</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-12 md:gap-16 items-center justify-center min-h-screen lg:min-h-[1000px] py-12 px-4 w-full">
    
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="w-full space-y-4">
            <div class="flex items-center gap-1 text-[var(--tertiary-custom)]">
                <Icon icon="akar-icons:info-fill" width="24" height="24" class="md:w-7 md:h-7" />
                <h2 class="font-bold font-roboto text-lg md:text-xl">ABOUT US</h2>
            </div>
            
            <div class="space-y-4">
                <div class="space-y-3">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
                        Why Travelers Choose Us!
                    </h1>
                    <p class="font-roboto text-xs md:text-sm text-justify">
                        Founded in March 2009 by Claire Baria, Reliable International Travel Services is a trusted leader in the travel industry. With over 17 years of expertise, we specialize in delivering premium, seamless, and personalized travel solutions tailored to your unique preferences
                    </p>
                </div>

                <div class="space-y-2 ml-4 text-justify">
                    <p class="font-roboto text-xs md:text-sm whitespace-pre-line">
                        <span class="font-bold">• Expertly Curated Itineraries:</span> From simple getaways to complex international planning, every detail is professionally handled.
                    </p>
                    <p class="font-roboto text-xs md:text-sm whitespace-pre-line">
                        <span class="font-bold">• VIP Treatment:</span> Our dedicated travel consultants provide personalized care, acting as your partner from the first inquiry to your return home
                    </p>
                    <p class="font-roboto text-xs md:text-sm whitespace-pre-line">
                        <span class="font-bold">• 24/7 Global Support:</span> We offer round-the-clock assistance to ensure a worry-free and memorable journey.
                    </p>
                    <p class="font-roboto text-xs md:text-sm whitespace-pre-line">
                        <span class="font-bold">• Deep Destination Knowledge:</span> We leverage years of experience to turn your dream vacations into meaningful realities.
                    </p>
                </div>

                <p class="font-roboto text-xs md:text-sm text-justify">
                    Whether you are seeking a bespoke tour or a seamless business trip, Reliable International Travel Services is your dependable companion for every mile of the journey.
                </p>

                <div class="pt-2">
                    <Button
                        type="button" 
                        class="bg-[var(--tertiary-custom)] font-medium hover:bg-[var(--tertiary-hover-custom)] rounded-none font-roboto flex items-center justify-center px-12 py-3 w-full md:w-auto"
                    >
                        <span class="text-sm md:text-base">Read More</span>
                        <Icon icon="ep:arrow-right-bold" width="18" height="18" class="ml-2" />
                    </Button>
                </div>
            </div>
        </div>

        <div class="w-full grid grid-cols-2 gap-1 order-first md:order-last">
            <div class="col-span-2">
                <img src="http://127.0.0.1:8000/storage/upload/agency/clients_1.png" class="object-cover h-48 md:h-full w-full" alt="">
            </div>
            <div class="col-span-1">
                <img src="http://127.0.0.1:8000/storage/upload/agency/clients_2.png" class="object-cover h-32 md:h-full w-full" alt="">
            </div>
            <div class="col-span-1">
                <img src="http://127.0.0.1:8000/storage/upload/agency/clients_3.png" class="object-cover h-32 md:h-full w-full" alt="">
            </div>
        </div>
    </div>
    
    <div class="grid grid-cols-2 lg:grid-cols-4 w-full gap-y-8 lg:gap-y-0">
        <div class="flex items-center justify-center border-r-2 border-[var(--shadow-custom)] gap-2 px-2">
            <Icon icon="lucide:circle-star" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" />
            <span class="flex flex-col">
                <h4 class="font-bold font-montserrat text-xl md:text-3xl">17+</h4>
                <p class="text-[10px] md:text-sm font-roboto uppercase">Years of Experience</p>
            </span>
        </div>
        <div class="flex items-center justify-center lg:border-r-2 border-[var(--shadow-custom)] gap-2 px-2">
            <Icon icon="boxicons:plane-land" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" />
            <span class="flex flex-col">
                <h4 class="font-bold font-montserrat text-xl md:text-3xl">1100+</h4>
                <p class="text-[10px] md:text-sm font-roboto uppercase">SUCCESS SERVICES</p>
            </span>
        </div>
        <div class="flex items-center justify-center border-r-2 border-[var(--shadow-custom)] gap-2 px-2 mt-4 lg:mt-0">
            <Icon icon="mdi:emoticon-happy-outline" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" />
            <span class="flex flex-col">
                <h4 class="font-bold font-montserrat text-xl md:text-3xl">100%</h4>
                <p class="text-[10px] md:text-sm font-roboto uppercase">TRUSTED BY CLIENT</p>
            </span>
        </div>
        <div class="flex items-center justify-center gap-2 px-2 mt-4 lg:mt-0">
            <Icon icon="material-symbols:reviews-outline" width="40" height="40" class="md:w-[50px] md:h-[50px] text-[var(--tertiary-custom)] shrink-0" />
            <span class="flex flex-col">
                <h4 class="font-bold font-montserrat text-xl md:text-3xl">90%</h4>
                <p class="text-[10px] md:text-sm font-roboto uppercase">POSITIVE REVIEWS</p>
            </span>
        </div>
    </div>
  </section>
</template>