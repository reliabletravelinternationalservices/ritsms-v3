```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
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
        placeholder: 'Select Date & Time',
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
 * Parse modelValue.
 *
 * YYYY-MM-DD HH:mm
 */
function parseDateTime(value: string) {
    if (!value) {
        return {
            date: undefined,
            hour: '',
            minute: '',
        }
    }

    const [datePart, timePart = ''] = value.split(' ')

    const [year, month, day] = datePart
        .split('-')
        .map(Number)

    const [hour = '', minute = ''] = timePart.split(':')

    if (!year || !month || !day) {
        return {
            date: undefined,
            hour,
            minute,
        }
    }

    return {
        date: new CalendarDate(year, month, day),
        hour,
        minute,
    }
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

const parsedValue = computed(() => {
    return parseDateTime(props.modelValue)
})

const selectedDate = computed<DateValue | undefined>({
    get() {
        return parsedValue.value.date
    },

    set(value) {
        if (!value) {
            emitValue('')
            return
        }

        const date = dateValueToString(value)

        emitValue(
            `${date} ${formattedHour.value}:${formattedMinute.value}`
        )
    },
})

const selectedHour = ref(parsedValue.value.hour || '00')
const selectedMinute = ref(parsedValue.value.minute || '00')

/**
 * Keep time fields synchronized with v-model.
 */
const formattedHour = computed(() =>
    String(selectedHour.value || '00').padStart(2, '0')
)

const formattedMinute = computed(() =>
    String(selectedMinute.value || '00').padStart(2, '0')
)

/**
 * Emit complete datetime value.
 */
function emitValue(value: string) {
    emit('update:modelValue', value)
    emit('change', value)
}

/**
 * Update time.
 */
function updateTime() {
    if (!selectedDate.value) {
        return
    }

    const date = dateValueToString(selectedDate.value)

    emitValue(
        `${date} ${formattedHour.value}:${formattedMinute.value}`
    )
}

/**
 * Display value.
 */
const displayValue = computed(() => {
    if (!props.modelValue) {
        return props.placeholder
    }

    const [datePart, timePart] = props.modelValue.split(' ')

    const [year, month, day] = datePart?.split('-') ?? []

    if (!year || !month || !day) {
        return props.modelValue
    }

    if (!timePart) {
        return `${month}/${day}/${year}`
    }

    return `${month}/${day}/${year} ${timePart}`
})

/**
 * Hours.
 */
const hours = Array.from(
    { length: 24 },
    (_, index) => String(index).padStart(2, '0')
)

/**
 * Minutes.
 *
 * 5-minute intervals.
 */
const minutes = Array.from(
    { length: 12 },
    (_, index) => String(index * 5).padStart(2, '0')
)
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button
                :disabled="props.disabled"
                type="button"
                variant="outline"
                :class="cn(
                    'h-9 w-full flex items-center justify-between gap-2',
                    props.class
                )"
            >
                <span
                    class="truncate"
                    :class="{
                        'text-zinc-500': !props.modelValue
                    }"
                >
                    {{ displayValue }}
                </span>

                <Icon
                    icon="iconoir:calendar"
                    class="size-4 shrink-0 text-zinc-400"
                />
            </Button>
        </PopoverTrigger>

        <PopoverContent
            class="w-auto p-0"
            align="start"
        >
            <div class="flex flex-col">
                <!-- Calendar -->
                <Calendar
                    v-model="selectedDate"
                    :class="props.calendarClass"
                    initial-focus
                />

                <!-- Time -->
                <div class="border-t p-3">
                    <div class="flex items-center gap-2">
                        <Icon
                            icon="iconoir:clock"
                            class="size-4 text-zinc-400"
                        />

                        <span class="text-sm font-medium">
                            Time
                        </span>
                    </div>

                    <div class="mt-2 flex gap-2">
                        <!-- Hour -->
                        <select
                            v-model="selectedHour"
                            class="h-9 rounded-md border bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                            @change="updateTime"
                        >
                            <option
                                v-for="hour in hours"
                                :key="hour"
                                :value="hour"
                            >
                                {{ hour }}
                            </option>
                        </select>

                        <span class="flex items-center">
                            :
                        </span>

                        <!-- Minute -->
                        <select
                            v-model="selectedMinute"
                            class="h-9 rounded-md border bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                            @change="updateTime"
                        >
                            <option
                                v-for="minute in minutes"
                                :key="minute"
                                :value="minute"
                            >
                                {{ minute }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </PopoverContent>
    </Popover>
</template>
```
