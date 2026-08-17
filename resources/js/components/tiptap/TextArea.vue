<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

const props = withDefaults(
    defineProps<{
        modelValue?: string | object
        placeholder?: string
        disabled?: boolean
    }>(),
    {
        modelValue: '',
        placeholder: 'Write something...',
        disabled: false,
    }
)

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const editor = useEditor({
    content: props.modelValue,

    editable: !props.disabled,

    extensions: [
        StarterKit.configure({
            heading: {
                levels: [1, 2, 3],
            },
        }),

        Underline,

        Link.configure({
            openOnClick: false,
        }),

        Placeholder.configure({
            placeholder: props.placeholder,
        }),
    ],

    editorProps: {
        attributes: {
            class:
                'min-h-[100px] w-full outline-none prose prose-sm max-w-none focus:outline-none',
        },
    },

    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
})

onBeforeUnmount(() => {
    editor.value?.destroy()
})
</script>

<template>
    <div class="
            w-full rounded-md border bg-background
            transition-colors
            focus-within:ring-2
            focus-within:ring-ring
            focus-within:ring-offset-2
        " :class="{
            'cursor-not-allowed opacity-50': disabled,
        }">
        <EditorContent :editor="editor" class="tiptap-textarea p-3" />
    </div>
</template>

<style>
.tiptap-textarea .ProseMirror {
    min-height: 100px;
    max-height: 250px;
    overflow-y: auto;
    outline: none;
}

/*
|--------------------------------------------------------------------------
| Paragraph
|--------------------------------------------------------------------------
*/

.tiptap-textarea .ProseMirror p {
    margin: 0;
}

.tiptap-textarea .ProseMirror p+p {
    margin-top: 0.5rem;
}

/*
|--------------------------------------------------------------------------
| Lists
|--------------------------------------------------------------------------
*/

.tiptap-textarea .ProseMirror ul {
    list-style-type: disc;
    padding-left: 1.5rem;
}

.tiptap-textarea .ProseMirror ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
}

/*
|--------------------------------------------------------------------------
| Headings
|--------------------------------------------------------------------------
*/

.tiptap-textarea .ProseMirror h1 {
    font-size: 1.5rem;
    font-weight: 700;
}

.tiptap-textarea .ProseMirror h2 {
    font-size: 1.25rem;
    font-weight: 700;
}

.tiptap-textarea .ProseMirror h3 {
    font-size: 1.125rem;
    font-weight: 600;
}

/*
|--------------------------------------------------------------------------
| Blockquote
|--------------------------------------------------------------------------
*/

.tiptap-textarea .ProseMirror blockquote {
    border-left: 3px solid hsl(var(--border));
    padding-left: 1rem;
    color: hsl(var(--muted-foreground));
}

/*
|--------------------------------------------------------------------------
| Tiptap Placeholder
|--------------------------------------------------------------------------
*/

.tiptap-textarea .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    color: hsl(var(--muted-foreground));
    pointer-events: none;
    float: left;
    height: 0;
}

/*
|--------------------------------------------------------------------------
| Focus
|--------------------------------------------------------------------------
*/

.tiptap-textarea .ProseMirror:focus {
    outline: none;
}
</style>