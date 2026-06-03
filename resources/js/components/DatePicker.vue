<script setup lang="ts">
import { ref, watch } from 'vue';
import { Input } from '@/components/ui/input';

interface ComponentProps {
    modelValue?: string; // Expects a 'YYYY-MM-DD' formatted string
    placeholder?: string;
}

const props = withDefaults(defineProps<ComponentProps>(), {
    modelValue: () => new Date().toISOString().split('T')[0],
    placeholder: 'Select Date'
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'change', value: string): void;
}>();

// Sync internal state with the incoming prop value
const selectedDate = ref<string>(props.modelValue);

// Watch for internal selection changes to notify the parent container
watch(selectedDate, (newValue: string): void => {
    emit('update:modelValue', newValue);
    emit('change', newValue);
});

// Watch for external prop changes (e.g. if reset from outside)
watch(() => props.modelValue, (newValue: string): void => {
    selectedDate.value = newValue;
});
</script>

<template>
    <div class="relative flex items-center bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg shadow-inner group w-full sm:w-[160px]">
        <Input 
            type="date" 
            v-model="selectedDate"
            :placeholder="props.placeholder"
            class="h-7 w-full border-none bg-transparent p-0 text-xs text-zinc-200 font-medium focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer dark:[color-scheme:dark]"
        />
    </div>
</template>