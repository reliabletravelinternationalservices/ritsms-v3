```vue
<script setup lang="ts">
import { computed } from 'vue'
import { X } from '@lucide/vue'

interface Props {
    open?: boolean
    dismissable?: boolean
    showDismiss?: boolean
    title?: string
    description?: string
}

const props = withDefaults(defineProps<Props>(), {
    open: false,
    dismissable: true,
    showDismiss: true,
    title: 'Show Modal',
    description: 'This is a sample description.',
})

const emit = defineEmits<{
    'update:open': [value: boolean]
}>()

const isOpen = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value),
})

function close() {
    if (!props.dismissable) return

    isOpen.value = false
}

function handleBackdropClick(event: MouseEvent) {
    if (!props.dismissable) return

    if (event.target === event.currentTarget) {
        close()
    }
}
</script>

<template>
    <Transition name="modal">
        <div
            v-if="open"
            class="absolute inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto p-4 sm:p-6"
            @click="handleBackdropClick"
        >
            <!-- Backdrop -->
            <div
                class="absolute inset-0 bg-background/80 backdrop-blur-sm"
                aria-hidden="true"
            />

            <!-- Modal -->
            <div
                class="relative z-10 flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-2xl"
                role="dialog"
                aria-modal="true"
                @click.stop
            >
                <!-- Header -->
                <div
                    v-if="title || description || showDismiss"
                    class="flex shrink-0 items-start justify-between gap-4 border-b border-border px-4 py-4 sm:px-6 sm:py-5"
                >
                    <div class="min-w-0 flex-1">
                        <h2
                            v-if="title"
                            class="text-base font-semibold leading-6 tracking-tight sm:text-lg"
                        >
                            {{ title }}
                        </h2>

                        <p
                            v-if="description"
                            class="mt-1 text-sm leading-5 text-muted-foreground"
                        >
                            {{ description }}
                        </p>
                    </div>

                    <button
                        v-if="showDismiss"
                        type="button"
                        class="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
                        aria-label="Close modal"
                        :disabled="!dismissable"
                        @click="close"
                    >
                        <X class="size-4" />
                    </button>
                </div>

                <!-- Content -->
                <div
                    v-if="$slots.content"
                    class="min-h-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5"
                >
                    <slot name="content">
                        <slot />
                    </slot>
                </div>

                <!-- Footer -->
                <div
                    v-if="$slots.footer"
                    class="flex shrink-0 flex-col-reverse gap-2 border-t border-border bg-muted/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6"
                >
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: translateY(8px) scale(0.98);
}
</style>
```
