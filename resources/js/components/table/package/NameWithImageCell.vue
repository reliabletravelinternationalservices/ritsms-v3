<script setup lang="ts">
import { Media } from '@/types/media';
import { Icon } from '@iconify/vue';

interface Props {
    image?: Media;
    name: string;
}

defineProps<Props>();
</script>

<template>
    <div class="flex items-center gap-2">
        <span class="flex items-center justify-center">
            <img v-if="image && image.url" class="w-32 h-10 object-cover rounded-xs" :src="image.url" :alt="image.alt_text">
            <div v-else class="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-sm">
                <Icon icon="mdi:image-off" width="24" height="24" class="text-gray-400" />
            </div>
        </span>
        
        <span class="font-semibold line-clamp-2">
            {{ name }}
        </span>
    </div>
</template>