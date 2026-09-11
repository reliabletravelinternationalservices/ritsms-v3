<script setup lang="ts">
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useQuotationFormStore } from '@/stores/quotationForm'
import { BreadcrumbItem } from '@/types'
import { Icon } from '@iconify/vue'
import { Head, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import NewDatePicker from '@/components/NewDatePicker.vue'
import { Client } from '@/types/client'
import { useReferenceDataStore } from '@/stores/referenceData'
import Button from '@/components/ui/button/Button.vue'
import AppModal from '@/components/AppModal.vue'
import { Input } from '@/components/ui/input'
import InputError from '@/components/InputError.vue'
const quotationForm = useQuotationFormStore()
const isSaving = ref(false)
const refData = useReferenceDataStore();

interface Props {
    clients: Client[];
}
const props = defineProps<Props>()


refData.setClients(props.clients);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quotation Management',
        href: route('admin.quotations'),
    },
    {
        title: 'Create',
        href: route('admin.quotations.create'),
    },
]




const status: SelectOption[] = [
    {
        label: 'Draft',
        value: 'draft',
    },
    {
        label: 'Sent',
        value: 'sent',
    },
    {
        label: 'Viewed',
        value: 'viewed',
    },
    {
        label: 'Accepted',
        value: 'accepted',
    },
    {
        label: 'Rejected',
        value: 'rejected',
    },
    {
        label: 'Expired',
        value: 'expired',
    },
    {
        label: 'Cancelled',
        value: 'cancelled',
    },
];


const item_type: SelectOption[] = [
    {
        label: 'Travel Service',
        value: 'travel_service',
    },
    {
        label: 'Visa Assistance',
        value: 'passport_assistance',
    },
    {
        label: 'Passport Assistance',
        value: 'passport_assistance',
    },
    {
        label: 'Airport Transfer',
        value: 'airport_transfer',
    },
    {
        label: 'Hotel',
        value: 'hotel_booking',
    },
    {
        label: 'Flight',
        value: 'flight',
    },
    {
        label: 'Travel Insurance',
        value: 'travel_insurance',
    },
    {
        label: 'Other',
        value: 'other',
    },
];


function createDraftTour() {
    isSaving.value = true

    // router.post(
    //     route('admin.tours.store', { absolute:true }),
    //     {
    //         overview: JSON.stringify(tourForm.form.overviewItems),
    //     },
    //     {
    //         onFinish: () => {
    //             isSaving.value = false
    //         },
    //         onError: (e) => {
    //             tourForm.setErrors(e)
    //             toast.error('Failed to save the tour. Please check for required forms.')
    //         },
    //         onSuccess: () => {
    //             tourForm.clearErrors()
    //             toast.success('Tour saved successfully.')
    //         },
    //     },
    // )
}



const isModalOpen = ref(false)

</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Create Tour" />

        <div class="text-foreground relative overflow-none">

            <div
                class="flex justify-end gap-4 border-y border-border px-6 py-2"
            >
                <Button
                    type="button"
                    variant="default"
                    :disabled="isSaving"
                    class="flex items-center gap-2 bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary)/0.8)]"
                    @click="createDraftTour"
                >
                    <Icon
                        v-if="isSaving"
                        icon="lucide:loader-2"
                        class="size-5 animate-spin"
                    />

                    <Icon
                        v-else
                        icon="lucide:save-check"
                        class="size-5"
                    />

                    <span>
                        {{ isSaving ? 'Saving...' : 'Save as Draft' }}
                    </span>
                </Button>
            </div>

            <div class="p-6">
                <div>
                    <!-- ------------ -->
                        <div>
                            <div class="uppercase text-md font-bold border-b-2 border-foreground w-full py-2">
                                <span>Client Information</span>
                            </div>
                            <div class="flex flex-col gap-4 p-4">

                                <div class="flex items-start gap-4">
                                    <div class="space-y-2 w-1/2">
                                        <label for="id" class="block text-sm font-medium leading-6 text-gray-900">Client <span
                                                class="text-red-600">*</span></label>
                                        <SelectMenu v-model="quotationForm.form.client.id" @change="(value)=> quotationForm.getClient(Number(value), refData.clients)" :options="refData.clientOptions" name="id"
                                            placeholder="Select client" class="font-roboto text-sm" />
                                        <InputError :message="quotationForm.errors['client_id']" />
                                    </div>

                                    <div class="space-y-2 w-1/2">
                                        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Client Name <span
                                                class="text-red-600">*</span></label>
                                        <Input v-model="quotationForm.form.client.name" name="name"
                                            placeholder="Enter tour name" class="font-roboto text-sm" readonly />
                                        <InputError :message="quotationForm.errors['name']" />
                                    </div>
                                </div>

                                <div class="flex items-start gap-4">
                                    <div class="space-y-2 w-1/2">
                                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Client Email <span
                                                class="text-red-600">*</span></label>
                                        <Input v-model="quotationForm.form.client.email" name="email"
                                            placeholder="Enter tour name" class="font-roboto text-sm" readonly />
                                        <InputError :message="quotationForm.errors['email']" />
                                    </div>

                                    <div class="space-y-2 w-1/2">
                                        <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Client phone <span
                                                class="text-red-600">*</span></label>
                                        <Input v-model="quotationForm.form.client.phone" name="phone"
                                            placeholder="Enter tour name" class="font-roboto text-sm" readonly />
                                        <InputError :message="quotationForm.errors['phone']" />
                                    </div>
                                </div>
                            </div>

                            <!-- QUOTATION INFO -->
                            <div class="uppercase text-md font-bold border-b-2 border-foreground w-full py-2">
                                <span>Services</span>
                            </div>
                            <div class="flex flex-col gap-4 p-4">

                                <div class="flex items-start gap-4">
                                    <div class="space-y-2 w-1/2">
                                        <label for="status" class="block text-sm font-medium leading-6 text-gray-900">Status <span
                                                class="text-red-600">*</span></label>
                                        <SelectMenu v-model="quotationForm.form.status" :options="status" name="status"
                                            placeholder="Select status" class="font-roboto text-sm" />
                                        <InputError :message="quotationForm.errors['status']" />
                                    </div>

                                    <div class="space-y-2 w-1/2">
                                        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Client Name <span
                                                class="text-red-600">*</span></label>
                                        <Input v-model="quotationForm.form.client.name" name="name"
                                            placeholder="Enter tour name" class="font-roboto text-sm" readonly />
                                        <InputError :message="quotationForm.errors['name']" />
                                    </div>
                                </div>

                                <div class="flex items-start gap-4">
                                    <div class="space-y-2 w-1/2">
                                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Client Email <span
                                                class="text-red-600">*</span></label>
                                        <Input v-model="quotationForm.form.client.email" name="email"
                                            placeholder="Enter tour name" class="font-roboto text-sm" readonly />
                                        <InputError :message="quotationForm.errors['email']" />
                                    </div>

                                    <div class="space-y-2 w-1/2">
                                        <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Client phone <span
                                                class="text-red-600">*</span></label>
                                        <Input v-model="quotationForm.form.client.phone" name="phone"
                                            placeholder="Enter tour name" class="font-roboto text-sm" readonly />
                                        <InputError :message="quotationForm.errors['phone']" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    <!-- ----------- -->
                </div>
            </div>

            <ScrollToTopButton />
        
        </div>

        
    </AppLayout>
</template>