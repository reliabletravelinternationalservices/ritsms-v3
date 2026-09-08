<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Icon } from '@iconify/vue'

const emit = defineEmits<{
    view: []
    edit: []
    delete: []
}>()
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child class="border focus:border p-1 rounded-sm">
            <button type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
                <Icon icon="lucide:ellipsis" class="h-5 w-5" />

                <span class="sr-only">Open actions</span>
            </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="w-40">
            <DropdownMenuItem @click="emit('view')">
                <Icon icon="lucide:eye" />
                View
            </DropdownMenuItem>

            <DropdownMenuItem @click="emit('edit')">
                <Icon icon="lucide:pencil" />
                Edit
            </DropdownMenuItem>

            <DropdownMenuItem class="text-destructive focus:text-destructive" @click="emit('delete')">
                <Icon icon="lucide:trash-2" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>