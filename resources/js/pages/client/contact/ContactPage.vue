<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Head } from '@inertiajs/vue3';
import InquiryForm from '../home/section/InquiryForm.vue';
import AgencyOffer from './section/AgencyOffer.vue';
import SocialMedia from './section/SocialMedia.vue';
import AgencyFaq from './section/AgencyFaq.vue';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';

</script>

<template>
    <Head title="Contact Us for More Information" />
    <AppLayout>
        <MotionWrapper :delay="0.05">
            <AgencyOffer />
        </MotionWrapper>
        <MotionWrapper :delay="0.1">
            <InquiryForm />
        </MotionWrapper>
        <MotionWrapper :delay="0.15">
            <SocialMedia />
        </MotionWrapper>
        <MotionWrapper :delay="0.2">
            <AgencyFaq />
        </MotionWrapper>
    </AppLayout>     
</template>
w