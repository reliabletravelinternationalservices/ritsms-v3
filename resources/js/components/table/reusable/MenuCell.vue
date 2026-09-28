<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Icon } from '@iconify/vue'
import { computed } from 'vue';


interface Props {
    deleted_date?: string | null;
}

const props = defineProps<Props>()

const emit = defineEmits<{
    view: []
    edit: []
    delete: []
    restore: []
    forceDelete: []
}>()


const isDeleted = computed(()=> !!props.deleted_date);

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child class="border focus:border p-1 rounded-sm">
            <button type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
                <Icon icon="lucide:ellipsis" class="h-5 w-5" />

                <span class="sr-only">Open actions</span>
            </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="w-50">
            <DropdownMenuItem v-if="!isDeleted" @click="emit('view')" >
                <Icon icon="lucide:eye" />
                View
            </DropdownMenuItem>

            <DropdownMenuItem v-if="!isDeleted" @click="emit('edit')" :disabled="isDeleted">
                <Icon icon="lucide:pencil" />
                Edit
            </DropdownMenuItem>

            <DropdownMenuItem v-if="!isDeleted" class="text-destructive focus:text-destructive" @click="emit('delete')">
                <Icon icon="lucide:trash-2" />
                Delete
            </DropdownMenuItem>

            <DropdownMenuItem v-if="isDeleted" class="text-zinc-600 focus:text-zinc-800" @click="emit('restore')">
                <Icon icon="lucide:refresh-ccw" />
                Restore
            </DropdownMenuItem>

            <DropdownMenuItem v-if="isDeleted" class="text-destructive focus:text-destructive" @click="emit('forceDelete')">
                <Icon icon="lucide:trash-2" />
                Delete Permanently
            </DropdownMenuItem>

        </DropdownMenuContent>
    </DropdownMenu>
</template>