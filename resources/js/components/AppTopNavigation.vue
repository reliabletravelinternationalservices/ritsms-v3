<script setup lang="ts">
import { Icon } from '@iconify/vue';


interface Props {
    email?: string;
    inquiryLink?: string;
    instagramLink?: string;
    facebookLink?: string;
    tiktokLink?: string;
}

withDefaults(defineProps<Props>(), {
    email: 'reliabletravelinfo@gmail',
    inquiryLink: '#',
    instagramLink: '#',
    facebookLink: '#',
    tiktokLink: '#',
});
</script>

<template>
    <div class="w-full bg-black p-4 md:p-2">
        <div class="max-w-7xl flex justify-center items-center mx-auto md:grid md:grid-cols-3">
            <div class="hidden md:flex space-x-2 items-end justify-start">
                <Icon icon="ic:baseline-email" width="24" height="24" class="text-[var(--tertiary-custom)]" />
                <a :href="`mailto:${email}`" rel="noopener noreferrer">
                    <span class="text-[var(--primary-custom)] font-medium text-sm hover:underline cursor-pointer hover:text-[var(--tertiary-custom)] duration-75">reliabletravelinfo@gmail.com</span>
                </a>
            </div>
            <div class="flex space-x-2 items-center justify-center">
                <span class="text-[var(--primary-custom)] text-sm">ASK A QUESTION?</span>
                <a :href="inquiryLink" target="_blank">
                    <span class="underline text-[var(--tertiary-custom)] text-sm font-bold hover:text-[var(--tertiary-hover-custom)] duration-75">INQUIRE NOW</span>
                </a>
            </div>

            <div class="hidden md:flex space-x-2 items-end justify-end">
                <a :href="instagramLink">
                    <Icon icon="mdi:instagram" width="24" height="24" class="text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75" />
                </a>
                <a :href="facebookLink">
                    <Icon icon="basil:facebook-solid" width="24" height="24" class="text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75" />
                </a>
                <a :href="tiktokLink">
                    <Icon icon="ic:baseline-tiktok" width="24" height="24" class="text-[var(--primary-custom)] hover:text-[var(--tertiary-custom)] duration-75" />
                </a>
            </div>
        </div>
    </div>
</template>
