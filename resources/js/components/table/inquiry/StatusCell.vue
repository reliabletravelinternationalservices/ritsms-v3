<!-- components/InquiryStatusCell.vue -->
<script setup lang="ts">
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Icon } from '@iconify/vue';
import type { Inquiry } from '@/types/inquiry';

const props = defineProps<{
    status: Inquiry['status'];
}>();

const emit = defineEmits<{
    (e: 'change', status: Inquiry['status']): void;
}>();

const statusConfig = {
    pending: { label: 'Pending', class: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50' },
    resolved: { label: 'Resolved', class: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50' },
    dismissed: { label: 'Dismissed', class: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700' }
};
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <button class="flex items-center gap-1 group hover:opacity-80 transition focus:outline-none">
                <Badge 
                    variant="outline" 
                    :class="['text-[11px] font-medium py-0.5 px-2 rounded-md select-none cursor-pointer', statusConfig[status]?.class]"
                >
                    {{ statusConfig[status]?.label || status }}
                    <Icon icon="iconoir:nav-arrow-down" class="text-xs text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition" />
                </Badge>
                
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" class="w-36">
            <DropdownMenuItem 
                class="text-xs gap-2 flex items-center cursor-pointer font-medium text-amber-600 dark:text-amber-400"
                @click="emit('change', 'pending')"
            >
                Mark Pending
            </DropdownMenuItem>
            <DropdownMenuItem 
                class="text-xs gap-2 flex items-center cursor-pointer font-medium text-emerald-600 dark:text-emerald-400"
                @click="emit('change', 'resolved')"
            >
                Mark Resolved
            </DropdownMenuItem>
            <DropdownMenuItem 
                class="text-xs gap-2 flex items-center cursor-pointer font-medium text-zinc-600 dark:text-zinc-400"
                @click="emit('change', 'dismissed')"
            >
                Mark Dismissed
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>