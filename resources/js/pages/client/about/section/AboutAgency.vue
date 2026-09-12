<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { imageViewer } from '@/lib/imageViewer';

const appUrl = import.meta.env.VITE_APP_URL;

const images = Array.from({ length: 15 }, (_, i) => {
  const num = i + 1

  return {
    url: `${appUrl}/storage/upload/agency/client_${num}.png`,
    alt_text: `clients ${num}`,
  }
})

const openImageViewer = () => {
    imageViewer.open(images);
}
</script>

<template>
    <section class="w-full relative overflow-hidden py-12 md:py-20 lg:py-28 px-4 sm:px-6">
        <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
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
                </div>
            </div>

            <button @click="openImageViewer" type="button" class="w-full block text-left font-roboto">
                <div class="w-full grid grid-cols-2 gap-1">
                    <div class="col-span-2">
                        <img :src="images[0].url" class="object-cover h-48 md:h-full w-full" :alt="images[0].alt_text">
                    </div>
                    <div class="col-span-1">
                        <img :src="images[1].url" class="object-cover h-32 md:h-full w-full" :alt="images[1].alt_text">
                    </div>
                    <div class="col-span-1 relative">
                        <span class="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full text-[var(--primary-custom)]">
                            <span class="border-b border-[var(--primary-custom)] italic text-xs sm:text-sm">+{{ images.length - 3 }} images...</span>
                        </span>
                        <span class="absolute top-0 left-0 w-full h-full bg-[var(--secondary-custom)] opacity-60"></span>
                        <img :src="images[2].url" class="object-cover h-32 md:h-full w-full" :alt="images[2].alt_text">
                    </div>
                </div>
            </button>
        </div>
    </section>
</template>