<script setup lang="ts">
import { getImagePath, truncateText } from '@/lib/utils';
import { Media } from '@/types/media-v2';
import { Icon } from '@iconify/vue';
import { Link } from '@inertiajs/vue3';

    interface Props {
        name: string,
        image?: Media | null,
    }

    defineProps<Props>()
</script>

<template>
    <div class="flex gap-2 bg-red-100 w-fit h-fit">
        <div class="w-15 h-10">
            <img 
                v-if="image"
                :src="getImagePath(image.file_path, 'thumbnail')" 
                :alt="image.alt_text"
                class="w-full h-full rounded-sm"
            >
            <div
                v-else
                class="flex item-center justify-center bg-zinc-200 w-full h-full rounded-sm">
                <Icon icon="lucide:image-off" class="size-5 text-zinc-600"/>
            </div>
        </div>
        <div class="font-bold text-base self-center">{{ truncateText(name) }}</div>
    </div>
</template>