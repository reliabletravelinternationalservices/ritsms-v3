<script setup lang="ts">
import { formatCurrency } from '@/lib/utils';

    interface Props{
       total: number;
    }
    defineProps<Props>()
</script>

<template>
    <div>
        <span>{{ formatCurrency(total, 'PHP', 2) }}</span>
        <!-- <span v-else class="text-zinc-600">N/A</span> -->
    </div>
</template>