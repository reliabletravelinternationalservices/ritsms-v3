
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

import { Message, Type as MessageType } from "@/types/convo/message";
import { CursorPaginated } from "@/types/cursor/cursor-paginated";
import { Contact } from "@/types/user/contact";

import { computed, ref } from "vue";

export function useInbox() {
    // =====================================================
    // STATE
    // =====================================================

    const pagedConversations =
        ref<CursorPaginated<ConvoWithParticipantsAndLatestMessage> | null>(null);

    const openedConvo = ref<ConvoWithParticipants | null>(null);

    const openedConvoMessages =
        ref<CursorPaginated<Message> | null>(null);

    const searchKey = ref("");
    const createConvo = ref(false);
    const selectedContacts = ref<Contact[]>([]);

    // SEARCH CONVO
    const tempLoadedConvos = ref<CursorPaginated<ConvoWithParticipantsAndLatestMessage> | null>(null);

    // Loading states
    const convoFullLoading = ref(false);
    const loadMoreLoading = ref(false);
    const searchLoading = ref(false);
    const openedConvoMessagesLoading = ref(false);
    const loadMoreMessagesLoading = ref(false);

    // =====================================================
    // REQUEST TRACKING
    // =====================================================

    let messageAbortController: AbortController | null = null;
    let loadMoreMessagesAbortController: AbortController | null = null;
    let convoAbortController: AbortController | null = null;
    let loadMoreConvoAbortController: AbortController | null = null;
    let searchConvosAbortController: AbortController | null = null;

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
    // CONVERSATIONS
    // =====================================================

    /**
     * Initialize conversation list.
     */
    const initializeConvos = async () => {
        if (convoFullLoading.value) return;

        convoAbortController?.abort()
        const controller = new AbortController();
        convoAbortController = controller;

        convoFullLoading.value = true;
        pagedConversations.value = null;

        try {
            const response = await conversationService.getConvos({
                per_page: 10,
            });

            if (response.data) {
                pagedConversations.value = response;
            }
        } catch (error) {
            if(isRequestCanceled(error)) return;

            console.error("Error initializing conversations", error);
        } finally {
            if (convoAbortController === controller) {
                convoAbortController = null;
            }
            convoFullLoading.value = false;
        }
    };

    /**
     * Load more conversations.
     */
    const loadMoreConvo = async (nextCursor?: string | null) => {
        if (loadMoreLoading.value || !nextCursor) return;
        
        loadMoreConvoAbortController?.abort();
        const controller = new AbortController();
        loadMoreConvoAbortController = controller;
        loadMoreLoading.value = true;

        try {
            const response = await conversationService.getConvos({
                    search: searchKey.value,
                    cursor: nextCursor,
                    per_page: 10,
                },
                controller.signal
            );

            if (response.data && pagedConversations.value) {
                pagedConversations.value.data.push(...response.data);

                updatePagination(pagedConversations.value, response);
            }
        } catch (error) {
            if(isRequestCanceled(error)) return;

            console.error("Error loading conversations", error);
        } finally {
            if(loadMoreConvoAbortController === controller){
                loadMoreConvoAbortController = null
            }
            loadMoreLoading.value = false;
        }
    };

    /**
     * Search conversations by name.
     */
    const searchConvo = async (value?: string) => {
        const search = value?.trim();

        // Restore original conversations
        if (!search) {
            searchConvosAbortController?.abort();
            searchConvosAbortController = null;

            pagedConversations.value = tempLoadedConvos.value;
            tempLoadedConvos.value = null;

            searchLoading.value = false;
            return;
        }

        // Save original conversations before searching
        if (!tempLoadedConvos.value) {
            tempLoadedConvos.value = pagedConversations.value;
        }

        searchConvosAbortController?.abort();

        const controller = new AbortController();
        searchConvosAbortController = controller;

        searchLoading.value = true;
        pagedConversations.value = null;

        try {

            const response = await conversationService.getConvos(
                {
                    search,
                    per_page: 10,
                },
                controller.signal
            );


            if (!response.data) return;

            pagedConversations.value = response;

        } catch (error) {
            if (isRequestCanceled(error)) return;

            console.error('Error searching conversations', error);
        } finally {
            if (searchConvosAbortController === controller) {
                searchConvosAbortController = null;
            }
            searchLoading.value = false;
        }
    };

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
                { per_page: 5 },
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
            }
            openedConvoMessagesLoading.value = false;
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
        sent_at: null,
        is_edited: false,
        is_read: false,
        deleted_at: null,
    });

    /**
     * Update conversation position and latest message.
     */
    const updateSelectedConvo = (
        message: Message,
        convo: ConvoWithParticipantsAndLatestMessage
    ) => {
        const conversations = pagedConversations.value?.data;

        if (!conversations) return;

        const index = conversations.findIndex(
            item => item.id === convo.id
        );

        // Remove old position if conversation already exists.
        if (index !== -1) {
            conversations.splice(index, 1);
        }

        conversations.unshift({
            ...convo,
            latest_message: message,
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

        createConvo.value = false;
        selectedContacts.value = [];

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
            openedConvoMessages.value.data.push(tempMessage);
        }

        try {
            const data = await conversationService.storeConvoMessage(
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
                const index = openedConvoMessages.value.data.findIndex(
                    message => message.client_id === clientID
                );

                if (index !== -1) {
                    openedConvoMessages.value.data[index] = data;
                }
            }

            // Update conversation list.
            updateSelectedConvo(data, {
                ...convo,
                latest_message: data,
            });

        } catch (error) {
            console.error("Error sending message", error);
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
            }
            loadMoreMessagesLoading.value = false;
        }
    };

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

        if (!createConvo.value || selectedContacts.value.length === 0) {
            return;
        }

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
        }
    }
    
    // =====================================================
    // RETURN
    // =====================================================

    return {
        // Conversation state
        pagedConversations,
        convoFullLoading,
        loadMoreLoading,
        openedConvo,
        searchLoading,

        // Message state
        openedConvoMessages,
        openedConvoMessagesLoading,
        loadMoreMessagesLoading,

        // Create conversation state
        createConvo,
        selectedContacts,

        // Conversation actions
        initializeConvos,
        loadMoreConvo,
        searchConvo,
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
    };
}
