<script setup lang="ts">
import { computed } from 'vue'
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
const hasNewImages = computed(() => tourForm.form.assets.images.some(image => isFile(image)))
const hasNewVideo = computed(() => !!tourForm.form.assets.video && isFile(tourForm.form.assets.video))
const disableAssetSorting = computed(() => hasNewImages.value || hasNewVideo.value)
const hasImageChanges = computed(() => hasNewImages.value || tourForm.form.assets.removedMediaIds.length > 0)
</script>

<template>
    <div class="space-y-8">
        <!-- IMAGES -->
        <section class="space-y-4">
            <div
                class="flex w-full items-center border-b-2 border-foreground py-2 text-md font-bold uppercase"
            >
                <span>IMAGES <span v-if="hasImageChanges" class="text-muted-foreground text-xs italic">(Unsave changes)</span></span>
            </div>

            <div class="space-y-4 p-4">
                <FileInput
                    accept="image/jpeg,image/png,image/webp"
                    :maxSize="5"
                    :minSize="0.01"
                    :recommendedWidth="1600"
                    :recommendedHeight="900"
                    :multiple="true"
                    @change="tourForm.addImages"
                />

                <VueDraggable
                    v-if="tourForm.form.assets.images.length"
                    v-model="tourForm.form.assets.images"
                    class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                    :animation="200"
                    :disabled="disableAssetSorting"
                    ghost-class="opacity-50"
                    handle=".drag-handle"
                >
                    <ImageAssetCard
                        v-for="(image, index) in tourForm.form.assets.images"
                        :key="`${index}`"
                        class="w-full"
                        :file="image"
                        :index="index"
                        :has-new-images="hasNewImages"
                        :preview-url="isFile(image) ? createObjectURL(image) : getImagePath(image.file_path)"
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
                    accept="video/mp4,video/webm"
                    :maxSize="50"
                    :minSize="0.01"
                    :multiple="false"
                    @change="tourForm.addVideo"
                />

                <!-- Video Card -->
                <div
                    v-if="tourForm.form.assets.video"
                    class="max-w-2xl"
                >
                    <VideoAssetCard
                        :file="tourForm.form.assets.video"
                        :has-new-video="hasNewVideo"
                        @delete="tourForm.removeVideo"
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