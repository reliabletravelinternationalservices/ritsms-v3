<script setup lang="ts">
import { Contact } from '@/types/user/contact';
import { XCircle } from '@lucide/vue';


interface Props {
    contacts: Contact[]
}

defineProps<Props>();

const emit = defineEmits<{
    remove: [contact: Contact]
}>()

</script>

<template>
    <!-- Selected Contacts -->
    <div v-if="contacts.length" class="flex flex-wrap items-center gap-2">
        <div v-for="contact in contacts" :key="contact.id"
            class="flex w-fit items-center gap-2 rounded-md bg-yellow-600 p-1 text-white">
            <span class="text-sm">
                {{ contact.display_name }}
            </span>

            <button type="button" class="rounded-full transition-opacity hover:opacity-70"
                @click="emit('remove', contact)">
                <XCircle class="h-5 w-5" />
            </button>
        </div>
    </div>

</template>