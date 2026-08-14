<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface DropdownItem {
    label: string
    value?: string
    disabled?: boolean
    separator?: boolean
}

withDefaults(
    defineProps<{
        items: DropdownItem[]
        label?: string
        align?: 'start' | 'center' | 'end'
    }>(),
    {
        align: 'end',
    }
)

const emit = defineEmits<{
    select: [item: DropdownItem]
}>()
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <slot name="trigger">
                <button type="button">
                    Open
                </button>
            </slot>
        </DropdownMenuTrigger>

        <DropdownMenuContent :align="align">
            <DropdownMenuLabel v-if="label">
                {{ label }}
            </DropdownMenuLabel>

            <DropdownMenuSeparator v-if="label" />

            <template v-for="(item, index) in items" :key="index">
                <DropdownMenuSeparator v-if="item.separator" />

                <DropdownMenuItem v-else :disabled="item.disabled" @click="emit('select', item)">
                    {{ item.label }}
                </DropdownMenuItem>
            </template>
        </DropdownMenuContent>
    </DropdownMenu>
</template>