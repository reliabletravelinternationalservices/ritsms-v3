
import { generateClientId, generateTempMessageId, getAuthUser } from "@/lib/utils";
import { conversationService } from "@/services/conversationService";
import {
    ConvoWithParticipants,
    ConvoWithParticipantsAndLatestMessage,
} from "@/types/convo/conversation";
import { Message, Type as MessageType } from "@/types/convo/message";
import { CursorPaginated } from "@/types/cursor/cursor-paginated";
import { Contact } from "@/types/user/contact";
import { computed, ref } from "vue";

export function useInbox() {
    const pagedConversations = ref<CursorPaginated<ConvoWithParticipantsAndLatestMessage> | null>(null);

    const searchKey = ref("");
    const openedConvo = ref<ConvoWithParticipants | null>(null);
    const openedConvoMessages = ref<CursorPaginated<Message> | null>(null);
    const createConvo = ref(false);
    const selectedContacts = ref<Contact[]>([]);
    

    const convoFullLoading = ref(false);
    const loadMoreLoading = ref(false);
    const searchLoading = ref(false);
    const openedConvoMessagesLoading = ref(false);
    const loadMoreMessagesLoading = ref(false);

    // ======================
    // REQUEST TRACKING
    // ======================

    let searchRequestId = 0;

    let messageAbortController: AbortController | null = null;
    let loadMoreMessagesAbortController: AbortController | null = null;

    // ======================
    // COMPUTED
    // ======================

    const authUser = computed(() => getAuthUser());

    // ======================
    // INITIALIZE CONVERSATIONS
    // ======================

    const initializeConvos = async () => {
        pagedConversations.value = null;

        if (convoFullLoading.value) return;

        convoFullLoading.value = true;

        try {
            const response = await conversationService.getConvos({
                per_page: 5,
            });

            if (response.data) {
                pagedConversations.value = response;
            }
        } catch (e) {
            console.error("Error initializing conversations", e);
        } finally {
            convoFullLoading.value = false;
        }
    };

    // ======================
    // INITIALIZE OPENED CONVERSATION MESSAGES
    // ======================

    const initializeOpenedConvoMessages = async () => {
        const convoId = openedConvo.value?.id;

        if (!convoId) return;

        // Cancel previous request
        messageAbortController?.abort();

        // Create new controller
        messageAbortController = new AbortController();

        const controller = messageAbortController;

        openedConvoMessages.value = null;
        openedConvoMessagesLoading.value = true;

        try {
            const response = await conversationService.getConvoMessages(
                convoId,
                {
                    per_page: 5,
                },
                controller.signal
            );

            // Ignore if this request is no longer active
            if (controller.signal.aborted) return;

            if (openedConvo.value?.id !== convoId) return;

            if (response.data) {
                openedConvoMessages.value = response;
            }

        } catch (e: any) {
            if (e.name === "CanceledError" || e.code === "ERR_CANCELED") {
                return;
            }

            console.error("Error initializing open convo messages", e);

        } finally {
            // Only the current request can reset loading
            if (messageAbortController === controller) {
                openedConvoMessagesLoading.value = false;
                messageAbortController = null;
            }
        }
    };

    // ======================
    // LOAD MORE CONVERSATIONS
    // ======================

    const loadMoreConvo = async (nextCursor?: string | null) => {
        if (loadMoreLoading.value || !nextCursor) return;

        loadMoreLoading.value = true;

        try {
            const response = await conversationService.getConvos({
                search: searchKey.value,
                cursor: nextCursor,
                per_page: 10
            });

            if (response.data && pagedConversations.value) {
                pagedConversations.value.data.push(...response.data);

                pagedConversations.value.next_cursor = response.next_cursor;
                pagedConversations.value.prev_cursor = response.prev_cursor;
            }
        } catch (e) {
            console.error("Error loading conversations", e);
        } finally {
            loadMoreLoading.value = false;
        }
    };

    // ======================
    // CREATE CONVERSATION
    // ======================

    const openCreateConvo = () => {

        openedConvo.value = null;
        openedConvoMessages.value = null;

        openedConvoMessagesLoading.value = false;
        loadMoreMessagesLoading.value = false;

        toggleCreateConvo(true);
    };

    // ======================
    // SEARCH CONVERSATIONS
    // ======================

    const search = async (value?: string) => {
        searchKey.value = value ?? "";

        const requestId = ++searchRequestId;

        searchLoading.value = true;

        try {
            const response = await conversationService.getConvos({
                search: searchKey.value
            });

            // Ignore previous search responses
            if (requestId !== searchRequestId) return;

            if (response.data && pagedConversations.value) {
                pagedConversations.value.data = [...response.data];

                pagedConversations.value.next_cursor = response.next_cursor;
                pagedConversations.value.prev_cursor = response.prev_cursor;
            }
        } catch (e) {
            if (requestId === searchRequestId) {
                console.error("Error searching conversations", e);
            }
        } finally {
            if (requestId === searchRequestId) {
                searchLoading.value = false;
            }
        }
    };

    // ======================
    // OPEN CHAT
    // ======================

    const openChat = async (
        chat: ConvoWithParticipantsAndLatestMessage,
        closeCreateConvo: boolean = false
    ) => {
        // Cancel previous requests
        messageAbortController?.abort();
        loadMoreMessagesAbortController?.abort();

        toggleCreateConvo(closeCreateConvo);

        openedConvo.value = chat;
        openedConvoMessages.value = null;

        openedConvoMessagesLoading.value = false;
        loadMoreMessagesLoading.value = false;

        await initializeOpenedConvoMessages();
    };

    // ======================
    // MESSAGE HELPERS
    // ======================

    const isOwnerChat = (message: Message) =>
        Number(message.sender?.id) === Number(authUser.value.id);

    // ======================
    // UPDATE CONVERSATION
    // ======================

    const updateSelectedConvo = (
        message: Message,
        convo: ConvoWithParticipantsAndLatestMessage
    ) => {
        const conversations = pagedConversations.value?.data;

        if (!conversations) return;

        const index = conversations.findIndex(
            item => item.id === convo.id
        );

        // Remove existing conversation if found
        if (index !== -1) {
            conversations.splice(index, 1);
        }

        convo.latest_message = message;

        conversations.unshift(convo);
    };

    // ======================
    // SEND MESSAGE
    // ======================

    const sendMessage = async (payload: {
        message: string;
        attachments: File[];
    }) => {
        createConvo.value = false;
        selectedContacts.value = [];

        const convo = openedConvo.value;

        if (!convo) return;

        const convoId = convo.id;

        const sender = {
            id: authUser.value.id,
            display_name: authUser.value.display_name,
            avatar: authUser.value.avatar,
            role: authUser.value.role
        };

        const clientID = generateClientId();

        const tempMessage: Message = {
            id: generateTempMessageId(),
            client_id: clientID,
            sender,
            body: payload.message,
            type: MessageType.Text,
            reply_to: null,
            sent_at: null,
            is_edited: false,
            is_read: false,
            deleted_at: null
        };

        if (openedConvo.value?.id === convoId && openedConvoMessages.value) {
            openedConvoMessages.value.data.push(tempMessage);
        }

        try {
            const data = await conversationService.storeConvoMessage(
                convoId,
                {
                    ...payload,
                    client_id: clientID
                }
            );

            if (openedConvo.value?.id === convoId && openedConvoMessages.value) {
                const index = openedConvoMessages.value.data.findIndex(
                    message => message.client_id === clientID
                );

                if (index !== -1) {
                    openedConvoMessages.value.data[index] = data;
                }
            }

            const updatedConvo = {
                ...convo,
                latest_message: data
            };

            updateSelectedConvo(data, updatedConvo);

        } catch (e) {
            console.error("Error sending message", e);
        }
    };

    // ======================
    // LOAD MORE MESSAGES
    // ======================

    const loadMoreMessages = async (nextCursor?: string | null) => {
        const convoId = openedConvo.value?.id;

        if (!convoId || !nextCursor || loadMoreMessagesLoading.value) {
            return;
        }

        // Cancel previous pagination request
        loadMoreMessagesAbortController?.abort();

        loadMoreMessagesAbortController = new AbortController();

        const controller = loadMoreMessagesAbortController;

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

            if (controller.signal.aborted) return;
            if (openedConvo.value?.id !== convoId) return;

            if (response.data && openedConvoMessages.value) {
                openedConvoMessages.value.data.unshift(...response.data);

                openedConvoMessages.value.next_cursor = response.next_cursor;
                openedConvoMessages.value.prev_cursor = response.prev_cursor;
            }

        } catch (e: any) {
            if (e.name === "CanceledError" || e.code === "ERR_CANCELED") {
                return;
            }

            console.error("Error loading conversation messages", e);

        } finally {
            if (loadMoreMessagesAbortController === controller) {
                loadMoreMessagesLoading.value = false;
                loadMoreMessagesAbortController = null;
            }
        }
    };
    // ======================
    // TOGGLE CREATE CONVERSATION
    // ======================

    const toggleCreateConvo = (value: boolean) => {
        createConvo.value = value;

        if (value) {
            messageAbortController?.abort();
            loadMoreMessagesAbortController?.abort();

            messageAbortController = null;
            loadMoreMessagesAbortController = null;

            openedConvo.value = null;
            openedConvoMessages.value = null;

            openedConvoMessagesLoading.value = false;
            loadMoreMessagesLoading.value = false;
        }
    };
    


    // =====================
    // CONTACT
    // =====================
    
    const addContact = async (user: Contact) => {
        if (!createConvo.value) return;

        const exists = selectedContacts.value.some(
            contact => contact.id === user.id
        );
    
        if (exists) return;
        
        selectedContacts.value.push(user);

        if (selectedContacts.value.length === 1 && !openedConvo.value) {
            openChat(user.private_conversation, true);
        }else{
            openedConvo.value = null;
            openedConvoMessages.value = null;
        }
    };
    
    const removeContact = (user: Contact) => {
        if (!createConvo.value) return;

        selectedContacts.value = selectedContacts.value.filter(
            contact => contact.id !== user.id
        );
    };
    
    // ======================
    // RETURN
    // ======================

    return {
        pagedConversations,
        convoFullLoading,
        loadMoreLoading,
        loadMoreMessagesLoading,
        openedConvo,
        searchLoading,
        initializeConvos,
        loadMoreConvo,
        search,
        openChat,
        initializeOpenedConvoMessages,
        openedConvoMessages,
        openedConvoMessagesLoading,
        isOwnerChat,
        sendMessage,
        createConvo,
        toggleCreateConvo,
        openCreateConvo,
        loadMoreMessages,
        addContact,
        removeContact,
        selectedContacts
    };
}
