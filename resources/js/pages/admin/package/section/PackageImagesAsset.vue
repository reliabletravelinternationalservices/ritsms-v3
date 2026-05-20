<script setup lang="ts">
import { ref } from 'vue';
import { 
    Image
} from 'lucide-vue-next'; // Optional: replace with your icon library of choice
import PenBoldIcon from '@iconify-vue/solar/pen-bold';
import { Button } from '@/components/ui/button';
import ImageUploadModal from '@/components/ImageUploadModal.vue';
import { Media } from '@/types/media';

const props = defineProps<{
    primaryImage?: Media,
    images?: Media[]
}>();

// Control variable for modal visibility flag state
const isModalOpen = ref(false)
const savedImages = ref<any[]>([])
const handleImagesSaved = (images: any[]) => {
  savedImages.value = images
}

</script>

<template>
    <!-- Primary Image Block -->
    <section class="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-100/10 border dark:bg-zinc-800/10 dark:border-zinc-800">
        <span class="rounded-full shadow-sm bg-muted absolute top-2 right-2  text-zinc-900 dark:text-zinc-50 hover:cursor-pointer hover:shadow-md">
            <Button type="button" variant="link" size="sm" @click="isModalOpen = true">
                <PenBoldIcon class="w-4 h-4" />
            </Button>
        </span>
        <img 
            v-if="props.primaryImage?.url" 
            :src="props.primaryImage.url" 
            :alt="props.primaryImage.alt_text"
            class="w-full h-full object-cover"
        />
        
        <div v-else class="w-full h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
            <Image class="w-12 h-12 stroke-[1.5]" />
            <p class="text-sm">No image uploaded</p>
        </div>
    </section>

    <!-- Global component call - No import needed in <script setup> -->
    <ImageUploadModal 
    v-model:open="isModalOpen"
    :max-images="12"
    @save="handleImagesSaved"
    />
</template>