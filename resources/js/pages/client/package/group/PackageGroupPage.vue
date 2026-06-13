<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { PackageGroup } from '@/types/group-package';
import { usePage } from '@inertiajs/vue3';
import TitleHeader from './section/TitleHeader.vue';
import PackageList from './section/PackageList.vue';
import { computed } from 'vue';
import HeadContent from '@/components/HeadContent.vue';


const page = usePage<Record<string, any>>();

interface Props {
    group: PackageGroup,
    isInbound: boolean
}

const props = defineProps<Props>();

const usdRate = page.props.settings?.usd_to_php_rate?? null;
const url = computed(() => {
    const routeName = props.isInbound
        ? 'client.inbound.package.group'
        : 'client.outbound.package.group';

    return route(routeName, { id: props.group.id });
});

</script>

<template>
    <HeadContent
        :title="props.group.title"
        :description="props.group.description?? undefined"
        :imageUrl="props.group.image && props.group.image.url ? props.group.image.url : undefined"
        :url="url"
    />
    <AppLayout>
        <TitleHeader  :title="props.group.title" :description="props.group.description" :image="props.group.image" :isInbound="props.isInbound" :id="props.group.id" />
        <PackageList :packages="props.group.packages?? []" :isInbound="props.isInbound" :usdRate="usdRate" />
    </AppLayout>     
</template>
