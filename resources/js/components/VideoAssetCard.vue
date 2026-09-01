<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import {
    Film,
    Trash2,
    Play,
    FileVideo,
} from 'lucide-vue-next'
import { Media } from '@/types/media-v2'
import { isFile } from '@/lib/utils';

interface Props {
    file: File | Media
}

const props = defineProps<Props>()

const emit = defineEmits<{
    delete: []
}>()

const videoUrl = ref('')

const fileSize = computed(() => {
    if (!props.file) return ''

    if (isFile(props.file)) {
        videoUrl.value = URL.createObjectURL(props.file)
    } else {
        videoUrl.value = props.file.file_path
    }

    const size =  props.file.size / (1024 * 1024)
    return `${size.toFixed(2)} MB`
})

onBeforeUnmount(() => {
    URL.revokeObjectURL(videoUrl.value)
})
</script>

<template>
    <div
        class="group overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md"
    >
        <!-- Video preview -->
        <div class="relative aspect-video overflow-hidden bg-muted">
            <video
                :src="videoUrl"
                class="h-full w-full object-cover"
                controls
                preload="metadata"
            />

            <div
                class="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white"
            >
                <FileVideo class="size-3.5" />
                VIDEO
            </div>
        </div>

        <!-- Details -->
        <div class="flex items-center justify-between gap-3 p-3">
            <div class="min-w-0">
                <p
                    class="truncate text-sm font-medium"
                    :title="isFile(props.file) ? props.file.name : props.file.file_name"
                >
                    {{ isFile(props.file) ? props.file.name : props.file.file_name }}
                </p>

                <p class="mt-0.5 text-xs text-muted-foreground">
                    {{ fileSize }}
                </p>
            </div>

            <button
                type="button"
                class="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                @click="emit('delete')"
            >
                <Trash2 class="size-4" />
            </button>
        </div>
    </div>
</template>