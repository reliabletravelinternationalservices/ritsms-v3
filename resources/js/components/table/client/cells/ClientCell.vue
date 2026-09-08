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
    description?: string,
}

defineProps<Props>()
</script>



<template>
    <HoverCard>
        <HoverCardTrigger class="w-fit h-fit cursor-default">
            <div class="w-fit h-fit">
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
