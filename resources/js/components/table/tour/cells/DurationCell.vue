```vue
<script setup lang="ts">
import { getPackageDurationLabel } from '@/lib/utils';

interface Props {
    duration: number
    deleted_at?: string | null
}

defineProps<Props>()
</script>

<template>
    <div
        class="flex flex-col items-start gap-0.5 w-fit"
        :class="{ 'opacity-60': deleted_at }"
    >
        <span
            :class="deleted_at ? 'text-zinc-500' : ''"
        >
            {{ getPackageDurationLabel(duration) }}
        </span>
    </div>
</template>
```
