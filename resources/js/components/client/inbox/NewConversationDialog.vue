<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { Icon } from '@iconify/vue';

import { useChatStore } from '@/stores/clientChat';

const chat = useChatStore();

const message = ref('');

const submitting = ref(false);
const submissionError = ref('');

async function submit() {
    if (
        !message.value.trim() ||
        submitting.value
    ) {
        return;
    }

    submitting.value = true;
    submissionError.value = '';

    try {
        await chat.createConversation(message.value.trim());
        message.value = '';
    } catch (error: unknown) {
        if (axios.isAxiosError<{
            message?: string;
            errors?: Record<string, string[]>;
        }>(error)) {
            const response = error.response?.data;
            submissionError.value =
                Object.values(response?.errors ?? {})[0]?.[0] ??
                response?.message ??
                'Unable to send your request. Please try again.';
        } else {
            submissionError.value =
                'Unable to send your request. Please try again.';
        }
    } finally {
        submitting.value = false;
    }
}
</script>

<template>
    <div
        v-if="chat.showNewConversation"
        class="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/60
            p-4
            backdrop-blur-sm
        "
        @click.self="
            chat.showNewConversation = false
        "
    >
        <div
            class="
                w-full max-w-md
                overflow-hidden
                rounded-2xl
                border border-white/10
                bg-[#1b1d1e]
                shadow-2xl
            "
        >
            <!-- Header -->
            <div
                class="
                    flex items-start
                    justify-between
                    border-b border-white/10
                    px-5 py-4
                "
            >
                <div>
                    <div
                        class="
                            flex items-center gap-2
                        "
                    >
                        <div
                            class="
                                flex size-9
                                items-center justify-center
                                rounded-full
                                bg-[#edbd53]/15
                                text-[#edbd53]
                            "
                        >
                            <Icon
                                icon="lucide:message-circle"
                                class="size-5"
                            />
                        </div>

                        <h2
                            class="
                                text-lg
                                font-bold
                                text-white
                            "
                        >
                            Compose new chat
                        </h2>
                    </div>

                    <p
                        class="
                            mt-2
                            text-sm
                            text-white/45
                        "
                    >
                        Send a request to our travel team.
                        An available agent will assist you.
                    </p>
                </div>

                <button
                    type="button"
                    class="
                        flex size-8
                        items-center justify-center
                        rounded-full
                        text-white/40
                        transition
                        hover:bg-white/10
                        hover:text-white
                    "
                    @click="
                        chat.showNewConversation = false
                    "
                >
                    <Icon
                        icon="lucide:x"
                        class="size-5"
                    />
                </button>
            </div>

            <!-- Form -->
            <form
                class="space-y-4 p-5"
                @submit.prevent="submit"
            >
                <!-- Message -->
                <div class="space-y-2">
                    <label
                        class="
                            text-sm
                            font-medium
                            text-white/80
                        "
                    >
                        Message
                    </label>

                    <textarea
                        v-model="message"
                        rows="5"
                        maxlength="2000"
                        placeholder="Tell us how we can help..."
                        class="
                            w-full
                            resize-none
                            rounded-xl
                            border border-white/10
                            bg-white/5
                            px-4 py-3
                            text-sm
                            text-white
                            outline-none
                            transition
                            placeholder:text-white/30
                            focus:border-[#edbd53]/60
                            focus:ring-1
                            focus:ring-[#edbd53]/30
                        "
                    />

                    <p
                        v-if="submissionError"
                        role="alert"
                        class="text-sm text-red-400"
                    >
                        {{ submissionError }}
                    </p>
                </div>

                <!-- Notice -->
                <div
                    class="
                        flex gap-3
                        rounded-xl
                        border border-[#edbd53]/10
                        bg-[#edbd53]/5
                        p-3
                    "
                >
                    <Icon
                        icon="lucide:info"
                        class="
                            mt-0.5
                            size-4
                            shrink-0
                            text-[#edbd53]
                        "
                    />

                    <p
                        class="
                            text-xs
                            leading-relaxed
                            text-white/50
                        "
                    >
                        Your request will be sent to our
                        travel team. An admin will assign
                        an available agent to assist you.
                    </p>
                </div>

                <!-- Actions -->
                <div
                    class="
                        flex
                        justify-end
                        gap-2
                        pt-1
                    "
                >
                    <button
                        type="button"
                        class="
                            rounded-xl
                            px-4 py-2.5
                            text-sm
                            font-medium
                            text-white/60
                            transition
                            hover:bg-white/5
                            hover:text-white
                        "
                        :disabled="submitting"
                        @click="
                            chat.showNewConversation = false
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-[#edbd53]
                            px-5 py-2.5
                            text-sm
                            font-semibold
                            text-black
                            transition
                            hover:bg-[#f3cc76]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                        :disabled="
                            !message.trim() ||
                            submitting
                        "
                    >
                        <Icon
                            v-if="submitting"
                            icon="lucide:loader-2"
                            class="size-4 animate-spin"
                        />

                        <Icon
                            v-else
                            icon="lucide:send"
                            class="size-4"
                        />

                        {{
                            submitting
                                ? 'Sending...'
                                : 'Send request'
                        }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>