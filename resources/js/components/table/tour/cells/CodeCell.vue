<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

    interface Props {
        tourID: number,
        code:  string,
    }

    defineProps<Props>()
</script>

<template>
    <div>
        <Link href="#" class="uppercase font-bold text-sm text-yellow-600 underline">
            {{ code }}
        </Link>
    </div>
</template>