<script setup lang="ts">
import { formatCurrency } from '@/lib/utils';
import { Icon } from '@iconify/vue';

interface Props {
    destination: string;
    season: string;
}

defineProps<Props>();
</script>

<template>
    <div class="flex flex-col">
        <span class="font-semibold">
            {{ destination }}
        </span>

        <span class="text-xs font-light text-muted-foreground flex items-center capitalize">
            {{ season }}
        </span>
    </div>
</template>