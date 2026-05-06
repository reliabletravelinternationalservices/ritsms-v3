<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import GroupPackage from './GroupPackage.vue'
import InboundFilter from './InboundFilter.vue'
import { PackageGroup } from '@/types/group-package';

const page = usePage<Record<string, any>>();

const props = defineProps<{
  featuredGroups: PackageGroup[];
  normalGroups: PackageGroup[];
}>();

const usdRate: number = page.props.settings?.usd_to_php_rate?? null;
</script>

<template>
    <section class="w-full">
        <div class="max-w-5xl m-auto py-8">
            <GroupPackage
                v-for="(group, index) in props.featuredGroups" :key="index"
                :title="group.title" 
                :description="group.description" 
                :packages="group.packages" 
                :is-featured="true" 
                :is-inbound="true"
                :usd-rate="usdRate"
            />


            <div class="w-full py-12 mt-4">
                <InboundFilter />
                <span v-if="props.normalGroups.length > 0" >
                    <GroupPackage
                        v-for="(group, index) in props.normalGroups" :key="index"
                        :title="group.title" 
                        :description="group.description" 
                        :packages="group.packages" 
                        :is-featured="false" 
                        :is-inbound="true"
                        :usd-rate="usdRate"
                    />
                </span>
                <span v-else class="flex flex-col items-center justify-center gap-2 w-full h-10 bg-[var(--inbound-opacity-custom-10)] mt-8">
                    <p  class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">No Group Packages found</p>
                </span>
            </div>
        </div>
    </section>
</template>
