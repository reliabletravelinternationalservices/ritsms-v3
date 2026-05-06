<script setup lang="ts">
import OutboundFilter from './OutboundFilter.vue';
import GroupPackage from './GroupPackage.vue';
import { PackageGroup } from '@/types/group-package';

const props = defineProps<{
    featuredGroups: PackageGroup[];
    normalGroups: PackageGroup[];
}>();

</script>

<template>
    <section class="w-full">
        <div class="max-w-5xl m-auto py-8">
            <template v-for="(group, index) in props.featuredGroups" :key="index">
                <GroupPackage
                    :title="group.title" 
                    :description="group.description" 
                    :packages="group.packages" 
                    :is-featured="true" 
                    :is-inbound="false"
                />
            </template>

            <div class="w-full py-12 mt-4">
                <OutboundFilter />
                <template v-if="props.normalGroups.length > 0" v-for="(group, index) in props.normalGroups" :key="index">
                    <GroupPackage
                        :title="group.title" 
                        :description="group.description" 
                        :packages="group.packages" 
                        :is-featured="false" 
                        :is-inbound="false"
                    />
                </template>
                <span v-else class="flex flex-col items-center justify-center gap-2 w-full h-10 bg-[var(--outbound-opacity-custom-10)] mt-8">
                    <p  class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">No Group Packages found</p>
                </span>
            </div>
        </div>
    </section>
</template>
