<script setup lang="ts">
import ConversationMenu from './ConversationMenu.vue'

interface Props {
    chatName: string
    avatar?: string
}

const props = defineProps<Props>();


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

            <div class="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                {{ props.avatar ?? 'CC' }}
            </div>

            <div>
                <h3 class="text-sm font-semibold">
                    {{ props.chatName }}
                </h3>
            </div>

        </div>

        <div class="relative">
            <ConversationMenu @action="handleConversationAction" />
        </div>
    </div>
</template>