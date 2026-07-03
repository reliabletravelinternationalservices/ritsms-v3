<script setup lang="ts">
import { Icon } from '@iconify/vue';


interface Props {
    email?: string;
    inquiryLink?: string;
    instagramLink?: string;
    facebookLink?: string;
    tiktokLink?: string;
    youtubeLink?: string;
}

withDefaults(defineProps<Props>(), {
    email: 'inquiry@reliabletravelph.com',
    inquiryLink: route('client.contact'),
    instagramLink: 'https://www.instagram.com/reliabletravelph/',
    facebookLink: 'https://www.facebook.com/reliableinternationaltravelservices',
    tiktokLink: 'https://www.tiktok.com/@reliabletravelph',
    youtubeLink: 'https://www.youtube.com/@reliabletravelservices',
});

</script>

<template>
    <div class="w-full bg-black p-4 md:p-2">
        <div class="max-w-7xl flex justify-center items-center mx-auto md:grid md:grid-cols-3">
            <div class="hidden md:flex space-x-2 items-end justify-start">
                <Icon icon="ic:baseline-email" width="24" height="24" class="text-[var(--tertiary-custom)]" />
                <a :href="`mailto:${email}`" rel="noopener noreferrer">
                    <span class="text-[var(--primary-custom)] font-medium text-sm hover:underline cursor-pointer hover:text-[var(--tertiary-custom)] duration-75">{{ email }}</span>
                </a>
            </div>
            <div class="flex space-x-2 items-center justify-center">
                <span class="text-[var(--primary-custom)] text-sm">ASK A QUESTION?</span>
                <a :href="inquiryLink" >
                    <span class="underline text-[var(--tertiary-custom)] text-sm font-bold hover:text-[var(--tertiary-hover-custom)] duration-75">INQUIRE NOW</span>
                </a>
            </div>

            <div class="hidden md:flex space-x-2 items-end justify-end">
                <a :href="instagramLink" target="_blank">
                    <Icon icon="mdi:instagram" width="24" height="24" class="text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75" />
                </a>
                <a :href="facebookLink" target="_blank">
                    <Icon icon="basil:facebook-solid" width="24" height="24" class="text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75" />
                </a>
                <a :href="tiktokLink" target="_blank">
                    <Icon icon="ic:baseline-tiktok" width="24" height="24" class="text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75" />
                </a>
                <a :href="youtubeLink" target="_blank">
                    <Icon icon="mdi:youtube" width="24" height="24" class="text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75" />
                </a>
            </div>
        </div>
    </div>
</template>
