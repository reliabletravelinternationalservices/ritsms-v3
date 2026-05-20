<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'

interface UploadedImage {
  id: string
  url: string
  file: File | null
  isPrimary: boolean
}

const props = defineProps<{
  open: boolean
  maxImages?: number
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'save', images: UploadedImage[]): void
}>()

// Component States
const images = ref<UploadedImage[]>([])
const isUploading = ref(false)
const uploadProgress = ref(0)
const fileInput = ref<HTMLInputElement | null>(null)
const draggedIndex = ref<number | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

// Close helper
const handleClose = (value: boolean) => {
  emit('update:open', value)
}

// Handle file selection & upload progress simulation
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return

  const filesArray = Array.from(target.files)
  
  if (props.maxImages && images.value.length + filesArray.length > props.maxImages) {
    alert(`You can only upload a maximum of ${props.maxImages} images.`)
    return
  }

  isUploading.value = true
  uploadProgress.value = 0

  const interval = setInterval(() => {
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      
      filesArray.forEach((file) => {
        const objectUrl = URL.createObjectURL(file)
        images.value.push({
          id: crypto.randomUUID(),
          url: objectUrl,
          file: file,
          isPrimary: images.value.length === 0
        })
      })

      isUploading.value = false
      uploadProgress.value = 0
      if (target) target.value = ''
    } else {
      uploadProgress.value += 25
    }
  }, 200)
}

const pinAsPrimary = (id: string) => {
  images.value = images.value.map(img => ({
    ...img,
    isPrimary: img.id === id
  }))
}

const deleteImage = (id: string, index: number) => {
  const wasPrimary = images.value[index].isPrimary
  images.value.splice(index, 1)
  
  if (wasPrimary && images.value.length > 0) {
    images.value[0].isPrimary = true
  }
}

// Native HTML5 Drag and Drop Sorting
const onDragStart = (index: number) => {
  draggedIndex.value = index
}

const onDragOver = (index: number) => {
  if (draggedIndex.value === null || draggedIndex.value === index) return
  
  const items = [...images.value]
  const draggedItem = items.splice(draggedIndex.value, 1)[0]
  items.splice(index, 0, draggedItem)
  
  images.value = items
  draggedIndex.value = index
}

const onDragEnd = () => {
  draggedIndex.value = null
}

const handleSave = () => {
  emit('save', images.value)
  handleClose(false)
}
</script>

<template>
  <Dialog :open="open" @update:open="handleClose">
    <DialogContent class="sm:max-w-2xl max-h-[85vh] flex flex-col p-6">
      <DialogHeader>
        <DialogTitle>Upload & Manage Images</DialogTitle>
      </DialogHeader>

      <!-- Dropzone -->
      <div 
        @click="triggerFileInput"
        class="border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-muted/30 mt-4"
      >
        <div class="p-3 bg-background rounded-full shadow-sm border border-muted">
          <Icon icon="lucide:upload-cloud" class="w-6 h-6 text-muted-foreground" />
        </div>
        <p class="text-sm font-medium">Click to upload images</p>
        <p class="text-xs text-muted-foreground">Drag images below to change their sequence layout.</p>
        
        <input 
          ref="fileInput"
          type="file" 
          multiple 
          accept="image/*" 
          class="hidden" 
          @change="handleFileChange"
        />
      </div>

      <!-- Upload Progress Indicator -->
      <div v-if="isUploading" class="space-y-2 mt-4">
        <div class="flex justify-between text-xs font-medium text-muted-foreground">
          <span>Processing files...</span>
          <span>{{ uploadProgress }}%</span>
        </div>
        <Progress :model-value="uploadProgress" class="h-2 w-full" />
      </div>

      <!-- Image Grid Management -->
      <div class="flex-1 overflow-y-auto min-h-[200px] mt-6 pr-1">
        <div v-if="images.length === 0" class="h-full flex items-center justify-center text-sm text-muted-foreground italic">
          No images uploaded yet.
        </div>
        
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div 
            v-for="(image, index) in images" 
            :key="image.id"
            draggable="true"
            @dragstart="onDragStart(index)"
            @dragover.prevent="onDragOver(index)"
            @dragend="onDragEnd"
            class="relative aspect-square rounded-lg border bg-muted overflow-hidden group cursor-grab active:cursor-grabbing transition-all border-muted"
            :class="{ 'ring-2 ring-primary border-transparent': image.isPrimary }"
          >
            <img :src="image.url" alt="Uploaded thumbnail" class="w-full h-full object-cover select-none" />

            <!-- Drag overlay text feedback -->
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <Icon icon="lucide:grip-horizontal" class="w-6 h-6 text-white drop-shadow-md" />
            </div>

            <!-- Star Action / Primary Thumbnail Selection -->
            <button 
              type="button"
              @click.stop="pinAsPrimary(image.id)"
              class="absolute top-2 left-2 p-1.5 rounded-md backdrop-blur-md transition-colors z-10"
              :class="image.isPrimary ? 'bg-amber-500 text-white' : 'bg-black/50 text-white/70 hover:text-white'"
            >
              <Icon :icon="image.isPrimary ? 'lucide:star' : 'lucide:star-off'" class="w-4 h-4 fill-current" />
            </button>

            <!-- Trash Action / Row removal -->
            <button 
              type="button"
              @click.stop="deleteImage(image.id, index)"
              class="absolute top-2 right-2 p-1.5 rounded-md bg-black/50 hover:bg-destructive text-white/70 hover:text-white backdrop-blur-md transition-colors z-10"
            >
              <Icon icon="lucide:trash-2" class="w-4 h-4" />
            </button>

            <!-- Metadata label footer -->
            <div class="absolute bottom-2 left-2 bg-black/60 text-[10px] text-white px-1.5 py-0.5 rounded font-mono">
              #{{ index + 1 }} {{ image.isPrimary ? '(Cover)' : '' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Action Control Footer -->
      <div class="flex justify-end gap-3 mt-6 pt-4 border-t border-muted">
        <button 
          type="button" 
          @click="handleClose(false)"
          class="px-4 py-2 border border-input bg-background text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Cancel
        </button>
        <button 
          type="button" 
          @click="handleSave"
          class="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          Apply Changes
        </button>
      </div>
    </DialogContent>
  </Dialog>
</template>