<script setup lang="ts">

// LAYOUT
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import InquiryForm from '../home/section/InquiryForm.vue';
import AgencyOffer from './section/AgencyOffer.vue';
import SocialMedia from './section/SocialMedia.vue';
import AgencyFaq from './section/AgencyFaq.vue';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';

// CONSTANTS
import { SECTION_DELAYS } from './constants';

</script>

<template>
    <AppLayout>
        <MotionWrapper :delay="SECTION_DELAYS.offer">
            <AgencyOffer />
        </MotionWrapper>
        <MotionWrapper :delay="SECTION_DELAYS.inquiry">
            <InquiryForm />
        </MotionWrapper>
        <MotionWrapper :delay="SECTION_DELAYS.social">
            <SocialMedia />
        </MotionWrapper>
        <MotionWrapper :delay="SECTION_DELAYS.faq">
            <AgencyFaq />
        </MotionWrapper>
    </AppLayout>     
</template>
w