<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import PresenceStatus from './PresenceStatus.vue'
import ConversationMenu from './ConversationMenu.vue'

interface Props {
    name: string
    initials: string
    status?: 'open' | 'closed'
}

withDefaults(defineProps<Props>(), {
    status: 'closed',
})


const handleConversationAction = (
    action: 'mute' | 'archive' | 'delete'
) => {
    switch (action) {
        case 'mute':
            // handleMute()
            break

        case 'archive':
            // handleArchive()
            break

        case 'delete':
            // handleDelete()
            break
    }
}
</script>

<template>
    <div class="flex h-[73px] shrink-0 items-center justify-between border-b border-border px-5 text-foreground">

        <div class="flex items-center gap-3">

            <div
                class="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold"
            >
                {{ initials }}
            </div>

            <div>
                <h3 class="text-sm font-semibold">
                    {{ name }}
                </h3>

                <PresenceStatus
                    :status="status"
                />
            </div>

        </div>

        <div class="relative">
            <ConversationMenu @action="handleConversationAction" />
        </div>
    </div>
</template>