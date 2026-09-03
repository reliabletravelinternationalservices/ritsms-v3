<script setup lang="ts">
import { Route } from '@/types/tour';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

interface Props {
    routes: Route[],
    itinerary_type?: string,
}

const props = defineProps<Props>()

const icon = computed(() => {
    if (props.itinerary_type === 'round_trip') {
        return 'lucide:arrow-right-left'
    } else {
        return 'lucide:arrow-right'
    }
});
</script>

<template>
    <div class="w-fit">
        <div class="flex items-center gap-2">
            <div>PHILIPPINES</div>
            <Icon :icon="icon" class="size-4 text-zinc-600" />
            <div>JAPAN</div>
            <div v-if="props.routes.length > 2" class="text-zinc-600">+{{ props.routes.length - 2 }} more</div>
        </div>
    </div>
</template>