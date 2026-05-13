<!-- components/InfoTooltip.vue -->

<script setup lang="ts">
import { Icon } from '@iconify/vue';

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
    content: string;
}

defineProps<Props>();
</script>

<template>
    <Tooltip>
        <TooltipTrigger as-child>
            <button
                type="button"
                class="inline-flex items-center"
            >
                <Icon
                    icon="fluent:info-20-regular"
                    class="text-[var(--muted-custom)] text-sm"
                />
            </button>
        </TooltipTrigger>

        <TooltipContent class="max-w-sm">
            <div
                class="text-sm whitespace-pre-line text-muted-foreground"
            >
                {{ content }}
            </div>
        </TooltipContent>
    </Tooltip>
</template>