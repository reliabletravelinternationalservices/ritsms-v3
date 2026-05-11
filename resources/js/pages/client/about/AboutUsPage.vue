<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import { Destination } from '@/types/destination';
import TitleHeader from './section/TitleHeader.vue';
import AgencyRating from './section/AgencyRating.vue';
import AgencyVideo from './section/AgencyVideo.vue';
import AboutAgency from './section/AboutAgency.vue';
import PartnerAgency from '../home/section/PartnerAgency.vue';
import AgencyOffer from '../contact/section/AgencyOffer.vue';
import InquiryForm from '../home/section/InquiryForm.vue';
import SocialMedia from '../contact/section/SocialMedia.vue';
import AgencyFaq from '../contact/section/AgencyFaq.vue';

</script>

<template>
    <Head title="About Us" />
    <AppLayout>
        <TitleHeader />
        <AgencyRating />
        <AgencyVideo />
        <AboutAgency />
        <PartnerAgency />
        <AgencyOffer />
        <InquiryForm />
        <SocialMedia />
        <AgencyFaq />
    </AppLayout>     
</template>
