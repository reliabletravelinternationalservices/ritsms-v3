<script setup lang="ts">
import { Icon } from '@iconify/vue'

export interface ChatCardData {
    id: number | string
    name: string
    initials: string
    message?: string
    time?: string
    unread?: number
    status?: 'online' | 'away' | 'offline'
    type?: 'chat' | 'session'
}

interface Props {
    chat: ChatCardData
    active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
})
</script>

<template>
    <button
        type="button"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition"
        :class="props.active
            ? 'bg-muted'
            : 'hover:bg-muted/60'"
    >
        <!-- AVATAR -->
        <div class="relative shrink-0">
            <div class="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {{ chat.initials }}
            </div>

            <span
                v-if="chat.status === 'online'"
                class="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-green-500"
            />

            <span
                v-else-if="chat.status === 'away'"
                class="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-yellow-500"
            />
        </div>

        <!-- INFO -->
        <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
                <p
                    class="truncate text-sm"
                    :class="chat.unread
                        ? 'font-semibold'
                        : 'font-medium'"
                >
                    {{ chat.name }}
                </p>

                <span
                    v-if="chat.time"
                    class="shrink-0 text-[10px] text-muted-foreground"
                >
                    {{ chat.time }}
                </span>
            </div>

            <div class="mt-1 flex items-center gap-2">
                <p
                    class="min-w-0 flex-1 truncate text-xs"
                    :class="chat.unread
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground'"
                >
                    {{ chat.message || 'No messages yet' }}
                </p>

                <span
                    v-if="chat.unread && chat.unread > 0"
                    class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
                >
                    {{ chat.unread > 99 ? '99+' : chat.unread }}
                </span>
            </div>
        </div>
    </button>
</template>