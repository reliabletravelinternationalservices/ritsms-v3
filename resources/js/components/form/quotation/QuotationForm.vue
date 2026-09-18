<script setup lang="ts">
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue';
import { formatCurrency, getDateWithDuration } from '@/lib/utils';
import { useQuotationFormStore } from '@/stores/quotationForm'
import { useReferenceDataStore } from '@/stores/referenceData';
import { computed } from 'vue';
import { Input } from '@/components/ui/input'
import InputError from '@/components/InputError.vue'
import { Checkbox } from '@/components/ui/checkbox'
import NewDatePicker from '@/components/NewDatePicker.vue'
import { Textarea } from '@/components/ui/textarea'
const quotationForm = useQuotationFormStore();
const refData = useReferenceDataStore();

const { 
    toggleCustomDate,
    addCustomDate,
    getSelectedClient,
    getTourDuration,
    calculatePricing,
    addDeparture
} = quotationForm

const {
    getTourByID,
    getSelectedDeparturePrice,
} = refData



const getDepartureOptions = computed<SelectOption[]>(
    ()=> refData.getTourDepartureOptions(
        Number(quotationForm.form.tour.tour_id)).value as SelectOption[])




// const status: SelectOption[] = [
//     {
//         label: 'Draft',
//         value: 'draft',
//     },
//     {
//         label: 'Sent',
//         value: 'sent',
//     },
//     {
//         label: 'Viewed',
//         value: 'viewed',
//     },
//     {
//         label: 'Accepted',
//         value: 'accepted',
//     },
//     {
//         label: 'Rejected',
//         value: 'rejected',
//     },
//     {
//         label: 'Expired',
//         value: 'expired',
//     },
//     {
//         label: 'Cancelled',
//         value: 'cancelled',
//     },
// ];



function changeSelectedClientValue (id?:string) {
    getSelectedClient(Number(id), refData.clients);
} 

function changeSelectedTourDuration(id?:string){
    const tour = getTourByID(Number(id));
    getTourDuration(tour.value)
}

function changeDepartureDate(id?:string){
    const tourId = Number(quotationForm.form.tour.tour_id);
    const depID = Number(id);
    const departure = getSelectedDeparturePrice(tourId,depID)
    if (!departure.value) return
    addDeparture(departure.value)
}

function changeCustomDateValue(departureDate?:string){
    if(!departureDate) return
    const tourDuration = quotationForm.form.tour.tour_duration
    const returnDate = getDateWithDuration(departureDate, tourDuration)
    if(!returnDate) return
    addCustomDate(departureDate, returnDate)
}

function calculateChangedValue(){
    calculatePricing()
}


</script>

