import { isRequestCanceled, isSameRequestAbort, updatePagination } from "@/lib/utils";
import { conversationService as convoService } from "@/services/conversationService";
import { ConvoWithParticipants } from "@/types/convo/conversation";
import { MessageGroup } from "@/types/convo/message";
import { CursorPaginated, CursorPaginatedFiltersWithSearch } from "@/types/cursor/cursor-paginated";
import { computed, ref } from "vue";


export function useMessages() {

    const messageGroupList = ref<CursorPaginated<MessageGroup> | null>(null)
    const loadingMessages = ref(false);

    const loadingMoreMessages = ref(false);


    
    let messageAbortController: AbortController | null = null;
    let messageLoadMoreAbortController: AbortController | null = null;


    // ==================================
    // COMPUTED
    // ==================================

    const isNoMessageGroupList = computed(()=> !messageGroupList.value);




    // =====================================
    // INITIALIZE MESSAGES
    // =====================================
    const initializeMessages = async (openConvo: ConvoWithParticipants ) => {
        const controller = initializeMessageRequestAbort()
        startMessageGroupListLoading()

        const convoID = openConvo.id

        messageGroupList.value = await fetchMessageGroupList(
            convoID,
            {
                per_page: 10
            },
            controller.signal
        );

        if (isSameRequestAbort(messageAbortController, controller)) {
            endMessageGroupListLoading()
        }
    };


    const resetMessageGroupList=()=>{
        messageGroupList.value = null;
    }


    


    // =====================================
    // LOAD MESSAGES
    // =====================================
    const loadMoreMessages = async (
        openConvo: ConvoWithParticipants | null,
        nextCursor?: string | null
    ) => {

        const isNoNextCursor = nextCursor === null;
        if (!openConvo || isNoNextCursor) return;
        
        const controller = initializeLoadMoreMessageRequestAbort()
        startLoadMoreMessageGroupListLoading()
        
        const convoID = openConvo.id

        const response = await fetchMessageGroupList(
            convoID,
            {
                cursor: nextCursor,
                per_page: 10,
            },
            controller.signal
        )

        
        if(!isNoMessageGroupList.value && response){
            messageGroupList.value!.data.unshift(
                ...response.data
            );
            
            updatePagination(
                messageGroupList.value!,
                response
            );
        }

        if(isSameRequestAbort(messageLoadMoreAbortController, controller)){
            endLoadMoreMessageGroupListLoading()
        }
    };







    // =====================================
    // LOADING STATES
    // =====================================
    const startMessageGroupListLoading=()=>{
        resetMessageGroupList()
        loadingMessages.value = true;
    }

    const endMessageGroupListLoading=()=>{
        resetMessageRequestAbort()
        loadingMessages.value = false;
    }

    const startLoadMoreMessageGroupListLoading=()=>{
        loadingMoreMessages.value = true;
    }

    const endLoadMoreMessageGroupListLoading=()=>{
        resetLoadMoreMessageRequestAbort()
        loadingMoreMessages.value = false;
    }





    // =====================================
    // REQUEST ABORT FUNCTIONS
    // =====================================
    const initializeMessageRequestAbort=()=>{
        messageAbortController?.abort();
        const controller = new AbortController();
        messageAbortController = controller;
        return controller;
    }

    const initializeLoadMoreMessageRequestAbort=()=>{
        messageLoadMoreAbortController?.abort();
        const controller = new AbortController();
        messageLoadMoreAbortController = controller;
        return controller;
    }

   const resetMessageRequestAbort=()=>{
        messageAbortController = null;
   }
   
   const resetLoadMoreMessageRequestAbort=()=>{
        messageLoadMoreAbortController = null;
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
            
            if(signal?.aborted) return null

            return response.data ? response : null;

        } catch (error) {
            if (isRequestCanceled(error)) return null;

            console.error("Error fetching convo messages:", error);
            return null;
        }
    }


    return {
        messageGroupList,
        loadingMessages,
        loadingMoreMessages,
        isNoMessageGroupList,
        initializeMessages,
        loadMoreMessages,
        resetMessageGroupList,
    };
}
