<script setup lang="ts">

// layouts
import AppLayout from '@/layouts/ClientAppLayout.vue';

// COMPONENTS
import TitleHeader from './section/TitleHeader.vue';
import AgencyRating from './section/AgencyRating.vue';
import AgencyVideo from './section/AgencyVideo.vue';
import AboutAgency from './section/AboutAgency.vue';
import PartnerAgency from '../home/section/PartnerAgency.vue';
import AgencyOffer from '../contact/section/AgencyOffer.vue';
import InquiryForm from '../home/section/InquiryForm.vue';
import SocialMedia from '../contact/section/SocialMedia.vue';
import AgencyFaq from '../contact/section/AgencyFaq.vue';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';

// CONSTANTS
import { SECTION_DELAYS } from './constants';

</script>

<template>
    <AppLayout>
        <TitleHeader />
        <MotionWrapper :delay="SECTION_DELAYS.rating">
            <AgencyRating />
        </MotionWrapper>
        <MotionWrapper :delay="SECTION_DELAYS.about">
            <AboutAgency />
        </MotionWrapper>
        <MotionWrapper :delay="SECTION_DELAYS.video">
            <AgencyVideo />
        </MotionWrapper>
        <MotionWrapper :delay="SECTION_DELAYS.partner">
            <PartnerAgency />
        </MotionWrapper>
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
