<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Icon } from '@iconify/vue'

interface Props {
    modelValue?: string
    placeholder?: string
    disabled?: boolean
}

withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: 'Search...',
    disabled: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()
</script>

<template>
    <div class="relative w-full">
        <Icon icon="lucide:search" class="absolute left-3 top-5 size-6 -translate-y-1/2 text-muted-foreground" />

        <Input :model-value="modelValue" :placeholder="placeholder" :disabled="disabled"
            class="w-full border border-muted-foreground pl-10"
            @update:model-value="emit('update:modelValue', $event as string)" />
    </div>
</template>