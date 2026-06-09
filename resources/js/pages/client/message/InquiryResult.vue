<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { Icon } from '@iconify/vue';

</script>

<template>
    <Head title="Successfully Submitted" />
    <AppLayout>
        <section class="w-full py-16 px-4 md:py-32 md:px-8 bg-[var(--primary-custom)] min-h-[calc(100vh-80px)] flex items-center justify-center">
            <div class="max-w-3xl mx-auto bg-[var(--primary-custom)] rounded-md h-auto w-full">
                
                <div class="flex flex-col items-center justify-center mb-6 md:mb-8">
                    <span class="bg-[var(--shadow-custom)] p-2 rounded-full">
                        <Icon icon="material-symbols:send" width="36" height="36" class="text-[var(--correct-custom)]" />
                    </span>
                    <h2 class="text-base md:text-xl text-[var(--correct-custom)] font-roboto mt-2">Inquiry Received</h2>
                </div>

                <div class="flex flex-col items-center justify-center text-center">
                    <h1 class="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase tracking-wide leading-tight">
                        Thank you for reaching out to us!
                    </h1>
                    <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)] max-w-xl mx-auto mt-4 leading-relaxed">
                        We have received your inquiry and our team will get back to you as soon as possible. If you have any urgent concerns, please feel free to contact us directly at 
                        <a href="mailto:reliabletravelinfo@gmail.com" class="font-bold underline break-all hover:text-[var(--secondary-custom)] transition-colors">
                            reliabletravelinfo@gmail.com
                        </a>.
                    </p>
                </div>

                <div class="flex items-center justify-center mt-8">
                    <a :href="route('client.landing')" class="w-full sm:w-auto text-center px-6 py-3 bg-[var(--secondary-custom)] text-white font-medium rounded-md hover:bg-[var(--tertiary-custom)] transition duration-300 shadow-sm">
                        Back to Home
                    </a>
                </div>

            </div>
        </section>
    </AppLayout>    
</template>