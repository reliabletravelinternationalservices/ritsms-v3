<script setup lang="ts">
import { computed } from 'vue'
import { CalendarDate, type DateValue } from '@internationalized/date'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import { cn } from '@/lib/utils'

interface ComponentProps {
    modelValue?: string
    placeholder?: string
    class?: string
    calendarClass?: string
    disabled?: boolean
}

const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        modelValue: '',
        placeholder: 'Select Date',
        class: '',
        calendarClass: '',
        disabled: false,
    }
)

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'change', value: string): void
}>()

/**
 * YYYY-MM-DD -> CalendarDate
 */
function stringToDateValue(value: string): CalendarDate | undefined {
    if (!value) {
        return undefined
    }

    const [year, month, day] = value
        .split('-')
        .map(Number)

    if (
        !year ||
        !month ||
        !day
    ) {
        return undefined
    }

    return new CalendarDate(
        year,
        month,
        day
    )
}

/**
 * DateValue -> YYYY-MM-DD
 */
function dateValueToString(value: DateValue): string {
    return [
        value.year,
        String(value.month).padStart(2, '0'),
        String(value.day).padStart(2, '0'),
    ].join('-')
}

/**
 * Calendar model.
 */
const selectedDate = computed<DateValue | undefined>({
    get() {
        return stringToDateValue(props.modelValue)
    },

    set(value) {
        if (!value) {
            emit('update:modelValue', '')
            emit('change', '')
            return
        }

        const date = dateValueToString(value)

        emit('update:modelValue', date)
        emit('change', date)
    },
})

/**
 * Display value.
 *
 * YYYY-MM-DD
 * ->
 * MM/DD/YYYY
 */
const displayValue = computed(() => {
    if (!props.modelValue) {
        return props.placeholder
    }

    const [year, month, day] = props.modelValue.split('-')

    if (!year || !month || !day) {
        return props.modelValue
    }

    return `${month}/${day}/${year}`
})
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button :disabled="disabled" type="button" variant="outline" :class="cn(
                'h-9 w-full flex items-center justify-between gap-2',
                props.class
            )">
                <span class="truncate" :class="{
                    'text-zinc-500':
                        !props.modelValue
                }">
                    {{ displayValue }}
                </span>
                <Icon icon="iconoir:calendar" class="size-4 shrink-0 text-zinc-400" />
            </Button>
        </PopoverTrigger>

        <PopoverContent class="w-auto p-0" align="start">
            <Calendar v-model="selectedDate" :class="props.calendarClass" initial-focus />
        </PopoverContent>
    </Popover>
</template>