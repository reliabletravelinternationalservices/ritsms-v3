<script setup lang="ts">
import { formatDateString } from '@/lib/utils';
import { Link } from '@inertiajs/vue3';

    interface Props{
       date?: string;
    }
    defineProps<Props>()
</script>

<template>
    <div>
        <span v-if="date">{{ formatDateString(date)}}</span>
        <span v-else class="text-zinc-600">N/A</span>
    </div>
</template>