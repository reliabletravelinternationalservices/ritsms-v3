<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Media } from '@/types/media-v2'
import { getImagePath, isFile } from '@/lib/utils'

interface Props {
    class?: string
    file: File | Media
    index: number
    previewUrl?: string
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
                :alt="isFile(file)? file.name: file.alt_text"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <!-- Image index -->
            <div
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
                <!-- Pin -->
                <!-- <button
                    type="button"
                    class="flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-green-500/10 hover:text-green-600"
                    :class="{
                        'bg-green-500 text-white hover:bg-green-500 hover:text-white':
                            isPinned,
                    }"
                    :title="isPinned ? 'Pinned image' : 'Pin image'"
                    @click="handlePin(index)"
                >
                    <Icon
                        icon="lucide:pin"
                        class="size-4 transition-transform"
                        :class="{
                            'rotate-45': isPinned,
                        }"
                    />
                </button> -->

                <!-- Delete -->
                <button
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

            <!-- Pinned badge -->
            <!-- <div
                v-if="isPinned"
                class="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm"
            >
                <Icon
                    icon="lucide:pin"
                    class="size-3"
                />

                Thumbnail
            </div> -->
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
                    class="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                >
                    Ready
                </span>
            </div>
        </div>
    </div>
</template>