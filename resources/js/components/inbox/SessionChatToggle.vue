<script setup lang="ts">
import { useInboxStore } from '@/stores/inbox';
import { Icon } from '@iconify/vue'


const inbox = useInboxStore()

</script>

<template>
    <div class="flex items-center rounded-lg border bg-muted/30 p-1">

        <button
            type="button"
            class="relative flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition"
            :class="inbox.mode === 'chat'
                ? 'bg-yellow-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'"
            @click="inbox.changeMode('chat')"
        >
            <Icon
                icon="lucide:message-circle"
                class="size-3.5"
            />

            Chat

            <!-- <span
                v-if="inbox.sessionUnreadChats > 0"
                class="flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-semibold text-destructive-foreground"
            >
                {{ inbox.sessionUnreadChats > 99 ? '99+' : inbox.sessionUnreadChats }}
            </span> -->
        </button>

        <button
            type="button"
            class="relative flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition"
            :class="inbox.mode === 'session'
                ? 'bg-yellow-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'"
            @click="inbox.changeMode('session')"
        >
            <Icon
                icon="lucide:messages-square"
                class="size-3.5"
            />

            Session

            <span
                v-if="inbox.sessionUnreadChats > 0"
                class="flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-semibold text-destructive-foreground"
            >
                {{ inbox.sessionUnreadChats > 99 ? '99+' : inbox.sessionUnreadChats }}
            </span>
        </button>

    </div>
</template>