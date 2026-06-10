<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import ClientBreadcrumb from '@/components/ClientBreadcrumb.vue';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { imageViewer } from "@/lib/imageViewer"

const props = defineProps<{ 
    package: Package, 
    isInbound: boolean,
    breadcrumbs?: BreadcrumbItemType[] 
}>();

const previewImage = computed(() => {
    return (props.package.images ?? []).flat().slice(0, 4);
});

type ImageItem = {
    url: string
    alt_text: string
}

const images = computed<ImageItem[]>(() => {
    return (props.package.images ?? []).map((img: any) => ({
        url: img.url,
        alt_text: img.alt ?? "image",
    }))
})

const openImageViewer = () => {
    imageViewer.open(images.value);
}
</script>

<template>
  <section class="w-full h-auto min-h-[400px] relative overflow-hidden p-3 sm:p-4">
        <div class="max-w-5xl mx-auto w-full flex flex-col justify-start gap-4">
            
            <div class="min-h-12 h-auto py-1">
                <ClientBreadcrumb :breadcrumbs="breadcrumbs" />
            </div>

            <div class="flex flex-col gap-2">
                <div class="flex flex-wrap items-center gap-2">
                    <Banner 
                        :title="props.isInbound ? 'Inbound' : 'Outbound'" 
                        :class="props.isInbound ? 'bg-[var(--inbound-custom)]' : 'bg-[var(--outbound-custom)]'"
                    />
                    <Banner v-if="package.is_foreign_only" title="Valid FOR FOREIGN ONLY!" class="bg-[var(--warning-custom)]"/>
                </div>

                <h1 class="text-xl md:text-2xl lg:text-3xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase leading-tight">
                    {{ package.name }}
                </h1>

                <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <Link href="#" class="text-xs md:text-sm font-roboto text-[var(--muted-custom)] border-b border-[var(--primary-custom)] hover:border-b hover:border-[var(--muted-custom)] duration-75 flex items-start gap-1 w-fit ease-in">
                        <Icon icon="tabler:message" class="text-lg" />
                        <span>Message us</span>
                    </Link>
                    <Link href="#" class="text-xs md:text-sm font-roboto text-[var(--muted-custom)] border-b border-[var(--primary-custom)] hover:border-b hover:border-[var(--muted-custom)] duration-75 flex items-start gap-1 w-fit ease-in">
                        <Icon icon="material-symbols:call-outline" class="text-lg" />
                        <span>Call us</span>
                    </Link>
                    <Link href="#" class="text-xs md:text-sm font-roboto text-[var(--muted-custom)] border-b border-[var(--primary-custom)] hover:border-b hover:border-[var(--muted-custom)] duration-75 flex items-start gap-1 w-fit ease-in">
                        <Icon icon="material-symbols:share-outline" class="text-lg" />
                        <span>Share now</span>
                    </Link>
                </div>
            </div>

            <div v-if="previewImage.length > 0" class="w-full">
                <button @click="openImageViewer()" type="button" class="grid grid-cols-3 gap-1 w-full text-left">
                    <span class="col-span-3 h-[180px] sm:h-[240px] md:h-[280px] relative flex items-center justify-center overflow-hidden">
                        <img v-if="previewImage[0] && previewImage[0].url" :src="previewImage[0].url" :alt="previewImage[0].alt_text" class="object-cover h-full w-full">
                    </span>
                    <span class="col-span-1 h-[100px] sm:h-[140px] md:h-[180px] relative flex items-center justify-center overflow-hidden">
                        <img v-if="previewImage[1] && previewImage[1].url" :src="previewImage[1].url" :alt="previewImage[1].alt_text" class="object-cover h-full w-full">
                    </span>
                    <span class="col-span-1 h-[100px] sm:h-[140px] md:h-[180px] relative flex items-center justify-center overflow-hidden">
                        <img v-if="previewImage[2] && previewImage[2].url" :src="previewImage[2].url" :alt="previewImage[2].alt_text" class="object-cover h-full w-full">
                    </span>
                    <span class="col-span-1 h-[100px] sm:h-[140px] md:h-[180px] relative flex items-center justify-center overflow-hidden">
                        <img v-if="previewImage[3] && previewImage[3].url" :src="previewImage[3].url" :alt="previewImage[3].alt_text" class="object-cover h-full w-full">
                        <span v-if="props.package.images && props.package.images.length > 4" class="absolute inset-0 bg-black/60 flex items-center justify-center p-1 text-center select-none">
                            <span class="underline text-[var(--primary-custom)] text-xs sm:text-sm font-medium">{{ props.package.images.length - 4 }} more images...</span>
                        </span>
                    </span>
                </button>
            </div>
            
            <div v-else class="relative">
                <span class="flex items-center justify-center h-[240px] sm:h-[300px] md:h-[360px] w-full bg-[var(--shadow-custom)]">
                    <Icon icon="ic:baseline-image-not-supported" class="text-5xl md:text-6xl text-[var(--muted-custom)]" />
                </span>
            </div>
        </div>
  </section>
</template>