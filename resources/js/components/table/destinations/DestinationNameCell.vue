<script setup lang="ts">
import { Destination } from '@/types/destination';
import { Icon } from '@iconify/vue';

interface Props {
    destination: Destination;
}

const props = defineProps<Props>();

const title = props.destination.title || '';
const displayTitle = title.length > 70 ? `${title.slice(0, 70)}...` : title;
</script>

<template>
    <div class="flex items-start gap-3 min-w-0">
        <div class="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <img
                v-if="destination.image?.url"
                :src="destination.image.url"
                :alt="destination.image?.alt_text || destination.title"
                class="h-full w-full object-cover"
            />
            <div
                v-else
                class="flex h-full w-full items-center justify-center text-muted-foreground"
            >
                <Icon icon="mdi:image-off" width="24" height="24" />
            </div>
        </div>

        <div class="min-w-0">
            <p class="font-semibold text-sm leading-5 line-clamp-2 break-words">
                {{ displayTitle }}
            </p>
        </div>
    </div>
</template>
