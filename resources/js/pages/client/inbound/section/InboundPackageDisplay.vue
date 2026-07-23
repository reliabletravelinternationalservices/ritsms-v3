<script setup lang="ts">
import GroupPackage from '@/components/GroupPackage.vue';
import ApiFetchError from '@/components/placeholder/error/ApiFetchError.vue';
import GroupPackageSkeleton from '@/components/skeleton/GroupPackageSkeleton.vue';
import { useGroupPackages } from '@/composables/services/usePackages';
import { onMounted } from 'vue';


const {
  groupedPackages,
  fetchGroupPackages,
  loading,
  loaded,
  error,
  
} = useGroupPackages()

onMounted(() => {
  fetchGroupPackages({ isInbound: true })
})

</script>

<template>
  <section id="inbound-package-display" class="w-full px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto py-6 md:py-10 ">

      <div class="flex flex-col gap-4 md:gap-6">
        <GroupPackageSkeleton v-if="loading" />
        <ApiFetchError v-else-if="error" :retry="fetchGroupPackages" :description="error" />
        <template v-if="loaded">
          <GroupPackage 
            v-for="(group, index) in groupedPackages" 
            :key="`featured-${group.id}-${index}`"
            :group="group"
            :isInbound="true"
            :href="route('client.inbound.group', { id: group.id })" 
          />
        </template>
      </div>
    </div>
  </section>
</template>