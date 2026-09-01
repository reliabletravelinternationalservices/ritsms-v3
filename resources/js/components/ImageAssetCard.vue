<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Media } from '@/types/media-v2'
import { cn, getImagePath, isFile } from '@/lib/utils'
import { computed } from 'vue'

interface Props {
    class?: string
    file: File | Media
    index: number
    previewUrl?: string
    changed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    previewUrl: '',
})

const emit = defineEmits<{
    pin: [index: number]
    delete: [index: number]
}>()

function handleDelete(index: number) {
    emit('delete', index)
}

function formatFileSize(size: number) {
    if (size < 1024) {
        return `${size} B`
    }

    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`
    }

    return `${(size / 1024 / 1024).toFixed(2)} MB`
}

const isNewImage = computed(() => isFile(props.file))
</script>

<template>
    <div
        class="group relative flex h-80 w-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all duration-200 hover:shadow-md"
        :class="props.class"
    >
        <!-- Image -->
        <div class="relative h-2/3 w-full overflow-hidden bg-muted">
            <img
                :src="previewUrl"
                :alt="isFile(props.file) ? props.file.name : props.file.alt_text"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <!-- Image index -->
            <div
                v-if="!changed && !isNewImage"
                class="absolute left-2 top-2 flex size-8 items-center justify-center rounded-full bg-background/90 text-sm font-bold text-foreground shadow-md backdrop-blur-sm"
            >
                <button
                    type="button"
                    class="drag-handle flex size-8 cursor-grab items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm hover:bg-muted active:cursor-grabbing"
                >
                    <Icon
                        icon="lucide:grip"
                        class="size-4"
                    />
                </button>
            </div>

            <!-- Actions -->
            <div
                class="absolute right-2 top-2 flex items-center gap-1.5"
            >

                <!-- Delete -->
                <button
                    v-if="changed && isNewImage"
                    type="button"
                    class="flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground"
                    title="Delete image"
                    @click="handleDelete(index)"
                >
                    <Icon
                        icon="lucide:trash-2"
                        class="size-4"
                    />
                </button>
            </div>

        </div>

        <!-- Content -->
        <div class="flex flex-1 flex-col justify-between p-3">
            <div class="space-y-1">
                <p
                    class="truncate text-sm font-medium text-foreground"
                    :title="isFile(file)?  file.name : file.file_name"
                >
                    {{ isFile(file)? file.name: file.file_name }}
                </p>

                <p class="text-xs text-muted-foreground">
                    {{ formatFileSize(file.size) }}
                </p>
            </div>

            <!-- Bottom -->
            <div
                class="flex items-center justify-end border-t border-border pt-3"
            >
                <span
                    class="rounded-full flex items-center justify-center px-2 py-1 text-xs font-medium"
                    :class="cn({
                        'bg-zinc-500/10 text-muted-foreground': !isNewImage,
                        'bg-red-500/10 text-red-800': isNewImage,
                    })"
                >   
                    <Icon
                        :icon="isNewImage ? 'lucide:circle-dot' : 'lucide:check-circle'"
                        class="size-4 mr-1"
                        :class="cn({
                            'text-muted-foreground': !isNewImage,
                            'text-red-800': isNewImage,
                        })"
                    />
                    {{ isNewImage ? 'Unsaved' : 'Saved' }}
                </span>
            </div>
        </div>
    </div>
</template>