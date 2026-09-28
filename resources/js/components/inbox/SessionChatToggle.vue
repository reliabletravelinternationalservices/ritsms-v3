<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
    modelValue: 'chat' | 'session'
    sessionUnread?: number
}

const props = withDefaults(defineProps<Props>(), {
    sessionUnread: 0,
})

const emit = defineEmits<{
    'update:modelValue': [value: 'chat' | 'session']
}>()

function setMode(mode: 'chat' | 'session') {
    emit('update:modelValue', mode)
}
</script>

<template>
    <div class="flex w-[58px] shrink-0 flex-col items-center border-l border-border py-4">

        <!-- Normal chats -->
        <button
            type="button"
            title="Chats"
            class="flex size-10 items-center justify-center rounded-lg transition"
            :class="props.modelValue === 'chat'
                ? 'bg-[rgb(var(--color-primary)/0.15)] text-[rgb(var(--color-primary))]'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
            @click="setMode('chat')"
        >
            <Icon
                icon="lucide:messages-square"
                class="text-xl"
            />
        </button>

        <!-- Session chats -->
        <button
            type="button"
            title="Session Chats"
            class="relative mt-2 flex size-10 items-center justify-center rounded-lg transition"
            :class="props.modelValue === 'session'
                ? 'bg-[rgb(var(--color-primary)/0.15)] text-[rgb(var(--color-primary))]'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'"
            @click="setMode('session')"
        >
            <Icon
                icon="lucide:message-circle-more"
                class="text-xl"
            />

            <span
                v-if="sessionUnread"
                class="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[rgb(var(--color-primary))] text-[9px] font-bold text-white"
            >
                {{ sessionUnread > 9 ? '9+' : sessionUnread }}
            </span>
        </button>

    </div>
</template>