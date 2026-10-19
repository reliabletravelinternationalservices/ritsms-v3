<script setup lang="ts">
import { Contact } from '@/types/contact';
import { Icon } from '@iconify/vue';

interface Props {
    contact: Contact
}
defineProps<Props>()

const emit = defineEmits<{
    toggle: [contact: Contact]
}>()

</script>

<template>
    <div class="flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs">
        <span class="max-w-32 truncate">
            {{ contact.name }}
        </span>

        <button type="button" class="text-muted-foreground hover:text-foreground" @click="emit('toggle', contact)">
            <Icon icon="lucide:x" class="size-3" />
        </button>
    </div>
</template>