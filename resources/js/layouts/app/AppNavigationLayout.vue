<script setup lang="ts">
import type { BreadcrumbItemType } from '@/types';
import AppTopNavigation from '@/components/AppTopNavigation.vue';
import AppHeader from '@/components/AppClientHeader.vue';
import AppFooter from '@/components/AppClientFooter.vue';

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
        <AppFooter />
    </div>
</template>