import { defineStore } from "pinia"
import { computed, ref } from "vue"
import echo from "@/echo"
import { Message, StoredSession } from "@/types/chat";
import { localStorage, StorageKey } from "@/services/localStorageService";
import { sessionChatService as chatService } from "@/services/sessionChatService";


export const useSessionChat = defineStore('session-chat', () => {

    // const chats = ref<ChatSessionWithLatestMessage[]>([]);
    const messages = ref<Message[]>([]);
    const flagValid = ref(false);

    const initializing = ref(false);
    const creatingSession = ref(false);


    // =========================================
    // COMPUTED
    // =========================================

    const storedSession = computed(()=>
        localStorage.getStorageDataByKey<StoredSession>(StorageKey.CHAT_SESSION))

    const isEmptySession = computed(()=> storedSession.value === null);

    const isValidSession = computed(() => flagValid.value)

    const isCreatingSession = computed(()=> creatingSession.value);

    const isInitializing = computed(()=> initializing.value);

    const getMessages = computed<Message[]>(()=> messages.value)

    const totalNewMessages = computed(() => getMessages.value.filter(
        message => message.sender_type === 'admin' && message.state === 'unread'
    ).length)

    const isEmptyNewMessages = computed(() => totalNewMessages.value <= 0)



    // =========================================
    // FUNCTIONS
    // =========================================

    const initializeStoredChat = async () => {
        flagValid.value = false;
        if(isEmptySession.value) return;
        const { uuid, token } = storedSession.value!;

        initializing.value = true;
        const validated = await validateSession(uuid, token);
        if(!validated){
            initializing.value = false;
            flagValid.value = false;
            return;
        };

        subscribeToChatSession(uuid);

        const data = await fetchMessage(uuid, token);
        messages.value = data;
        
        localStorage.setStorageDataByKey(StorageKey.CHAT_SESSION, {
            uuid: uuid,
            token: token,
        });

        flagValid.value = true;
        initializing.value = false;
    }
    
    const createChatSession = async () => {
        flagValid.value = false;
        creatingSession.value = true;
        const session = await createNewSession()
        if(!session) {
            flagValid.value = false;
            creatingSession.value = false;
            return;
        };
        
        subscribeToChatSession(session.uuid);
        
        localStorage.setStorageDataByKey(StorageKey.CHAT_SESSION, {
            uuid: session.uuid,
            token: session.token,
            valid: true,
        });
        flagValid.value = true;
        creatingSession.value = false;
    }
    

    
    const markMessagesAsRead = async () => {
        if(isEmptySession.value) return;
        if(!flagValid.value) return;
        if(!isEmptyNewMessages.value) return;
        const { uuid, token } = storedSession.value!;


        messages.value = messages.value.map(message =>
                messages.value.some(m => m.id === message.id && m.state === 'unread' && m.sender_type === 'admin')
                    ? { ...message, state: 'read' }
                    : message
            );

        try {
            await chatService.markChatMessagesAsRead(uuid, token);
        } catch (error) {
            console.error('Failed to mark chat messages as read:', error)
        }
    }

    //=======================================
    // API SERVICE FUNCTIONS
    //=======================================
    async function validateSession(uuid: string, token:string){
        try {
            const data = await chatService.validateSessionChat(uuid, token)
            return data.is_valid;
        }catch(e){
            console.error('Invalid chat session credentials: ', e);
            return false;
        }
    }

    async function fetchMessage (uuid: string, token: string) {
        try {
            const data = await chatService.fetchChatMessagesByUUID(uuid, token);
            return data;
        }catch(e){
            console.error('Error fetching chat messages: ', e);
            return [];
        }
    }

    
    async function createNewSession(){
        try {
            const data = await chatService.createChat();
            return data;
        }catch(e){
            console.error('Error creating new chat session: ', e);
            return null;
        }
    }
    

    
    function subscribeToChatSession(uuid: string) {
        console.log('Subscribing to chat session...');
        
        const channelName = `chat.session.${uuid}`;

        echo
            .channel(channelName)
            .listen('.message.sent', (event: Message) => {

                // Prevent duplicate messages
                const exists = messages.value.some(
                    message => message.id === event.id
                )

                if (exists) return
                
                console.log('Received new message event:', event);
                messages.value.push({
                    ...event,
                })
            })
        
        console.log('Subscribed to chat session channel');
    }




    return {
        

        initializeStoredChat,
        createChatSession,
        subscribeToChatSession,
        
        isValidSession,
        isCreatingSession,
        isInitializing,

        totalNewMessages,
        isEmptyNewMessages,

        storedSession,
        getMessages,

        markMessagesAsRead,
    }
})