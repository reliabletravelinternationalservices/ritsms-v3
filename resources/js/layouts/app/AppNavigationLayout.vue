<script setup lang="ts">
import type { BreadcrumbItemType } from '@/types';
import AppTopNavigation from '@/components/AppTopNavigation.vue';
import AppHeader from '@/components/AppClientHeader.vue';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

</script>

<template>
    <div class="bg-[var(--primary-custom)] text-[var(--secondary-custom)]">
        <AppTopNavigation />
        <AppHeader />
        <slot />
    </div>
</template>