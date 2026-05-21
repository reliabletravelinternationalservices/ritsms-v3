<script setup lang="ts">
import { ref, computed } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Pin, Trash2, GripVertical } from 'lucide-vue-next'
import { Media } from '@/types/media'

const props = defineProps<{
  images: Media[]
  originalImages: Media[]
  deletedIds: number[]
  isSaving?: boolean // Captured from parent state to lock inputs during requests
}>()

const emit = defineEmits<{
  (e: 'update:images', value: Media[]): void
  (e: 'update:deletedIds', value: number[]): void
  (e: 'close'): void
  (e: 'save'): void
}>()

// --- Tracking State for Drag and Drop ---
const draggedIndex = ref<number | null>(null)

const getOriginalIndex = (id: number) => {
  return props.originalImages.findIndex((image) => image.id === id)
}

const hasChanges = computed(() => {
  if (props.deletedIds.length > 0) {
    return true
  }

  if (props.images.length !== props.originalImages.length) {
    return true
  }

  return props.images.some((image, index) => {
    const original = props.originalImages.find((originalImage) => originalImage.id === image.id)

    if (!original) {
      return true
    }

    return image.is_primary !== original.is_primary || index !== getOriginalIndex(image.id)
  })
})

// --- Native Drag and Drop Management Hooks ---
const onDragStart = (index: number) => {
  if (props.isSaving) return
  draggedIndex.value = index
}

const onDragEnter = (targetIndex: number) => {
  if (draggedIndex.value === null || draggedIndex.value === targetIndex || props.isSaving) return

  const updatedList = [...props.images]
  // Extract item out of its origin index and re-splice into its target location
  const [removedItem] = updatedList.splice(draggedIndex.value, 1)
  updatedList.splice(targetIndex, 0, removedItem)

  draggedIndex.value = targetIndex // Follow index change live
  emit('update:images', updatedList)
}

const onDragEnd = () => {
  draggedIndex.value = null
}

// --- Strict Exclusive Single Cover Pinning Implementation ---
const togglePin = (targetId: number) => {
  if (props.isSaving) return
  const targetItem = props.images.find(img => img.id === targetId)
  if (!targetItem) return

  // Determine if we are turning this cover flag on or off
  const willBePrimary = !targetItem.is_primary

  const updated = props.images.map(img => ({
    ...img,
    // If setting to true, explicitly flip all other image records to false
    is_primary: img.id === targetId ? willBePrimary : (willBePrimary ? false : img.is_primary)
  }))
  
  emit('update:images', updated)
}

const deleteImage = (targetId: number) => {
  if (props.isSaving) return
  const updated = props.images.filter(img => img.id !== targetId)
  emit('update:images', updated)
  
  if (!props.deletedIds.includes(targetId)) {
    emit('update:deletedIds', [...props.deletedIds, targetId])
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col min-h-0">
    <div class="flex-1 min-h-0 my-2 relative">
      <ScrollArea class="h-full w-full absolute inset-0 pr-3">
        <div v-if="images.length === 0" class="flex flex-col items-center justify-center h-full min-h-[250px] text-muted-foreground border-2 border-dashed rounded-lg">
          <p class="text-sm font-medium">No images assigned to this package yet.</p>
        </div>
        
        <div v-else class="grid grid-cols-2 gap-4 pt-1 pb-4">
          <div 
            v-for="(image, index) in images" 
            :key="image.id"
            :draggable="!isSaving"
            @dragstart="onDragStart(index)"
            @dragover.prevent
            @dragenter="onDragEnter(index)"
            @dragend="onDragEnd"
            class="group relative border rounded-lg overflow-hidden bg-secondary/10 transition-all duration-200 select-none"
            :class="{
              'cursor-grab active:cursor-grabbing': !isSaving,
              'border-primary ring-2 ring-primary/10': image.is_primary,
              'opacity-40 border-dashed border-muted-foreground scale-95': draggedIndex === index,
              'opacity-60 pointer-events-none': isSaving
            }"
          >
            <div class="aspect-video w-full overflow-hidden bg-zinc-950 flex items-center justify-center relative pointer-events-none">
              <img :src="image.url || image.file_path" :alt="image.alt_text || 'Package media'" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" />
              <div v-if="image.is_primary" class="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 font-medium shadow-sm">
                <Pin class="h-2.5 w-2.5 fill-current" /> Cover Image
              </div>
            </div>

            <div class="p-1.5 bg-background flex items-center justify-between border-t gap-1">
              <div class="flex items-center text-muted-foreground/60 px-1">
                <GripVertical class="w-4 h-4" />
                <span class="text-[10px] font-bold tracking-wider ml-0.5 text-zinc-400">#{{ index + 1 }}</span>
              </div>

              <div class="flex items-center gap-0.5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        class="h-7 w-7 text-muted-foreground" 
                        :class="{'text-primary bg-primary/10 hover:bg-primary/20': image.is_primary}" 
                        @click.stop="togglePin(image.id)"
                        :disabled="isSaving"
                      >
                        <Pin class="h-3.5 w-3.5" :class="{'fill-current': image.is_primary}" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent class="text-[10px]">
                      {{ image.is_primary ? 'Unset Cover status' : 'Make Exclusive Main Cover' }}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  class="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
                  @click.stop="deleteImage(image.id)"
                  :disabled="isSaving"
                >
                  <Trash2 class="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>

    <DialogFooter class="border-t pt-4 flex sm:justify-between items-center gap-2 shrink-0 mt-auto">
      <div class="text-xs text-muted-foreground text-left hidden sm:block">
        <span v-if="hasChanges && !isSaving" class="text-amber-600 dark:text-amber-400 font-medium">● Unsaved layout sorting or covers active</span>
        <span v-else-if="isSaving" class="text-primary font-medium animate-pulse">Syncing layout transformations...</span>
        <span v-else>Layout arrangements synchronized</span>
      </div>
      <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Button variant="outline" size="sm" @click="emit('close')" type="button" :disabled="isSaving">Cancel</Button>
        <Button :disabled="!hasChanges || isSaving" size="sm" @click="emit('save')" type="button" class="min-w-[110px] shadow-sm">
          <span v-if="isSaving" class="flex items-center gap-1.5">
            <span class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-background border-t-transparent" /> Saving...
          </span>
          <span v-else>Save Changes</span>
        </Button>
      </div>
    </DialogFooter>
  </div>
</template>