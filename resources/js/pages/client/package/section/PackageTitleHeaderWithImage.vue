<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import ClientBreadcrumb from '@/components/ClientBreadcrumb.vue';
import { BreadcrumbItemType } from '@/types';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';
import { Link } from '@inertiajs/vue3';

defineProps<{ package: Package, breadcrumbs?: BreadcrumbItemType[] }>();

</script>

<template>
  <section class="w-full h-auto min-h-[400px] relative overflow-hidden p-4">
        <div class="max-w-5xl m-auto w-full flex flex-col justify-start gap-4">
            <span class="h-12">
                <ClientBreadcrumb :breadcrumbs="breadcrumbs" />
            </span>
            <div class="flex flex-col gap-2">
                <span class="flex items-center gap-2">
                    <Banner title="Outbound" class="bg-[var(--outbound-custom)]"/>
                    <Banner title="Valid FOR FOREIGN ONLY!" class="bg-[var(--warning-custom)]"/>
                </span>
                <h1 class="text-1xl md:text-2xl lg:text-3xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase">
                    {{ package.name }}
                </h1>
                <span class="flex items-center gap-4">
                    <Link :href="route('client.package.detail', { package: package })" class="text-xs md:text-sm font-roboto text-[var(--muted-custom)] border-b border-[var(--primary-custom)] hover:border-b hover:border-[var(--muted-custom)] duration-75 flex items-start gap-1 w-fit ease-in">
                        <Icon icon="tabler:message"  class="text-lg" />
                        <span>Message us</span>
                    </Link>
                    <Link :href="route('client.package.detail', { package: package })" class="text-xs md:text-sm font-roboto text-[var(--muted-custom)] border-b border-[var(--primary-custom)] hover:border-b hover:border-[var(--muted-custom)] duration-75 flex items-start gap-1 w-fit ease-in">
                        <Icon icon="material-symbols:call-outline"  class="text-lg" />
                        <span>Call us</span>
                    </Link>
                    <Link :href="route('client.package.detail', { package: package })" class="text-xs md:text-sm font-roboto text-[var(--muted-custom)] border-b border-[var(--primary-custom)] hover:border-b hover:border-[var(--muted-custom)] duration-75 flex items-start gap-1 w-fit ease-in">
                        <Icon icon="material-symbols:share-outline"  class="text-lg" />
                        <span>Share now</span>
                    </Link>
                </span>
            </div>

            <div class="grid grid-cols-3 gap-1">
                <span class="col-span-3 h-[280px] bg-[var(--shadow-custom)]">
                    <img src="https://www.yourvietnamtravel.com/vietnam-holiday-packages/images/tour2/banner.jpg" alt="" class="object-cover h-full w-full">
                </span>
                <span class="col-span-1 h-[180px] bg-[var(--shadow-custom)]">
                    <img src="https://cdn.tourradar.com/s3/tour/750x400/240577_63df61665b564.jpg" alt="" class="object-cover h-full w-full">
                </span>
                <span class="col-span-1 h-[180px] bg-[var(--shadow-custom)]">
                    <img src="https://raksotravel.com/Content/img/TourPhoto2020/package_109712_1.jpg" alt="" class="object-cover h-full w-full">
                </span>
                <span class="col-span-1 h-[180px] bg-[var(--shadow-custom)] relative">
                    <img src="https://triphappy.ph/wp-content/uploads/2026/01/Kim-Son-Bao-Thang-Tu-Fansipan-Peak.webp" alt="" class="object-cover h-full w-full">
                    <span class="absolute top-0 left-0 bg-black/60 h-full w-full flex items-center justify-center cursor-default">
                        <span class="underline text-[var(--primary-custom)]">5 more images...</span>
                    </span>
                </span>
            </div>
        </div>
  </section>
</template>