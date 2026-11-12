
import {
    generateClientId,
    generateTempMessageId,
    getAuthUser,
} from "@/lib/utils";

import { conversationService } from "@/services/conversationService";

import {
    ConvoWithParticipants,
    ConvoWithParticipantsAndLatestMessage,
} from "@/types/convo/conversation";

import { Message, MessageGroup, Type as MessageType } from "@/types/convo/message";
import { Contact } from "@/types/user/contact";

import { computed, ref } from "vue";
import { useConversations } from "./useConversations";
import { useMessages } from "./useMessages";
import { useContacts } from "./useContacts";
import { useCreateConvo } from "./useCreateConvo";
import { useConvo } from "./useConvo";

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
    } = useConvo();


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
        if(isNoOpenConvo) return
        await initializeMessages(openedConvo.value!);
    };

    const closeOpenConvo = () => {
        resetOpenedConvo()
        resetMessageGroupList()
    };


    /**
     * Create a new conversation.
     */
    const openCreateModal = () => {
        toggleCreate(true);
        resetOpenedConvo();
    };

    /**
     * Toggle conversation creation mode.
     */


    // =====================================================
    // MESSAGES
    // =====================================================

    /**
     * Check if can appent to last message group.
     */

    const canAppendToLastGroup = (
        lastGroup: MessageGroup | undefined,
        message: Message
    ): boolean => {
        if (!lastGroup?.sender || !message.sender) {
            return false;
        }

        // Same sender
        if (lastGroup.sender.id !== message.sender.id) {
            return false;
        }

        const lastMessage = lastGroup.messages.at(-1);

        if (!lastMessage?.sent_at || !message.sent_at) {
            return false;
        }

        const lastTime = new Date(lastMessage.sent_at).getTime();
        const currentTime = new Date(message.sent_at).getTime();

        if (!Number.isFinite(lastTime) || !Number.isFinite(currentTime)) {
            return false;
        }

        const difference = currentTime - lastTime;

        // Same sender, chronological order, within 5 minutes
        return difference >= 0 && difference <= 5 * 60 * 1000;
    };

    /**
     * Check if message belongs to authenticated user.
     */
    const isOwnerChat = (message: Message) =>
        Number(message.sender?.id) === Number(authUser.value.id);

    /**
     * Create optimistic message.
     */
    const createTempMessage = (
        message: string,
        clientID: string
    ): Message => ({
        id: generateTempMessageId(),
        client_id: clientID,
        sender: {
            id: authUser.value.id,
            display_name: authUser.value.display_name,
            avatar: authUser.value.avatar,
            role: authUser.value.role,
        },
        body: message,
        type: MessageType.Text,
        reply_to: null,
        sent_at: new Date().toISOString(),
        is_edited: false,
        is_read: false,
        deleted_at: null,
    });

    const createNewBatch = (message: Message): MessageGroup => ({
        id: typeof message.id === 'number' ? message.id : generateTempMessageId(),
        sender: message.sender,
        sent_at: message.sent_at,
        messages: [message],
    });

    /**
     * Update conversation position and latest message.
     */
    const updateSelectedConvo = (
        message: Message,
        convo: ConvoWithParticipantsAndLatestMessage
    ) => {
        const conversations = oldConversationList.value
            ? oldConversationList.value.data
            : conversationList.value?.data;

        if (!conversations) return;

        const index = conversations.findIndex(
            item => item.id === convo.id
        );

        if (index !== -1) {
            conversations.splice(index, 1);
        }


        const participants = convo.participants;

        const senderIndex = participants.findIndex(
            p => p.participant.id === message.sender?.id
        );

        if (senderIndex !== -1) {
            participants[senderIndex].last_read_at = new Date().toISOString();
            participants[senderIndex].total_unread = 0;
        }

        conversations.unshift({
            ...convo,
            latest_message: message,
            participants,
        });
    };

    /**
     * Send a message with optimistic UI.
     */

    const sendMessage = async (payload: {
        message: string;
        attachments: File[];
    }) => {
        const convo = openedConvo.value;

        if (!convo) return;

        const convoId = convo.id;
        const clientID = generateClientId();

        const tempMessage = createTempMessage(
            payload.message,
            clientID
        );

        // Immediately display temporary message.
        if (
            openedConvo.value?.id === convoId &&
            messageGroupList.value
        ) {
            const groups =  messageGroupList.value.data;
            const lastGroup = groups.at(-1);

            // Append to the last group if the sender is the same.
            if (lastGroup && canAppendToLastGroup(lastGroup, tempMessage)) {
                lastGroup.messages.push(tempMessage);
            } else {
                groups.push(createNewBatch(tempMessage));
            }
        }

        toggleCreate(false)
        resetContactList()
        resetReply()

        try {
            const response = await conversationService.storeConvoMessage(
                convoId,
                {
                    ...payload,
                    client_id: clientID,
                }
            );

            // Replace temporary message with actual response.
            if (
                openedConvo.value?.id === convoId &&
                openedConvoMessages.value
            ) {
                const groups = openedConvoMessages.value.data;

                for (const group of groups) {
                    const messageIndex = group.messages.findIndex(
                        message => message.client_id === clientID
                    );

                    if (messageIndex !== -1) {
                        group.messages[messageIndex] = response;
                        break;
                    }
                }
            }

            // Update conversation list.
            updateSelectedConvo(response, {
                ...convo,
                latest_message: response,
            });

        } catch (error) {
            console.error("Error sending message", error);

            // Remove temporary message if sending failed.
            // if (
            //     openedConvo.value?.id === convoId &&
            //     openedConvoMessages.value
            // ) {
            //     const groups = openedConvoMessages.value.data;

            //     for (let i = groups.length - 1; i >= 0; i--) {
            //         const group = groups[i];

            //         group.messages = group.messages.filter(
            //             message => message.client_id !== clientID
            //         );

            //         // Remove empty groups.
            //         if (group.messages.length === 0) {
            //             groups.splice(i, 1);
            //         }
            //     }
            // }
        }
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
    
    const syncSelectedContactChat = () => {
        const isNotSingleContact = singleContact.value === null;

        resetOpenedConvo();

        if(isNotSingleContact) return
        if(!singleContact.value.private_conversation) return
        openChat(singleContact.value.private_conversation, true)
    };



    /**
     * Add contact to selection.
     */
    const addNewContact = (contact: Contact) => {
        if (!createModal.value) return;
        addContact(contact);
        syncSelectedContactChat();
    };

    /**
     * Remove contact from selection.
     */
    const removeExistingContact = (contact: Contact) => {
        if (!createModal.value) return;
        removeContact(contact);
        syncSelectedContactChat();
    };

    /**
     * Create a new conversation with selected contacts.
     */
    const createNewConversation = async () => {
        const chat = await createConversation(contactList.value)
        if(!chat) return
        openChat(chat, false);
        updateSelectedConvo(chat.latest_message, chat);
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
