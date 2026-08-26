<script setup lang="ts">
import ButtonIcon from '@/components/ButtonIcon.vue'
import InputError from '@/components/InputError.vue'
import SelectMenu from '@/components/SelectMenu.vue'
import Input from '@/components/ui/input/Input.vue'
import { useReferenceDataStore } from '@/stores/referenceData'
import { useTourFormStore } from '@/stores/tourForm'
import { Icon } from '@iconify/vue'

const tourForm = useTourFormStore()
const referenceData = useReferenceDataStore()
</script>
<template>
    <div class="space-y-12">

        <!-- FLIGHTS & ROUTES -->
        <div class="space-y-4">

            <!-- HEADER -->
            <div
                class="flex items-center w-full border-b-2 border-foreground py-2 text-md font-bold uppercase"
            >
                <span>FLIGHTS & ROUTES</span>
            </div>

            <!-- NO ITINERARY TYPE -->
            <div
                v-if="!tourForm.containsRoute()"
                class="flex min-h-40 flex-col items-center justify-center rounded-md border border-dashed border-border text-center p-4"
            >
                <div class="mb-2 rounded-full bg-muted p-3">
                    <Icon
                        icon="lucide:plane"
                        class="size-5 text-muted-foreground"
                    />
                </div>

                <p class="text-sm font-medium text-foreground">
                    Select an itinerary type
                </p>

                <p class="mt-1 text-xs text-muted-foreground">
                    Tour Flights & Routes will appear here once you select
                    the itinerary type.
                </p>
            </div>

            <!-- ROUTES -->
            <div
                v-else
                class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4"
            >

                <div
                    v-for="(route, index) in tourForm.form.routes"
                    :key="index"
                    class="space-y-6 rounded-md border border-border p-8"
                >

                    <!-- ROUTE HEADER -->
                    <div
                        class="flex items-center justify-between text-sm font-bold text-muted-foreground uppercase"
                    >
                        <span v-if="tourForm.containsMultipleFlights()">
                            Flight Route {{ index + 1 }}
                        </span>
                        <span v-else>
                            Flight Route
                        </span>

                        <ButtonIcon
                            @click="tourForm.removeRoute(index)"
                            icon="lucide:trash-2"
                            class="text-red-600 bg-transparent hover:bg-red-50"
                        />
                    </div>

                    <!-- DEPARTURE / DESTINATION -->
                    <div
                        class="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 w-full"
                    >

                        <!-- DEPARTURE -->
                        <div class="w-full space-y-4">

                            <div class="space-y-2">
                                <label
                                    :for="`departure-route-${index + 1}-country`"
                                    class="block text-sm font-medium"
                                >
                                    Departure Country
                                    <span class="text-red-600">*</span>
                                </label>

                                <SelectMenu
                                    :id="`departure-route-${index + 1}-country`"
                                    v-model="route.departure_country_id"
                                    placeholder="Select country"
                                    :options="referenceData.countryOptions"
                                    class="font-roboto text-sm"
                                />
                                <InputError :message="tourForm.errors['routes.'+ index + '.departure_country_id']" />
                            </div>

                            <div class="space-y-2">
                                <label
                                    :for="`departure-route-${index + 1}-location`"
                                    class="block text-sm font-medium"
                                >
                                    Departure Location
                                    <span class="text-red-600">*</span>
                                </label>

                                <Input
                                    :id="`departure-route-${index + 1}-location`"
                                    v-model="route.departure_city"
                                    placeholder="Location"
                                    class="font-roboto text-sm"
                                />
                                <InputError :message="tourForm.errors['routes.'+ index + '.departure_city']" />
                            </div>

                        </div>

                        <!-- ARROW -->
                        <span
                            class="self-center text-sm font-bold text-muted-foreground uppercase"
                        >
                            <Icon
                                v-if="tourForm.isRoundTrip()"
                                icon="lucide:arrow-left-right"
                                class="size-6"
                            />

                            <Icon
                                v-else
                                icon="lucide:move-right"
                                class="size-6"
                            />
                        </span>

                        <!-- DESTINATION -->
                        <div class="w-full space-y-4">

                            <div class="space-y-2">
                                <label
                                    :for="`destination-route-${index + 1}-country`"
                                    class="block text-sm font-medium"
                                >
                                    Destination Country
                                    <span class="text-red-600">*</span>
                                </label>

                                <SelectMenu
                                    :id="`destination-route-${index + 1}-country`"
                                    v-model="route.destination_country_id"
                                    placeholder="Select country"
                                    :options="referenceData.countryOptions"
                                    class="font-roboto text-sm"
                                />
                                <InputError  :message="tourForm.errors['routes.' + index + '.destination_country_id']" />
                            </div>

                            <div class="space-y-2">
                                <label
                                    :for="`destination-route-${index + 1}-location`"
                                    class="block text-sm font-medium"
                                >
                                    Destination Location
                                    <span class="text-red-600">*</span>
                                </label>

                                <Input
                                    :id="`destination-route-${index + 1}-location`"
                                    v-model="route.destination_city"
                                    placeholder="Location"
                                    class="font-roboto text-sm"
                                />
                                <InputError  :message="tourForm.errors['routes.' + index + '.destination_city']" />
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <!-- ADD ROUTE -->
            <div v-if="!tourForm.isOnRouteLimit()" class="w-full">
                <button
                    type="button"
                    @click="tourForm.addRoute()"
                    class="w-full text-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.04)] border-2 border-dashed border-border px-4 py-2.5 text-sm font-medium transition-all duration-150 rounded-md hover:bg-[rgb(var(--color-primary)/0.08)]"
                >
                    + Add Another Route
                </button>
            </div>

        </div>
    </div>
</template>