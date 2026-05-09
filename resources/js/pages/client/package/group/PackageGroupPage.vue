<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { PackageGroup } from '@/types/group-package';
import { Head, usePage } from '@inertiajs/vue3';
import TitleHeader from './section/TitleHeader.vue';
import PackageList from './section/PackageList.vue';


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
        <PackageList :packages="props.group.packages?? []" :isInbound="props.isInbound" :usdRate="usdRate" />
    </AppLayout>     
</template>
