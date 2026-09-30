<script setup lang="ts">
import { Icon } from '@iconify/vue'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type ConversationAction = 'mute' | 'archive' | 'delete'

const emit = defineEmits<{
    action: [value: ConversationAction]
}>()
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <slot name="trigger">
                <button
                    type="button"
                    class="flex size-8 items-center justify-center rounded-md hover:bg-muted"
                >
                    <Icon
                        icon="lucide:more-vertical"
                        class="size-4"
                    />
                </button>
            </slot>
        </DropdownMenuTrigger>

        <DropdownMenuContent
            align="end"
            class="w-52"
        >
            <DropdownMenuItem
                class="gap-2"
                @click="emit('action', 'mute')"
            >
                <Icon icon="lucide:bell-off" class="size-4" />
                <span>Mute notifications</span>
            </DropdownMenuItem>

            <DropdownMenuItem
                class="gap-2"
                @click="emit('action', 'archive')"
            >
                <Icon icon="lucide:archive" class="size-4" />
                <span>Archive conversation</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
                class="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                @click="emit('action', 'delete')"
            >
                <Icon icon="lucide:trash-2" class="size-4" />
                <span>Delete conversation</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>