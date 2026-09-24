<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

interface Props {
    deleted_at?: string | null
    code?: string
    name: string
}

defineProps<Props>()
</script>

<template>
    <div class="flex items-center gap-2 w-fit h-fit">
        <div>
            <!-- Deleted -->
            <template v-if="deleted_at">
                <span class="uppercase font-bold text-sm text-red-400 line-through">
                    {{ code }}
                </span>

                <div
                    class="font-medium text-sm self-center max-w-48 overflow-hidden line-clamp-1 text-zinc-400"
                >
                    {{ name }}
                </div>
            </template>

            <!-- Active -->
            <template v-else>
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
            </template>
        </div>
    </div>
</template>