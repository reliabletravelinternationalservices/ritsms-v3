<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

interface Props {
    code?: string,
    name: string,
}

defineProps<Props>()
</script>

<template>
    <div
        class="flex items-center gap-2 w-fit h-fit"
    >
        <div>
            <!-- Active -->
            <Link
                href="#"
                class="uppercase font-bold text-sm text-yellow-600 underline"
            >
                {{ code }}
            </Link>

            <div
                class="font-medium text-sm self-center max-w-48 overflow-hidden line-clamp-1"
            >
                {{ name }}
            </div>
        </div>
    </div>
</template>
