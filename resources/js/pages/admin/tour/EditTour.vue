<script setup lang="ts">
// import TourTable from '@/components/table/tour/TourTable.vue';
import TourForm from '@/components/form/tour/TourForm.vue';
import PublishStatusDropdown from '@/components/PublishStatusDropdown.vue';
import ScrollToTopButton from '@/components/ScrollToTopButton.vue';
import Button from '@/components/ui/button/Button.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useTourFormStore } from '@/stores/tourForm';
import { BreadcrumbItem } from '@/types';
import { TourWithRelationshipTables } from '@/types/tour';
import { Icon } from '@iconify/vue';
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { useReferenceDataStore } from '@/stores/referenceData'
import { useAlertDialog } from '@/composables/useAlertDialog';

const { alertDialog } = useAlertDialog()

const props = defineProps<{
    tour: TourWithRelationshipTables;
    countries: {
        id: number,
        name: string
    }[],
}>()

const isSaving = ref(false)
const isReseting = ref(false)
const tourForm = useTourFormStore()
const referenceData = useReferenceDataStore()

tourForm.fillFormWithTourData(props.tour)
referenceData.setCountries(props.countries)

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tour Management',
        href: route('admin.tours'),
    },
    {
        title: 'Edit',
        href: route('admin.tours.edit', { slug: props.tour.slug }),
    },
    {
        title: props.tour.name,
        href: '',
    },
];



function saveTourChanges() {
    isSaving.value = true

    const formData = new FormData()

    formData.append(
        'overview',
        JSON.stringify(tourForm.form.overviewItems)
    )

    formData.append(
        'itineraries',
        JSON.stringify(tourForm.form.itineraries)
    )


    formData.append(
        'routes',
        JSON.stringify(tourForm.form.routes)
    )


    formData.append(
        'hotels',
        JSON.stringify(tourForm.form.hotels)
    )

    formData.append(
        'schedules',
        JSON.stringify(tourForm.transformSchedules())
    )


    // Laravel method spoofing
    formData.append('_method', 'PUT')

    router.post(
        route('admin.tours.update', {
            tour: props.tour.id,
        }),
        formData,
        {
            forceFormData: true,

            onFinish: () => {
                isSaving.value = false
            },

            onError: (errors) => {
                console.error(errors)
                tourForm.setErrors(errors)

                toast.error(
                    'Failed to save the tour. Please check for the form.'
                )
            },

            onSuccess: () => {
                tourForm.clearErrors()
                toast.success('Tour saved successfully.')
            },
        },
    )
}


function resetFormChanges(){
    alertDialog({
    variant: 'warning',
    title: 'Reset Changes',
    description: 'All your changes will be gone. Are you sure you want to reset?',
    confirmText: 'Reset',
    onConfirm: () =>  {
        isReseting.value = true
        tourForm.resetFormChanges()
        isReseting.value = false
        }
    })
}
</script>


<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Edit Tour" />
        <div class="text-foreground">
            <div class="flex justify-end gap-4 border-y py-2 px-6 border-border">
                <Button variant="default"
                    class="flex items-center gap-2 bg-zinc-600 hover:bg-zinc-400 text-white"
                    :disabled="isReseting"
                    @click="resetFormChanges()"
                    >

                    <Icon
                        v-if="isReseting"
                        icon="lucide:loader-2"
                        class="size-5 animate-spin"
                    />
                    <Icon
                        v-else
                        icon="lucide:refresh-ccw"
                        class="size-5"
                    />
                </Button>

                <Button variant="default"
                    class="flex items-center gap-2 bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary)/0.8)] text-white"
                    :disabled="isSaving"
                    @click="saveTourChanges">
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
                        {{ isSaving ? 'Saving...' : 'Save Changes' }}
                    </span>
                </Button>

                <PublishStatusDropdown />
            </div>
            <div class="p-6">
                <TourForm :is-create-new="false" />
            </div>
            <ScrollToTopButton />
        </div>
    </AppLayout>
</template>