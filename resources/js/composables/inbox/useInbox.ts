
import {
    getAuthUser,
} from "@/lib/utils";


import {
    ConvoWithParticipantsAndLatestMessage,
} from "@/types/convo/conversation";

import { Message} from "@/types/convo/message";
import { Contact } from "@/types/user/contact";

import { computed, ref } from "vue";
import { useConversations } from "./useConversations";
import { useMessages } from "./useMessages";
import { useContacts } from "./useContacts";
import { useCreateConvo } from "./useCreateConvo";
import { useConvo } from "./useConvo";
import { useCreateMessage } from "./useCreateMessage";

export function useInbox() {

    const {
        conversationList,
        loadingConvos,

        loadingMoreConvos,

        oldConversationList,
        searchingConvos,

        initializeConvos,
        loadMoreConvo,
        searchConvo,

    } = useConversations();


    const {
        messageGroupList,
        loadingMessages,
        loadingMoreMessages,
        isNoMessageGroupList,

        initializeMessages,
        loadMoreMessages,
        resetMessageGroupList,
    } = useMessages();


    const {
        contactList,
        singleContact,
        isMultipleContact,
        addContact,
        removeContact,
        resetContactList,
    } = useContacts();

    const {
        createModal,
        creatingConvo,
        createConversation,
        toggleCreate,
    } = useCreateConvo();

    const {
        openedConvo,
        isNoOpenConvo,
        assignOpenConvo,
        resetOpenedConvo,
        updateSelectedConvo,
    } = useConvo();

    const {
        createTempMessage,
        storeTempMessageLocally,
        storeMessage,
        replaceTempMessage,
        removeTempMessage,
    } = useCreateMessage()

    // =====================================================
    // STATE
    // =====================================================


    const selectedReplyMessage = ref<Message | null>(null);

    // =====================================================
    // COMPUTED
    // =====================================================

    const authUser = computed(() => getAuthUser());


    // =====================================================
    // OPEN CONVERSATION
    // =====================================================
    const openChat = async (
        chat: ConvoWithParticipantsAndLatestMessage,
        isCreate = false
    ) => {
        toggleCreate(isCreate);
        assignOpenConvo(chat)
        if(isNoOpenConvo.value) return
        await initializeMessages(openedConvo.value!);
    };

    const closeOpenConvo = () => {
        resetOpenedConvo()
        resetMessageGroupList()
    };


    // =====================================================
    // OPEN CREATE MODAL
    // =====================================================
    const openCreateModal = () => {
        toggleCreate(true);
        closeOpenConvo()
    };


    // =====================================================
    // CHECK OWNER CHAT
    // =====================================================
    const isOwnerChat = (message: Message) =>
        Number(message.sender?.id) === Number(authUser.value.id);



    

    // =====================================================
    // MESSAGES
    // ==================================================
    const sendMessage = async (payload: {
        message: string;
        attachments: File[];
    }) => {

        if (isNoMessageGroupList.value || isNoOpenConvo.value) return

        const tempMessage = createTempMessage(
            authUser.value,
            payload.message,
            payload.attachments,
        );

        const convo = openedConvo.value;

        storeTempMessageLocally(messageGroupList.value!.data, tempMessage)

        const message = await storeMessage(convo!.id, {
            client_id: tempMessage.client_id!,
            message: tempMessage.body!,
            attachments: payload.attachments,
        })



        if(message){
            replaceTempMessage(messageGroupList.value!.data, tempMessage)

            const conversations = oldConversationList.value
                ? oldConversationList.value
                : conversationList.value

            if(conversations){

                updateSelectedConvo(
                    conversations.data,
                    message,
                    convo!
                );
            }

        }else{
            removeTempMessage(messageGroupList.value!.data, tempMessage)
        }

        toggleCreate(false)
        resetContactList()
        resetReply()
    };

    

    

    // =====================================================
    // REPLY MESSAGE
    // =====================================================
    const replyMessage =(message: Message)=>{
        selectedReplyMessage.value = message;
    }

    const resetReply =()=>{
        selectedReplyMessage.value = null;
    }



    // =====================================================
    // CONTACTS
    // =====================================================
    
    const addNewContact = (contact: Contact) => {
        if (!createModal.value) return;
        addContact(contact);
        syncSelectedContactChat();
    };

    const removeExistingContact = (contact: Contact) => {
        if (!createModal.value) return;
        removeContact(contact);
        syncSelectedContactChat();
    };

    const syncSelectedContactChat = () => {
        resetOpenedConvo()
        resetMessageGroupList()

        const isNotSingleContact = singleContact.value === null;
        if(isNotSingleContact) return
        if(!singleContact.value.private_conversation) return
        openChat(singleContact.value.private_conversation, true)
    };


    /**
     * Create a new conversation with selected contacts.
     */
    const createNewConversation = async () => {
        const chat = await createConversation(contactList.value)
        if(!chat) return
        openChat(chat, false);

        const conversations = oldConversationList.value
            ? oldConversationList.value
            : conversationList.value

        if(!conversations) return;
        updateSelectedConvo(conversations.data, chat.latest_message, chat);
    }
    
    // =====================================================
    // RETURN
    // =====================================================

    return {
        // conversations
        conversationList,
        loadingConvos,
        loadingMoreConvos,
        searchingConvos,
        initializeConvos,
        loadMoreConvo,
        searchConvo,


        // Messages
        messageGroupList,
        loadingMessages,
        loadingMoreMessages,
        initializeMessages,
        loadMoreMessages,


        // CONTACTS
        contactList,
        singleContact,
        isMultipleContact,
        addNewContact,
        removeExistingContact,


        // CREATE CONVO
        openCreateModal,
        createModal,
        creatingConvo,
        createNewConversation,



        openedConvo,



        openChat,

        // Message actions
        isOwnerChat,
        sendMessage,

        // reply message
        selectedReplyMessage,
        replyMessage,
        resetReply,
    };
}
