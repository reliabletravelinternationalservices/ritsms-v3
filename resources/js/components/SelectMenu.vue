<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { AcceptableValue } from 'reka-ui'

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
    emit('update:model-value', value as string)
    emit('change', value as string)
}
</script>

<template>
    <Select :model-value="props.modelValue" :disabled="props.disabled" @update:model-value="handleChange">
        <SelectTrigger class="w-full" :class="props.class">
            <SelectValue :placeholder="props.placeholder" />
        </SelectTrigger>

        <SelectContent>
            <SelectItem v-for="(option, index) in props.options" :key="index" :value="option.value">
                {{ option.label }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>