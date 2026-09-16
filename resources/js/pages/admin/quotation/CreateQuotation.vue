<script setup lang="ts">
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useQuotationFormStore } from '@/stores/quotationForm'
import { BreadcrumbItem } from '@/types'
import { Icon } from '@iconify/vue'
import { Head, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import { Client } from '@/types/client'
import { useReferenceDataStore } from '@/stores/referenceData'
import Button from '@/components/ui/button/Button.vue'
import { TourWithDepartures } from '@/types/tour'
import { toast } from 'vue-sonner'
import QuotationForm from '@/components/form/quotation/QuotationForm.vue'


interface Props {
    clients: Client[];
    tours: TourWithDepartures[];
}
const props = defineProps<Props>()


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


const quotationForm = useQuotationFormStore()
const refData = useReferenceDataStore();
const { 
    clearErrors,
    setErrors,
    clearForm,
} = quotationForm
const {
    setClients,
    setTours,
} = refData


setClients(props.clients);
setTours(props.tours);

const isSaving = ref(false)





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



function createQuotation() {

    router.post(
        route('admin.quotations.store', { absolute:true }),
        {
            ...quotationForm.form.client,
            ...quotationForm.form.tour,
            ...quotationForm.form.departure,
            ...quotationForm.form.pricing,
            ...quotationForm.form.other,
        },
        {
            onFinish: () => {
                isSaving.value = false
            },
            onError: (e) => {
                setErrors(e)
                toast.error('Failed to save the tour. Please check for required forms.')
            },
            onSuccess: () => {
                clearErrors()
                clearForm()
                toast.success('Quotation saved successfully.')
            },
        },
    )
}




</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Create Quotation" />

        <div class="text-foreground relative overflow-none">

            <div
                class="flex justify-end gap-4 border-y border-border px-6 py-2"
            >
                <Button
                    type="button"
                    variant="default"
                    :disabled="isSaving"
                    class="flex items-center gap-2 bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary)/0.8)]"
                    @click="createQuotation"
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
                <QuotationForm />
            </div>

            <ScrollToTopButton />
  
        </div>
    </AppLayout>
</template>