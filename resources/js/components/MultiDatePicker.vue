<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import type { DateValue } from '@internationalized/date'
import { CalendarDate } from '@internationalized/date'
import { cn } from '@/lib/utils'

export interface MultiDatePickerProps {
    modelValue?: string[]
    placeholder?: string

    /**
     * Button / trigger classes
     */
    triggerClass?: string

    /**
     * Popover content classes
     */
    contentClass?: string

    /**
     * Calendar classes
     */
    calendarClass?: string

    /**
     * Icon classes
     */
    iconClass?: string

    /**
     * Text classes
     */
    textClass?: string
}

const props = withDefaults(
    defineProps<MultiDatePickerProps>(),
    {
        modelValue: () => [],
        placeholder: 'Select dates',

        triggerClass: '',
        contentClass: '',
        calendarClass: '',
        iconClass: '',
        textClass: '',
    }
)

const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void
    (e: 'change', value: string[]): void
}>()

/**
 * YYYY-MM-DD -> CalendarDate
 */
function stringToDateValue(
    value: string
): CalendarDate | null {
    const [year, month, day] = value
        .split('-')
        .map(Number)

    if (
        !year ||
        !month ||
        !day
    ) {
        return null
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
function dateValueToString(
    value: DateValue
): string {
    return [
        value.year,
        String(value.month).padStart(2, '0'),
        String(value.day).padStart(2, '0'),
    ].join('-')
}

/**
 * Calendar multiple selection model.
 */
const calendarDates = computed<DateValue[]>({
    get(): DateValue[] {
        return props.modelValue
            .map(stringToDateValue)
            .filter(
                (value): value is CalendarDate =>
                    value !== null
            )
    },

    set(value: DateValue[]): void {
        const dates = value
            .map(dateValueToString)
            .sort()

        emit(
            'update:modelValue',
            dates
        )

        emit(
            'change',
            dates
        )
    },
})

/**
 * YYYY-MM-DD -> MM/DD/YYYY
 */
function formatDisplayDate(
    value: string
): string {
    const [year, month, day] = value.split('-')

    if (!year || !month || !day) {
        return value
    }

    return `${month}/${day}/${year}`
}

/**
 * Display selected dates.
 *
 * Example:
 *
 * 12/02/2026
 *
 * 12/02/2026, 01/10/2027
 *
 * 12/02/2026, 01/10/2027, +2
 */
const displayValue = computed<string>(() => {
    const dates = props.modelValue

    if (dates.length === 0) {
        return props.placeholder
    }

    const visibleDates = dates
        .slice(0, 2)
        .map(formatDisplayDate)

    const remaining = dates.length - 2

    if (remaining > 0) {
        return `${visibleDates.join(', ')}, +${remaining}`
    }

    return visibleDates.join(', ')
})
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button type="button" variant="outline" :class="cn(
                'h-9 w-full justify-start gap-2 flex items-center justify-between',
                triggerClass
            )">
                <span :class="cn(
                    'truncate text-xs',
                    {
                        'text-muted-foreground':
                            props.modelValue.length === 0,
                    },
                    textClass
                )">
                    {{ displayValue }}
                </span>
                <Icon icon="iconoir:calendar" :class="cn(
                    'size-4 shrink-0',
                    iconClass
                )" />
            </Button>
        </PopoverTrigger>

        <PopoverContent align="start" :class="cn(
            'w-auto p-0',
            contentClass
        )">
            <Calendar v-model="calendarDates" multiple initial-focus :class="calendarClass" />
        </PopoverContent>
    </Popover>
</template>