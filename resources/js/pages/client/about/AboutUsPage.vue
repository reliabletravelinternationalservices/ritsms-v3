<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import TitleHeader from './section/TitleHeader.vue';
import AgencyRating from './section/AgencyRating.vue';
import AgencyVideo from './section/AgencyVideo.vue';
import AboutAgency from './section/AboutAgency.vue';
import PartnerAgency from '../home/section/PartnerAgency.vue';
import AgencyOffer from '../contact/section/AgencyOffer.vue';
import InquiryForm from '../home/section/InquiryForm.vue';
import SocialMedia from '../contact/section/SocialMedia.vue';
import AgencyFaq from '../contact/section/AgencyFaq.vue';
import HeadContent from '@/components/HeadContent.vue';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';

</script>

<template>
    <HeadContent
        title="About Us"
        description="Learn more about our agency and services we provide."
        :url="route('client.about')"
    />
    <AppLayout>
        <TitleHeader />
        <MotionWrapper :delay="0.05">
            <AgencyRating />
        </MotionWrapper>
        <MotionWrapper :delay="0.1">
            <AboutAgency />
        </MotionWrapper>
        <MotionWrapper :delay="0.15">
            <AgencyVideo />
        </MotionWrapper>
        <MotionWrapper :delay="0.2">
            <PartnerAgency />
        </MotionWrapper>
        <MotionWrapper :delay="0.25">
            <AgencyOffer />
        </MotionWrapper>
        <MotionWrapper :delay="0.3">
            <InquiryForm />
        </MotionWrapper>
        <MotionWrapper :delay="0.35">
            <SocialMedia />
        </MotionWrapper>
        <MotionWrapper :delay="0.4">
            <AgencyFaq />
        </MotionWrapper>
    </AppLayout>     
</template>
