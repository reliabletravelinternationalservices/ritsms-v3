<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UploadCloud, X, FileImage, CheckCircle2, AlertCircle } from 'lucide-vue-next'

// Track internal upload state for each individual file instance
interface UploadingFile {
  id: string
  file: File
  previewUrl: string
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  errorMsg?: string
}

const props = defineProps<{
  open: boolean
  packageId: number
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'upload-success'): void // Triggers parent to reload images from database
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const queue = ref<UploadingFile[]>([])
const isUploadingGlobal = ref(false)

// Watch out for modal reset on close
const handleClose = () => {
  if (isUploadingGlobal.value) return // Prevent closing while processing
  queue.value.forEach(item => URL.revokeObjectURL(item.previewUrl))
  queue.value = []
  emit('update:open', false)
}

// Trigger browser input trigger click
const triggerSelect = () => {
  fileInputRef.value?.click()
}

// Handle selected file arrays
const handleFileSelection = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  
  addFilesToQueue(Array.from(target.files))
  target.value = '' // Clear input element string buffer
}

// Drag and drop processing
const handleDrop = (e: DragEvent) => {
  if (!e.dataTransfer?.files) return
  addFilesToQueue(Array.from(e.dataTransfer.files))
}

const addFilesToQueue = (files: File[]) => {
  const validImages = files.filter(file => file.type.startsWith('image/'))
  
  validImages.forEach(file => {
    queue.value.push({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      status: 'pending'
    })
  })
}

// Remove an un-uploaded single item from layout queue
const removeFromQueue = (id: string) => {
  const item = queue.value.find(f => f.id === id)
  if (item) {
    URL.revokeObjectURL(item.previewUrl)
    queue.value = queue.value.filter(f => f.id !== id)
  }
}

// Handle sequential or concurrent uploads via Axios
const startUploadProcess = async () => {
  if (queue.value.length === 0 || isUploadingGlobal.value) return
  
  isUploadingGlobal.value = true
  
  // Filter items that aren't already successful
  const pendingItems = queue.value.filter(item => item.status !== 'success')

  // Run uploads concurrently mapping individual progress vectors
  const uploadPromises = pendingItems.map(async (item) => {
    item.status = 'uploading'
    
    const formData = new FormData()
    formData.append('image', item.file)
    formData.append('package_id', props.packageId.toString())

    try {
      await axios.post(route('admin.packages.images.upload-raw', { id: props.packageId }), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            item.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          }
        }
      })
      item.status = 'success'
      item.progress = 100
    } catch (err: any) {
      item.status = 'error'
      item.errorMsg = err.response?.data?.message || 'Upload failed'
    }
  })

  await Promise.all(uploadPromises)
  
  isUploadingGlobal.value = false
  
  // If everything uploaded perfectly, emit event so data refetches
  const globalSuccess = queue.value.every(item => item.status === 'success')
  if (globalSuccess) {
    setTimeout(() => {
      emit('upload-success')
      handleClose()
    }, 800)
  }
}

const totalFilesCount = computed(() => queue.value.length)
const canUpload = computed(() => queue.value.some(item => item.status !== 'success') && !isUploadingGlobal.value)
</script>

<template>
  <Dialog :open="open" @update:open="handleClose">
    <DialogContent class="sm:max-w-[550px] max-h-[85vh] flex flex-col p-6" @dragover.prevent @drop.prevent="handleDrop">
      
      <DialogHeader>
        <DialogTitle class="text-lg font-bold">Upload New Images</DialogTitle>
        <p class="text-xs text-muted-foreground">Drag & drop multiple image variations or browse your directory.</p>
      </DialogHeader>

      <div 
        @click="triggerSelect"
        class="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-secondary/10 hover:bg-secondary/30 hover:border-primary/50 mt-2 text-center"
        :class="{ 'opacity-50 pointer-events-none': isUploadingGlobal }"
      >
        <input 
          ref="fileInputRef"
          type="file" 
          multiple 
          accept="image/*" 
          class="hidden" 
          @change="handleFileSelection"
        />
        <div class="p-3 bg-background rounded-full shadow-sm border text-muted-foreground">
          <UploadCloud class="w-6 h-6" />
        </div>
        <p class="text-sm font-medium mt-1">Click to upload or drag files here</p>
        <p class="text-xs text-muted-foreground">Supports PNG, JPG, JPEG, WEBP files</p>
      </div>

      <ScrollArea v-if="totalFilesCount > 0" class="flex-1 my-4 pr-2 max-h-[280px]">
        <div class="space-y-3 pr-2">
          <div 
            v-for="item in queue" 
            :key="item.id"
            class="flex items-center gap-3 p-2.5 border rounded-lg bg-background shadow-sm relative group"
          >
            <div class="w-12 h-12 rounded-md overflow-hidden bg-zinc-100 flex-shrink-0 border">
              <img :src="item.previewUrl" class="w-full h-full object-cover" alt="Preview" />
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2 mb-1">
                <p class="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
                  {{ item.file.name }}
                </p>
                <span class="text-[10px] font-semibold text-muted-foreground whitespace-nowrap">
                  {{ item.progress }}%
                </span>
              </div>

              <Progress 
                :model-value="item.progress" 
                class="h-1.5" 
                :class="{
                  '[&>div]:bg-emerald-500': item.status === 'success',
                  '[&>div]:bg-destructive': item.status === 'error',
                }"
              />
              
              <p v-if="item.status === 'error'" class="text-[10px] text-destructive mt-0.5 font-medium">
                {{ item.errorMsg }}
              </p>
            </div>

            <div class="flex-shrink-0 ml-1">
              <CheckCircle2 v-if="item.status === 'success'" class="w-5 h-5 text-emerald-500 fill-emerald-50 dark:fill-zinc-900" />
              <AlertCircle v-else-if="item.status === 'error'" class="w-5 h-5 text-destructive" />
              <Button
                v-else
                type="button"
                variant="ghost"
                size="icon"
                class="h-7 w-7 opacity-70 hover:opacity-100 rounded-full hover:bg-muted"
                :disabled="isUploadingGlobal"
                @click="removeFromQueue(item.id)"
              >
                <X class="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      <DialogFooter class="border-t pt-4 flex items-center justify-end gap-2">
        <Button 
          variant="outline" 
          @click="handleClose" 
          :disabled="isUploadingGlobal"
          type="button"
        >
          Cancel
        </Button>
        <Button 
          :disabled="!canUpload" 
          @click="startUploadProcess"
          type="button"
          class="min-w-[120px]"
        >
          <span v-if="isUploadingGlobal" class="flex items-center gap-1.5">
            <span class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-background border-t-transparent" />
            Uploading...
          </span>
          <span v-else>
            Upload {{ totalFilesCount > 0 ? `(${totalFilesCount})` : '' }}
          </span>
        </Button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>