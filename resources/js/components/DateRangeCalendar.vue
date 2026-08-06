<script setup lang="ts">
import { computed } from 'vue'
import {
    DateFormatter,
    getLocalTimeZone,
} from '@internationalized/date'
import type { DateRange } from 'radix-vue'
import { CalendarIcon, ChevronDown } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'

interface Props {
    placeholder?: string
    numberOfMonths?: number
    disabled?: boolean
    class?: string
}


const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Select date range',
    numberOfMonths: 2,
    disabled: false,
    class: '',
})

const value = defineModel<DateRange | undefined>({
    required: true,
})

const formatter = new DateFormatter('en-US', {
    month: 'short',
    year: 'numeric',
})

const label = computed(() => {
    if (!value.value?.start || !value.value?.end) {
        return props.placeholder
    }

    return `${formatter.format(
        value.value.start.toDate(getLocalTimeZone()),
    )} - ${formatter.format(
        value.value.end.toDate(getLocalTimeZone()),
    )}`
})
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="outline" :disabled="disabled" :class="[
                'w-full h-10 justify-between rounded-md px-3 font-normal',
                !value && 'text-muted-foreground',
                props.class,
            ]">
                <div class="flex items-center gap-2">
                    <CalendarIcon class="h-4 w-4 shrink-0" />
                    <span class="truncate">
                        {{ label }}
                    </span>
                </div>

                <ChevronDown class="h-4 w-4 opacity-60" />
            </Button>
        </PopoverTrigger>

        <PopoverContent class="w-auto p-0" align="start">
            <RangeCalendar v-model="value" :number-of-months="numberOfMonths" />
        </PopoverContent>
    </Popover>
</template>