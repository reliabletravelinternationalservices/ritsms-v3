<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Icon } from '@iconify/vue'

interface Attachment {
    id: number
    name: string
    url: string
    type: string
    file: File
}

interface MessagePayload {
    content: string
    attachments: Attachment[]
}

const emit = defineEmits<{
    send: [payload: MessagePayload]
    typing: [value: boolean]
}>()

const editor = ref<HTMLElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const message = ref('')
const attachments = ref<Attachment[]>([])
const isTyping = ref(false)

const showLinkModal = ref(false)
const linkUrl = ref('')
const linkText = ref('')
const savedRange = ref<Range | null>(null)

const canSend = computed(() => {
    return (
        message.value.trim().length > 0 ||
        attachments.value.length > 0
    )
})

function focusEditor() {
    editor.value?.focus()
}

function execCommand(command: string, value?: string) {
    focusEditor()

    document.execCommand(
        command,
        false,
        value,
    )

    handleInput()
}

function saveSelection() {
    const selection = window.getSelection()

    if (!selection || selection.rangeCount === 0) {
        return
    }

    const range = selection.getRangeAt(0)

    if (
        editor.value &&
        editor.value.contains(
            range.commonAncestorContainer,
        )
    ) {
        savedRange.value = range.cloneRange()
    }
}

function openLinkModal() {
    saveSelection()

    linkText.value = ''
    linkUrl.value = ''
    showLinkModal.value = true
}

function closeLinkModal() {
    showLinkModal.value = false
    linkText.value = ''
    linkUrl.value = ''
    savedRange.value = null
}

function insertLink() {
    const url = linkUrl.value.trim()

    if (!url || !editor.value) {
        return
    }

    editor.value.focus()

    const selection = window.getSelection()

    if (!selection) {
        return
    }

    if (savedRange.value) {
        selection.removeAllRanges()
        selection.addRange(
            savedRange.value,
        )
    }

    if (selection.rangeCount === 0) {
        return
    }

    const range = selection.getRangeAt(0)

    const selectedText =
        selection.toString().trim()

    const link =
        document.createElement('a')

    link.href = url
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.className = 'underline break-all'

    link.textContent =
        linkText.value.trim() ||
        selectedText ||
        url

    range.deleteContents()
    range.insertNode(link)

    range.setStartAfter(link)
    range.collapse(true)

    selection.removeAllRanges()
    selection.addRange(range)

    closeLinkModal()

    handleInput()

    nextTick(() => {
        focusEditor()
    })
}

function convertUrlsToLinks(
    html: string,
): string {
    const container =
        document.createElement('div')

    container.innerHTML = html

    const walker =
        document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
        )

    const textNodes: Text[] = []

    let currentNode = walker.nextNode()

    while (currentNode) {
        const textNode =
            currentNode as Text

        if (
            textNode.parentElement &&
            !textNode.parentElement.closest('a')
        ) {
            textNodes.push(textNode)
        }

        currentNode = walker.nextNode()
    }

    const urlRegex =
        /(https?:\/\/[^\s<]+)/g

    textNodes.forEach(textNode => {
        const text =
            textNode.textContent ?? ''

        urlRegex.lastIndex = 0

        if (!urlRegex.test(text)) {
            urlRegex.lastIndex = 0
            return
        }

        urlRegex.lastIndex = 0

        const fragment =
            document.createDocumentFragment()

        let lastIndex = 0

        text.replace(
            urlRegex,
            (
                url: string,
                _match: string,
                offset: number,
            ) => {
                const textBefore =
                    text.slice(
                        lastIndex,
                        offset,
                    )

                if (textBefore) {
                    fragment.appendChild(
                        document.createTextNode(
                            textBefore,
                        ),
                    )
                }

                const link =
                    document.createElement('a')

                link.href = url
                link.target = '_blank'
                link.rel =
                    'noopener noreferrer'
                link.className =
                    'underline break-all'
                link.textContent = url

                fragment.appendChild(link)

                lastIndex =
                    offset + url.length

                return url
            },
        )

        const remaining =
            text.slice(lastIndex)

        if (remaining) {
            fragment.appendChild(
                document.createTextNode(
                    remaining,
                ),
            )
        }

        textNode.parentNode?.replaceChild(
            fragment,
            textNode,
        )
    })

    return container.innerHTML
}

