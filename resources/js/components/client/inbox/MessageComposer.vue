<script setup lang="ts">
import {
    computed,
    nextTick,
    ref,
} from 'vue';

import { Icon } from '@iconify/vue';

import { useChatStore } from '@/stores/clientChat';

const chat = useChatStore();

const message = ref('');
const files = ref<File[]>([]);

const fileInput = ref<HTMLInputElement | null>(null);

const canSend = computed(() => {
    return (
        message.value.trim().length > 0 ||
        files.value.length > 0
    );
});

function openFilePicker() {
    fileInput.value?.click();
}

function handleFiles(
    event: Event,
) {
    const target =
        event.target as HTMLInputElement;

    if (!target.files) {
        return;
    }

    files.value = [
        ...files.value,
        ...Array.from(target.files),
    ];

    target.value = '';
}

function removeFile(index: number) {
    files.value.splice(index, 1);
}

async function send() {
    if (
        !canSend.value ||
        !chat.activeConversation ||
        chat.sending
    ) {
        return;
    }

    const text = message.value.trim();

    message.value = '';

    const attachments = [...files.value];

    files.value = [];

    await chat.sendMessage(
        chat.activeConversation.id,
        text,
        attachments,
    );

    await nextTick();
}

function handleKeydown(
    event: KeyboardEvent,
) {
    if (
        event.key === 'Enter' &&
        !event.shiftKey
    ) {
        event.preventDefault();

        send();
    }
}
</script>

<template>
    <div
        class="
            shrink-0
            border-t border-white/10
            bg-[#17191a]
            px-4 py-3
        "
    >
        <!-- Attachments -->
        <div
            v-if="files.length"
            class="
                mb-3
                flex flex-wrap gap-2
            "
        >
            <div
                v-for="(file, index) in files"
                :key="`${file.name}-${index}`"
                class="
                    flex items-center gap-2
                    rounded-lg
                    bg-white/10
                    px-3 py-2
                    text-xs
                "
            >
                <Icon
                    icon="lucide:file"
                    class="size-4 text-[#edbd53]"
                />

                <span class="max-w-40 truncate">
                    {{ file.name }}
                </span>

                <button
                    type="button"
                    class="
                        text-white/40
                        hover:text-white
                    "
                    @click="removeFile(index)"
                >
                    ×
                </button>
            </div>
        </div>

        <div class="mx-auto max-w-4xl">
            <div
                class="
                    flex items-end gap-2
                    rounded-2xl
                    bg-white/10
                    px-3 py-2
                "
            >
                <!-- File -->
                <button
                    type="button"
                    class="
                        flex size-9
                        shrink-0
                        items-center justify-center
                        rounded-full
                        text-[#edbd53]
                        transition
                        hover:bg-white/10
                    "
                    @click="openFilePicker"
                >
                    <Icon
                        icon="lucide:paperclip"
                        class="size-5"
                    />
                </button>

                <input
                    ref="fileInput"
                    type="file"
                    multiple
                    class="hidden"
                    accept="
                        image/*,
                        application/pdf,
                        .doc,
                        .docx,
                        .xls,
                        .xlsx,
                        .zip
                    "
                    @change="handleFiles"
                />

                <!-- Message -->
                <textarea
                    v-model="message"
                    rows="1"
                    placeholder="Aa"
                    class="
                        max-h-32
                        min-h-9
                        flex-1
                        resize-none
                        bg-transparent
                        py-2
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-white/35
                    "
                    @keydown="handleKeydown"
                />

                <!-- Link shortcut -->
                <button
                    type="button"
                    class="
                        flex size-9
                        shrink-0
                        items-center justify-center
                        rounded-full
                        text-white/50
                        hover:bg-white/10
                        hover:text-[#edbd53]
                    "
                    title="Insert link"
                >
                    <Icon
                        icon="lucide:link"
                        class="size-5"
                    />
                </button>

                <!-- Send -->
                <button
                    type="button"
                    class="
                        flex size-9
                        shrink-0
                        items-center justify-center
                        rounded-full
                        transition
                    "
                    :class="
                        canSend
                            ? 'bg-[#edbd53] text-black hover:bg-[#f3cc76]'
                            : 'text-white/20'
                    "
                    :disabled="
                        !canSend ||
                        chat.sending
                    "
                    @click="send"
                >
                    <Icon
                        icon="lucide:send"
                        class="size-4"
                    />
                </button>
            </div>
        </div>
    </div>
</template>