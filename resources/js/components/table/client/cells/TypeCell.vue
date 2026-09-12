<script setup lang="ts">
import { ClientType } from '@/types/client'

interface Props {
    type: ClientType
    deleted_at?: string | null
}

defineProps<Props>()
</script>

<template>
    <div class="w-fit">
        <div
            class="flex items-center gap-1.5 uppercase text-xs font-bold"
            :class="deleted_at ? 'text-zinc-500 opacity-60' : 'text-muted-foreground'"
        >
            <span>{{ type }}</span>
        </div>
    </div>
</template>