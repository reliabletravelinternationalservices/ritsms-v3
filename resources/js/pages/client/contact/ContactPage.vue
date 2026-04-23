<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import InquiryForm from '../home/section/InquiryForm.vue';
import AgencyOffer from './section/AgencyOffer.vue';
import SocialMedia from './section/SocialMedia.vue';
import AgencyFaq from './section/AgencyFaq.vue';

</script>

<template>
    <Head title="Contact Us for More Information" />
    <AppLayout>
        <AgencyOffer />
        <InquiryForm />
        <SocialMedia />     
        <AgencyFaq />
    </AppLayout>     
</template>
w