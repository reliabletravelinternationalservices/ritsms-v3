<script setup lang="ts">
import ClientFeedbackCarousel from '@/components/ClientFeedbackCarousel.vue';
import { Icon } from '@iconify/vue'

interface Feedback {
  id: number
  name: string
  image_path: string
}

const feedbacks: Feedback[] = [
    {
        id: 1,
        name: 'John Doe',
        image_path: 'http://127.0.0.1:8000/storage/upload/agency/review_1.png',
    },
    {
        id: 2,
        name: 'Jane Smith',
        image_path: 'http://127.0.0.1:8000/storage/upload/agency/review_2.png',
    },
    {
        id: 3,
        name: 'Alice Johnson',
        image_path: 'http://127.0.0.1:8000/storage/upload/agency/review_3.png',
    },
    {
        id: 4,
        name: 'Bob Williams',
        image_path: 'http://127.0.0.1:8000/storage/upload/agency/review_4.png',
    },
    {
        id: 5,
        name: 'Eva Brown',
        image_path: 'http://127.0.0.1:8000/storage/upload/agency/review_5.png',
    },
    {
        id: 6,
        name: 'Michael Davis',
        image_path: 'http://127.0.0.1:8000/storage/upload/agency/review_6.png',
    }

]


</script>

<template>
    <section class="flex flex-col items-center justify-center h-auto min-h-screen md:min-h-[700px] lg:min-h-[800px] w-full p-8 md:p-0">
        <div class=" max-w-5xl h-min">
            <div class="w-full flex flex-col items-center gap-12 md:gap-16">
                <div class="flex flex-col items-center text-center space-y-4 max-w-3xl">
                    <div class="flex items-end gap-2 text-[var(--tertiary-custom)]">
                        <Icon icon="basil:chat-solid" width="28" height="28" class="md:w-7 md:h-7"/>
                        <h2 class="font-bold font-roboto text-lg md:text-xl uppercase">Testimonial</h2>
                    </div>
                    <div class="space-y-3">
                        <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase">
                            Client's Feedback & Reviews
                        </h1>
                    </div>
                </div>

                <div class="w-full">
                    <ClientFeedbackCarousel :feedbacks="feedbacks" />
                </div>
            </div>
        
        </div>
        
    </section>
</template>