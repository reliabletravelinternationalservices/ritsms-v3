<script setup lang="ts">
import { Route } from '@/types/tour';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

interface Props {
    routes: Route[]
    itinerary_type?: string
    deleted_at?: string | null
}

const props = defineProps<Props>()

const icon = computed(() => {
    if (props.itinerary_type === 'round_trip') {
        return 'lucide:arrow-right-left'
    }

    return 'lucide:arrow-right'
})
</script>

<template>
    <div
        class="flex flex-col items-start gap-0.5 w-fit"
        :class="{ 'opacity-60': deleted_at }"
    >
        <div
            v-if="routes.length > 0"
            class="flex items-center gap-2"
        >
            <div>{{ routes[0].departure_country.name }}</div>

            <Icon
                :icon="icon"
                class="size-4 text-zinc-600"
            />

            <div>{{ routes[0].destination_country.name }}</div>

            <div
                v-if="routes.length > 1"
                class="text-xs italic text-gray-500"
            >
                +{{ routes.length - 1 }} more
            </div>
        </div>

        <div v-else>
            <span>N/A</span>
        </div>
    </div>
</template>