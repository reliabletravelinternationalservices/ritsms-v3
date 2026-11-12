import { Contact } from "@/types/user/contact";
import { computed, ref } from "vue";


export function useContacts() {

    const contactList = ref<Contact[]>([]);

    // ==================================
    // COMPUTED
    // ==================================

    const isSingleContact = computed(()=> contactList.value.length === 1);
    const isMultipleContact = computed(()=> contactList.value.length > 1)
    const singleContact = computed(()=> isSingleContact.value? contactList.value[0] : null);

    // INITIALIZE CONVERSATIONS





    // =====================================
    // CREATE & REMOVE CONTACTS
    // =====================================
    const addContact = (contact: Contact) => {
        if (isContactExist(contact)) return;
        contactList.value.push(contact);
    };

    const removeContact = (contact: Contact) => {
        contactList.value = removeFromList(contact)
    };


    const isContactExist=(contact:Contact)=>{
        return contactList.value.some(
            ct => ct.id === contact.id
        );
    }

    const removeFromList=(contact:Contact)=>{
        return contactList.value.filter(
            ct => ct.id !== contact.id
        );
    }

    const resetContactList=()=>{
        contactList.value = []
    }

    




    // =====================================
    // LOADING STATES
    // =====================================



    
    // =====================================
    // REQUEST ABORT FUNCTIONS
    // =====================================


    


    // ======================================
    // FETCH ASYNC
    // ======================================

    return {
        
        contactList,
        singleContact,
        isMultipleContact,
        addContact,
        removeContact,
        resetContactList,
    };
}
