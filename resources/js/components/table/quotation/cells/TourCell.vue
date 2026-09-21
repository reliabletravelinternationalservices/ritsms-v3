<script setup lang="ts">
import { getPackageDurationLabel } from '@/lib/utils';
import { Link } from '@inertiajs/vue3';

interface Props {
    code?: string | null,
    name: string,
    duration: number,
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
                v-if="code"
                href="#"
                class="uppercase font-bold text-sm text-yellow-600 underline"
            >
                {{ code }}
            </Link>
            <div v-else class="uppercase font-bold text-sm text-yellow-600">
                {{ code }}
            </div>
            <div
                class="font-medium text-sm self-center max-w-48 overflow-hidden line-clamp-1"
            >
                {{ name }} <span class="text-zinc-500 text-xs">| {{ getPackageDurationLabel(duration) }}</span>
            </div>
        </div>
    </div>
</template>
