<script setup lang="ts">
import { Contact } from '@/types/user/contact';
import SelectedContact from './SelectedContact.vue';
import UserSearch from './UserSearch.vue';

interface Props{
    contacts:Contact[]
}

defineProps<Props>();

const emit = defineEmits<{
    select: [contact:Contact],
    remove: [contact:Contact],
}>()

</script>



<template>
    <div class="p-4 text-foreground space-y-2">
        <UserSearch @select="emit('select', $event)" />
        <SelectedContact :contacts="contacts" @remove="emit('remove', $event)" />
    </div>
</template>