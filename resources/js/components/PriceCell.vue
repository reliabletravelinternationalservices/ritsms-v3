<script setup lang="ts">
import { formatCurrency } from '@/lib/utils';

interface Props {
    price: number;
    downPayment: number;
}

defineProps<Props>();
</script>

<template>
    <div class="flex flex-col">
        <span class="font-semibold">
            {{ formatCurrency(price, 'PHP', 2) }}
        </span>

        <span class="text-xs font-light text-muted-foreground flex items-center">
            {{ formatCurrency(downPayment, 'PHP') }} <span>-DP</span>
        </span>
    </div>
</template>