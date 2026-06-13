<script setup lang="ts">
import { computed } from 'vue';
import { Head } from '@inertiajs/vue3';

const appUrl = import.meta.env.VITE_APP_URL || '';

interface Props {
    title?: string;
    description?: string;
    imageUrl?: string;
    url?: string;
}

const props = defineProps<Props>();

const title = computed(() =>
    props.title ?? 'Discover The World With Us'
);

const description = computed(() =>
    props.description ??
    'Discover unforgettable travel experiences with Reliable International Travel Services. We offer personalized itineraries, expert guidance, and exceptional service to make your dream vacation a reality.'
);

const imageUrl = computed(() =>
    props.imageUrl ?? `${appUrl}/storage/upload/agency/logo.png`
);

const url = computed(() => {
    if (props.url) return props.url;
    if (typeof window !== 'undefined') return window.location.href;
    return appUrl;
});
</script>

<template>
    <Head>
        <title>{{ title }}</title>

        <meta head-key="og:title" property="og:title" :content="title" />
        <meta head-key="og:description" property="og:description" :content="description" />
        <meta head-key="og:image" property="og:image" :content="imageUrl" />
        <meta head-key="og:url" property="og:url" :content="url" />
        <meta head-key="og:type" property="og:type" content="website" />

        <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta head-key="twitter:title" name="twitter:title" :content="title" />
        <meta head-key="twitter:description" name="twitter:description" :content="description" />
        <meta head-key="twitter:image" name="twitter:image" :content="imageUrl" />
    </Head>
</template>