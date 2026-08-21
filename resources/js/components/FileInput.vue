<script setup lang="ts">
import { computed, ref } from 'vue'
import { Upload } from 'lucide-vue-next'

interface Props {
  modelValue?: File[]
  accept?: string
  maxSize?: number
  minSize?: number
  recommendedWidth?: number
  recommendedHeight?: number
  multiple?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  accept: 'image/jpeg,image/png,image/webp',
  maxSize: 5,
  minSize: 0.01,
  recommendedWidth: 0,
  recommendedHeight: 0,
  multiple: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [files: File[]]
  change: [files: File[]]
  error: [message: string]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const error = ref('')

const acceptedExtensions = computed(() => {
  return props.accept
    .split(',')
    .map(type => {
      const value = type.trim().toLowerCase()

      if (value === 'image/jpeg') return 'JPG'
      if (value === 'image/png') return 'PNG'
      if (value === 'image/webp') return 'WebP'

      return type.trim()
    })
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index,
    )
    .join(', ')
})

function openFileBrowser() {
  if (props.disabled) {
    return
  }

  fileInput.value?.click()
}

function handleFileInput(event: Event) {
  const target = event.target as HTMLInputElement

  const files = target.files
    ? Array.from(target.files)
    : []

  if (files.length) {
    processFiles(files)
  }

  // Allows selecting the same file again
  target.value = ''
}

function handleDrop(event: DragEvent) {
  event.preventDefault()

  isDragging.value = false

  if (props.disabled) {
    return
  }

  const files = event.dataTransfer?.files
    ? Array.from(event.dataTransfer.files)
    : []

  if (files.length) {
    processFiles(files)
  }
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()

  if (!props.disabled) {
    isDragging.value = true
  }
}

function handleDragLeave() {
  isDragging.value = false
}

async function processFiles(files: File[]) {
  error.value = ''

  // If multiple=false, only use first file
  const filesToProcess = props.multiple
    ? files
    : files.slice(0, 1)

  const validFiles: File[] = []

  for (const file of filesToProcess) {
    const isValid = await validateFile(file)

    if (isValid) {
      validFiles.push(file)
    }
  }

  if (!validFiles.length) {
    return
  }

  /*
   * Multiple:
   * Append new files to existing files.
   *
   * Single:
   * Replace existing file.
   */
  const newFiles = props.multiple
    ? [...props.modelValue, ...validFiles]
    : validFiles

  emit('update:modelValue', newFiles)
  emit('change', validFiles)
}

async function validateFile(file: File): Promise<boolean> {
  const fileSizeMB = file.size / (1024 * 1024)

  const acceptedTypes = props.accept
    .split(',')
    .map(type => type.trim().toLowerCase())

  /*
   * File type
   */
  if (!acceptedTypes.includes(file.type.toLowerCase())) {
    setError(
      `${file.name}: Invalid file type. Please upload ${acceptedExtensions.value} only.`,
    )

    return false
  }

  /*
   * Minimum file size
   */
  if (fileSizeMB < props.minSize) {
    setError(
      `${file.name}: File is too small. Minimum file size is ${props.minSize}MB.`,
    )

    return false
  }

  /*
   * Maximum file size
   */
  if (fileSizeMB > props.maxSize) {
    setError(
      `${file.name}: File is too large. Maximum file size is ${props.maxSize}MB.`,
    )

    return false
  }

  /*
   * Image resolution
   */
  if (file.type.startsWith('image/')) {
    return await validateImageDimensions(file)
  }

  return true
}

function validateImageDimensions(file: File): Promise<boolean> {
  return new Promise(resolve => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)

      if (
        image.width < props.recommendedWidth ||
        image.height < props.recommendedHeight
      ) {
        setError(
          `${file.name}: Image resolution is too low. Recommended size is ${props.recommendedWidth}×${props.recommendedHeight}px.`,
        )

        resolve(false)
        return
      }

      resolve(true)
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)

      setError(
        `${file.name}: Unable to read the image.`,
      )

      resolve(false)
    }

    image.src = objectUrl
  })
}

function setError(message: string) {
  error.value = message
  emit('error', message)
}
</script>

<template>
  <div class="w-full">
    <!-- Upload area -->
    <div
      class="relative flex min-h-[138px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-amber-500 bg-[#faf9f6] px-6 py-5 text-center transition-colors"
      :class="[
        isDragging
          ? 'border-primary bg-primary/5'
          : 'hover:bg-muted/30',

        disabled
          ? 'cursor-not-allowed opacity-50'
          : '',
      ]"
      @click="openFileBrowser"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <!-- Upload icon -->
      <div class="mb-3">
        <Upload
          :size="38"
          :stroke-width="2"
          class="text-foreground"
        />
      </div>

      <!-- Main text -->
      <p class="text-sm font-semibold text-foreground">
        Drag and drop
        {{ multiple ? 'files' : 'a file' }}
        here or

        <button
          type="button"
          class="font-semibold underline-offset-2 hover:underline"
          :disabled="disabled"
          @click.stop="openFileBrowser"
        >
          browse
        </button>

        to begin the upload
      </p>

      <!-- Information -->
      <p class="mt-1.5 text-xs text-muted-foreground">
        Format: {{ acceptedExtensions }}
        |
        Recommended size:
        {{ recommendedWidth }}x{{ recommendedHeight }}
        |
        Max file size:
        {{ maxSize }}MB
        |
        Min:
        {{ minSize }}MB
      </p>

      <!-- File input -->
      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        :multiple="multiple"
        class="hidden"
        :disabled="disabled"
        @change="handleFileInput"
      />
    </div>

    <!-- Error -->
    <p
      v-if="error"
      class="mt-2 text-sm text-destructive"
    >
      {{ error }}
    </p>
  </div>
</template>