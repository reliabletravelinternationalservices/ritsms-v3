<script setup lang="ts">
import { ref, computed } from 'vue'
import Title from '@/components/inbox/Title.vue'
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'
import ChatCard, {
    type ChatCardData,
} from './ChatCard.vue'

interface Props {
    chats: ChatCardData[]
    activeId?: number | string | null
    title?: string
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Inbox',
})

const emit = defineEmits<{
    select: [chat: ChatCardData]
    create: []
}>()

const search = ref('')

const filteredChats = computed(() => {
    const query = search.value.trim().toLowerCase()

    if (!query) {
        return props.chats
    }

    return props.chats.filter(chat =>
        chat.name.toLowerCase().includes(query) ||
        chat.message.toLowerCase().includes(query),
    )
})
</script>

<template>
    <div class="flex w-[360px] shrink-0 flex-col border-r border-border text-foreground">

        <Title :title="title" />

        <!-- Search -->
        <div class="border-b border-border p-4">
            <div class="flex items-center gap-2">

                <button
                    type="button"
                    class="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))] transition hover:bg-[rgb(var(--color-primary)/0.1)]"
                    @click="emit('create')"
                >
                    <Icon
                        icon="lucide:plus"
                        class="text-xl"
                    />
                </button>

                <div class="relative w-full">
                    <Icon
                        icon="lucide:search"
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        v-model="search"
                        placeholder="Search conversations..."
                        class="h-10 border-border pl-9"
                    />
                </div>

            </div>
        </div>

        <!-- List -->
        <div class="flex-1 overflow-y-auto">

            <div class="px-4 pb-2 pt-4">
                <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Conversations
                </p>
            </div>

            <ChatCard
                v-for="chat in filteredChats"
                :key="chat.id"
                :chat="chat"
                :active="chat.id === activeId"
                :read="!chat.unread"
                @select="emit('select', $event)"
            />

            <!-- Empty -->
            <div
                v-if="!filteredChats.length"
                class="px-5 py-12 text-center"
            >
                <Icon
                    icon="lucide:message-circle-off"
                    class="mx-auto text-3xl text-muted-foreground"
                />

                <p class="mt-3 text-sm font-medium">
                    No conversations
                </p>

                <p class="mt-1 text-xs text-muted-foreground">
                    Try another search.
                </p>
            </div>

        </div>
    </div>
</template>