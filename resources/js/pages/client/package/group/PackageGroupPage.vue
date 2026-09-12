<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import TitleHeader from './section/TitleHeader.vue';
import PackageList from './section/PackageList.vue';
import { GroupedPackage } from '@/types/grouped-package.js';

interface Props {
    params: {
        group: GroupedPackage,
        isInbound: boolean
    }
}

defineProps<Props>();

</script>

<template>
    <AppLayout>
        <TitleHeader  :group="params.group" :isInbound="params.isInbound" />
        <PackageList :groupID="params.group.id" :isInbound="params.isInbound" />
    </AppLayout>     
</template>
