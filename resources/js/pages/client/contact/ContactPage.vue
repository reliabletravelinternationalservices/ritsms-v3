<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import InquiryForm from '../home/section/InquiryForm.vue';
import AgencyOffer from './section/AgencyOffer.vue';
import SocialMedia from './section/SocialMedia.vue';

</script>

<template>
    <Head title="Explore Most Popular Destinations" />
    <AppLayout>
        <AgencyOffer />
        <InquiryForm />
        <SocialMedia />     



         
          
    </AppLayout>     
</template>
w