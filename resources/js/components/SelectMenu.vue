<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { AcceptableValue } from 'reka-ui'
import { X, ChevronDown } from '@lucide/vue'

export interface SelectOption {
    label: string
    value: string
}

interface Props {
    options: SelectOption[]
    placeholder?: string
    modelValue?: string
    disabled?: boolean
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Select...',
    modelValue: '',
    disabled: false,
})

const emit = defineEmits<{
    'update:model-value': [value: string]
    change: [value: string]
}>()

const handleChange = (value: AcceptableValue) => {
    const newValue = value as string

    emit('update:model-value', newValue)
    emit('change', newValue)
}

const clearValue = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    emit('update:model-value', '')
    emit('change', '')
}
</script>

<template>
    <Select
        :model-value="props.modelValue"
        :disabled="props.disabled"
        @update:model-value="handleChange"
    >
        <SelectTrigger
            class="w-full"
            :class="props.class"
        >
            <SelectValue :placeholder="props.placeholder" />

            <button
                v-if="props.modelValue"
                type="button"
                class="ml-auto shrink-0 opacity-50 transition-opacity hover:opacity-100"
                :disabled="props.disabled"
                @pointerdown.stop
                @click="clearValue"
            >
                <X class="size-4" />
            </button>

        </SelectTrigger>

        <SelectContent>
            <SelectItem
                v-for="(option, index) in props.options"
                :key="index"
                :value="option.value"
            >
                {{ option.label }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>