<script setup lang="ts">

import { createObjectURL} from '@/lib/utils'
import { useTourFormStore } from '@/stores/tourForm'
import FileInput from '@/components/FileInput.vue'
import ImageAssetCard from '@/components/ImageAssetCard.vue'
import { VueDraggable } from 'vue-draggable-plus'

interface Props {
    isLoading?: boolean
}

defineProps<Props>()

const tourForm = useTourFormStore();


</script>

<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <div class="flex items-center w-full border-b-2 border-foreground py-2 text-md font-bold uppercase">
                <span>IMAGES</span>
            </div>

            <!-- Schedule -->
            <div class="space-y-4 p-4">
                <FileInput
                    v-model="tourForm.form.imageAndAssetItems.additional_images"
                    accept="image/jpeg,image/png,image/webp"
                    :maxSize="5"
                    :minSize="0.01"
                    :multiple="true"
                />
            </div>

            
            <VueDraggable
                v-model="tourForm.form.imageAndAssetItems.additional_images"
                class="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5"
                :animation="200"
                ghost-class="opacity-50"
                handle=".drag-handle"
            >
                <ImageAssetCard
                    v-for="(value, index) in tourForm.form.imageAndAssetItems.additional_images"
                    :key="`${value.name}-${value.lastModified}`"
                    class="w-full"
                    :file="value"
                    :index="index"
                    :preview-url="createObjectURL(value)"
                    :is-pinned="
                        index === tourForm.form.imageAndAssetItems.thumbnail
                    "
                    @pin="tourForm.setThumbnail"
                    @delete="tourForm.removeImage"
                />
            </VueDraggable>
        </div>
    </div>
</template>