<script setup lang="ts">
import AppLayout from '@/layouts/app/AppNavigationLayout.vue';
import type { BreadcrumbItemType } from '@/types';

defineProps<{
    breadcrumbs?: BreadcrumbItemType[];
}>();

</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <slot />
    </AppLayout>
</template>
