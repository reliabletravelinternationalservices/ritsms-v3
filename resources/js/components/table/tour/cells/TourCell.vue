<script setup lang="ts">
import { getImagePath } from '@/lib/utils';
import { Media } from '@/types/media-v2';
import { Icon } from '@iconify/vue';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Link } from '@inertiajs/vue3';

interface Props {
    code: string,
    name: string,
    image?: Media | null,
    description?: string,
}

defineProps<Props>()
</script>



<template>
    <HoverCard>
        <HoverCardTrigger class="w-fit h-fit cursor-default">
            <div class="flex items-center gap-2 w-fit h-fit">
                <div class="w-14 h-10">
                    <img v-if="image" :src="getImagePath(image.file_path, 'thumbnail')" :alt="image.alt_text"
                        class="w-full h-full rounded-sm">
                    <div v-else class="flex item-center justify-center bg-zinc-200 w-full h-full rounded-sm">
                        <Icon icon="lucide:image-off" class="size-5 text-zinc-600" />
                    </div>
                </div>
                <div>
                    <Link href="#" class="uppercase font-bold text-sm text-yellow-600 underline">
                        {{ code }}
                    </Link>
                    <div class="font-bold text-base self-center max-w-48 overflow-hidden line-clamp-1">
                        {{ name }}
                    </div>
                </div>
            </div>
        </HoverCardTrigger>
        <HoverCardContent class="max-h-96 overflow-y-auto">
            <div class="flex flex-col gap-2 w-full">
                <div class="w-full h-28">
                    <img v-if="image" :src="getImagePath(image.file_path, 'thumbnail')" :alt="image.alt_text"
                        class="w-full h-full rounded-sm">
                    <div v-else class="flex item-center justify-center bg-zinc-200 w-full h-full rounded-sm">
                        <Icon icon="lucide:image-off" class="size-5 text-zinc-600" />
                    </div>
                </div>
                <div class="font-bold text-base">
                    {{ name }}
                </div>
                <div v-if="description" class="text-sm text-zinc-600">
                    <p class="text-base">
                        {{ description }}
                    </p>
                </div>
            </div>
        </HoverCardContent>
    </HoverCard>
</template>
