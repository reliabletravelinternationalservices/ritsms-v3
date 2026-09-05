<script setup lang="ts">
import { computed } from 'vue'
import { Departure } from '@/types/tour'
import { formatDateString } from '@/lib/utils';

interface Props {
    departures: Departure[]
}

const props = defineProps<Props>()

const nextDeparture = computed<Departure | null>(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return props.departures
        .filter((departure) => {
            if (!departure.is_active) {
                return false
            }

            const departureDate = new Date(departure.departure_date)
            departureDate.setHours(0, 0, 0, 0)

            return departureDate >= today
        })
        .sort(
            (a, b) =>
                new Date(a.departure_date).getTime() -
                new Date(b.departure_date).getTime()
        )[0] ?? null
})

const daysUntilDeparture = computed<number | null>(() => {
    if (!nextDeparture.value) {
        return null
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const departureDate = new Date(nextDeparture.value.departure_date)
    departureDate.setHours(0, 0, 0, 0)

    return Math.round(
        (departureDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    )
})

const departureLabel = computed(() => {
    const days = daysUntilDeparture.value

    if (days === null) {
        return null
    }

    if (days === 0) {
        return 'Departs today'
    }

    if (days === 1) {
        return 'Upcoming tomorrow'
    }

    return `Upcoming in ${days} days`
})
</script>

<template>
    <div v-if="nextDeparture" class="space-y-0.5">
        <div class="font-medium">
            {{ formatDateString(nextDeparture.departure_date) }}
        </div>

        <div class="text-xs text-green-600">
            {{ departureLabel }}
        </div>
    </div>

    <span v-else>N/A</span>
</template>