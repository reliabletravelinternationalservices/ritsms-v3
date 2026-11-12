import { isRequestCanceled, isSameRequestAbort, updatePagination } from "@/lib/utils";
import { conversationService as convoService } from "@/services/conversationService";
import { ConvoWithParticipantsAndLatestMessage } from "@/types/convo/conversation";
import { CursorPaginated, CursorPaginatedFiltersWithSearch } from "@/types/cursor/cursor-paginated";
import { computed, ref } from "vue";


export function useConversations() {

    const conversationList = ref<CursorPaginated<ConvoWithParticipantsAndLatestMessage> | null>(null);
    const loadingConvos = ref(false);

    // load more convo
    const loadingMoreConvos = ref(false);

    // search convo
    const oldConversationList = ref<CursorPaginated<ConvoWithParticipantsAndLatestMessage> | null>(null);
    const searchingConvos = ref(false);

    const searchFlag = ref<string | null>(null);
    
    let convoAbortController: AbortController | null = null;
    let convoLoadMoreAbortController: AbortController | null = null;
    let convoSearchAbortController: AbortController | null = null;


    // ==================================
    // COMPUTED
    // ==================================

    const isNoConvoOnList = computed(()=> !conversationList.value || !conversationList.value.data)
    const isNoOldConvoOnList = computed(()=> !oldConversationList.value || !oldConversationList.value.data)


    // INITIALIZE CONVERSATIONS
    const initializeConvos = async () => {

        const controller = initializeConvoRequestAbort()

        startConvoListLoading()

        conversationList.value = await fetchConversationList(
            {
                per_page: 10
            },
            controller.signal
        );
        
        if (isSameRequestAbort(convoAbortController, controller)) {
            endConvoListLoading()
        }
    };

    const resetConversationList=()=>{
        conversationList.value = null;
    }






    // =====================================
    // LOAD CONVO
    // =====================================
    const loadMoreConvo = async (
        nextCursor?: string | null
    ) => {
        
        const isNoNextCursor = nextCursor === null;
        if (isNoNextCursor) return;
        
        const controller = initializeLoadMoreConvoRequestAbort();

        startLoadingMoreConvo()

        const response = await fetchConversationList(
            {
                cursor: nextCursor,
                per_page: 10,
            },
            controller.signal
        )

        if (!isNoConvoOnList.value && response) {
            conversationList.value!.data.push(...response.data);
            updatePagination(conversationList.value!, response);
            
        }
        
        if(isSameRequestAbort(convoLoadMoreAbortController, controller)){
            endLoadingMoreConvo()
        }

        console.log(conversationList.value)
    };


    const assignConversationListValue=(value: CursorPaginated<ConvoWithParticipantsAndLatestMessage> )=>{
        conversationList.value = value
    }







    // =====================================
    // SEARCH CONVO
    // =====================================
    const searchConvo = async (value?: string) => {
        const search = value?.trim();
        
        // Restore original conversations
        if (!search) {
            searchFlag.value = null

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

        searchFlag.value = search
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

    
    




    // =====================================
    // LOADING STATES
    // =====================================
    const startLoadingMoreConvo=()=>{
        loadingMoreConvos.value = true;
    }

    const endLoadingMoreConvo=()=>{
        resetLoadMoreConvoRequestAbort()
        loadingMoreConvos.value = false;
    }
    
    const startConvoListLoading=()=>{
        resetConversationList()
        loadingConvos.value = true;
    }

    const endConvoListLoading=()=>{
        resetConvoRequestAbort()
        loadingConvos.value = false;
    }

    const startSearchingLoading=()=>{
        resetConversationList()
        searchingConvos.value = true;
    }

    const endSearchingLoading=()=>{
        resetSearchConvoRequestAbort()
        searchingConvos.value = false;
    }



    
    // =====================================
    // REQUEST ABORT FUNCTIONS
    // =====================================
    const initializeConvoRequestAbort=()=>{
        convoAbortController?.abort()
        const controller = new AbortController();
        convoAbortController = controller;
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

    const resetLoadMoreConvoRequestAbort=()=>{
        convoLoadMoreAbortController = null;
    }

    const resetSearchConvoRequestAbort=()=>{
        convoSearchAbortController = null;
    }

    


    // ======================================
    // FETCH ASYNC
    // ======================================
    async function fetchConversationList(
        filters: CursorPaginatedFiltersWithSearch,
        signal?: AbortSignal
    ) {
        try {
            const response = await convoService.getConvos(filters, signal);
            
            if(signal?.aborted) return null;

            return response.data ? response : null;

        } catch (error) {
            if (isRequestCanceled(error)) return null;

            console.error("Error fetching conversations:", error);
            return null;
        }
    }

    return {
        conversationList,
        oldConversationList,
        loadingConvos,
        loadingMoreConvos,
        searchingConvos,
        searchFlag,
        initializeConvos,
        loadMoreConvo,
        searchConvo,
    };
}