function handleInput() {
    if (!editor.value) {
        message.value = ''
        return
    }

    message.value =
        editor.value.innerText

    const hasContent =
        message.value.trim().length > 0

    if (
        hasContent &&
        !isTyping.value
    ) {
        isTyping.value = true

        emit(
            'typing',
            true,
        )
    }

    if (
        !hasContent &&
        isTyping.value
    ) {
        isTyping.value = false

        emit(
            'typing',
            false,
        )
    }
}

function handleKeydown(
    event: KeyboardEvent,
) {
    if (event.key !== 'Enter') {
        return
    }

    if (event.shiftKey) {
        return
    }

    event.preventDefault()

    send()
}

function handlePaste(
    event: ClipboardEvent,
) {
    const clipboard =
        event.clipboardData

    if (!clipboard) {
        return
    }

    const imageItems =
        Array.from(
            clipboard.items,
        ).filter(item =>
            item.type.startsWith(
                'image/',
            ),
        )

    if (imageItems.length) {
        event.preventDefault()

        imageItems.forEach(item => {
            const file =
                item.getAsFile()

            if (file) {
                addAttachment(file)
            }
        })

        return
    }

    nextTick(() => {
        if (!editor.value) {
            return
        }

        editor.value.innerHTML =
            convertUrlsToLinks(
                editor.value.innerHTML,
            )

        handleInput()
    })
}

function openFilePicker() {
    fileInput.value?.click()
}

function handleFiles(
    event: Event,
) {
    const input =
        event.target as HTMLInputElement

    if (!input.files) {
        return
    }

    Array.from(
        input.files,
    ).forEach(file => {
        addAttachment(file)
    })

    input.value = ''
}

function addAttachment(
    file: File,
) {
    attachments.value.push({
        id:
            Date.now() +
            Math.random(),

        name: file.name,

        url:
            URL.createObjectURL(
                file,
            ),

        type: file.type,

        file,
    })
}

function removeAttachment(
    id: number,
) {
    const attachment =
        attachments.value.find(
            item =>
                item.id === id,
        )

    if (attachment) {
        URL.revokeObjectURL(
            attachment.url,
        )
    }

    attachments.value =
        attachments.value.filter(
            item =>
                item.id !== id,
        )
}

function send() {
    if (!editor.value) {
        return
    }

    const content =
        convertUrlsToLinks(
            editor.value.innerHTML,
        )

    const hasText =
        editor.value.innerText.trim().length > 0

    const hasAttachments =
        attachments.value.length > 0

    if (
        !hasText &&
        !hasAttachments
    ) {
        return
    }

    emit('send', {
        content,
        attachments: [
            ...attachments.value,
        ],
    })

    editor.value.innerHTML = ''

    message.value = ''

    attachments.value.forEach(
        attachment => {
            URL.revokeObjectURL(
                attachment.url,
            )
        },
    )

    attachments.value = []

    isTyping.value = false

    emit(
        'typing',
        false,
    )

    nextTick(() => {
        focusEditor()
    })
}
</script>

