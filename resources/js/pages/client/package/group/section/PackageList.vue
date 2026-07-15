<script setup lang="ts">
import { computed, ref } from 'vue';
import MotionWrapper from '../../../../../components/ui/MotionWrapper.vue';
import PackageCard from '../../../../../components/PackageCard.vue';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

interface Props {
    packages: Package[],
    isInbound: boolean,
}
const props = defineProps<Props>();

const visibleCount = ref(6);
const visiblePackages = computed(() => props.packages.slice(0, visibleCount.value));
const hasMorePackages = computed(() => visibleCount.value < props.packages.length);

const showMore = () => {
    visibleCount.value = Math.min(props.packages.length, visibleCount.value + 3);
};
</script>

<template>
    <section class="w-full flex flex-col justify-center py-6">
        <div class="max-w-5xl m-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6">
            <MotionWrapper v-for="packageData in visiblePackages" :key="packageData.id">
                <PackageCard :package="packageData" :isInbound="props.isInbound" />
            </MotionWrapper>
        </div>

        <div v-if="hasMorePackages" class="mt-8 flex justify-center">
            <button
                type="button"
                @click="showMore"
                class="inline-flex items-center justify-center px-7 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 gap-2"
                :class="props.isInbound
                    ? 'hover:text-[var(--inbound-custom)]'
                    : 'hover:text-[var(--outbound-custom)]'"
            >
                <span class="whitespace-nowrap">Show more</span>
                <Icon icon="codicon:fold-down" class="w-4 h-4" />
            </button>
        </div>
    </section>
</template>