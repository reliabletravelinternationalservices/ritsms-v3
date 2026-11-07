import { conversationService } from "@/services/conversationService";
import { ConvoWithParticipants, ConvoWithParticipantsAndLatestMessage } from "@/types/convo/conversation";
import { CursorPaginated } from "@/types/cursor/cursor-paginated";
import {  ref } from "vue";

export function useInbox() {
    const pagedConversations = ref<CursorPaginated<ConvoWithParticipantsAndLatestMessage> | null>(null);

    const loadingInitConvo = ref(false);
    const loadingConversations = ref(false);
    const openedConvo = ref<ConvoWithParticipants| null>(null)

    // ======================
    // COMPUTED
    // ======================
   

    // ======================
    // FUNCTIONS
    // ======================
    // Initialize first page
    const initializeConvos = async (search?: string) => {
        if (loadingInitConvo.value) return;

        loadingInitConvo.value = true;

        try {
            const response = await conversationService.getConvos({ search });

            if (response.data) {
                pagedConversations.value = response;
            }
        } catch (e) {
            console.error("Error initializing conversations", e);
        } finally {
            loadingInitConvo.value = false;
        }
    };

    // Load next page
    const loadConvos = async (filters: {
        search?: string, nextCursor?: string | null
    }) => {

        console.log('loading convo')
        if (loadingConversations.value) return;
        

        if (!filters.nextCursor) return;

        loadingConversations.value = true;

        try {
            const response = await conversationService.getConvos({
                search: filters.search,
                cursor: filters.nextCursor
            });

            if (response.data && pagedConversations.value) {
                pagedConversations.value.data.push(...response.data);

                pagedConversations.value.next_cursor = response.next_cursor;
                pagedConversations.value.prev_cursor = response.prev_cursor;
            }
        } catch (e) {
            console.error("Error loading conversations", e);
        } finally {
            loadingConversations.value = false;
        }
    };

    const create = () => {
        console.log("Create new chat");
    };

    const search = (value?: string) => {
        console.log("Search:", value);
    };

    const openChat = (chat: ConvoWithParticipantsAndLatestMessage) => {
        openedConvo.value = chat
    }

    

    return {
        pagedConversations,
        loadingInitConvo,
        loadingConversations,
        openedConvo,
        initializeConvos,
        loadConvos,
        create,
        search,
        openChat,

    };
}