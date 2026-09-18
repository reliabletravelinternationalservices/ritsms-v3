<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

    interface Props{
        code?: string;
        link?: string;
    }
    defineProps<Props>()
</script>

<template>
    <div>
        <Link
            v-if="code"
            :href="link"
            class="uppercase font-bold text-sm text-yellow-600 underline"
        >
            {{ code }}
        </Link>
        <span v-else class="text-zinc-600">N/A</span>
    </div>
</template>