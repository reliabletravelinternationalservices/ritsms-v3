<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import PresenceStatus from './PresenceStatus.vue'
import ConversationMenu from './ConversationMenu.vue'

interface Props {
    name: string
    initials: string
    status?: 'online' | 'away' | 'offline'
}

withDefaults(defineProps<Props>(), {
    status: 'offline',
})

const emit = defineEmits<{
    mute: []
    archive: []
    delete: []
}>()

const showMenu = ref(false)
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

            <button
                type="button"
                class="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                @click="showMenu = !showMenu"
            >
                <Icon
                    icon="lucide:more-vertical"
                    class="text-xl"
                />
            </button>

            <ConversationMenu
                v-if="showMenu"
                @mute="emit('mute'); showMenu = false"
                @archive="emit('archive'); showMenu = false"
                @delete="emit('delete'); showMenu = false"
            />

        </div>
    </div>
</template>