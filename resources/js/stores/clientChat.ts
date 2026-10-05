import { defineStore } from 'pinia';
import axios from 'axios';
import type {
    ChatFilter,
    Conversation,
    Message,
} from '@/types/conversation';
import { User } from '@/types';

interface ChatState {
    conversations: Conversation[];
    activeConversation: Conversation | null;

    messages: Message[];

    agents: User[];

    filter: ChatFilter;

    search: string;

    loadingConversations: boolean;
    loadingMessages: boolean;
    sending: boolean;

    showNewConversation: boolean;
}

export const useChatStore = defineStore('chat', {
    state: (): ChatState => ({
        conversations: [],
        activeConversation: null,

        messages: [],

        agents: [],

        filter: 'all',

        search: '',

        loadingConversations: false,
        loadingMessages: false,
        sending: false,

        showNewConversation: false,
    }),

    getters: {
        filteredConversations(state): Conversation[] {
            let conversations = state.conversations;

            if (state.filter === 'unread') {
                conversations = conversations.filter(
                    (conversation) =>
                        (conversation.unread_count ?? 0) > 0,
                );
            }

            if (state.filter === 'groups') {
                conversations = conversations.filter(
                    (conversation) => conversation.is_group,
                );
            }

            if (state.search.trim()) {
                const search = state.search.toLowerCase();

                conversations = conversations.filter((conversation) =>
                    conversation.name
                        ?.toLowerCase()
                        .includes(search),
                );
            }

            return conversations;
        },

        unreadCount(state): number {
            return state.conversations.reduce(
                (total, conversation) =>
                    total + (conversation.unread_count ?? 0),
                0,
            );
        },
    },

    actions: {
        async fetchConversations() {
            this.loadingConversations = true;

            try {
                const response = await axios.get(
                    route('admin.chat.conversations'),
                    {
                        params: {
                            filter: this.filter,
                            search: this.search,
                        },
                    },
                );

                this.conversations = response.data.data;
            } finally {
                this.loadingConversations = false;
            }
        },

        async fetchMessages(conversationId: number) {
            this.loadingMessages = true;

            try {
                const response = await axios.get(
                    route(
                        'admin.chat.conversations.messages',
                        conversationId,
                    ),
                );

                this.messages = response.data.data;
            } finally {
                this.loadingMessages = false;
            }
        },

        async selectConversation(
            conversation: Conversation,
        ) {
            this.activeConversation = conversation;

            await this.fetchMessages(conversation.id);

            await this.markAsRead(conversation.id);
        },

        async markAsRead(conversationId: number) {
            await axios.post(
                route(
                    'admin.chat.conversations.read',
                    conversationId,
                ),
            );

            const conversation = this.conversations.find(
                (item) => item.id === conversationId,
            );

            if (conversation) {
                conversation.unread_count = 0;
            }
        },

        async sendMessage(
            conversationId: number,
            message: string,
            files: File[] = [],
        ) {
            this.sending = true;

            try {
                const formData = new FormData();

                formData.append('message', message);

                files.forEach((file) => {
                    formData.append('files[]', file);
                });

                const response = await axios.post(
                    route(
                        'admin.chat.messages.store',
                        conversationId,
                    ),
                    formData,
                    {
                        headers: {
                            'Content-Type':
                                'multipart/form-data',
                        },
                    },
                );

                this.messages.push(response.data.data);

                await this.fetchConversations();
            } finally {
                this.sending = false;
            }
        },

        async fetchAgents() {
            const response = await axios.get(
                route('admin.chat.agents'),
            );

            this.agents = response.data.data;
        },

        // async createConversation(message: string) {
        //     try {
        //         const response = await axios.post(
        //             route('client.convo.store'),
        //             {
        //                 message,
        //             },
        //         );

        //         const conversation = response.data.data;

        //         this.conversations.unshift(conversation);

        //         this.activeConversation = conversation;

        //         this.messages = conversation.messages ?? [];

        //         this.showNewConversation = false;

        //         return conversation;
        //     } catch (error) {
        //         console.error(
        //             'Failed to create conversation:',
        //             error,
        //         );

        //         throw error;
        //     }
        // },
    },
});