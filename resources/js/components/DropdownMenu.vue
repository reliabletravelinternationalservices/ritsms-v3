<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

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
}>()
</script>

<template>
    <Select :model-value="props.modelValue" :disabled="props.disabled"
        @update:model-value="emit('update:model-value', $event as string)">
        <SelectTrigger class="w-full border border-muted-foreground" :class="props.class">
            <SelectValue :placeholder="props.placeholder" />
        </SelectTrigger>

        <SelectContent>
            <SelectItem v-for="(option, index) in props.options" :key="index" :value="option.value">
                {{ option.label }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>