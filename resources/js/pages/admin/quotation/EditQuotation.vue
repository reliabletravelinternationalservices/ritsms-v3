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
import { Quote } from '@/types/quote'


interface Props {
    quotation: Quote;
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
        title: props.quotation.code,
        href: route('admin.quotations.view', {slug: props.quotation.slug}),
    },
    {
        title: 'Edit',
        href: route('admin.quotations.edit', {slug: props.quotation.slug}),
    },
]


const quotationForm = useQuotationFormStore()
const refData = useReferenceDataStore();
const { 
    clearErrors,
    setErrors,
    clearHasChanges,
    fillForm,
} = quotationForm
const {
    setClients,
    setTours,
} = refData


setClients(props.clients);
setTours(props.tours);
fillForm(props.quotation)
const isSaving = ref(false)





function updateQuotation() {

    router.put(
        route('admin.quotations.update', { quotation: props.quotation.id }),
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
                toast.error('Failed to update the quotation. Please check the form.')
            },
            onSuccess: () => {
                clearErrors()
                clearHasChanges()
                router.reload({
                    only: ['quotation'],
                    onSuccess: (page) => fillForm(page.props.quotation as Quote),   
                })
                toast.success('Quotation updated successfully.')
            },
        },
    )
}




</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Edit Quotation" />

        <div class="text-foreground relative overflow-none">

            <div
                class="flex justify-end gap-4 border-y border-border px-6 py-2"
            >
                <div>

                </div>
                <Button
                    type="button"
                    variant="default"
                    :disabled="isSaving || !quotationForm.hasChanges"
                    class="flex items-center gap-2 bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary)/0.8)]"
                    @click="updateQuotation"
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
                        {{ isSaving ? 'Saving...' : 'Update Quotation' }}
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