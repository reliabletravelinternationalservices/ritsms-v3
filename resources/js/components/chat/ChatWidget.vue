<script setup lang="ts">
import { computed, ref } from 'vue'
import { MessageCircle, Send, X } from '@lucide/vue'
import { Icon } from '@iconify/vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatMessage {
    id: number
    message: string
    created_at: string
    sender: 'user' | 'admin'
}

const isOpen = ref(false)
const hasSession = ref(false)
const message = ref('')

const messages = ref<ChatMessage[]>([])

function createChatSession() {
    hasSession.value = true

    // Later:
    // router.post(route('chat.sessions.store'))
}

function sendMessage() {
    const value = message.value.trim()

    if (!value || !hasSession.value) {
        return
    }

    messages.value.push({
        id: Date.now(),
        message: value,
        created_at: new Date().toISOString(),
        sender: 'user',
    })

    message.value = ''

    // Later:
    // router.post(route('chat.messages.store'), {
    //     message: value,
    // })
}

function closeChat() {
    isOpen.value = false
}

function openChat() {
    isOpen.value = true
}

/**
 * Detect URLs inside a message.
 */
function getMessageParts(message: string) {
    const urlRegex = /(https?:\/\/[^\s]+)/g

    return message.split(urlRegex).map((part) => {
        const isUrl = /^https?:\/\/[^\s]+$/.test(part)

        return {
            text: part,
            isUrl,
        }
    })
}

const canSend = computed(() => {
    return message.value.trim().length > 0
})
</script>

<template>
    <div class="fixed bottom-5 right-5 z-50 text-foreground">

        <!-- Chat Window -->
        <div
            v-if="isOpen"
            class="mb-3 flex h-[500px] w-[360px] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl"
        >

            <!-- Header -->
            <div
                class="flex items-center justify-between border-b px-4 py-3"
            >
                <div>
                    <h3 class="font-semibold">
                        Chat
                    </h3>

                    <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                            v-if="hasSession"
                            class="size-2 rounded-full bg-green-500"
                        />

                        <p>
                            {{ hasSession ? 'Online' : 'Start a conversation' }}
                        </p>
                    </div>
                </div>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    @click="closeChat"
                >
                    <X class="size-4" />
                </Button>
            </div>


            <!-- Start Chat -->
            <div
                v-if="!hasSession"
                class="flex flex-1 flex-col items-center justify-center px-6 text-center"
            >
                <div
                    class="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10"
                >
                    <MessageCircle class="size-7 text-primary" />
                </div>

                <h4 class="mb-1 font-semibold">
                    Start a conversation
                </h4>

                <p class="mb-5 text-sm text-muted-foreground">
                    Send us a message and we'll get back to you.
                </p>

                <Button
                    type="button"
                    class="w-full"
                    @click="createChatSession"
                >
                    <MessageCircle class="mr-2 size-4" />
                    Start Chat
                </Button>
            </div>


            <!-- Chat Session -->
            <template v-else>

                <!-- Messages -->
                <div class="flex-1 overflow-y-auto p-4">

                    <!-- Empty -->
                    <div
                        v-if="messages.length === 0"
                        class="flex h-full items-center justify-center text-center"
                    >
                        <div>
                            <MessageCircle
                                class="mx-auto mb-2 size-8 text-muted-foreground"
                            />

                            <p class="text-sm text-muted-foreground">
                                Send a message to start the conversation.
                            </p>
                        </div>
                    </div>


                    <!-- Message List -->
                    <div
                        v-else
                        class="space-y-3"
                    >
                        <div
                            v-for="item in messages"
                            :key="item.id"
                            class="flex"
                            :class="
                                item.sender === 'user'
                                    ? 'justify-end'
                                    : 'justify-start'
                            "
                        >
                            <div
                                class="max-w-[80%] rounded-2xl px-3 py-2 text-sm"
                                :class="
                                    item.sender === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                "
                            >
                                <template
                                    v-for="(part, index) in getMessageParts(item.message)"
                                    :key="index"
                                >
                                    <a
                                        v-if="part.isUrl"
                                        :href="part.text"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="break-all underline underline-offset-2"
                                    >
                                        {{ part.text }}
                                    </a>

                                    <span v-else>
                                        {{ part.text }}
                                    </span>
                                </template>
                            </div>
                        </div>
                    </div>

                </div>


                <!-- Message Input -->
                <div class="border-t p-3">
                    <div class="flex items-center gap-2">

                        <Input
                            v-model="message"
                            placeholder="Write a message..."
                            class="flex-1"
                            @keyup.enter="sendMessage"
                        />

                        <Button
                            type="button"
                            size="icon"
                            :disabled="!canSend"
                            @click="sendMessage"
                        >
                            <Send class="size-4" />
                        </Button>

                    </div>
                </div>

            </template>
        </div>


        <!-- Floating Chat Button -->
        <button
            v-if="!isOpen"
            type="button"
            class="flex size-14 items-center justify-center rounded-full bg-yellow-600 text-foreground shadow-xl transition-colors hover:bg-yellow-400"
            @click="openChat"
        >
            <Icon
                icon="lucide:message-circle-more"
                width="28"
                height="28"
            />
        </button>

    </div>
</template>