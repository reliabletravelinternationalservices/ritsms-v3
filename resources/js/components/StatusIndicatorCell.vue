<script setup lang="ts">
import { computed } from 'vue';
import { formatDate } from '@vueuse/core';

interface Props {
    endDate: string;
}

const props = defineProps<Props>();

const isEnded = computed(() => {
    return new Date(props.endDate) < new Date();
});
</script>

<template>
    <div class="flex flex-col">
        <span
            class="font-semibold"
            :class="isEnded ? 'text-red-500' : 'text-green-500'"
        >
            {{ isEnded ? 'Ended' : 'Selling' }}
        </span>

        <span class="text-xs font-light text-muted-foreground flex items-center">
            End at {{ formatDate(new Date(props.endDate), 'MMM DD, YYYY') }}
        </span>
    </div>
</template>