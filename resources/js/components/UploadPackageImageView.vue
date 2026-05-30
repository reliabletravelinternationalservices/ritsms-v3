<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { UploadCloud, X, CheckCircle2, AlertCircle } from 'lucide-vue-next'

interface LocalUploadFile {
  id: string
  file: File
  previewUrl: string
  localProgress: number         // Track local processing progress
  serverProgress: number        // Track actual network request progress
  status: 'reading' | 'pending' | 'uploading' | 'success' | 'error'
  errorMsg?: string
}

const props = defineProps<{ packageId: number }>()
const emit = defineEmits<{ (e: 'upload-success'): void; (e: 'back'): void }>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const uploadQueue = ref<LocalUploadFile[]>([])
const isUploadingGlobal = ref(false)

const canUpload = computed(() => uploadQueue.value.some(item => item.status === 'pending') && !isUploadingGlobal.value)

const triggerSelect = () => {
  if (!isUploadingGlobal.value) fileInputRef.value?.click()
}

const handleFileSelection = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) processAndStagingFiles(Array.from(target.files))
  target.value = ''
}

const handleDrop = (e: DragEvent) => {
  if (isUploadingGlobal.value || !e.dataTransfer?.files) return
  processAndStagingFiles(Array.from(e.dataTransfer.files))
}

// 1. LOCAL LOADING SIMULATION LOGIC:
const processAndStagingFiles = (files: File[]) => {
  const imageFiles = files.filter(f => f.type.startsWith('image/'))

  imageFiles.forEach(file => {
    const item: LocalUploadFile = ref({
      id: Date.now() + Math.random().toString(16),
      file,
      previewUrl: URL.createObjectURL(file),
      localProgress: 0,
      serverProgress: 0,
      status: 'reading' as const
    }).value

    uploadQueue.value.push(item)

    // Simulate reading the file chunk into local client memory view
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 10
      if (progress >= 100) {
        item.localProgress = 100
        item.status = 'pending'
        clearInterval(interval)
      } else {
        item.localProgress = progress
      }
    }, 80)
  })
}

const removeFromQueue = (id: string) => {
  const item = uploadQueue.value.find(f => f.id === id)
  if (item) {
    URL.revokeObjectURL(item.previewUrl)
    uploadQueue.value = uploadQueue.value.filter(f => f.id !== id)
  }
}

// 2. SERVER UPLOAD PROGRESS LOGIC:
const startUploadProcess = async () => {
  if (uploadQueue.value.length === 0 || isUploadingGlobal.value) return
  isUploadingGlobal.value = true

  const pendingItems = uploadQueue.value.filter(item => item.status === 'pending')

  const uploadPromises = pendingItems.map(async (item) => {
    item.status = 'uploading'
    const formData = new FormData()
    formData.append('image', item.file)
    formData.append('package_id', props.packageId.toString())

    try {
      await axios.post(route('admin.packages.images.store', { id: props.packageId }), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            item.serverProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          } else if (progressEvent.progress) {
            item.serverProgress = Math.round(progressEvent.progress * 100)
          }
        }
      })
      item.status = 'success'
      item.serverProgress = 100
    } catch (err: any) {
      item.status = 'error'
      item.serverProgress = 0
      item.errorMsg = err.response?.data?.message || 'Server upload failed'
    }
  })

  await Promise.all(uploadPromises)
  isUploadingGlobal.value = false

  const hasErrors = uploadQueue.value.some(item => item.status === 'error')
  if (!hasErrors) {
    setTimeout(() => {
      uploadQueue.value.forEach(item => URL.revokeObjectURL(item.previewUrl))
      uploadQueue.value = []
      emit('upload-success')
    }, 600)
  }
}
</script>

<template>
  <div class="flex-1 flex flex-col min-h-0 my-2" @dragover.prevent @drop.prevent="handleDrop">
    <div 
      @click="triggerSelect"
      class="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors bg-secondary/10 hover:bg-secondary/30 hover:border-primary/50 text-center shrink-0"
      :class="{ 'opacity-40 pointer-events-none select-none': isUploadingGlobal }"
    >
      <input ref="fileInputRef" type="file" multiple accept="image/*" class="hidden" :disabled="isUploadingGlobal" @change="handleFileSelection" />
      <div class="p-2 bg-background rounded-full shadow-sm border text-muted-foreground">
        <UploadCloud class="w-5 h-5" />
      </div>
      <p class="text-xs font-semibold">Click or drag images here to process upload</p>
    </div>

    <div class="flex-1 min-h-0 mt-4 relative">
      <ScrollArea class="h-full w-full absolute inset-0 pr-3">
        <div class="space-y-2.5 pb-4">
          <div v-for="item in uploadQueue" :key="item.id" class="flex items-center gap-3 p-2.5 border rounded-lg bg-background shadow-sm">
            <img :src="item.previewUrl" class="w-11 h-11 object-cover rounded-md border shrink-0" alt="Preview" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2 mb-1">
                <p class="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">{{ item.file.name }}</p>
                
                <span class="text-[10px] font-bold text-zinc-500 whitespace-nowrap">
                  <span v-if="item.status === 'reading'">Loading ({{ item.localProgress }}%)</span>
                  <span v-else-if="item.status === 'uploading'">Uploading ({{ item.serverProgress }}%)</span>
                  <span v-else-if="item.status === 'success'">Finished</span>
                  <span v-else-if="item.status === 'error'">Failed</span>
                  <span v-else>Staged & Ready</span>
                </span>
              </div>

              <Progress 
                v-if="item.status === 'reading'"
                :model-value="item.localProgress" 
                class="h-1.5 [&>div]:bg-amber-500" 
              />
              
              <Progress
                v-else
                :model-value="item.serverProgress" 
                class="h-1.5" 
                :class="{ 
                  '[&>div]:bg-emerald-500': item.status === 'success', 
                  '[&>div]:bg-destructive': item.status === 'error',
                  '[&>div]:bg-primary': item.status === 'uploading'
                }" 
              />
              
              <p v-if="item.status === 'error'" class="text-[10px] text-destructive mt-0.5 font-medium">{{ item.errorMsg }}</p>
            </div>
            
            <div class="shrink-0 ml-1">
              <CheckCircle2 v-if="item.status === 'success'" class="w-4 h-4 text-emerald-500" />
              <AlertCircle v-else-if="item.status === 'error'" class="w-4 h-4 text-destructive" />
              <Button v-else type="button" variant="ghost" size="icon" class="h-6 w-6 rounded-full" :disabled="isUploadingGlobal" @click.stop="removeFromQueue(item.id)">
                <X class="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>

    <div class="flex items-center justify-end gap-2 border-t pt-4 mt-auto shrink-0">
      <Button variant="ghost" size="sm" :disabled="isUploadingGlobal" @click="emit('back')">Back to Gallery</Button>
      <Button size="sm" :disabled="!canUpload" @click="startUploadProcess" class="min-w-[120px] shadow-sm">
        <span v-if="isUploadingGlobal" class="flex items-center gap-1.5">
          <span class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-background border-t-transparent" /> Uploading...
        </span>
        <span v-else>Process Upload</span>
      </Button>
    </div>
  </div>
</template>