<template>
    <div
        class="border-t border-border bg-background p-4 text-foreground"
    >
        <div class="mb-2 flex items-center gap-1">
            <button
                type="button"
                title="Bold"
                class="flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                @click="execCommand('bold')"
            >
                <Icon icon="lucide:bold" />
            </button>

            <button
                type="button"
                title="Italic"
                class="flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                @click="execCommand('italic')"
            >
                <Icon icon="lucide:italic" />
            </button>

            <button
                type="button"
                title="Insert link"
                class="flex size-8 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                @click="openLinkModal"
            >
                <Icon icon="lucide:link" />
            </button>
        </div>

        <div
            v-if="attachments.length"
            class="mb-3 flex flex-wrap gap-2"
        >
            <div
                v-for="attachment in attachments"
                :key="attachment.id"
                class="relative overflow-hidden rounded-lg border border-border bg-muted"
            >
                <img
                    v-if="
                        attachment.type.startsWith(
                            'image/',
                        )
                    "
                    :src="attachment.url"
                    :alt="attachment.name"
                    class="size-20 object-cover"
                >

                <div
                    v-else
                    class="flex max-w-48 items-center gap-2 px-3 py-2"
                >
                    <Icon
                        icon="lucide:file"
                        class="shrink-0"
                    />

                    <span
                        class="truncate text-xs"
                    >
                        {{ attachment.name }}
                    </span>
                </div>

                <button
                    type="button"
                    title="Remove attachment"
                    class="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                    @click="
                        removeAttachment(
                            attachment.id,
                        )
                    "
                >
                    <Icon
                        icon="lucide:x"
                        class="text-xs"
                    />
                </button>
            </div>
        </div>

        <div
            ref="editor"
            contenteditable="true"
            role="textbox"
            aria-multiline="true"
            data-placeholder="Type a message..."
            class="min-h-16 max-h-40 overflow-y-auto rounded-lg border border-border bg-background px-3 py-2 text-sm leading-6 outline-none transition focus:border-[rgb(var(--color-primary))] focus:ring-1 focus:ring-[rgb(var(--color-primary)/0.2)]"
            @input="handleInput"
            @keydown="handleKeydown"
            @paste="handlePaste"
        />

        <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center gap-1">
                <input
                    ref="fileInput"
                    type="file"
                    class="hidden"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.zip"
                    @change="handleFiles"
                >

                <button
                    type="button"
                    title="Attach file"
                    class="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    @click="openFilePicker"
                >
                    <Icon
                        icon="lucide:paperclip"
                        class="text-xl"
                    />
                </button>

                <button
                    type="button"
                    title="Add image"
                    class="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    @click="openFilePicker"
                >
                    <Icon
                        icon="lucide:image"
                        class="text-xl"
                    />
                </button>
            </div>

            <button
                type="button"
                class="flex h-9 items-center gap-2 rounded-lg bg-[rgb(var(--color-primary))] px-4 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="!canSend"
                @click="send"
            >
                <span>Send</span>

                <Icon icon="lucide:send" />
            </button>
        </div>

        <div
            v-if="showLinkModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            @click.self="closeLinkModal"
        >
            <div
                class="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background shadow-xl"
            >
                <div
                    class="flex items-center justify-between border-b border-border px-4 py-3"
                >
                    <div>
                        <h3 class="text-sm font-semibold">
                            Insert link
                        </h3>

                        <p
                            class="mt-0.5 text-xs text-muted-foreground"
                        >
                            Add a clickable link to your message.
                        </p>
                    </div>

                    <button
                        type="button"
                        class="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        @click="closeLinkModal"
                    >
                        <Icon icon="lucide:x" />
                    </button>
                </div>

                <div class="space-y-4 p-4">
                    <div>
                        <label
                            class="mb-1.5 block text-xs font-medium"
                        >
                            Link text
                        </label>

                        <input
                            v-model="linkText"
                            type="text"
                            placeholder="View our packages"
                            class="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-[rgb(var(--color-primary))] focus:ring-1 focus:ring-[rgb(var(--color-primary)/0.2)]"
                        />
                    </div>

                    <div>
                        <label
                            class="mb-1.5 block text-xs font-medium"
                        >
                            URL
                        </label>

                        <input
                            v-model="linkUrl"
                            type="url"
                            placeholder="https://example.com"
                            class="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-[rgb(var(--color-primary))] focus:ring-1 focus:ring-[rgb(var(--color-primary)/0.2)]"
                            @keydown.enter.prevent="insertLink"
                        />
                    </div>
                </div>

                <div
                    class="flex justify-end gap-2 border-t border-border px-4 py-3"
                >
                    <button
                        type="button"
                        class="rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-muted"
                        @click="closeLinkModal"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        class="rounded-lg bg-[rgb(var(--color-primary))] px-3 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        :disabled="!linkUrl.trim()"
                        @click="insertLink"
                    >
                        Insert link
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
[contenteditable='true']:empty::before {
    content: attr(data-placeholder);
    color: hsl(var(--muted-foreground));
    pointer-events: none;
}

[contenteditable='true'] :deep(a) {
    color: inherit;
    text-decoration: underline;
    word-break: break-all;
}

[contenteditable='true'] :deep(b),
[contenteditable='true'] :deep(strong) {
    font-weight: 700;
}

[contenteditable='true'] :deep(i),
[contenteditable='true'] :deep(em) {
    font-style: italic;
}
</style>