<script setup lang="ts">
import { ref } from 'vue'
import MultiDatePicker from '@/components/MultiDatePicker.vue'
import Input from '@/components/ui/input/Input.vue'
import DatePicker from '@/components/NewDatePicker.vue'
import { parseStringDate, parseStringDateWithDuration } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Icon } from '@iconify/vue'
import { useTourFormStore } from '@/stores/tourForm'
import { Checkbox } from '@/components/ui/checkbox'
import InputError from '@/components/InputError.vue'

interface Props {
    isLoading?: boolean
}

defineProps<Props>()

const tourForm = useTourFormStore();

</script>

<template>
    <div class="space-y-6">
        <div class="space-y-4">
            <div class="flex items-center w-full border-b-2 border-foreground py-2 text-md font-bold uppercase">
                <span>DATES & PRICING</span>
            </div>

            <!-- Schedule -->
            <div class="space-y-4 p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="text-sm font-semibold text-zinc-600">Select Departure Dates</label>
                        <div class="flex flex-col items-end gap-2">
                            <MultiDatePicker :disabled="isLoading" v-model="tourForm.form.schedules.selected_dates"
                                placeholder="Select multiple dates" @change="(value) => tourForm.syncSchedules(value)"
                                trigger-class="h-10 w-full" />
                            <button :disabled="isLoading" v-if="tourForm.containsSelectedDates()" @click="tourForm.clearSelectedDates"
                                type="button" class="text-sm text-red-600 italic underline">Reset date</button>
                        </div>
                    </div>

                    <div class="space-y-2 w-full">
                        <label class="text-sm font-semibold text-zinc-600">Booking Deadline <span
                                class="text-xs text-muted-foreground italic">(Optional)</span></label>
                        <DatePicker :disabled="isLoading" v-model="tourForm.form.overviewItems.booking_deadline" placeholder="Select date" class="h-10 w-full" />
                        <InputError :message="tourForm.errors['overview.booking_deadline']" />
                    </div>
                </div>

                <div v-if="!tourForm.form.schedules.is_customized" class="flex flex-col gap-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Base Price <span
                                    class="text-red-600">*</span></label>
                            <Input :disabled="isLoading" v-model="tourForm.form.schedules.def_base_price" type="number" min="0" step="0.01" placeholder="0.00" class="h-10 w-full" />
                            <InputError v-if="!tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.0.base_price']" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Discounted Price <span
                                    class="text-xs text-muted-foreground italic">(Optional)</span></label>
                            <Input :disabled="isLoading" v-model="tourForm.form.schedules.def_discounted_price" type="number" min="0" step="0.01" placeholder="0.00" class="h-10 w-full" />
                            <InputError v-if="!tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.0.discounted_price']" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Minimum Pax <span
                                    class="text-red-600">*</span></label>
                            <Input :disabled="isLoading" v-model="tourForm.form.schedules.def_min_pax" type="number" min="1" step="1" placeholder="1" class="h-10 w-full" />
                            <InputError v-if="!tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.0.min_pax']" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Maximum Pax <span
                                    class="text-xs text-muted-foreground italic">(Optional)</span></label>
                            <Input :disabled="isLoading" v-model="tourForm.form.schedules.def_max_pax" type="number" min="1" step="1" placeholder="N/A" class="h-10 w-full" />
                            <InputError v-if="!tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.0.max_pax']" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Airline Name <span
                                    class="text-red-600">*</span></label>
                            <Input :disabled="isLoading" v-model="tourForm.form.schedules.def_airline_name" type="text" placeholder="e.g. Qatar Airways, Manila International Airport..."
                                class="h-10 w-full" />
                             <InputError v-if="!tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.0.airline_name']" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Departure Flight No <span
                                    class="text-red-600">*</span></label>
                            <Input :disabled="isLoading" v-model="tourForm.form.schedules.def_departure_flight_no" type="text" placeholder="e.g. 2A1234" class="h-10 w-full" />
                             <InputError v-if="!tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.0.departure_flight_no']" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Return Flight No <span
                                    class="text-red-600">*</span></label>
                            <Input :disabled="isLoading" v-model="tourForm.form.schedules.def_return_flight_no" type="text" placeholder="e.g. 2A1234" class="h-10 w-full" />
                            <InputError v-if="!tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.0.return_flight_no']" />
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="space-y-4">
            <div class="flex items-center justify-between w-full border-b-2 border-foreground py-2 ">
                <span class="text-md font-bold uppercase">SCHEDULES</span>
                <div class="text-sm flex item-center gap-1 font-bold">
                    <Checkbox :disabled="isLoading" v-model="tourForm.form.schedules.is_customized" :checked="tourForm.form.schedules.is_customized" id="customize"  @update:checked="tourForm.handleCustomizeChange" />
                    <label for="customize">Customize</label>
                </div>
            </div>

            <!-- No type selected -->
            <div v-if="!tourForm.containsSelectedDates()"
                class="flex min-h-40 flex-col items-center justify-center rounded-md border border-dashed border-border text-center p-4">
                <div class="mb-2 rounded-full bg-muted p-3">
                    <Icon icon="lucide:calendar-days" class="size-5 text-muted-foreground" />
                </div>

                <p class="text-sm font-medium text-foreground">
                    Select a departure dates
                </p>

                <p class="mt-1 text-xs text-muted-foreground">
                    Tour departure dates will appear hear.
                </p>
            </div>


            <!-- Schedule -->
            <div v-else class="space-y-2 p-4">
                
                <!-- CUSTOMIZE -->
                <Accordion :disabled="isLoading" v-if="tourForm.form.schedules.is_customized" type="multiple" collapsible class="w-full space-y-2">
                    <AccordionItem v-for="(date, index) in tourForm.form.schedules.customize"
                        :key="index" :value="date.departure_date" class="w-full border border-border rounded-md px-4">
                        <AccordionTrigger>
                            <div class="flex items-center gap-4 text-sm">
                                <span> {{ parseStringDate(date.departure_date) }} </span>
                                <Icon icon="lucide:move-right" class="size-6" />
                                <span> {{ parseStringDateWithDuration(date.departure_date, tourForm.form.overviewItems.duration) }}
                                </span>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent>
                            <div class="flex flex-col gap-4 border-t pt-4 p-4 bg-zinc-50">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label class="text-xs font-semibold text-zinc-600">Base Price <span
                                                class="text-red-600">*</span></label>
                                        <Input :disabled="isLoading" v-model="tourForm.form.schedules.customize[index].base_price" type="number" min="0" step="0.01" placeholder="0.00" class="h-8 w-full text-xs" />
                                        <InputError v-if="tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.'+ index + '.base_price']" />
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-xs font-semibold text-zinc-600">Discounted Price <span
                                                class="text-xs text-muted-foreground italic">(Optional)</span></label>
                                        <Input :disabled="isLoading" v-model="tourForm.form.schedules.customize[index].discounted_price" type="number" min="0" step="0.01" placeholder="0.00" class="h-8 w-full text-xs" />
                                        <InputError v-if="tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.'+ index + '.discounted_price']" />
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label class="text-xs font-semibold text-zinc-600">Minimum Pax <span
                                                class="text-red-600">*</span></label>
                                        <Input :disabled="isLoading" v-model="tourForm.form.schedules.customize[index].min_pax" type="number" min="1" step="1" placeholder="1" class="h-8 w-full text-xs" />
                                        <InputError v-if="tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.'+ index + '.min_pax']" />
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-xs font-semibold text-zinc-600">Maximum Pax <span
                                                class="text-xs text-muted-foreground italic">(Optional)</span></label>
                                        <Input :disabled="isLoading" v-model="tourForm.form.schedules.customize[index].max_pax" type="number" min="1" step="1" placeholder="N/A" class="h-8 w-full text-xs" />
                                        <InputError v-if="tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.'+ index + '.max_pax']" />
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div class="space-y-2">
                                        <label class="text-xs font-semibold text-zinc-600">Airline Name <span
                                                class="text-red-600">*</span></label>
                                        <Input :disabled="isLoading" v-model="tourForm.form.schedules.customize[index].airline_name" type="text" placeholder="e.g. Qatar Airways, Manila International Airport..."
                                            class="h-8 w-full text-xs" />
                                        <InputError v-if="tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.'+ index + '.airline_name']" />
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-xs font-semibold text-zinc-600">Departure Flight No <span
                                                class="text-red-600">*</span></label>
                                        <Input :disabled="isLoading" v-model="tourForm.form.schedules.customize[index].departure_flight_no" type="text" placeholder="e.g. 2A1234" class="h-8 w-full text-xs" />
                                        <InputError v-if="tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.'+ index + '.departure_flight_no']" />
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-xs font-semibold text-zinc-600">Return Flight No <span
                                                class="text-red-600">*</span></label>
                                        <Input :disabled="isLoading" v-model="tourForm.form.schedules.customize[index].return_flight_no" type="text" placeholder="e.g. 2A1234" class="h-8 w-full text-xs" />
                                        <InputError v-if="tourForm.form.schedules.is_customized" :message="tourForm.errors['schedules.'+ index + '.return_flight_no']" />
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <!-- default -->
                <div v-else v-for="(date, index) in tourForm.form.schedules.customize"
                        :key="index" :value="date.departure_date" class="w-full border border-border rounded-md px-4 py-4">
                     <div class="flex items-center gap-4 text-sm">
                        <span> {{ parseStringDate(date.departure_date) }} </span>
                        <Icon icon="lucide:move-right" class="size-6" />
                        <span> {{ parseStringDateWithDuration(date.departure_date, tourForm.form.overviewItems.duration) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>