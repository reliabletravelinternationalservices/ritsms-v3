<script setup lang="ts">
import { computed } from 'vue'

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
    title: "Show Modal",
    description: "This is a sample desc."
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
            class="absolute inset-0 z-50 flex h-full w-full items-center justify-center text-foreground"
            @click="handleBackdropClick"
        >
            <!-- Backdrop -->
            <Transition name="modal-backdrop">
                <div
                    class="absolute inset-0 h-full w-full bg-black/70"
                />
            </Transition>

            <!-- Modal -->
            <div
                class="relative z-10 w-full max-w-lg rounded-lg bg-white shadow-xl"
                @click.stop
            >
                <!-- Header -->
                <div
                    v-if="title || description || showDismiss"
                    class="flex items-start justify-between gap-2 p-6"
                >
                    <div class="min-w-0">
                        <h2
                            v-if="title"
                            class="text-lg font-semibold"
                        >
                            {{ title }}
                        </h2>

                        <p
                            v-if="description"
                            class="mt-1 text-sm text-gray-700"
                        >
                            {{ description }}
                        </p>
                    </div>

                    <button
                        v-if="showDismiss"
                        type="button"
                        class="shrink-0 text-gray-500 hover:text-gray-900"
                        @click="close"
                    >
                        ✕
                    </button>
                </div>

                <!-- Content -->
                <div class="p-6 py-2">
                    <slot name="content">
                        <slot />
                    </slot>
                </div>

                <!-- Footer -->
                <div
                    v-if="$slots.footer"
                    class="flex items-center justify-end gap-2 border-t p-4"
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
    transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
    transition: opacity 0.2s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
    opacity: 0;
}
</style>