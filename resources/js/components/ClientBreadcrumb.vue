<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { truncateText } from '@/lib/utils';
import type { BreadcrumbItemType } from '@/types';

defineProps<{
    breadcrumbs?: BreadcrumbItemType[];
}>();
</script>

<template>
    <header
        class="flex shrink-0 items-center ease-linear"
    >
      <div class="flex items-center gap-2">
          <template v-if="breadcrumbs && breadcrumbs.length > 0">
              <Breadcrumb>
                  <BreadcrumbList> 
                      <template v-for="(item, index) in breadcrumbs" :key="index">
                          <BreadcrumbItem class="text-[var(--secondary-custom)] font-roboto">
                              <template v-if="index === breadcrumbs.length - 1">
                                  <BreadcrumbPage class="text-[var(--muted-custom)] font-roboto">{{ truncateText(item.title, 20) }}</BreadcrumbPage>
                              </template>
                              <template v-else>
                                  <BreadcrumbLink :href="item.href" class=" hover:text-[var(--muted-custom)] hover:underline">
                                      {{ truncateText(item.title, 20) }}
                                  </BreadcrumbLink>
                              </template>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator v-if="index !== breadcrumbs.length - 1" />
                      </template>
                  </BreadcrumbList>
              </Breadcrumb>
          </template>
      </div>
    </header>
</template>
