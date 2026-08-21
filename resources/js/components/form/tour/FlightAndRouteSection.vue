<script setup lang="ts">
import ButtonIcon from '@/components/ButtonIcon.vue'
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue'
import Input from '@/components/ui/input/Input.vue'
import { useTourFormStore } from '@/stores/tourForm'
import { Icon } from '@iconify/vue'

const tourForm = useTourFormStore()

const countries: SelectOption[] = [
    {
        label: 'Philippines',
        value: '1',
    },
    {
        label: 'Malaysia',
        value: '2',
    },
    {
        label: 'Thailand',
        value: '3',
    },
    {
        label: 'Vietnam',
        value: '4',
    },
    {
        label: 'China',
        value: '5',
    },
]

</script>

<template>
    <div class="space-y-12">
        <!-- Flight and Route -->
        <div class="space-y-4">
            <div class="flex items-center w-full border-b-2 border-foreground py-2 text-md font-bold uppercase">
                <span>FLIGHTS & ROUTES</span>
            </div>

            <!-- No duration selected -->
            <div v-if="!tourForm.containsItineraryType()"
                class="flex min-h-40 flex-col items-center justify-center rounded-md border border-dashed border-border text-center p-4">
                <div class="mb-2 rounded-full bg-muted p-3">
                    <Icon icon="lucide:plane" class="size-5 text-muted-foreground" />
                </div>

                <p class="text-sm font-medium text-foreground">
                    Select a itinerary type
                </p>

                <p class="mt-1 text-xs text-muted-foreground">
                    Tour Flights & Routes will appear here once you select the itinerary type.
                </p>
            </div>

            <!-- Itineraries -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div v-for="(route, index) in tourForm.form.flightAndHotelItems.routes" :key="index"
                    class="space-y-6 rounded-md border border-border p-8">
                    <span class="text-sm font-bold text-muted-foreground uppercase">
                        <span v-if="tourForm.isRoundTrip()">Flight ROUTE</span>
                        <span v-if="tourForm.containsMultipleFlights()" class="flex items-center justify-between gap-2">
                            <span>FLIGHT ROUTE {{ index + 1 }}</span>
                            <ButtonIcon @click="tourForm.removeRoute(index)" icon="lucide:trash-2"
                                class="text-red-600 bg-transparent hover:bg-red-50" />
                        </span>
                    </span>

                    <div class="flex items-center gap-8 w-full">
                        <div class="w-full space-y-2">
                            <div class="space-y-2">
                                <label :for="`departure-route-${index + 1}-country`" class="block text-sm font-medium">
                                    Country
                                    <span class="text-red-600">*</span>
                                </label>

                                <SelectMenu :id="`departure-route-${index + 1}-country`"
                                    v-model="route.departure_country_id" placeholder="Select country"
                                    :options="countries" class="font-roboto text-sm" />
                            </div>

                            <div class="space-y-2">
                                <Input :id="`departure-route-${index + 1}-location`" v-model="route.departure_location"
                                    placeholder="Location" class="font-roboto text-sm" />
                            </div>
                        </div>

                        <span class="text-sm font-bold text-muted-foreground uppercase">
                            <Icon v-if="tourForm.isRoundTrip()" icon="lucide:arrow-left-right" class="size-6" />
                            <Icon v-else icon="lucide:move-right" class="size-6" />
                        </span>
                        <div class="w-full space-y-2">
                            <div class="space-y-2">
                                <label :for="`destination-route-${index + 1}-country`"
                                    class="block text-sm font-medium">
                                    Country
                                    <span class="text-red-600">*</span>
                                </label>

                                <SelectMenu :id="`destination-route-${index + 1}-country`"
                                    v-model="route.destination_country_id" placeholder="Select country"
                                    :options="countries" class="font-roboto text-sm" />
                            </div>

                            <div class="space-y-2">
                                <Input :id="`destination-route-${index + 1}-location`"
                                    v-model="route.destination_location" placeholder="Location"
                                    class="font-roboto text-sm" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="w-full">
                <button v-if="tourForm.containsMultipleFlights()" type="button" @click="tourForm.addRoute()"
                    class="w-full text-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.04)] border-2 border-dashed border-border px-4 py-2.5 text-sm font-medium transition-all duration-150 rounded-md hover:bg-[rgb(var(--color-primary)/0.08)]">+
                    Add Another
                    Route</button>
            </div>
        </div>
    </div>
</template>