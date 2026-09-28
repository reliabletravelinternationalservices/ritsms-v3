<script setup lang="ts">
import PresenceStatus from './PresenceStatus.vue'

export interface ChatCardData {
    id: number | string
    name: string
    initials: string
    message: string
    time: string
    unread?: number
    status?: 'online' | 'away' | 'offline'
    type?: 'chat' | 'session'
    lastSender?: 'me' | 'them'
}

interface Props {
    chat: ChatCardData
    active?: boolean
    read?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
    read: true,
})

const emit = defineEmits<{
    select: [chat: ChatCardData]
}>()
</script>

<template>
    <button
        type="button"
        class="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left text-foreground transition"
        :class="[
            active
                ? 'border-l-2 border-l-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.08)]'
                : 'hover:bg-muted/50',
        ]"
        @click="emit('select', chat)"
    >
        <div class="relative shrink-0">
            <div
                class="flex size-11 items-center justify-center rounded-full bg-muted text-sm font-semibold"
            >
                {{ chat.initials }}
            </div>

            <span
                v-if="chat.status === 'online'"
                class="absolute bottom-0 right-0 size-3 rounded-full border-2 border-background bg-green-500"
            />
        </div>

        <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-2">
                <p
                    class="truncate text-sm"
                    :class="read ? 'font-medium' : 'font-bold'"
                >
                    {{ chat.name }}
                </p>

                <span
                    class="shrink-0 text-[11px]"
                    :class="
                        read
                            ? 'text-muted-foreground'
                            : 'font-semibold text-[rgb(var(--color-primary))]'
                    "
                >
                    {{ chat.time }}
                </span>
            </div>

            <div class="mt-1 flex items-center justify-between gap-2">
                <p
                    class="truncate text-xs"
                    :class="
                        read
                            ? 'text-muted-foreground'
                            : 'font-medium text-foreground'
                    "
                >
                    <span
                        v-if="chat.lastSender === 'me'"
                        class="font-medium text-foreground"
                    >
                        You:
                    </span>

                    {{ chat.message }}
                </p>

                <span
                    v-if="!read && chat.unread"
                    class="flex size-5 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--color-primary))] text-[10px] font-bold text-white"
                >
                    {{ chat.unread > 9 ? '9+' : chat.unread }}
                </span>
            </div>

            <PresenceStatus
                v-if="chat.status"
                :status="chat.status"
                :label="false"
                class="mt-1"
            />
        </div>
    </button>
</template>