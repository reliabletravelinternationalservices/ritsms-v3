<script setup lang="ts">
import { getPackageDurationLabel } from '@/lib/utils'
import { Link } from '@inertiajs/vue3'

interface Props {
    deleted_at?: string | null;
    code?: string | null;
    name: string;
    duration: number;
}

defineProps<Props>()
</script>

<template>
    <div class="flex items-center gap-2 w-fit h-fit">
        <div>
            <!-- Deleted -->
            <template v-if="deleted_at">
                <span
                    v-if="code"
                    class="uppercase font-bold text-sm text-red-400 line-through"
                >
                    {{ code }}
                </span>

                <div
                    v-else
                    class="uppercase font-bold text-sm text-zinc-400"
                >
                    N/A
                </div>

                <div
                    class="font-medium text-sm self-center max-w-48 overflow-hidden line-clamp-1 text-zinc-400"
                >
                    {{ name }}
                    <span class="text-zinc-500 text-xs">
                        | {{ getPackageDurationLabel(duration) }}
                    </span>
                </div>

                <span class="text-xs font-medium text-zinc-400">
                    Deleted
                </span>
            </template>

            <!-- Active -->
            <template v-else>
                <Link
                    v-if="code"
                    href="#"
                    class="uppercase font-bold text-sm text-yellow-600 underline"
                >
                    {{ code }}
                </Link>

                <div
                    v-else
                    class="uppercase font-bold text-sm text-yellow-600"
                >
                    N/A
                </div>

                <div
                    class="font-medium text-sm self-center max-w-48 overflow-hidden line-clamp-1"
                >
                    {{ name }}
                    <span class="text-zinc-500 text-xs">
                        | {{ getPackageDurationLabel(duration) }}
                    </span>
                </div>
            </template>
        </div>
    </div>
</template>