<script setup lang="ts">
import { computed, ref } from 'vue'
import { Upload } from 'lucide-vue-next'

interface Props {
  modelValue?: File[] | File | null
  accept?: string
  maxSize?: number
  minSize?: number
  recommendedWidth?: number
  recommendedHeight?: number
  multiple?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  accept: 'image/jpeg,image/png,image/webp',
  maxSize: 5,
  minSize: 0.01,
  recommendedWidth: 0,
  recommendedHeight: 0,
  multiple: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: File[] | File | null]
  change: [files: File[]]
  error: [message: string]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const message = ref('')

const acceptedTypes = computed(() => {
  return props.accept
    .split(',')
    .map(type => type.trim().toLowerCase())
    .filter(Boolean)
})

const acceptedExtensions = computed(() => {
  return acceptedTypes.value
    .map(formatAcceptType)
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index,
    )
    .join(', ')
})

const hasRecommendedResolution = computed(() => {
  return (
    props.recommendedWidth > 0 &&
    props.recommendedHeight > 0
  )
})

function formatAcceptType(type: string): string {
  const formats: Record<string, string> = {
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/webp': 'WebP',
    'image/gif': 'GIF',
    'image/svg+xml': 'SVG',
    'video/mp4': 'MP4',
    'video/webm': 'WebM',
    'video/quicktime': 'MOV',
    'audio/mpeg': 'MP3',
    'audio/wav': 'WAV',
    'audio/ogg': 'OGG',
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'DOCX',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'XLSX',
    'text/plain': 'TXT',
  }

  if (formats[type]) {
    return formats[type]
  }

  if (type === 'image/*') return 'Images'
  if (type === 'video/*') return 'Videos'
  if (type === 'audio/*') return 'Audio'
  if (type === 'application/*') return 'Documents'

  return type
}

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
  message.value = ''

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

  if (props.multiple) {
    const existingFiles = Array.isArray(props.modelValue)
      ? props.modelValue
      : []

    const newFiles = [
      ...existingFiles,
      ...validFiles,
    ]

    emit('update:modelValue', newFiles)
  } else {
    emit('update:modelValue', validFiles[0] ?? null)
  }

  emit('change', validFiles)
}

async function validateFile(file: File): Promise<boolean> {
  const fileSizeMB = file.size / (1024 * 1024)

  /*
   * File type
   */
  if (!isAcceptedType(file.type)) {
    setError(
      `Invalid file type. Please upload ${acceptedExtensions.value} only.`,
    )

    return false
  }

  /*
   * Minimum file size
   */
  if (fileSizeMB < props.minSize) {
    setError(
      `File is too small. Minimum file size is ${props.minSize}MB.`,
    )

    return false
  }

  /*
   * Maximum file size
   */
  if (fileSizeMB > props.maxSize) {
    setError(
      `File is too large. Maximum file size is ${props.maxSize}MB.`,
    )

    return false
  }

  /*
   * Image resolution
   *
   * This is only a warning.
   * The image will still be accepted.
   */
  if (
    file.type.startsWith('image/') &&
    hasRecommendedResolution.value
  ) {
    await checkImageDimensions(file)
  }

  return true
}

function isAcceptedType(fileType: string): boolean {
  const normalizedFileType = fileType.toLowerCase()

  return acceptedTypes.value.some(type => {
    if (type.endsWith('/*')) {
      const category = type.split('/')[0]

      return normalizedFileType.startsWith(`${category}/`)
    }

    return type === normalizedFileType
  })
}

function checkImageDimensions(file: File): Promise<void> {
  return new Promise(resolve => {
    const image = new Image()
    const objectUrl = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(objectUrl)

      const isTooSmall =
        image.width < props.recommendedWidth ||
        image.height < props.recommendedHeight

      if (isTooSmall) {
        setWarning(
          `Image resolution is below the recommended ${props.recommendedWidth}×${props.recommendedHeight}px. It will still be uploaded.`,
        )
      }

      resolve()
    }

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)

      setError('Unable to read the image.')

      resolve()
    }

    image.src = objectUrl
  })
}

function setError(newMessage: string) {
  message.value = newMessage
  emit('error', newMessage)
}

function setWarning(text: string) {
  message.value = text
}
</script>

<template>
  <div class="w-full">
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
      <div class="mb-3">
        <Upload
          :size="38"
          :stroke-width="2"
          class="text-foreground"
        />
      </div>

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

      <p class="mt-1.5 text-xs text-muted-foreground">
        Format: {{ acceptedExtensions }}
        |
        <template v-if="hasRecommendedResolution">
          Recommended:
          {{ recommendedWidth }}×{{ recommendedHeight }}px
          |
        </template>
        Max:
        {{ maxSize }}MB
        |
        Min:
        {{ minSize }}MB
      </p>

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

    <p
      v-if="message"
      class="mt-2 text-sm italic text-yellow-600 dark:text-yellow-500"
    >
      {{ message }}
    </p>
  </div>
</template>