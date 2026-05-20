<script setup lang="ts">
import { ref, computed } from 'vue';
import { Image } from 'lucide-vue-next';
import { Icon as Iconify } from '@iconify/vue'; 
import { Button } from '@/components/ui/button';
import PackageMediaModal from '@/components/PackageMediaModal.vue'; // Updated to match component name
import { Media } from '@/types/media';
import { useForm } from '@inertiajs/vue3';

const props = defineProps<{
  packageId: number
  primaryImage?: Media,
  images?: Media[]
}>();

const form = useForm({
  // Kept intact if you plan to append new binary uploads using your Add button later
  images: [] as File[], 
  meta: [] as any[],
  deleted_ids: [] as number[] // Added to track database image purges in Laravel
})

const isModalOpen = ref(false)

// We track the locally modified images right after a successful save layout sequence 
const localImagesOverride = ref<Media[] | null>(null)

// Computed list that yields updated states immediately or defaults back to database properties
const currentImagesList = computed(() => {
  return localImagesOverride.value ?? props.images ?? []
})

const handleImagesSaved = (payload: { updatedImages: Media[], deletedIds: number[] }) => {
  // Update local component state representation instantly
  localImagesOverride.value = payload.updatedImages

  // 1. Structure metadata payload reflecting reordering positions and primary assignments
  const metaPayload = payload.updatedImages.map((img, index) => ({
    id: img.id,
    is_primary: img.is_primary,
    order: index + 1,
  }))

  // 2. Load the values directly onto our reactive Inertia dataset form instance
  form.meta = metaPayload
  form.deleted_ids = payload.deletedIds

  // 3. Post data transformations using standard multi-part form payloads out to Laravel endpoint route
  form.post(route('admin.packages.images.store', { id: props.packageId }), {
    preserveScroll: true,
    forceFormData: true, 
    onSuccess: () => {
      isModalOpen.value = false
      console.log('Images package layout configuration synchronized successfully!')
    }
  })
}

const activePrimaryImage = computed(() => {
  // Check our live updated checklist first
  if (currentImagesList.value.length > 0) {
    const localPrimary = currentImagesList.value.find(img => img.is_primary)
    // Fallback safely to the first item if none is designated primary
    return localPrimary || currentImagesList.value[0]
  }
  
  if (props.primaryImage?.url) {
    return props.primaryImage
  }

  return null
})
</script>

<template>
  <section class="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-100/10 border dark:bg-zinc-800/10 dark:border-zinc-800 shadow-sm">
    <div class="absolute top-3 right-3 z-20">
      <Button 
        type="button" 
        size="icon"
        variant="secondary"
        class="rounded-full shadow-md hover:scale-105 transition-transform" 
        @click="isModalOpen = true"
      >
        <Iconify icon="solar:pen-bold" class="w-4 h-4 text-zinc-700 dark:text-zinc-200" />
      </Button>
    </div>

    <!-- Reactive Image Frame Rendering Layout Context -->
    <img 
      v-if="activePrimaryImage?.url" 
      :src="activePrimaryImage.url" 
      :alt="activePrimaryImage.alt_text || 'Package Cover Display Showcase'"
      class="w-full h-full object-cover select-none animate-in fade-in duration-300"
    />
    
    <!-- Fallback Placeholder Canvas Display Area -->
    <div v-else class="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-2 bg-muted/20">
      <Image class="w-12 h-12 stroke-[1.5] text-zinc-400/80" />
      <p class="text-sm font-medium tracking-tight">No package image assigned</p>
    </div>
  </section>

  <!-- Global Modal Element Allocation Frame -->
  <PackageMediaModal
    v-model:open="isModalOpen"
    :images="currentImagesList"
    @save="handleImagesSaved"
  />
</template>