<script setup lang="ts">
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
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
                                  <BreadcrumbPage class="text-[var(--muted-custom)] font-roboto">{{ item.title }}</BreadcrumbPage>
                              </template>
                              <template v-else>
                                  <BreadcrumbLink :href="item.href" class=" hover:text-[var(--muted-custom)] hover:underline">
                                      {{ item.title }}
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
