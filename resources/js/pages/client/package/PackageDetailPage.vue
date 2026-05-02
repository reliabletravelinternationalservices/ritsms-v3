<script setup lang="ts">
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { Package } from '@/types/package';
import { Head } from '@inertiajs/vue3';

const props = defineProps<{ package: Package }>();
</script>

<template>
    <Head :title="props.package.name" />
    <AppLayout>
        <h1>Package Detail</h1>
    </AppLayout>     
</template>
