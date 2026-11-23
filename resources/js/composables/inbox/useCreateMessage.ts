import { generateClientId, generateTempMessageId } from "@/lib/utils";
import { conversationService } from "@/services/conversationService";
import { User } from "@/types";
import { Message, MessageGroup, Type } from "@/types/convo/message";


export function useCreateMessage() {
    
    

    // ===============================
    // TEMP MESSAGES
    // ===============================

    
    const storeTempMessageLocally=(messageGroupList: MessageGroup[], message: Message)=>{
        const groups =  messageGroupList;
        const lastGroup = groups.at(-1);

        // Append to the last group if the sender is the same.
        if (lastGroup && canAppendToLastGroup(lastGroup, message)) {
            lastGroup.messages.push(message);
        } else {
            groups.push(createNewBatch(message));
        }
    }


    const replaceTempMessage=(
        messageGroupList: MessageGroup[], 
        message: Message, 
    )=>{

        for (const group of messageGroupList) {
            const messageIndex = group.messages.findIndex(
                msg => msg.client_id === message.client_id
            );

            if (messageIndex !== -1) {
                group.messages[messageIndex] = message;
                break;
            }
        }
    }
    

    const removeTempMessage=(
        messageGroupList: MessageGroup[], 
        message: Message
    )=>{

        for (let i = messageGroupList.length - 1; i >= 0; i--) {
            const group = messageGroupList[i];

            group.messages = group.messages.filter(
                msg => msg.client_id !== message.client_id
            );

            // Remove empty groups.
            if (group.messages.length === 0) {
                messageGroupList.splice(i, 1);
            }
        }
    }

    

    const createTempMessage = (
        sender: User,
        message: string,
        attachments: File[],
    ): Message => ({
        id: generateTempMessageId(),
        client_id: generateClientId(),
        sender: {
            id: sender.id,
            display_name: sender.display_name,
            avatar: sender.avatar,
            role: sender.role,
        },
        body: message,
        type: Type.Text,
        reply_to: null,
        sent_at: null,
        local_sent_at: new Date().toISOString(),
        is_edited: false,
        is_read: false,
        deleted_at: null,
        
    });

    const createNewBatch = (message: Message): MessageGroup => ({
        id: typeof message.id === 'number' ? message.id : generateTempMessageId(),
        sender: message.sender,
        sent_at:
            message.local_sent_at ??
            message.sent_at ??
            new Date().toISOString(),
        messages: [message],
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

        if (
            !lastMessage ||
            lastMessage.type === Type.System ||
            message.type === Type.System
        ) {
            return false;
        }

        const lastSentAt =
            lastMessage.sent_at ??
            lastMessage.local_sent_at ??
            lastGroup.sent_at;
        const currentSentAt = message.sent_at ?? message.local_sent_at;

        if (!lastSentAt || !currentSentAt) {
            return false;
        }

        const lastDate = new Date(lastSentAt);
        const currentDate = new Date(currentSentAt);
        const lastTime = lastDate.getTime();
        const currentTime = currentDate.getTime();

        if (!Number.isFinite(lastTime) || !Number.isFinite(currentTime)) {
            return false;
        }

        if (lastDate.toDateString() !== currentDate.toDateString()) {
            return false;
        }

        const difference = currentTime - lastTime;

        // Same sender, chronological order, within 5 minutes
        return difference >= 0 && difference <= 5 * 60 * 1000;
    };
    
    
    
    // ======================================
    // FETCH ASYNC
    // ======================================
    
    const storeMessage= async (
        convoID: number,
        payload: {
            client_id: string
            message: string
            attachments: File[]    
    })=>{
        try {
            const response = await conversationService.storeConvoMessage(
                convoID,
                payload
            );

            return response
            
        } catch (error) {
            console.error("Error sending message", error);
            return null;
        }
    }
    

    return {
        createTempMessage,
        storeTempMessageLocally,
        storeMessage,
        replaceTempMessage,
        removeTempMessage,
    };
}
