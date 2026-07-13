<script setup lang="ts">
import { useDestinationDropdownBreadcrumb } from '@/composables/useDestinationDropdownBreadcrumb';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'
import { BreadcrumbItemType } from '@/types';


const { openIndex, toggleDropdown, closeDropdown} = useDestinationDropdownBreadcrumb();


defineProps<{
  items: BreadcrumbItemType[]
}>()


</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(item, index) in items" :key="index">
        <BreadcrumbItem>

          <!-- LAST ITEM -->
          <template v-if="index === items.length - 1">

            <!-- Dropdown -->
            <div
              v-if="item.dropdown"
              class="relative dropdown-wrapper"
            >
              <button
                @click="toggleDropdown(index)"
                class="flex items-center gap-1 ease-in duration-200 hover:text-[var(--primary-custom)]"
              >
                {{ item.title }}
                <span>
                  <Icon
                      icon="gridicons:dropdown"
                      width="24"
                      height="24"
                      :class="cn(
                        'transition-transform duration-200',
                        openIndex === index && 'rotate-180'
                      )"
                    />
                </span>
              </button>

              <div
                v-if="openIndex === index"
                class="absolute mt-2 w-40 text-[var(--secondary-custom)] font-bold bg-[var(--primary-custom)] border border-[var(--primary-custom)] shadow z-10"
              >
                <div
                  v-for="(d, i) in item.dropdown"
                  :key="i"
                  class="px-3 py-2 hover:bg-[var(--shadow-custom)] cursor-pointer"
                  @click="
                    d.action?.();
                    closeDropdown();
                  "
                >
                  <!-- <a v-if="d.href" :href="d.href" class="block w-full">
                    {{ d.label }}
                  </a> -->
                  <span>{{ d.label }}</span>
                </div>
              </div>
            </div>

            <!-- Normal last page -->
            <BreadcrumbPage v-else>
              {{ item.title }}
            </BreadcrumbPage>

          </template>

          <!-- NORMAL LINK -->
          <template v-else>
            <a :href="item.href?? '#'" class="ease-in duration-200 hover:text-[var(--primary-custom)]">
              {{ item.title }}
            </a>
          </template>

        </BreadcrumbItem>

        <BreadcrumbSeparator v-if="index !== items.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>