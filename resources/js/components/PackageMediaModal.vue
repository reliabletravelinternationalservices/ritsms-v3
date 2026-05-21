<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
import { Media } from '@/types/media'
import GalleryView from '@/components/GalleryView.vue'
import UploadView from '@/components/UploadPackageImageView.vue'

const props = defineProps<{
  open: boolean
  images: Media[]
  packageId: number
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'refresh-data'): void // Fired to reload parent datasets upon mutations
}>()

// --- Modal View State Management ---
const isUploadPaneOpen = ref(false)
const isSaving = ref(false)
const localImages = ref<Media[]>([])
const originalImages = ref<Media[]>([])
const deletedImageIds = ref<number[]>([])

const sortedImages = (images: Media[]) => {
  return JSON.parse(JSON.stringify(images)).sort((a: Media, b: Media) => a.order_number - b.order_number)
}

// Synchronize properties every time the modal pops open
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    localImages.value = sortedImages(props.images)
    originalImages.value = sortedImages(props.images)
    deletedImageIds.value = []
    isUploadPaneOpen.value = false
    isSaving.value = false
  }
}, { immediate: true })

// --- Unified Save Operations Dispatcher ---
const handleGallerySave = async () => {
  if (isSaving.value) return
  isSaving.value = true

  // Format array structural metadata tracking positions matching backend validation keys
  const payloadMeta = localImages.value.map((img, index) => ({
    id: img.id,
    is_primary: Boolean(img.is_primary),
    order: index + 1 // Forces explicit sequencing arrangements cleanly
  }))

  try {
    // Sends deletions, layout re-orders, and cover states in ONE atomic request block
    await axios.post(route('admin.packages.images.update', { id: props.packageId }), {
      _method: 'PUT', // Route method spoofing wrapper fallback for Laravel systems
      deleted_ids: deletedImageIds.value,
      meta: payloadMeta
    })

    emit('refresh-data')        // Tell your parent dashboard view to refresh the dataset
    emit('update:open', false)  // Close the modal cleanly upon success
  } catch (error) {
    console.error('Failed to update gallery arrangement settings:', error)
  } finally {
    isSaving.value = false
  }
}

const handleUploadSuccess = () => {
  isUploadPaneOpen.value = false
  emit('refresh-data')
}
</script>

<template>
  <Dialog :open="open" @update:open="!isSaving && emit('update:open', $event)">
    <DialogContent class="sm:max-w-[620px] h-[85vh] max-h-[700px] flex flex-col p-6 overflow-hidden transition-all duration-300">
      
      <DialogHeader class="flex flex-row items-center justify-between border-b pb-4 shrink-0">
        <div>
          <DialogTitle class="text-xl font-bold">Package Images</DialogTitle>
          <p class="text-sm text-muted-foreground mt-1">Manage, sort, and pin your package media assets.</p>
        </div>
        <Button 
          :variant="isUploadPaneOpen ? 'default' : 'outline'" 
          size="sm" 
          @click="isUploadPaneOpen = !isUploadPaneOpen" 
          :disabled="isSaving"
          type="button" 
          class="gap-1 shadow-sm shrink-0"
        >
          <Plus class="h-4 w-4" /> {{ isUploadPaneOpen ? 'View Gallery' : 'Add New' }}
        </Button>
      </DialogHeader>

      <UploadView 
        v-if="isUploadPaneOpen" 
        :package-id="packageId"
        @back="isUploadPaneOpen = false"
        @upload-success="handleUploadSuccess"
      />

      <GalleryView 
        v-else
        v-model:images="localImages"
        v-model:deletedIds="deletedImageIds"
        :original-images="originalImages"
        :is-saving="isSaving"
        @close="emit('update:open', false)"
        @save="handleGallerySave"
      />

    </DialogContent>
  </Dialog>
</template>