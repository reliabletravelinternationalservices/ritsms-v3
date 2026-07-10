<script setup lang="ts">

// COMPONENTS
import ClientFeedbackCarousel from '@/components/ClientFeedbackCarousel.vue';
import { Icon } from '@iconify/vue'

// CONSTANTS`
import { CLIENT_FEEDBACK } from '../constants';

</script>

<template>
    <section class="flex flex-col items-center justify-center h-auto min-h-screen md:min-h-[700px] lg:min-h-[800px] w-full p-8 md:p-0">
        <div class=" max-w-5xl h-min">
            <div class="w-full flex flex-col items-center gap-12 md:gap-16">
                <div class="flex flex-col items-center text-center space-y-4 max-w-3xl">
                    <div class="flex items-end gap-2 text-[var(--tertiary-custom)]">
                        <Icon icon="basil:chat-solid" width="28" height="28" class="md:w-7 md:h-7" aria-hidden="true"/>
                        <p class="font-bold font-roboto text-lg md:text-xl uppercase">Testimonials</p>
                    </div>
                    <div class="space-y-3">
                        <h2 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase">
                            Client Feedback & Travel Reviews
                        </h2>
                        <p class="text-base md:text-lg tracking-wide font-roboto text-[var(--muted-custom)] italic">
                            Every review reflects our commitment to exceptional service, trusted guidance, and unforgettable travel experiences.
                        </p>
                    </div>
                </div>

                <div class="w-full">
                    <ClientFeedbackCarousel :feedbacks="CLIENT_FEEDBACK" />
                </div>
            </div>
        
        </div>
        
    </section>
</template>