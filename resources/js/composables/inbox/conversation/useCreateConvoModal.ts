import { ContactFilters } from '@/services/chatService';
import { useAdminConvoChatStore } from '@/stores/adminConvoChatStore';
import { Contact } from '@/types/contact';
import { CursorPaginated } from '@/types/cursor_paginate';
import { useDebounceFn } from '@vueuse/core';
import { computed, ref } from 'vue';

export function useCreateConvoModal() {
    
    const service = useAdminConvoChatStore();
    const showModal = ref(false);
    const contacts = ref<CursorPaginated<Contact>>()
    const selectedContacts = ref<Contact[]>([])

    const loadingContact = ref(false);
    const creatingConvo= ref(false);

    // ===============
    // COMPUTED
    //===============
    const isNoContact = computed(()=> !contacts.value?.data)
    const isNoSelectedContact = computed(()=> !selectedContacts.value)
    const isLoadingContact = computed(()=> loadingContact.value)
    const isCreatingConvo = computed(()=> creatingConvo.value)

    // ===============
    // FUNCTION
    //===============
    const loadContacts = async (filters?: ContactFilters) => {
        loadingContact.value = true;
        contacts.value = await service.getContactList(filters ?? {});
        loadingContact.value = false;
    }

    const toggleModal =(value: boolean)=> {
        selectedContacts.value = []
        showModal.value = value
    }


    
    const searchContact = useDebounceFn(async (value: string | number) => {
        loadingContact.value = true
        await loadContacts({
            search: value.toString(),
        })
        loadingContact.value =false
    }, 300)

    const isSelected = (contact: Contact) =>
        selectedContacts.value.some(
        item => item.code === contact.code,
    )

    const toggleContact=(contact: Contact)=> {

        const exists = selectedContacts.value.some(
            item => item.code === contact.code,
        )

        if (exists) {
            selectedContacts.value = selectedContacts.value.filter(
                item => item.code !== contact.code,
            )
        } else {
            selectedContacts.value.push(contact)
        }
    }

    const createConvo = async () => {
        creatingConvo.value = true;
        const codes = selectedContacts.value.map((value) => value.code);
        await service.createNewConvo(codes)
        creatingConvo.value = false;
        toggleModal(false);
    }




    return {
        service,
        showModal,
        contacts,
        selectedContacts,
        isNoContact,
        isNoSelectedContact,
        isLoadingContact,
        isCreatingConvo,

        createConvo,
        toggleModal,
        loadContacts,
        searchContact,
        isSelected,
        toggleContact,
    }
}