<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

interface Props {
    deleted_at?: string | null
    code?: string
    link?: string
}

defineProps<Props>()
</script>

<template>
    <div>
        <!-- Deleted -->
        <template v-if="deleted_at">
            <span
                v-if="code"
                class="uppercase font-bold text-sm text-red-400 line-through"
            >
                {{ code }}
            </span>

            <span v-else class="text-zinc-400">
                N/A
            </span>

        </template>

        <!-- Active -->
        <template v-else>
            <Link
                v-if="code"
                :href="link"
                class="uppercase font-bold text-sm text-yellow-600 underline"
            >
                {{ code }}
            </Link>

            <span v-else class="text-zinc-600">
                N/A
            </span>
        </template>
    </div>
</template>