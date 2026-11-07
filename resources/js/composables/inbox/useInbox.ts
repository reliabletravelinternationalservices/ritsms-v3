import { conversationService } from "@/services/conversationService";
import { ConvoWithParticipants, ConvoWithParticipantsAndLatestMessage } from "@/types/convo/conversation";
import { CursorPaginated } from "@/types/cursor/cursor-paginated";
import {  ref } from "vue";

export function useInbox() {
    const pagedConversations = ref<CursorPaginated<ConvoWithParticipantsAndLatestMessage> | null>(null);

    const convoFullLoading = ref(false);
    const loadMoreLoading = ref(false);
    const searchLoading = ref(false);
    const searchKey = ref('');
    const openedConvo = ref<ConvoWithParticipants| null>(null)

    // ======================
    // COMPUTED
    // ======================
   

    // ======================
    // FUNCTIONS
    // ======================
    // Initialize first page
    const initializeConvos = async (search?: string) => {
        if (convoFullLoading.value) return;

        convoFullLoading.value = true;

        try {
            const response = await conversationService.getConvos({ search });

            if (response.data) {
                pagedConversations.value = response;
            }
        } catch (e) {
            console.error("Error initializing conversations", e);
        } finally {
            convoFullLoading.value = false;
        }
    };

    // Load next page
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

    const create = () => {
        console.log("Create new chat");
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

    const openChat = (chat: ConvoWithParticipantsAndLatestMessage) => {
        openedConvo.value = chat
    }

    

    return {
        pagedConversations,
        convoFullLoading,
        loadMoreLoading,
        openedConvo,
        searchLoading,
        initializeConvos,
        loadMoreConvo,
        create,
        search,
        openChat,

    };
}