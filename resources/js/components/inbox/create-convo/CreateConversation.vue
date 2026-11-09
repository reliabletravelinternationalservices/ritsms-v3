<script setup lang="ts">
import UserSearch from './UserSearch.vue';
import { Contact } from '@/types/user/contact';
import { ref } from 'vue';
import SelectedContact from './SelectedContact.vue';
import { MessageCircle, MessageSquarePlus, Search, Users } from '@lucide/vue';

const selectedContacts = ref<Contact[]>([]);

const addContact = (user: Contact) => {
    const exists = selectedContacts.value.some(
        contact => contact.id === user.id
    );

    if (exists) return;

    selectedContacts.value.push(user);
};

const removeContact = (user: Contact) => {
    selectedContacts.value = selectedContacts.value.filter(
        contact => contact.id !== user.id
    );
};


</script>

<template>
    <div class="w-full">
        <div class="flex w-full flex-col gap-2 p-4">
            <UserSearch @select="addContact" />
            <SelectedContact :contacts="selectedContacts" @remove="removeContact" />
            <div class="min-h-[calc(100vh-180px)] flex items-center justify-center p-4">
                <div class="w-full max-w-md rounded-lg border bg-card p-6">

                    <!-- No Selected Contacts -->
                    <div v-if="selectedContacts.length === 0" class="flex flex-col items-center gap-3 text-center">
                        <div class="flex size-12 items-center justify-center rounded-full bg-muted">
                            <Search class="size-6 text-muted-foreground" />
                        </div>

                        <div class="space-y-1">
                            <p class="font-semibold">Find a Contact</p>
                            <p class="text-sm text-muted-foreground">
                                Search for a contact to start a conversation.
                            </p>
                        </div>
                    </div>

                    <!-- Single Contact -->
                    <div v-else-if="selectedContacts.length === 1" class="flex flex-col items-center gap-4 text-center">
                        <template v-if="selectedContacts[0].has_existing_private_convo">
                            <div class="space-y-2">
                                <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                    <MessageCircle class="size-6 text-muted-foreground" />
                                </div>

                                <p class="font-semibold">Existing Conversation</p>
                                <p class="text-sm text-muted-foreground">
                                    You already have a existing conversation with
                                    {{ selectedContacts[0].display_name }}.
                                </p>
                            </div>

                            <Button  class="w-full underline text-yellow-600" variant="outline">
                                View Conversation
                            </Button>
                        </template>

                        <template v-else>
                            <div class="space-y-2">
                                <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                    <MessageSquarePlus class="size-6 text-muted-foreground" />
                                </div>

                                <p class="font-semibold">Start a Private Conversation</p>
                                <p class="text-sm text-muted-foreground">
                                    Start chatting with
                                    {{ selectedContacts[0].display_name }}.
                                </p>
                            </div>

                            <Button class="w-full">
                                <MessageSquarePlus class="mr-2 size-4" />
                                Start Conversation
                            </Button>
                        </template>
                    </div>

                    <!-- Multiple Contacts -->
                    <div v-else class="flex flex-col items-center gap-4 text-center">
                        <div class="space-y-2">
                            <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                                <Users class="size-6 text-muted-foreground" />
                            </div>

                            <p class="font-semibold">Create Group Conversation</p>
                            <p class="text-sm text-muted-foreground">
                                Start a group chat with
                                {{ selectedContacts.length }} selected contacts.
                            </p>
                        </div>

                        <Button class="w-full underline text-yellow-600">
                            Start Group Conversation
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>