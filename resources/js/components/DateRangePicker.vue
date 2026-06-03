<script setup lang="ts">
import { ref, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import DatePickerInput from '@/components/DatePicker.vue'; // Ensure this matches your path

export interface DateRangePayload {
    startDate: string;
    endDate: string;
}

interface ComponentProps {
    modelValue: DateRangePayload;
}

const props = defineProps<ComponentProps>();

const emit = defineEmits<{
    (e: 'update:modelValue', payload: DateRangePayload): void;
    (e: 'change', payload: DateRangePayload): void;
    (e: 'clear'): void;
}>();

// Helper string formats: YYYY-MM-DD
const getTodayString = (): string => new Date().toISOString().split('T')[0];
const getSixMonthsAgoString = (): string => {
    const d = new Date();
    d.setMonth(d.getMonth() - 6);
    return d.toISOString().split('T')[0];
};

// Modal visibility state
const isModalOpen = ref<boolean>(false);

// Staging states to isolate mutations until "Done" is explicitly clicked
const localStartDate = ref<string>(props.modelValue?.startDate || getSixMonthsAgoString());
const localEndDate = ref<string>(props.modelValue?.endDate || getTodayString());

// Keep localized values accurately in sync with the parent data context
watch(() => props.modelValue, (newVal: DateRangePayload): void => {
    if (newVal) {
        localStartDate.value = newVal.startDate;
        localEndDate.value = newVal.endDate;
    }
}, { deep: true });

// Operation handler when clicking: DONE / OK
const handleDone = (): void => {
    const payload: DateRangePayload = {
        startDate: localStartDate.value,
        endDate: localEndDate.value
    };
    emit('update:modelValue', payload);
    emit('change', payload);
    isModalOpen.value = false; // Close modal on completion
};

// Operation handler when clicking: CLEAR
const handleClear = (): void => {
    localStartDate.value = getSixMonthsAgoString();
    localEndDate.value = getTodayString();
    
    const clearedPayload: DateRangePayload = {
        startDate: localStartDate.value,
        endDate: localEndDate.value
    };
    
    emit('update:modelValue', clearedPayload);
    emit('clear');
    emit('change', clearedPayload);
    isModalOpen.value = false; // Close modal on completion
};
</script>

<template>
    <Dialog v-model:open="isModalOpen">
        <DialogTrigger as-child>
            <Button 
                variant="outline" 
                class="h-9 bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 flex items-center gap-2 px-3 shadow-md transition-colors"
            >
                <Icon icon="iconoir:calendar" class="text-sm text-zinc-400" />
                <span class="text-xs font-medium">
                    {{ props.modelValue?.startDate || localStartDate }} 
                    <span class="text-zinc-500 mx-0.5">to</span> 
                    {{ props.modelValue?.endDate || localEndDate }}
                </span>
            </Button>
        </DialogTrigger>

        <DialogContent class="sm:max-w-[425px] bg-zinc-950 border border-zinc-900 text-zinc-50 rounded-xl shadow-2xl p-6">
            <DialogHeader class="space-y-1.5 pb-2">
                <DialogTitle class="text-base font-bold tracking-tight text-zinc-100">
                    Filter Date Range
                </DialogTitle>
                <DialogDescription class="text-xs text-zinc-400">
                    Select your custom window thresholds to modify metric summaries.
                </DialogDescription>
            </DialogHeader>

            <div class="flex items-center justify-between gap-3 py-4 border-t border-b border-zinc-900/60 my-2">
                <div class="flex flex-col gap-1.5 w-full">
                    <label class="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">Start Date</label>
                    <DatePickerInput 
                        v-model="localStartDate" 
                        placeholder="Start Date"
                        class="w-full"
                    />
                </div>
                
                <span class="text-zinc-600 text-xs font-semibold select-none self-end pb-2.5">
                    to
                </span>
                
                <div class="flex flex-col gap-1.5 w-full">
                    <label class="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">End Date</label>
                    <DatePickerInput 
                        v-model="localEndDate" 
                        placeholder="End Date"
                        class="w-full"
                    />
                </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2">
                <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    @click="handleClear"
                    class="h-8 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-md px-3"
                >
                    Clear Filter
                </Button>
                
                <Button 
                    type="button"
                    variant="default"
                    size="sm" 
                    @click="handleDone"
                    class="h-8 text-xs font-semibold bg-sky-600 text-white hover:bg-sky-500 rounded-md px-4 shadow-md transition-all"
                >
                    Apply Range
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>