<script setup lang="ts">
import { createObjectURL, getImagePath, isFile } from '@/lib/utils'
import { useTourFormStore } from '@/stores/tourForm'

import FileInput from '@/components/FileInput.vue'
import ImageAssetCard from '@/components/ImageAssetCard.vue'
import VideoAssetCard from '@/components/VideoAssetCard.vue'

import { VueDraggable } from 'vue-draggable-plus'

interface Props {
    isLoading?: boolean
}

defineProps<Props>()

const tourForm = useTourFormStore()

function removeVideo() {
    tourForm.form.assets.video = undefined
}
</script>

<template>
    <div class="space-y-8">
        <!-- IMAGES -->
        <section class="space-y-4">
            <div
                class="flex w-full items-center border-b-2 border-foreground py-2 text-md font-bold uppercase"
            >
                <span>IMAGES</span>
            </div>

            <div class="space-y-4 p-4">
                <FileInput
                    accept="image/jpeg,image/png,image/webp"
                    :maxSize="5"
                    :minSize="0.01"
                    :recommendedWidth="1600"
                    :recommendedHeight="900"
                    :multiple="true"
                    :change="tourForm.addImages"
                />

                <VueDraggable
                    v-if="tourForm.form.assets.images.length"
                    v-model="tourForm.form.assets.images"
                    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                    :animation="200"
                    ghost-class="opacity-50"
                    handle=".drag-handle"
                >
                    <ImageAssetCard
                        v-for="(value, index) in tourForm.form.assets.images"
                        :key="`${value.key}`"
                        class="w-full"
                        :file="value.file"
                        :index="index"
                        :preview-url="isFile(value.file)? createObjectURL(value.file)  : getImagePath(value.file.file_path, 'thumbnail')"
                        @delete="tourForm.removeImage"
                    />
                </VueDraggable>

                <div
                    v-else
                    class="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground"
                >
                    No images added yet.
                </div>
            </div>
        </section>

        <!-- VIDEO -->
        <section class="space-y-4">
            <div
                class="flex w-full items-center gap-2 border-b-2 border-foreground py-2 text-md font-bold uppercase"
            >
                <span>VIDEO</span>

                <span class="text-xs font-medium normal-case text-muted-foreground">
                    (MAX 1 VIDEO)
                </span>
            </div>

            <div class="space-y-4 p-4">
                <!-- Upload -->
                <FileInput
                    v-model="tourForm.form.assets.video"
                    accept="video/mp4,video/webm"
                    :maxSize="50"
                    :minSize="0.01"
                    :multiple="false"
                />

                <!-- Video Card -->
                <div
                    v-if="tourForm.form.assets.video"
                    class="max-w-2xl"
                >
                    <VideoAssetCard
                        :file="tourForm.form.assets.video"
                        @delete="removeVideo"
                    />
                </div>

                <div
                    v-else
                    class="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground"
                >
                    No video added yet.
                </div>
            </div>
        </section>
    </div>
</template>