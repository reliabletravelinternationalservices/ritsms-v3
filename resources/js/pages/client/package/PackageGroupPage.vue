<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { PackageGroup } from '@/types/group-package';
import { Head } from '@inertiajs/vue3';


interface Props {
    group: PackageGroup
}

const props = defineProps<Props>();
</script>

<template>
    <Head :title="props.group.title" />
    <AppLayout>
        this is package group page
    </AppLayout>     
</template>
