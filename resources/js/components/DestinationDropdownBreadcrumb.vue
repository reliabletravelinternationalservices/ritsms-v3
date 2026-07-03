<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'

interface DropdownItem {
  label: string
  action?: () => void
  href?: string
}

interface BreadcrumbItemType {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}

defineProps<{
  items: BreadcrumbItemType[]
}>()

const openIndex = ref<number | null>(null)

const toggleDropdown = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}

const closeDropdown = () => {
  openIndex.value = null
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.dropdown-wrapper')) {
    closeDropdown()
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
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
                {{ item.label }}
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
                  <a v-if="d.href" :href="d.href" class="block w-full">
                    {{ d.label }}
                  </a>
                  <span v-else>{{ d.label }}</span>
                </div>
              </div>
            </div>

            <!-- Normal last page -->
            <BreadcrumbPage v-else>
              {{ item.label }}
            </BreadcrumbPage>

          </template>

          <!-- NORMAL LINK -->
          <template v-else>
            <a :href="item.href?? '#'" class="ease-in duration-200 hover:text-[var(--primary-custom)]">
              {{ item.label }}
            </a>
          </template>

        </BreadcrumbItem>

        <BreadcrumbSeparator v-if="index !== items.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>