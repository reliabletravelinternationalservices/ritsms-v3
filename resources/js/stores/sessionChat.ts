import { defineStore } from "pinia"
import { computed, ref } from "vue"
import axios from 'axios'
import { ChatSession, ChatSessionWithLatestMessage, Message, StoredSession } from "@/types/chat";
import echo from "@/echo";
import { localStorage, StorageKey } from "@/services/localStorageService";
import { sessionChatService as chatService } from "@/services/sessionChatService";


export const useSessionChat = defineStore('session-chat', () => {
    const SESSION_KEY = 'reliable_chat_session';
    
    const chats = ref<ChatSessionWithLatestMessage[]>([]);
    const messages = ref<Message[]>([]);

    const initializing = ref(false);
    const creatingSession = ref(false);


    // =========================================
    // COMPUTED
    // =========================================

    const storedSession = computed(()=>
        localStorage.getStorageDataByKey<StoredSession>(StorageKey.CHAT_SESSION))

    const isEmptySession = computed(()=> storedSession.value === null);

    const isValidSession = computed(() => !isEmptySession.value && storedSession.value!.valid)

    const isCreatingSession = computed(()=> creatingSession.value);

    const isInitializing = computed(()=> initializing.value);


    // =========================================
    // FUNCTIONS
    // =========================================

    // TODO: TO INITIALIZE THE CLIENT CHAT SESSION
    const initializeStoredChat = async () => {
        if(isEmptySession.value) return;
        const { uuid, token } = storedSession.value!;

        initializing.value = true;

        const validated = await validateSession(uuid, token);
        if(!validated){
            initializing.value = false;
            storedSession.value!.valid = false;
            return;
        };

        const data = await fetchMessage(uuid, token);
        messages.value = data;
        storedSession.value!.valid = true;
        initializing.value = false;
    }
    
    const createChatSession = async () => {
        
        creatingSession.value = true;
        const session = await createNewSession()
        if(!session) {
            creatingSession.value = false;
            return;
        };
        
        const sessionData = {
            uuid: session.uuid,
            token: session.token,
            valid: true,
        };
        
        localStorage.setStorageDataByKey(StorageKey.CHAT_SESSION, sessionData);
        creatingSession.value = false;
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
    

    





    return {
        

        initializeStoredChat,
        createChatSession,
        
        isValidSession,
        isCreatingSession,
        isInitializing,

    }
})