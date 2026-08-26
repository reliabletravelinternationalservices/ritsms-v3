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
                        <label class="text-sm font-semibold text-zinc-600">Select Departure Dates <span
                                class="text-red-600">*</span></label>
                        <div class="flex flex-col items-end gap-2">
                            <MultiDatePicker v-model="tourForm.form.schedules.selected_dates"
                                placeholder="Select multiple dates" @change="(value) => tourForm.syncSchedules(value)"
                                trigger-class="h-10 w-full" />
                            <button v-if="tourForm.containsSelectedDates()" @click="tourForm.clearSelectedDates"
                                type="button" class="text-sm text-red-600 italic underline">Reset date</button>
                        </div>
                    </div>

                    <div class="space-y-2 w-full">
                        <label class="text-sm font-semibold text-zinc-600">Booking Deadline <span
                                class="text-xs text-muted-foreground italic">(Optional)</span></label>
                        <DatePicker v-model="tourForm.form.schedules.def_booking_deadline" placeholder="Select date" class="h-10 w-full" />
                    </div>
                </div>

                <div v-if="!tourForm.form.schedules.is_customized" class="flex flex-col gap-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Base Price <span
                                    class="text-red-600">*</span></label>
                            <Input v-model="tourForm.form.schedules.def_price" type="number" min="0" step="0.01" placeholder="0.00" class="h-10 w-full" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Discounted Price <span
                                    class="text-xs text-muted-foreground italic">(Optional)</span></label>
                            <Input v-model="tourForm.form.schedules.def_discounted_price" type="number" min="0" step="0.01" placeholder="0.00" class="h-10 w-full" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Airline Name <span
                                    class="text-red-600">*</span></label>
                            <Input type="text" placeholder="e.g. Qatar Airways, Manila International Airport..."
                                class="h-10 w-full" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Departure Flight No <span
                                    class="text-red-600">*</span></label>
                            <Input type="text" placeholder="e.g. 2A1234" class="h-10 w-full" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-zinc-600">Return Flight No <span
                                    class="text-red-600">*</span></label>
                            <Input type="text" placeholder="e.g. 2A1234" class="h-10 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="space-y-4">
            <div class="flex items-center justify-between w-full border-b-2 border-foreground py-2 ">
                <span class="text-md font-bold uppercase">SCHEDULES</span>
                <div class="text-sm flex item-center gap-1 font-bold">
                    <Checkbox v-model="tourForm.form.schedules.is_customized" id="customize"  @update:checked="tourForm.handleCustomizeChange" />
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
    
                <Accordion v-if="tourForm.form.schedules.is_customized" type="single" collapsible class="w-full space-y-2">
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
                            <div class="flex flex-col gap-4 p-2 border-t pt-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label class="text-sm font-semibold text-zinc-600">Price <span
                                                class="text-xs text-muted-foreground italic">(Customize)</span></label>
                                        <Input type="number" min="0" step="0.01" placeholder="0.00"
                                            class="h-10 w-full" />
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-sm font-semibold text-zinc-600">Airline Name <span
                                                class="text-xs text-muted-foreground italic">(Customize)</span> <span
                                                class="text-red-600">*</span></label>
                                        <Input type="text"
                                            placeholder="e.g. Qatar Airways, Manila International Airport..."
                                            class="h-10 w-full" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <label class="text-sm font-semibold text-zinc-600">Departure Flight No <span
                                                class="text-xs text-muted-foreground italic">(Customize)</span> <span
                                                class="text-red-600">*</span></label>
                                        <Input type="text" placeholder="e.g. 2A1234" class="h-10 w-full" />
                                    </div>
                                    <div class="space-y-2">
                                        <label class="text-sm font-semibold text-zinc-600">Return Flight No <span
                                                class="text-xs text-muted-foreground italic">(Customize)</span> <span
                                                class="text-red-600">*</span></label>
                                        <Input type="text" placeholder="e.g. 2A1234" class="h-10 w-full" />
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
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