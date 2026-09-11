<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

interface Props {
    title?: string
    description?: string
    contentClass?: string
    preventClose?: boolean
    contained?: boolean
}

withDefaults(defineProps<Props>(), {
    title: undefined,
    description: undefined,
    contentClass: undefined,
    preventClose: false,
    contained: false,
})

const open = defineModel<boolean>('open', {
    default: false,
})
</script>

<template>
    <Dialog v-model:open="open">
        <DialogTrigger v-if="$slots.trigger" as-child>
            <slot name="trigger" />
        </DialogTrigger>

        <DialogContent
            :class="contentClass"
            :contained="contained"
            @pointer-down-outside="
                preventClose
                    ? $event.preventDefault()
                    : undefined
            "
            @escape-key-down="
                preventClose
                    ? $event.preventDefault()
                    : undefined
            "
        >
            <DialogHeader v-if="title || description || $slots.header">
                <slot name="header">
                    <DialogTitle v-if="title">
                        {{ title }}
                    </DialogTitle>

                    <DialogDescription v-if="description">
                        {{ description }}
                    </DialogDescription>
                </slot>
            </DialogHeader>

            <slot />

            <DialogFooter v-if="$slots.footer">
                <slot name="footer" />
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>