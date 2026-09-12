<script setup lang="ts">
import { ref, watch } from 'vue'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface ComponentProps {
    modelValue?: string
    placeholder?: string
    class?: string
    inputClass?: string
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        modelValue: () => new Date().toISOString().split('T')[0],
        placeholder: 'Select Date',
        class: '',
        inputClass: '',
    }
)

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'change', value: string): void
}>()

const selectedDate = ref<string>(props.modelValue)

watch(
    selectedDate,
    (newValue: string): void => {
        emit('update:modelValue', newValue)
        emit('change', newValue)
    }
)

watch(
    () => props.modelValue,
    (newValue: string): void => {
        selectedDate.value = newValue
    }
)
</script>

<template>
    <div :class="cn(
        'relative flex items-center',
        'bg-zinc-900',
        'border border-zinc-800',
        'px-3 py-1',
        'rounded-lg',
        'shadow-inner',
        'group',
        'w-full sm:w-[160px]',
        props.class
    )">
        <Input v-model="selectedDate" type="date" :placeholder="props.placeholder" :class="cn(
            'h-10 w-full',
            'border-none',
            'bg-transparent',
            'p-0',
            'font-medium',
            'cursor-pointer',
            'dark:[color-scheme:dark]',
            props.inputClass
        )" />
    </div>
</template>