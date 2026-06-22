<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

interface Props {
    createdAt: string;
    updatedAt: string;
}

defineProps<Props>();
</script>

<template>
    <div class="flex flex-col">
        <span class="text-xs text-muted-foreground">
            Create at: {{ createdAt }}
        </span>
        <span class="text-xs text-muted-foreground">
            Update at: {{ updatedAt }}
        </span>
    </div>
</template>