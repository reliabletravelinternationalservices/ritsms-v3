<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Plus, Pin, Trash2, GripVertical, Check } from 'lucide-vue-next'
import { Media } from '@/types/media'

const props = defineProps<{
  open: boolean
  images: Media[]
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'save', payload: { updatedImages: Media[], deletedIds: number[] }): void
}>()

// --- State Management ---
const localImages = ref<Media[]>([])
const deletedImageIds = ref<number[]>([])

// Synchronize props to deep-cloned local state when modal opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    localImages.value = JSON.parse(JSON.stringify(props.images))
      .sort((a: Media, b: Media) => a.order_number - b.order_number)
    deletedImageIds.value = []
  }
}, { immediate: true })

// --- Computed Properties ---
// Deep change detector to see if user reordered, pinned, or deleted items
const hasChanges = computed(() => {
  if (deletedImageIds.value.length > 0) return true
  if (localImages.value.length !== props.images.length) return true
  
  return localImages.value.some((img, index) => {
    const original = props.images.find(o => o.id === img.id)
    if (!original) return true
    // Check if the order position or primary flag changed
    return img.is_primary !== original.is_primary || index !== props.images.findIndex(o => o.id === img.id)
  })
})

// --- Methods ---
const handleClose = () => {
  emit('update:open', false)
}

const handleAddClick = () => {
  // Static placeholder as requested (no functionality for now)
  console.log('Add image clicked - functionality pending backend pairing.')
}

const togglePin = (targetId: number) => {
  localImages.value = localImages.value.map((img) => {
    if (img.id === targetId) {
      return { ...img, is_primary: !img.is_primary }
    }
    // If your logic requires only ONE primary image per package:
    return { ...img, is_primary: false }
  })
  
  // Re-sort automatically so pinned goes to the top, if desired
  syncOrderNumbers()
}

const deleteImage = (targetId: number) => {
  localImages.value = localImages.value.filter(img => img.id !== targetId)
  // Track deleted IDs to pass back to Laravel for storage cleanup
  if (!deletedImageIds.value.includes(targetId)) {
    deletedImageIds.value.push(targetId)
  }
  syncOrderNumbers()
}

// Recalculates order array indexes to map perfectly to Laravel database increments
const syncOrderNumbers = () => {
  localImages.value.forEach((img, index) => {
    img.order_number = index + 1
  })
}

// Emits the payload ready for Axios/Inertia requests
const handleSave = () => {
  syncOrderNumbers()
  emit('save', {
    updatedImages: localImages.value,
    deletedIds: deletedImageIds.value
  })
}

// Optional simple layout array reordering helper if NOT using vuedraggable tag
const moveItem = (index: number, direction: 'up' | 'down') => {
  const targetIndex = direction === 'up' ? index - 1 : index + 1
  if (targetIndex < 0 || targetIndex >= localImages.value.length) return
  
  const temp = localImages.value[index]
  localImages.value[index] = localImages.value[targetIndex]
  localImages.value[targetIndex] = temp
  syncOrderNumbers()
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[600px] max-h-[85vh] flex flex-col p-6">
      
      <DialogHeader class="flex flex-row items-center justify-between border-b pb-4">
        <div>
          <DialogTitle class="text-xl font-bold">Package Images</DialogTitle>
          <p class="text-sm text-muted-foreground mt-1">Manage, sort, and pin your package media assets.</p>
        </div>
        <Button variant="outline" size="icon" @click="handleAddClick" type="button" class="shrink-0">
          <Plus class="h-5 w-5" />
        </Button>
      </DialogHeader>

      <!-- Image Management Grid Area -->
      <ScrollArea class="flex-1 my-4 pr-4 min-h-[300px]">
        <div v-if="localImages.length === 0" class="flex flex-col items-center justify-center h-[300px] text-muted-foreground border-2 border-dashed rounded-lg">
          <p>No images uploaded to this package yet.</p>
        </div>
        
        <!-- Grid layout container -->
        <div class="grid grid-cols-2 gap-4 pt-2">
          <div 
            v-for="(image, index) in localImages" 
            :key="image.id"
            class="group relative border rounded-lg overflow-hidden bg-secondary/30 transition-all hover:border-primary/40"
            :class="{'border-primary ring-2 ring-primary/20': image.is_primary}"
          >
            <!-- Image Frame -->
            <div class="aspect-video w-full overflow-hidden bg-black flex items-center justify-center relative">
              <img 
                :src="image.url || image.file_path" 
                :alt="image.alt_text || 'Package image'" 
                class="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
              />
              
              <!-- Pinned badge indicator -->
              <div v-if="image.is_primary" class="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-md flex items-center gap-1 font-medium shadow-sm">
                <Pin class="h-3 w-3 fill-current" /> Cover Image
              </div>
            </div>

            <!-- Management Control Footer Overlay -->
            <div class="p-2 bg-background flex items-center justify-between border-t gap-1">
              <!-- Manual Sorting Arrows (Fall-back strategy to avoid heavy external sorting dependencies) -->
              <div class="flex items-center gap-0.5">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  class="h-7 w-7" 
                  :disabled="index === 0"
                  @click="moveItem(index, 'up')"
                >
                  <span class="sr-only">Move up</span>
                  ▲
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  class="h-7 w-7" 
                  :disabled="index === localImages.length - 1"
                  @click="moveItem(index, 'down')"
                >
                  <span class="sr-only">Move down</span>
                  ▼
                </Button>
              </div>

              <!-- Pin and Trash Controls -->
              <div class="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button"
                        variant="ghost" 
                        size="icon" 
                        class="h-8 w-8 text-muted-foreground hover:text-primary"
                        :class="{'text-primary bg-primary/10': image.is_primary}"
                        @click="togglePin(image.id)"
                      >
                        <Pin class="h-4 w-4" :class="{'fill-current': image.is_primary}" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Set as main cover</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  class="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  @click="deleteImage(image.id)"
                >
                  <Trash2 class="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <!-- Actions Drawer Footer -->
      <DialogFooter class="border-t pt-4 flex sm:justify-between items-center gap-2">
        <div class="text-xs text-muted-foreground text-left hidden sm:block">
          <span v-if="hasChanges" class="text-amber-600 dark:text-amber-400 font-medium">● Unsaved modifications detected</span>
          <span v-else>No changes made</span>
        </div>
        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button variant="outline" @click="handleClose" type="button">
            Cancel
          </Button>
          <Button 
            :disabled="!hasChanges" 
            @click="handleSave"
            type="button"
            class="min-w-[90px]"
          >
            Save Changes
          </Button>
        </div>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>