import { isLoading, isRequestCanceled, isSameRequestAbort, updatePagination } from "@/lib/utils";
import { conversationService as convoService } from "@/services/conversationService";
import { ConvoWithParticipants, ConvoWithParticipantsAndLatestMessage } from "@/types/convo/conversation";
import { MessageGroup } from "@/types/convo/message";
import { CursorPaginated, CursorPaginatedFiltersWithSearch } from "@/types/cursor/cursor-paginated";
import { computed, MaybeRefOrGetter, ref, toValue } from "vue";


interface Props {
    openConvo: MaybeRefOrGetter<ConvoWithParticipants | null>;
}

export function useMessages({
    openConvo = null
}: Props) {

    const messageGroupList = ref<CursorPaginated<MessageGroup> | null>(null)
    const loadingMessages = ref(false);

    // load more convo
    const loadingMoreConvos = ref(false);

    // search convo
    const oldConversationList = ref<CursorPaginated<ConvoWithParticipantsAndLatestMessage> | null>(null);
    const searchingConvos = ref(false);
    
    let messageAbortController: AbortController | null = null;
    let convoAbortController: AbortController | null = null;
    let convoLoadMoreAbortController: AbortController | null = null;
    let convoSearchAbortController: AbortController | null = null;


    // ==================================
    // COMPUTED
    // ==================================


    const isNoOpenConvo= computed(()=> !toValue(openConvo))
    const conversation = computed(()=> isNoOpenConvo.value? null : toValue(openConvo))


    // INITIALIZE MESSAGES

    const initializeMessages = async () => {

        if (isNoOpenConvo.value) return;

        const controller = initializeMessageRequestAbort()
        startMessageGroupListLoading()

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


    const resetMessageGroupList=()=>{
        messageGroupList.value = null;
    }

    const startMessageGroupListLoading=()=>{
        resetMessageGroupList()
        loadingMessages.value = true;
    }

    const endConvoListLoading=()=>{
        resetConvoRequestAbort()
        loadingConvos.value = false;
    }


    const initializeConvos = async () => {
        if (isLoading(loadingConvos.value)) return;

        const controller = initializeConvoRequestAbort()

        startConvoListLoading()

        conversationList.value = await fetchConversationList(
            {
                per_page: 10
            },
            controller.signal
        );
        
        console.log(conversationList.value)
        if (isSameRequestAbort(convoAbortController, controller)) {
            endConvoListLoading()
        }
    };

    const resetConversationList=()=>{
        conversationList.value = null;
    }

    const startConvoListLoading=()=>{
        resetConversationList()
        loadingConvos.value = true;
    }

    const endConvoListLoading=()=>{
        resetConvoRequestAbort()
        loadingConvos.value = false;
    }



    // LOAD MORE CONVO
    // const loadMoreConvo = async (
    //     nextCursor?: string | null
    // ) => {

    //     const hasNextCursor = nextCursor !== null;
    //     if (isLoading(loadingMoreConvos.value) || hasNextCursor) return;
        
    //     const controller = initializeLoadMoreConvoRequestAbort();

    //     startLoadingMoreConvo()

    //     const response = await fetchConversationList(
    //         {
    //             cursor: nextCursor,
    //             per_page: 10,
    //         },
    //         controller.signal
    //     )

    //     if (!isNoConvoOnList.value && response) {
    //         addConversationListData(response.data)
    //         updatePagination(conversationList.value!, response);
    //     }
        
    //     if(isSameRequestAbort(convoLoadMoreAbortController, controller)){
    //         endLoadingMoreConvo()
    //     }
    // };

    const startLoadingMoreConvo=()=>{
        loadingMoreConvos.value = true;
    }

    const endLoadingMoreConvo=()=>{
        resetLoadingMoreConvoRequestAbort()
        loadingConvos.value = false;
    }

    const addConversationListData=(data:ConvoWithParticipantsAndLatestMessage[])=>{
        conversationList.value!.data.push(...data);
    }

    const assignConversationListValue=(value: CursorPaginated<ConvoWithParticipantsAndLatestMessage> )=>{
        conversationList.value = value
    }









    // SEARCH CONVO
    const searchConvo = async (value?: string) => {
        const search = value?.trim();
        
        // Restore original conversations
        if (!search) {
            convoSearchAbortController?.abort();
            convoSearchAbortController = null;

            conversationList.value = oldConversationList.value;
            oldConversationList.value = null;

            searchingConvos.value = false;
            return;
        }

        if (isNoOldConvoOnList.value) {
            saveOldConvo()
        }

        const controller = initializeSearchConvoRequestAbort()
        startSearchingLoading()

        const response = await fetchConversationList(
            {
                search,
                per_page: 10,
            },
            controller.signal
        )

        if (!response) return;

        assignConversationListValue(response)

        if (convoSearchAbortController === controller) {
           endSearchingLoading()
        }

    };

    const saveOldConvo=()=>{
        oldConversationList.value = conversationList.value;
    }

    
    
    const startSearchingLoading=()=>{
        resetConversationList()
        searchingConvos.value = true;
    }

    const endSearchingLoading=()=>{
        resetSearchConvoRequestAbort()
        searchingConvos.value = false;
    }





    

    // REQUEST ABORT FUNCTIONS
    const initializeMessageRequestAbort=()=>{
        messageGroupAbortController?.abort();
        const controller = new AbortController();
        messageGroupAbortController = controller;
        return controller;
    }

    const initializeLoadMoreConvoRequestAbort=()=>{
        convoLoadMoreAbortController?.abort();
        const controller = new AbortController();
        convoLoadMoreAbortController = controller;
        return controller;
    }

    const initializeSearchConvoRequestAbort=()=>{
        convoSearchAbortController?.abort();
        const controller = new AbortController();
        convoSearchAbortController = controller;
        return controller;
    }

    const resetConvoRequestAbort=()=>{
        convoAbortController = null;
    }

    const resetLoadingMoreConvoRequestAbort=()=>{
        convoLoadMoreAbortController = null;
    }


    const resetSearchConvoRequestAbort=()=>{
        convoSearchAbortController = null;
    }

    


    // ======================================
    // FETCH ASYNC
    // ======================================
    async function fetchMessageGroupList(
        convoID: number,
        filters: CursorPaginatedFiltersWithSearch,
        signal?: AbortSignal
    ) {
        try {
            const response = await convoService.getConvoMessages(
                convoID,
                filters,
                signal
            );

            return response.data ? response : null;

        } catch (error) {
            if (isRequestCanceled(error)) return null;

            console.error("Error fetching convo messages:", error);
            return null;
        }

        try {
            const response = await convoService.getConvoMessages(
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

        }
    }

    return {

    };
}
