import { generateClientId, generateTempMessageId, isRequestCanceled, isSameRequestAbort, updatePagination } from "@/lib/utils";
import { conversationService as convoService } from "@/services/conversationService";
import { ConvoWithParticipants } from "@/types/convo/conversation";
import { Message, MessageGroup, Type, User } from "@/types/convo/message";
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

        if (!openConvo) return;

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

        const hasNextCursor = nextCursor !== null;
        if (!openConvo || hasNextCursor) return;
        
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



    // ====================================
    // SEND MESSAGES
    // ====================================
    const sendMessage = async (
        lastBatch: MessageGroup,
        payload: {
            convoID: number;
            sender: User;
            message: string;
            attachments: File[];
    }) => {

        const clientID = generateClientId();

        const tempMessage = createTempMessage({
            ...payload,
            clientID
        });

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
    





    // ===============================
    // CREATING TEMP MESSAGES
    // ===============================
    const createTempMessage = ( payload: {
        sender: User,
        message: string,
        clientID: string
    }): Message => ({
        id: generateTempMessageId(),
        client_id: payload.clientID,
        sender: {
            id: payload.sender.id,
            display_name: payload.sender.display_name,
            avatar: payload.sender.avatar,
            role: payload.sender.role,
        },
        body: payload.message,
        type: Type.Text,
        reply_to: null,
        sent_at: new Date().toISOString(),
        is_edited: false,
        is_read: false,
        deleted_at: null,
    });


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
        initializeMessages,
        loadMoreMessages,
        resetMessageGroupList,
    };
}
