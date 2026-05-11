<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-12 md:gap-16 items-center justify-center min-h-screen py-18 px-4 w-full">
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div class="w-full space-y-4">
            <div class="flex items-center gap-1 text-[var(--tertiary-custom)]">
                <Icon icon="mdi:offer" width="24" height="24" class="md:w-7 md:h-7" />
                <h2 class="font-bold font-roboto text-lg md:text-xl">OUR OFFERS</h2>
            </div>
            
            <div class="space-y-4">
                <div class="space-y-3">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
                        HOW RITS SERVICES WILL HELP YOU?
                    </h1>
                    <p class="font-roboto text-xs md:text-sm text-justify">
                        Ready to explore the world? Reach out to us for bookings, inquiries, or personalized travel advice. Our dedicated support team is available to assist you with every step of your journey
                    </p>
                </div>

                <div class="space-y-4 text-justify">
                    <div class="flex flex-col gap-1">
                        <span class="flex items-center gap-1">
                            <Icon icon="material-symbols:check" width="24" height="24" class="md:w-7 md:h-7 text-[var(--correct-custom)]" />
                            <h3 class="font-roboto font-bold text-sm md:text-base text-[var(--secondary-custom)]">
                                Inquiry
                            </h3>
                        </span>
                        <p class="font-roboto text-xs md:text-sm whitespace-pre-line">
                            From the time you noticed our Facebook Ads or some of your friends. We just need your personal and desired travel information.
                        </p>
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="flex items-center gap-1">
                            <Icon icon="material-symbols:check" width="24" height="24" class="md:w-7 md:h-7 text-[var(--correct-custom)]" />
                            <h3 class="font-roboto font-bold text-sm md:text-base text-[var(--secondary-custom)]">
                                Travel Consultation
                            </h3>
                        </span>
                        <p class="font-roboto text-xs md:text-sm whitespace-pre-line">
                            You will be assigned to our professional travel consultant and serve as your expert partner in your long-awaited travel.
                        </p>
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="flex items-center gap-1">
                            <Icon icon="material-symbols:check" width="24" height="24" class="md:w-7 md:h-7 text-[var(--correct-custom)]" />
                            <h3 class="font-roboto font-bold text-sm md:text-base text-[var(--secondary-custom)]">
                                Review and Decide
                            </h3>
                        </span>
                        <p class="font-roboto text-xs md:text-sm whitespace-pre-line">
                            You will receive a travel proposal based on the information you've submitted in our destination form. Just review it and decide if your up to it.
                        </p>
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="flex items-center gap-1">
                            <Icon icon="material-symbols:check" width="24" height="24" class="md:w-7 md:h-7 text-[var(--correct-custom)]" />
                            <h3 class="font-roboto font-bold text-sm md:text-base text-[var(--secondary-custom)]">
                                Pay and Seal The Deal
                            </h3>
                        </span>
                        <p class="font-roboto text-xs md:text-sm whitespace-pre-line">
                            Proceed to payment. After successful payment, please submit a proof of payment.
                        </p>
                    </div>

                </div>
            </div>
        </div>

        <div class="w-full h-full">
            <img src="https://www.thehotelarundel.com/wp-content/uploads/2024/01/AdobeStock_169263909-scaled.jpeg" class="object-cover h-48 md:h-full w-full" alt="">
        </div>
    </div>
  </section>
</template>