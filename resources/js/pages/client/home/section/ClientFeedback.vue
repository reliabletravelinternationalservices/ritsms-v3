<script setup lang="ts">

// COMPONENTS
import ClientFeedbackCarousel from '@/components/ClientFeedbackCarousel.vue';
import { Icon } from '@iconify/vue'

// CONSTANTS`
import { CLIENT_FEEDBACK } from '../constants';

</script>

<template>

    <section
        aria-labelledby="testimonials-heading"
        class="flex min-h-screen w-full flex-col items-center justify-center px-4 py-16 sm:px-6 md:min-h-[700px] md:py-20 lg:min-h-[800px] lg:py-24"
    >
        <div class="mx-auto w-full max-w-5xl">
            <div class="flex w-full flex-col items-center gap-12 md:gap-16">

                <!-- Section Introduction -->
                <header class="flex max-w-3xl flex-col items-center space-y-4 text-center">
                    <div class="flex items-end gap-2 text-[var(--tertiary-custom)]">
                        <Icon
                            icon="basil:chat-solid"
                            width="28"
                            height="28"
                            class="md:w-7 md:h-7"
                            aria-hidden="true"
                        />

                        <p class="font-roboto text-lg font-bold uppercase md:text-xl">
                            Testimonials
                        </p>
                    </div>

                    <div class="space-y-3">
                        <h2
                            id="testimonials-heading"
                            class="font-montserrat text-2xl font-bold uppercase text-[var(--secondary-custom)] md:text-3xl lg:text-4xl"
                        >
                            Client Feedback &amp; Travel Reviews
                        </h2>

                        <p class="font-roboto text-base italic leading-relaxed tracking-wide text-[var(--muted-custom)] md:text-lg">
                            Every review reflects our commitment to exceptional
                            service, trusted guidance, and unforgettable travel
                            experiences.
                        </p>
                    </div>
                </header>

                <!-- Testimonials Collections -->
                <div class="flex w-full flex-col gap-14 md:gap-20">

                    <!-- Historical Testimonials -->
                    <section
                        aria-labelledby="historical-testimonials-heading"
                        class="w-full"
                    >
                        <header class="mb-5 flex flex-col items-center gap-2 text-center md:mb-7">
                            <span class="text-xs font-bold uppercase tracking-[0.25em] text-[var(--tertiary-custom)]">
                                Our Journey Through the Years
                            </span>

                            <h3
                                id="historical-testimonials-heading"
                                class="font-montserrat text-xl font-bold text-[var(--secondary-custom)] md:text-2xl"
                            >
                                Client Experiences | 2010–2024
                            </h3>

                            <p class="max-w-xl text-sm leading-relaxed text-[var(--muted-custom)] md:text-base">
                                A collection of memorable travel experiences and
                                feedback from our valued clients.
                            </p>
                        </header>

                        <div class="px-0 py-2 sm:px-3 md:px-6">
                            <ClientFeedbackCarousel
                                :feedbacks="CLIENT_FEEDBACK['2009_2024']"
                            />
                        </div>
                    </section>

                    <!-- Recent Testimonials -->
                    <section
                        aria-labelledby="recent-testimonials-heading"
                        class="w-full"
                    >
                        <header class="mb-5 flex flex-col items-center gap-2 text-center md:mb-7">
                            <span class="text-xs font-bold uppercase tracking-[0.25em] text-[var(--tertiary-custom)]">
                                More Happy Travelers
                            </span>

                            <h3
                                id="recent-testimonials-heading"
                                class="font-montserrat text-xl font-bold text-[var(--secondary-custom)] md:text-2xl"
                            >
                                Client Experiences | 2025–2026
                            </h3>

                            <p class="max-w-xl text-sm leading-relaxed text-[var(--muted-custom)] md:text-base">
                                More stories from travelers who trusted us
                                to help make their journeys memorable.
                            </p>
                        </header>

                        <div class="px-0 py-2 sm:px-3 md:px-6">
                            <ClientFeedbackCarousel
                                :feedbacks="CLIENT_FEEDBACK['2025_2026']"
                            />
                        </div>
                    </section>

                </div>
            </div>
        </div>
    </section>

</template>