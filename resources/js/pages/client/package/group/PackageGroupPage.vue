<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { PackageGroup } from '@/types/group-package';
import TitleHeader from './section/TitleHeader.vue';
import PackageList from './section/PackageList.vue';



interface Props {
    group: PackageGroup,
    isInbound: boolean
}

const props = defineProps<Props>();


</script>

<template>
    <AppLayout>
        <TitleHeader  :title="props.group.title" :description="props.group.description" :image="props.group.image" :isInbound="props.isInbound" :id="props.group.id" />
        <PackageList :packages="props.group.packages?? []" :isInbound="props.isInbound" />
    </AppLayout>     
</template>
