import { generateClientId, generateTempMessageId, getAuthUser } from "@/lib/utils";
import { conversationService } from "@/services/conversationService";
import { ConvoWithParticipants, ConvoWithParticipantsAndLatestMessage } from "@/types/convo/conversation";
import { Message, Type } from "@/types/convo/message";
import { CursorPaginated } from "@/types/cursor/cursor-paginated";
import {  computed, ref } from "vue";

export function useInbox() {
    const pagedConversations = ref<CursorPaginated<ConvoWithParticipantsAndLatestMessage> | null>(null);
    
    const searchKey = ref('');
    const openedConvo = ref<ConvoWithParticipants| null>(null);
    const openedConvoMessages = ref<CursorPaginated<Message> | null>(null);
    const createConvo = ref(false);

    const convoFullLoading = ref(false);
    const loadMoreLoading = ref(false);
    const searchLoading = ref(false);
    const openedConvoMessagesLoading = ref(false);


    // ======================
    // COMPUTED
    // ======================
    const authUser = computed(()=> getAuthUser());

   

    // ======================
    // FUNCTIONS
    // ======================
    // Initialize first page
    const initializeConvos = async () => {
        pagedConversations.value = null
        if (convoFullLoading.value) return;

        convoFullLoading.value = true;

        try {
            const response = await conversationService.getConvos({});

            if (response.data) {
                pagedConversations.value = response;
            }
        } catch (e) {
            console.error("Error initializing conversations", e);
        } finally {
            convoFullLoading.value = false;
        }
    };

    const initializeOpenedConvoMessages = async () => {
        openedConvoMessages.value = null
        if (openedConvoMessagesLoading.value || !openedConvo.value) return;

        openedConvoMessagesLoading.value = true;

        try {
            const response = await conversationService.getConvoMessages(openedConvo.value.id, {});

            if (response.data) {
                openedConvoMessages.value = response;
            }
        } catch (e) {
            console.error("Error initializing open convo messages", e);
        } finally {
            openedConvoMessagesLoading.value = false;
        }
    }

    // Load convo next page
    const loadMoreConvo = async (nextCursor?: string | null) => {

        if (loadMoreLoading.value ) return;
        if (!nextCursor) return;
        loadMoreLoading.value = true;

        try {
            const response = await conversationService.getConvos({
                search: searchKey.value,
                cursor: nextCursor
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

    const createNewConvo = () => {
        openedConvo.value = null
        toggleCreateConvo(true)
    };

    const search = async (value?: string) => {

        searchKey.value = value??''
        if (searchLoading.value) return;

        searchLoading.value = true;
        try {
            
            const response = await conversationService.getConvos({
                search: value
            });

            if (response.data && pagedConversations.value) {
                pagedConversations.value.data = []
                pagedConversations.value.data.push(...response.data)
                pagedConversations.value.next_cursor = response.next_cursor;
                pagedConversations.value.prev_cursor = response.prev_cursor;
            }
        } catch (e) {
            console.error("Error searching conversations", e);
        } finally {
            searchLoading.value = false;
        }
    };

    const openChat = async (chat: ConvoWithParticipantsAndLatestMessage) => {
        toggleCreateConvo(false);
        openedConvo.value = chat
        await initializeOpenedConvoMessages();
    }


    const isOwnerChat = (message: Message) =>
        Number(message.sender?.id) === Number(authUser.value.id);


    
    const sendMessage = async(payload: {
        message: string;
        attachments: File[];
    }) => {

        if(!openedConvo.value) return;

        const sender = {
            id: authUser.value.id,
            display_name: authUser.value.display_name,
            avatar: authUser.value.avatar,
            role: authUser.value.role,
        }
        const clientID = generateClientId()

        openedConvoMessages.value?.data.push({
            id: generateTempMessageId(),
            client_id: clientID,
            sender: sender,
            body: payload.message,
            type: Type.Text,
            reply_to:  null,
            sent_at: null,
            is_edited: false,
            is_read: false,
            deleted_at:  null,
        })
        
       try {
            const data = await conversationService.storeConvoMessage(
                openedConvo.value.id,
                {
                    ...payload,
                    client_id: clientID
                }
            );

           const index = openedConvoMessages.value?.data.findIndex(
                message => message.client_id === clientID
            ) ?? -1;

            if (index !== -1) {
                openedConvoMessages.value!.data[index] = data
                updateSelectedConvoLastMessage(data)
            }

        } catch (e) {
            console.error("Error sending message", e);
        }
    }

    const updateSelectedConvoLastMessage = (message: Message) => {
        const conversations = pagedConversations.value?.data;
        if (!conversations || !openedConvo.value) return;

        const index = conversations.findIndex(
            convo => convo.id === openedConvo.value!.id
        );

        if (index === -1) return;

        const [convo] = conversations.splice(index, 1);

        convo.latest_message = message;

        conversations.unshift(convo);
    };


    const toggleCreateConvo = (value:boolean) =>  createConvo.value = value;

    return {
        pagedConversations,
        convoFullLoading,
        loadMoreLoading,
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
        createNewConvo
    };
}