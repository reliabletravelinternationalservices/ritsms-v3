<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { Input } from '@/components/ui/input'
import { Loader2 } from '@lucide/vue'
import ModalHeader from './ModalHeader.vue'
import ModalOpacity from './ModalOpacity.vue'
import ModalFooter from './ModalFooter.vue'
import { useCreateConvoModal } from '@/composables/inbox/conversation/useCreateConvoModal.js'
import SelectedContactList from './SelectedContactList.vue'
import SelectedContact from './SelectedContact.vue'
import ModalBody from './ModalBody.vue'
import ModalContent from './ModalContent.vue'
import SelectedCount from './SelectedCount.vue'
import ContactCard from './ContactCard.vue'
import ContactList from './ContactList.vue'


const props = defineProps<{
    open: boolean
}>()

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()




const {
    showModal,
    contacts,
    selectedContacts,
    isLoadingContact,
    isNoContact,
    isNoSelectedContact,
    isCreatingConvo,
    createConvo,
    toggleModal,
    loadContacts,
    searchContact,
    toggleContact,
    isSelected,
} = useCreateConvoModal();

watch(
    () => props.open,
    (value) => {
        toggleModal(value)
    },
    { immediate: true }
)

const close = (value: boolean) => {
    toggleModal(value)
    emit('update:open', value)
}

onMounted(async () => {
    await loadContacts()
})

</script>

<template>
    <ModalOpacity v-if="showModal" @close="close($event)">
        <ModalContent>
            <ModalHeader @close="close($event)" />

            <!-- Content -->
            <ModalBody>
                <!-- Search -->
                <div class="relative">
                    <Icon icon="lucide:search"
                        class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input @update:model-value="searchContact" placeholder="Search code | name | email..."
                        class="pl-9" />
                </div>

                <SelectedContactList>
                    <SelectedContact v-for="contact in selectedContacts"
                        :key="`${contact.contact_type}-${contact.code}`" :contact="contact"
                        @toggle="toggleContact($event)" />
                </SelectedContactList>

                <!-- Contacts -->
                <ContactList>

                    <!-- LOADING LIST -->
                    <div v-if="isLoadingContact" class="flex items-center justify-center min-h-64">
                        <Loader2 class="animate-spin" />
                    </div>

                    <!-- Empty -->
                    <div v-else-if="isNoContact"
                        class="flex min-h-64 items-center justify-center px-4 py-8 text-center text-sm text-muted-foreground">
                        No contacts found.
                    </div>

                    <ContactCard v-else v-for="contact in contacts!.data"
                        :key="`${contact.contact_type}-${contact.code}`" :contact="contact"
                        :selected="isSelected(contact)" @toggle="toggleContact($event)" />

                </ContactList>

                <!-- Selected Count -->
                <SelectedCount v-if="!isNoSelectedContact" :total-contact="selectedContacts.length" />
            </ModalBody>

            <!-- Footer -->
            <ModalFooter :total-selected="selectedContacts.length">
                <button type="button"
                    class="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-muted"
                    @click="() => close(false)">
                    Cancel
                </button>

                <button type="button"
                    class="rounded-lg bg-[rgb(var(--color-primary))] px-4 py-2 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 flex item-center gap-2"
                    :disabled="isNoSelectedContact || isCreatingConvo" @click.prevent="createConvo">
                    <Loader2 v-if="isCreatingConvo" class="animate-spin" />
                    <span>Create</span>
                </button>
            </ModalFooter>
        </ModalContent>
    </ModalOpacity>
</template>