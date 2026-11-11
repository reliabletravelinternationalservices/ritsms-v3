
<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea';
import { createObjectURL } from '@/lib/utils';
import { Message, Type } from '@/types/convo/message';
import { Send, Paperclip, X, File as FileIcon } from '@lucide/vue';
import { computed, ref } from 'vue';

interface Props {
    isReply: boolean;
    replyMessage?: Message | null;
}

const props = withDefaults(defineProps<Props>(), {
    isReply: false,
    replyMessage: null,
});

const MAX_FILES = 5;

const emit = defineEmits<{
    send: [payload: {
        message: string;
        attachments: File[];
    }];
    'cancel-reply': [];
}>();

const composerInput = ref('');
const attachments = ref<File[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

const canSend = computed(() =>
    composerInput.value.trim().length > 0 ||
    attachments.value.length > 0
);

// --------------------------------------------------
// REPLY PREVIEW
// --------------------------------------------------

const replySender = computed(() => {
    const sender = props.replyMessage?.sender;

    if (!sender) return 'Unknown';

    return sender.display_name;
});

const replyPreview = computed(() => {
    const message = props.replyMessage;

    if (!message) return '';

    if (message.deleted_at) {
        return 'This message was deleted';
    }

    switch (message.type) {
        case Type.Text:
            return message.body || 'Message';

        case Type.Image:
            return '📷 Photo';

        case Type.Video:
            return '🎥 Video';

        case Type.File:
            return '📎 File';

        case Type.System:
            return message.body || 'System message';

        default:
            return 'Message';
    }
});

// --------------------------------------------------
// ATTACHMENTS
// --------------------------------------------------

const images = computed(() =>
    attachments.value
        .map((file, index) => ({ file, index }))
        .filter(item => item.file.type.startsWith('image/'))
);

const files = computed(() =>
    attachments.value
        .map((file, index) => ({ file, index }))
        .filter(item => !item.file.type.startsWith('image/'))
);

const fileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const addFiles = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const selectedFiles = Array.from(input.files ?? []);

    const remaining = MAX_FILES - attachments.value.length;

    if (remaining > 0) {
        attachments.value.push(...selectedFiles.slice(0, remaining));
    }

    input.value = '';
};

const removeAttachment = (index: number) => {
    attachments.value.splice(index, 1);
};

const cancelReply = () => {
    emit('cancel-reply');
};

// --------------------------------------------------
// SEND MESSAGE
// --------------------------------------------------

const sendMessage = () => {
    if (!canSend.value) return;

    emit('send', {
        message: composerInput.value.trim(),
        attachments: [...attachments.value],
    });

    composerInput.value = '';
    attachments.value = [];
};
</script>

<template>
    <div class="w-full self-end border-t border-border bg-background p-3 sm:p-4">

        <!-- File Picker -->
        <input
            ref="fileInput"
            type="file"
            multiple
            class="hidden"
            @change="addFiles"
        />

        <div class="space-y-3">

            <!-- REPLY PREVIEW -->
            <Transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
            >
                <div
                    v-if="isReply && replyMessage"
                    class="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-muted/30 p-3"
                >
                    <!-- Accent Line -->
                    <div class="h-10 w-1 shrink-0 rounded-full bg-yellow-500" />

                    <!-- Reply Information -->
                    <div class="min-w-0 flex-1 space-y-0.5">
                        <p class="text-xs font-semibold text-foreground">
                            Replying to {{ replySender }}
                        </p>

                        <p class="truncate text-xs text-muted-foreground">
                            {{ replyPreview }}
                        </p>
                    </div>

                    <!-- Cancel Reply -->
                    <button
                        type="button"
                        title="Cancel reply"
                        aria-label="Cancel reply"
                        @click="cancelReply"
                        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
                    >
                        <X class="h-4 w-4" />
                    </button>
                </div>
            </Transition>

            <!-- ATTACHMENT PREVIEWS -->
            <div v-if="attachments.length" class="space-y-2">

                <!-- Image Previews -->
                <div v-if="images.length" class="flex flex-wrap gap-2">
                    <div
                        v-for="item in images"
                        :key="`${item.file.name}-${item.index}`"
                        :title="`${item.file.name} (${fileSize(item.file.size)})`"
                        class="group relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/30"
                    >
                        <img
                            :src="createObjectURL(item.file)"
                            :alt="item.file.name"
                            class="h-full w-full object-cover"
                        />

                        <button
                            type="button"
                            @click="removeAttachment(item.index)"
                            :aria-label="`Remove ${item.file.name}`"
                            class="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/75 text-white transition hover:bg-red-500 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                            <X class="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>

                <!-- File Attachments -->
                <div v-if="files.length" class="flex flex-wrap gap-2">
                    <div
                        v-for="item in files"
                        :key="`${item.file.name}-${item.index}`"
                        :title="`${item.file.name} (${fileSize(item.file.size)})`"
                        class="group flex h-9 max-w-[220px] min-w-0 items-center gap-2 rounded-lg border border-border bg-muted/30 px-2"
                    >
                        <FileIcon class="h-4 w-4 shrink-0 text-yellow-600" />

                        <span class="min-w-0 flex-1 truncate text-xs font-medium text-foreground">
                            {{ item.file.name }}
                        </span>

                        <button
                            type="button"
                            @click="removeAttachment(item.index)"
                            :aria-label="`Remove ${item.file.name}`"
                            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-red-500/10 hover:text-red-500"
                        >
                            <X class="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            <!-- COMPOSER -->
            <div class="flex items-end gap-2">

                <!-- Attach Button -->
                <button
                    type="button"
                    @click="fileInput?.click()"
                    :disabled="attachments.length >= MAX_FILES"
                    title="Attach files"
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-yellow-500/10 hover:text-yellow-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Paperclip class="h-5 w-5" />
                </button>

                <!-- Message Input -->
                <Textarea
                    v-model="composerInput"
                    placeholder="Type a message..."
                    :min-height="5"
                    :max-height="100"
                    class="min-h-[42px] flex-1 resize-none rounded-lg border border-border bg-background p-3 text-sm text-foreground shadow-none focus-visible:ring-1 focus-visible:ring-yellow-500"
                    @keydown.enter.exact.prevent="sendMessage"
                />

                <!-- Send Button -->
                <button
                    type="button"
                    :disabled="!canSend"
                    @click="sendMessage"
                    title="Send message"
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-500 text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Send class="h-5 w-5" />
                </button>
            </div>

            <!-- FOOTER -->
            <div class="flex items-center justify-between px-1">
                <p class="text-[11px] text-muted-foreground">
                    Enter to send · Shift + Enter for new line
                </p>

                <span
                    v-if="attachments.length"
                    class="text-[11px] text-muted-foreground"
                >
                    {{ attachments.length }}/{{ MAX_FILES }} attachments
                </span>
            </div>
        </div>
    </div>
</template>
