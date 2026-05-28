<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { Destination } from '@/types/destination';
import { Icon } from '@iconify/vue';
interface Props {
    destination: Destination
}

defineProps<Props>();

</script>

<template>
    <Head title="Successfully Submitted" />
    <AppLayout>
        <section class="w-full p-40 bg-[var(--primary-custom)]">
            <div class="max-w-3xl mx-auto bg-[var(--primary-custom)] rounded-md h-auto">
                <div class="flex flex-col items-center justify-center mb-8">
                    <span class="bg-[var(--shadow-custom)] p-2 rounded-full">
                        <Icon icon="material-symbols:send" width="36" height="36" class="text-[var(--correct-custom)]" />
                    </span>
                    <h2 class="text-lg md:text-xl text-[var(--correct-custom)] font-roboto">Inquiry Received</h2>
                </div>
                <div class="flex flex-col items-center justify-center">
                    <h1 class="text-4xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase">
                        THANK YOU FOR REACHING OUT TO US!
                    </h1>
                    <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)] text-center p-2">
                        We have received your inquiry and our team will get back to you as soon as possible. If you have any urgent concerns, please feel free to contact us directly at <a href="mailto:reliabletravelinfo@gmail.com" class="font-bold underline">reliabletravelinfo@gmail.com</a>.
                    </p>
                </div>
                <div class="flex items-center justify-center mt-6">
                    <a :href="route('client.landing')" class="px-4 py-2 bg-[var(--secondary-custom)] text-white rounded-md hover:bg-[var(--tertiary-custom)] transition duration-300">
                        Back to Home
                    </a>
                </div>
            </div>
        </section>
    </AppLayout>     
</template>