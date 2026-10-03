<script setup lang="ts">
import type { BreadcrumbItemType } from '@/types';
import AppTopNavigation from '@/components/AppTopNavigation.vue';
import AppHeader from '@/components/AppClientHeader.vue';
import AppFooter from '@/components/AppClientFooter.vue';
import { Client } from '@/types/client';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
    authUser?: Client | null;
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

</script>

<template>
    <div class="bg-[var(--primary-custom)] text-[var(--secondary-custom)]">
        <AppTopNavigation />
        <AppHeader :client="authUser" />
        <slot />
        <AppFooter />
    </div>
</template>