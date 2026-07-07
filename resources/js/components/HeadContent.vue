<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { Head } from '@inertiajs/vue3';

const appUrl = import.meta.env.VITE_APP_URL || '';

interface Props {
    title?: string;
    description?: string;
    imageUrl?: string;
    url?: string;
    keywords?: string;
}

const props = defineProps<Props>();

const siteName = 'Reliable International Travel Services';
const defaultDescription = 'Discover unforgettable travel experiences with Reliable International Travel Services. We offer personalized itineraries, expert guidance, and exceptional service to make your dream vacation a reality.';

const pageTitle = computed(() =>
    props.title ? `${props.title} | ${siteName}` : siteName
);

const metaDescription = computed(() => props.description ?? defaultDescription);

const metaImageUrl = computed(() => props.imageUrl ?? `${appUrl}/storage/upload/agency/logo.png`);

const canonicalUrl = computed(() => {
    const currentUrl = props.url ?? (typeof window !== 'undefined' ? window.location.href : appUrl);

    if (!currentUrl) {
        return appUrl;
    }

    if (/^https?:\/\//i.test(currentUrl)) {
        return currentUrl;
    }

    return `${appUrl}${currentUrl.startsWith('/') ? currentUrl : `/${currentUrl}`}`;
});

const metaKeywords = computed(() =>
    props.keywords ?? 'travel agency, Philippines travel, inbound packages, outbound packages, personalized itineraries'
);

const organizationSchema = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteName,
    url: canonicalUrl.value,
    description: metaDescription.value,
    image: metaImageUrl.value,
    sameAs: [
        'https://www.facebook.com/reliableinternationaltravelservices',
        'https://www.instagram.com/reliabletravelph/',
        'https://www.tiktok.com/@reliabletravelph',
        'https://www.youtube.com/@reliabletravelservices',
    ],
    areaServed: 'Philippines',
    priceRange: '$$',
}));

const injectSchema = () => {
    if (typeof document === 'undefined') {
        return;
    }

    const existingScript = document.querySelector('script[data-seo-schema="travel-agency"]');
    if (existingScript) {
        existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-schema', 'travel-agency');
    script.textContent = JSON.stringify(organizationSchema.value);
    document.head.appendChild(script);
};

onMounted(() => {
    injectSchema();
});

watch([canonicalUrl, metaDescription, metaImageUrl], () => {
    injectSchema();
});
</script>

<template>
    <Head>
        <title>{{ pageTitle }}</title>
        <meta name="description" :content="metaDescription" />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="keywords" :content="metaKeywords" />
        <meta name="author" content="Reliable International Travel Services" />
        <link rel="canonical" :href="canonicalUrl" />

        <meta property="og:site_name" :content="siteName" />
        <meta property="og:title" :content="pageTitle" />
        <meta property="og:description" :content="metaDescription" />
        <meta property="og:image" :content="metaImageUrl" />
        <meta property="og:url" :content="canonicalUrl" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content="pageTitle" />
        <meta name="twitter:description" :content="metaDescription" />
        <meta name="twitter:image" :content="metaImageUrl" />
    </Head>
</template>