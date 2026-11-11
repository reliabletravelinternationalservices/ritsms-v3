
import {
    generateClientId,
    generateTempMessageId,
    getAuthUser,
} from "@/lib/utils";

import { conversationService } from "@/services/conversationService";

import {
    ConvoWithParticipants,
    ConvoWithParticipantsAndLatestMessage,
    Type,
} from "@/types/convo/conversation";

import { Message, MessageGroup, Type as MessageType } from "@/types/convo/message";
import { CursorPaginated } from "@/types/cursor/cursor-paginated";
import { Contact } from "@/types/user/contact";

import { computed, ref } from "vue";
import { useConversations } from "./useConversations";

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

    } = useConversations()

    // =====================================================
    // STATE
    // =====================================================



    const openedConvo = ref<ConvoWithParticipants | null>(null);

    const openedConvoMessages = ref<CursorPaginated<MessageGroup> | null>(null)


    const createConvo = ref(false);
    const selectedContacts = ref<Contact[]>([]);

    const selectedReplyMessage = ref<Message | null>(null);

    // SEARCH CONVO

    // Loading states
    const openedConvoMessagesLoading = ref(false);
    const loadMoreMessagesLoading = ref(false);
    const loadingCreatingConvo = ref(false);

    // =====================================================
    // REQUEST TRACKING
    // =====================================================

    let messageAbortController: AbortController | null = null;
    let loadMoreMessagesAbortController: AbortController | null = null;


    // =====================================================
    // COMPUTED
    // =====================================================

    const authUser = computed(() => getAuthUser());

    // =====================================================
    // SHARED HELPERS
    // =====================================================

    /**
     * Cancel ongoing message requests.
     */
    const cancelMessageRequests = () => {
        messageAbortController?.abort();
        loadMoreMessagesAbortController?.abort();

        messageAbortController = null;
        loadMoreMessagesAbortController = null;
    };

    /**
     * Reset opened conversation and its messages.
     */
    const resetOpenedConvo = () => {
        cancelMessageRequests();

        openedConvo.value = null;
        openedConvoMessages.value = null;

        openedConvoMessagesLoading.value = false;
        loadMoreMessagesLoading.value = false;
    };

    /**
     * Update cursor pagination metadata.
     */
    const updatePagination = <T>(
        target: CursorPaginated<T>,
        response: CursorPaginated<T>
    ) => {
        target.next_cursor = response.next_cursor;
        target.prev_cursor = response.prev_cursor;
    };

    /**
     * Check whether an error is an aborted request.
     */
    const isRequestCanceled = (error: any) =>
        error?.name === "CanceledError" ||
        error?.code === "ERR_CANCELED";

    // =====================================================
    // OPEN CONVERSATION
    // =====================================================

    /**
     * Initialize messages of the opened conversation.
     */
    const initializeOpenedConvoMessages = async () => {
        const convoId = openedConvo.value?.id;

        if (!convoId) return;

        // Cancel previous request.
        messageAbortController?.abort();

        const controller = new AbortController();
        messageAbortController = controller;

        openedConvoMessages.value = null;
        openedConvoMessagesLoading.value = true;

        try {
            const response = await conversationService.getConvoMessages(
                convoId,
                { per_page: 10 },
                controller.signal
            );

            // Ignore stale responses.
            if (
                controller.signal.aborted ||
                openedConvo.value?.id !== convoId
            ) {
                return;
            }

            if (response.data) {
                openedConvoMessages.value = response;
            }
        } catch (error) {
            if (isRequestCanceled(error)) return;

            console.error(
                "Error initializing open convo messages",
                error
            );

        } finally {
            if (messageAbortController === controller) {
                messageAbortController = null;
                openedConvoMessagesLoading.value = false;
            }

        }
    };

    /**
     * Open a conversation.
     */
    const openChat = async (
        chat: ConvoWithParticipantsAndLatestMessage,
        isCreate = false
    ) => {

        toggleCreateConvo(isCreate);

        // Cancel previous requests.
        cancelMessageRequests();

        openedConvo.value = chat;
        openedConvoMessages.value = null;

        openedConvoMessagesLoading.value = false;
        loadMoreMessagesLoading.value = false;

        await initializeOpenedConvoMessages();
    };

    /**
     * Create a new conversation.
     */
    const openCreateConvo = () => {
        toggleCreateConvo(true);
    };

    /**
     * Toggle conversation creation mode.
     */
    const toggleCreateConvo = (value: boolean) => {
        createConvo.value = value;

        if (value) {
            resetOpenedConvo();
        }
    };

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
            openedConvoMessages.value
        ) {
            const groups = openedConvoMessages.value.data;
            const lastGroup = groups.at(-1);

            // Append to the last group if the sender is the same.
            if (lastGroup && canAppendToLastGroup(lastGroup, tempMessage)) {
                lastGroup.messages.push(tempMessage);
            } else {
                groups.push(createNewBatch(tempMessage));
            }
        }

        createConvo.value = false;
        selectedContacts.value = [];
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
            if (
                openedConvo.value?.id === convoId &&
                openedConvoMessages.value
            ) {
                const groups = openedConvoMessages.value.data;

                for (let i = groups.length - 1; i >= 0; i--) {
                    const group = groups[i];

                    group.messages = group.messages.filter(
                        message => message.client_id !== clientID
                    );

                    // Remove empty groups.
                    if (group.messages.length === 0) {
                        groups.splice(i, 1);
                    }
                }
            }
        }
    };


    /**
     * Load older messages.
     */
    const loadMoreMessages = async (
        nextCursor?: string | null
    ) => {
        const convoId = openedConvo.value?.id;

        if (
            !convoId ||
            !nextCursor ||
            loadMoreMessagesLoading.value
        ) {
            return;
        }

        // Cancel previous pagination request.
        loadMoreMessagesAbortController?.abort();

        const controller = new AbortController();
        loadMoreMessagesAbortController = controller;

        loadMoreMessagesLoading.value = true;

        try {
            const response = await conversationService.getConvoMessages(
                convoId,
                {
                    cursor: nextCursor,
                    per_page: 20,
                },
                controller.signal
            );

            // Ignore stale responses.
            if (
                controller.signal.aborted ||
                openedConvo.value?.id !== convoId
            ) {
                return;
            }

            if (response.data && openedConvoMessages.value) {
                openedConvoMessages.value.data.unshift(
                    ...response.data
                );

                updatePagination(
                    openedConvoMessages.value,
                    response
                );
            }
        } catch (error) {
            if (isRequestCanceled(error)) return;

            console.error("Error loading conversation messages", error);
        } finally {
            if (loadMoreMessagesAbortController === controller) {
                loadMoreMessagesAbortController = null;
                loadMoreMessagesLoading.value = false;
            }
     
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

    /**
     * Sync opened conversation based on selected contacts.
     */
    const syncSelectedContactChat = () => {
        if (selectedContacts.value.length === 1) {
            const contact = selectedContacts.value[0];

            if (contact.private_conversation) {
                openChat(contact.private_conversation, true);
                return;
            }
        }

        resetOpenedConvo();
    };

    /**
     * Add contact to selection.
     */
    const addContact = (user: Contact) => {
        if (!createConvo.value) return;

        const exists = selectedContacts.value.some(
            contact => contact.id === user.id
        );

        if (exists) return;

        selectedContacts.value.push(user);

        syncSelectedContactChat();
    };

    /**
     * Remove contact from selection.
     */
    const removeContact = (user: Contact) => {
        if (!createConvo.value) return;

        selectedContacts.value = selectedContacts.value.filter(
            contact => contact.id !== user.id
        );

        syncSelectedContactChat();
    };

    /**
     * Create a new conversation with selected contacts.
     */
    const createConversation = async () => {

        if (!createConvo.value || selectedContacts.value.length === 0 ||  loadingCreatingConvo.value) {
            return;
        }

        loadingCreatingConvo.value=true;

        const contactIds = selectedContacts.value.map(
            contact => contact.id
        );

        const isSingleContact = contactIds.length === 1;

        try {
            const response = await conversationService.storeConvo(
                contactIds,
                isSingleContact ? Type.Private : Type.Group
            );

            const chat = response.data;
            openChat(chat, false);
            updateSelectedConvo(chat.latest_message, chat);
        } catch (error) {
            console.error("Error creating conversation", error);
        }finally{
            loadingCreatingConvo.value = false;
        }
    }
    
    // =====================================================
    // RETURN
    // =====================================================

    return {
        // SIDEBAR
        conversationList,
        loadingConvos,
        loadingMoreConvos,
        searchingConvos,
        initializeConvos,
        loadMoreConvo,
        searchConvo,


        openedConvo,

        // Message state
        openedConvoMessages,
        openedConvoMessagesLoading,
        loadMoreMessagesLoading,

        // Create conversation state
        createConvo,
        selectedContacts,

        openChat,
        openCreateConvo,
        toggleCreateConvo,

        // Message actions
        initializeOpenedConvoMessages,
        isOwnerChat,
        sendMessage,
        loadMoreMessages,

        // Contact actions
        addContact,
        removeContact,

        // create conversation action
        createConversation,
        loadingCreatingConvo,

        // reply message
        selectedReplyMessage,
        replyMessage,
        resetReply,
    };
}
