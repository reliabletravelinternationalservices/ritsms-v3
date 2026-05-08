<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { PackageGroup } from '@/types/group-package';
import { Head, usePage } from '@inertiajs/vue3';
import TitleHeader from './section/TitleHeader.vue';
import PackageCard from '@/components/PackageCard.vue';


const page = usePage<Record<string, any>>();

interface Props {
    group: PackageGroup,
    isInbound: boolean
}

const props = defineProps<Props>();

const usdRate = page.props.settings?.usd_to_php_rate?? null;
</script>

<template>
    <Head :title="props.group.title" />
    <AppLayout>
        <TitleHeader :title="props.group.title" :description="props.group.description" :image="props.group.image" :isInbound="props.isInbound" />
        <section class="w-full">
            <div class="max-w-5xl m-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PackageCard v-for="packageData in props.group.packages" :key="packageData.id" :package="packageData" :isInbound="props.isInbound" :usdRate="isInbound ? usdRate : null" />
            </div>
        </section>
    </AppLayout>     
</template>