<template>
    <div>
    <!-- ------------ -->
        <!-- CLIENT -->
        <div>
            <div class="uppercase text-md font-bold border-b-2 border-foreground w-full py-2">
                <span>Client Information</span>
            </div>
            <div class="flex flex-col gap-4 p-4">

                <div class="flex items-start gap-4">
                    <div class="space-y-2 w-1/2">
                        <label for="client_id" class="block text-sm font-medium leading-6 text-gray-900">Client </label>
                        <SelectMenu v-model="quotationForm.form.client.client_id" 
                            @change="changeSelectedClientValue" 
                            :options="refData.clientOptions" 
                            name="client_id"
                            placeholder="Select client" 
                            class="font-roboto text-sm" />
                        <InputError :message="quotationForm.errors['client_id']" />
                    </div>

                    <div class="space-y-2 w-1/2">
                        <label for="primary_client_email" 
                            class="block text-sm font-medium leading-6 text-gray-900">Client Name <span 
                                v-if="!quotationForm.hasSelectedClient"
                                class="text-red-600">*</span>
                        </label>
                        <Input v-model="quotationForm.form.client.primary_client_name" 
                            name="primary_client_name" 
                            type="name"
                            placeholder="Enter client name" class="font-roboto text-sm"
                            :readonly="quotationForm.hasSelectedClient" />
                        <InputError :message="quotationForm.errors['primary_client_name']" />
                    </div>
                </div>

                <div class="flex items-start gap-4">
                    <div class="space-y-2 w-1/2">
                        <label for="primary_client_email" 
                            class="block text-sm font-medium leading-6 text-gray-900">Client Email <span 
                                v-if="!quotationForm.hasSelectedClient"
                                class="text-red-600">*</span>
                        </label>
                        <Input v-model="quotationForm.form.client.primary_client_email" 
                            name="primary_client_email" 
                            type="email"
                            placeholder="Enter client email" class="font-roboto text-sm"
                            :readonly="quotationForm.hasSelectedClient" />
                        <InputError :message="quotationForm.errors['primary_client_email']" />
                    </div>
                    <div class="space-y-2 w-1/2">
                        <label for="primary_client_phone" 
                            class="block text-sm font-medium leading-6 text-gray-900">Client phone <span 
                                v-if="!quotationForm.hasSelectedClient"
                                class="text-zinc-500 italic text-xs">(optional)</span></label>
                        <Input v-model="quotationForm.form.client.primary_client_phone" 
                            name="primary_client_phone"
                            placeholder="Enter client phone" 
                            class="font-roboto text-sm" 
                            :readonly="quotationForm.hasSelectedClient" />
                        <InputError :message="quotationForm.errors['primary_client_phone']" />
                    </div>
                </div>
            </div>




            <!-- TOUR AND DEPARTURE -->
            <div class="uppercase text-md font-bold border-b-2 border-foreground w-full py-2">
                <span>Tour & Departure</span>
            </div>
            <div class="flex flex-col gap-4 p-4">

                <div class="flex items-start gap-4">
                    <div class="space-y-2 w-1/2">
                        <label for="tour_id" class="block text-sm font-medium leading-6 text-gray-900">Tours <span
                                class="text-red-600">*</span></label>
                        <SelectMenu v-model="quotationForm.form.tour.tour_id" 
                            :options="refData.tourOptions" 
                            name="tour_id"
                            placeholder="Select tour" 
                            class="font-roboto text-sm" 
                            @change="changeSelectedTourDuration" />
                        <InputError :message="quotationForm.errors['tour_id']" />
                    </div>

                    <div class="space-y-2 w-1/2">
                        <div class="flex justify-between">
                            <label for="departure_id" class="block text-sm font-medium leading-6 text-gray-900">Departure </label>
                            <span class="flex gap-1">
                                <Checkbox 
                                    id="is_custom_date" 
                                    v-model="quotationForm.form.departure.is_custom_date" 
                                    @update:checked="toggleCustomDate" :checked="quotationForm.isCustomDate" /> 
                                <label for="is_custom_date" name="is_custom_date">Custom</label>
                            </span>
                        </div>
                            <SelectMenu v-if="!quotationForm.isCustomDate" 
                                v-model="quotationForm.form.departure.tour_departure_id" 
                                :options="getDepartureOptions" 
                                name="departure_id"
                                placeholder="Select status" class="font-roboto text-sm"
                                :disabled="!quotationForm.form.tour.tour_id" 
                                @change="changeDepartureDate"/>
                            <NewDatePicker v-else v-model="quotationForm.form.departure.departure_date" @change="changeCustomDateValue" />
                            <InputError :message="quotationForm.errors['departure_id']" />
                    </div>
                </div>

                <div class="flex items-start gap-4">
                    <div class="space-y-2 w-1/2">
                        <label for="tour_duration" 
                            class="block text-sm font-medium leading-6 text-gray-900">Duration <span
                                class="text-zinc-600 text-xs italic">(days)</span></label>
                        <Input 
                            v-model="quotationForm.form.tour.tour_duration" 
                            type="number" 
                            name="tour_duration"
                            placeholder="Enter tour name" 
                            class="font-roboto text-sm" 
                            :readonly="quotationForm.hasSelectedTour" />
                        <InputError :message="quotationForm.errors['tour_duration']" />
                    </div>

                    <div class="space-y-2 w-1/2">
                        <label for="total_pax" 
                            class="block text-sm font-medium leading-6 text-gray-900">Total Pax <span
                                class="text-red-600">*</span></label>
                        <Input 
                            v-model="quotationForm.form.departure.total_pax" 
                            type="number" 
                            min="0"
                            name="total_pax"
                            placeholder="0" 
                            class="font-roboto text-sm"  />
                        <InputError :message="quotationForm.errors['total_pax']" />
                    </div>
                                                                                            
                </div>
            </div>

            <!-- PAYMENT AND SUMMARY -->
            <div class="uppercase text-md font-bold border-b-2 border-foreground w-full py-2">
                <span>PAYMENT & SUMMARY</span>
            </div>
            <div class="flex gap-4 p-4">

                <!--  -->
                <div class="flex flex-col items-start gap-4 w-full">
                    <div class="flex items-start gap-4 w-full">
                        <div class="space-y-2 w-1/2">
                            <label for="subtotal" class="block text-sm font-medium leading-6 text-gray-900">Subtotal Price <span
                                    class="text-red-600">*</span></label>
                            <Input v-model="quotationForm.form.pricing.subtotal" 
                                name="subtotal"
                                placeholder="Enter subtotal" class="font-roboto text-sm" 
                                @update:model-value="calculateChangedValue" />
                            <InputError :message="quotationForm.errors['subtotal']" />
                        </div>

                        <div class="space-y-2 w-1/2">
                            <label for="valid_until" class="block text-sm font-medium leading-6 text-gray-900">Valid Until <span
                                    class="text-zinc-400 italic text-xs">(optional)</span></label>
                            <NewDatePicker
                                v-model="quotationForm.form.other.valid_until" 
                                name="valid_until" />
                            <InputError :message="quotationForm.errors['valid_until']" />
                        </div>
                    </div>

                    <div class="flex items-start gap-4 w-full">
                        <div class="space-y-2 w-1/2">
                            <label for="discount_total" 
                                class="block text-sm font-medium leading-6 text-gray-900">Discount <span class="text-zinc-500 text-xs">(%)</span></label>
                            <Input v-model="quotationForm.form.pricing.discount_percentage" 
                                name="discount_total" 
                                type="number" min="0"
                                placeholder="Enter discount" 
                                class="font-roboto text-sm" 
                                @update:model-value="calculateChangedValue" />
                            <InputError :message="quotationForm.errors['discount_total']" />
                        </div>

                        <div class="space-y-2 w-1/2">
                            <label for="tax_total" 
                                class="block text-sm font-medium leading-6 text-gray-900">Tax <span class="text-zinc-500 text-xs">(%)</span></label>
                            <Input v-model="quotationForm.form.pricing.tax_percentage" 
                                name="tax_total" 
                                type="number" 
                                min="0"
                                placeholder="Enter tax" 
                                class="font-roboto text-sm" 
                                @update:model-value="calculateChangedValue" />
                            <InputError :message="quotationForm.errors['tax_total']" />
                        </div>
                    </div>

                    <div class="space-y-2 w-full">
                        <label for="remarks" class="block text-sm font-medium leading-6 text-gray-900">Quotaion Remarks <span
                                class="text-zinc-500 text-xs italic">(optional)</span></label>
                        <Textarea v-model="quotationForm.form.other.remarks"
                            name="remarks"
                            placeholder="Special request, meals preferences, noices, etc." 
                            class="font-roboto text-sm"  />
                        <InputError :message="quotationForm.errors['remarks']" />
                    </div>
                </div>
                

                <!-- SUMMARY SECTION -->
                <div class="w-2/3 rounded-lg border border-border bg-muted/60 p-5 h-min">
                    <!-- Header -->
                    <div class="mb-4 border-b border-border pb-3">
                        <h3 class="text-md font-semibold uppercase tracking-wide">
                            Summary
                        </h3>
                    </div>

                    <div class="space-y-3">
                        <!-- Tour -->
                        <div class="flex items-start justify-between gap-6">
                            <div class="min-w-0">
                                <p class="text-sm text-muted-foreground">
                                    Tour Package
                                </p>
                                <p class="font-medium">
                                    {{ quotationForm.form.tour.tour_name }}
                                </p>
                            </div>

                            <p class="shrink-0 text-right font-medium tabular-nums">
                                {{ formatCurrency(Number(quotationForm.form.pricing.subtotal), 'PHP', 2) }}
                            </p>
                        </div>

                        <!-- Discount -->
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-muted-foreground">
                                Discount ({{ quotationForm.form.pricing.discount_percentage }}%)
                            </span>

                            <span class="text-sm font-medium text-destructive tabular-nums">
                                − {{ formatCurrency(Number(quotationForm.form.pricing.discount_total), 'PHP', 2) }}
                            </span>
                        </div>

                        <!-- Tax -->
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-muted-foreground">
                                Tax ({{ quotationForm.form.pricing.tax_percentage }}%)
                            </span>

                            <span class="text-sm font-medium tabular-nums">
                                + {{ formatCurrency(Number(quotationForm.form.pricing.tax_total), 'PHP', 2) }}
                            </span>
                        </div>

                        <!-- Total -->
                        <div class="mt-4 flex items-center justify-between border-t border-border pt-4">
                            <span class="font-semibold">
                                Total
                            </span>

                            <span class="text-lg font-bold tabular-nums">
                                {{ formatCurrency(Number(quotationForm.form.pricing.grand_total), 'PHP', 2) }}
                            </span>
                        </div>
                    </div>
                </div>
                
            </div>

        </div>

    <!-- ----------- -->
    </div>
</template>