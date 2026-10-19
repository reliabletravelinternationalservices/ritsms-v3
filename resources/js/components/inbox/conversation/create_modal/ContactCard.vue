<script setup lang="ts">
import { Contact } from '@/types/contact';
import { Icon } from '@iconify/vue';

interface Props {
    selected: boolean
    contact: Contact
}

withDefaults(defineProps<Props>(), {
    selected: () => false
})

const emit = defineEmits<{
    toggle: [contact: Contact]
}>()

</script>

<template>
    <button type="button" class="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-muted"
        @click="emit('toggle', contact)">
        <!-- Avatar -->
        <div class="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            {{
                contact.initials ||
                contact.name?.charAt(0).toUpperCase()
            }}
        </div>

        <!-- Details -->
        <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">
                {{ contact.name }}

                <span class="text-xs font-normal capitalize text-zinc-400">
                    ({{ contact.contact_type }})
                </span>
            </p>

            <p class="truncate text-xs text-muted-foreground">
                {{ contact.email || 'No email' }}
            </p>
        </div>

        <!-- Selected -->
        <Icon v-if="selected" icon="lucide:check" class="size-4 shrink-0 text-[rgb(var(--color-primary))]" />
    </button>
</template>