<script setup lang="ts">
// import TourTable from '@/components/table/tour/TourTable.vue';
import TourForm from '@/components/form/tour/TourForm.vue';
import PublishStatusDropdown, { PublishStatus } from '@/components/PublishStatusDropdown.vue';
import ScrollToTopButton from '@/components/ScrollToTopButton.vue';
import Button from '@/components/ui/button/Button.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { useTourFormStore } from '@/stores/tourForm';
import { BreadcrumbItem } from '@/types';
import { TourWithRelationshipTables } from '@/types/tour';
import { Icon } from '@iconify/vue';
import { Head, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { useReferenceDataStore } from '@/stores/referenceData'
import { useAlertDialog } from '@/composables/useAlertDialog';
import { isFile } from '@/lib/utils';

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
const isChangingStatus = ref(false)
const tourForm = useTourFormStore()
const referenceData = useReferenceDataStore()

watch(
    () => props.tour,
    (tour) => {
        if (!tour) return

        tourForm.clearFormChanges()
        tourForm.fillFormWithTourData(tour)
    },
    { immediate: true, deep: true }
)

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
    tourForm.syncMediaOrder()

    const formData = new FormData()

    formData.append(
        'overview',
        JSON.stringify(tourForm.transformOverview())
    )

    formData.append(
        'itineraries',
        JSON.stringify(tourForm.transformItinerary())
    )

    formData.append(
        'routes',
        JSON.stringify(tourForm.transformRoute())
    )

    formData.append(
        'hotels',
        JSON.stringify(tourForm.transformHotel())
    )

    formData.append(
        'schedules',
        JSON.stringify(tourForm.transformSchedules())
    )

    // IMAGES
    tourForm.form.assets.images.forEach((image) => {
        if (isFile(image)) {
            formData.append('images[]', image)
        }
    })

    if (tourForm.form.assets.mediaOrder.length) {
        formData.append(
            'media_order',
            JSON.stringify(tourForm.form.assets.mediaOrder)
        )
    }

    if (tourForm.form.assets.video && isFile(tourForm.form.assets.video)) {
        formData.append('video', tourForm.form.assets.video)
    }

    formData.append(
        'removed_media_ids',
        JSON.stringify(tourForm.form.assets.removedMediaIds)
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
                    'Failed to save the tour. Please check the form.'
                )
            },

            onSuccess: () => {
                tourForm.clearErrors()

                toast.success(
                    'Tour saved successfully.'
                )
                tourForm.resetFormChanges()
                router.reload({
                    only: ['tour'],
                })
            },
        },
    )
}


function resetFormChanges() {
    alertDialog({
        variant: 'warning',
        title: 'Reset Changes',
        description: 'All your changes will be gone. Are you sure you want to reset?',
        confirmText: 'Reset',
        onConfirm: () => {
            isReseting.value = true
            tourForm.resetFormChanges()
            isReseting.value = false
        }
    })
}

function updateStatus(status: PublishStatus) {
    isChangingStatus.value = true

    const formData = new FormData()

    formData.append('state', status.state)
    formData.append('visibility', status.visibility)

    router.patch(route('admin.tours.update.status', {
        tour: props.tour.id,
    }),
        formData,
        {
            onBefore: () => {
                saveTourChanges()
            },
            onFinish: () => {
                isChangingStatus.value = false
            },
            onError: () => {
                toast.error(
                    'Failed to change tour status.'
                )
            },

            onSuccess: () => {
                tourForm.clearErrors()
                tourForm.resetFormChanges()

                toast.success(
                    'Tour status changed.'
                )
                router.reload({
                    only: ['tour'],
                })
            },
        }
    );
}
</script>


<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Edit Tour" />
        <div class="text-foreground">
            <div class="flex items-center justify-between border-y border-border bg-background px-6 py-3">
                <!-- Left -->
                <div class="flex items-center gap-2">
                    <span class="text-sm text-muted-foreground">
                        {{ tourForm.hasChanges ? 'Unsaved changes' : 'All changes saved' }}
                    </span>
                </div>

                <!-- Right -->
                <div class="flex items-center gap-2">

                    <!-- Reset -->
                    <Button variant="outline" class="flex items-center gap-2"
                        :disabled="isReseting || isSaving || isChangingStatus || !tourForm.hasChanges"
                        @click="resetFormChanges">
                        <Icon v-if="isReseting" icon="lucide:loader-2" class="size-4 animate-spin" />

                        <Icon v-else icon="lucide:rotate-ccw" class="size-4" />

                        <span class="hidden sm:inline">
                            {{ isReseting ? 'Resetting...' : 'Reset' }}
                        </span>
                    </Button>

                    <!-- Save -->
                    <Button class="flex items-center gap-2 text-white transition-colors" :class="tourForm.hasChanges
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-muted text-muted-foreground'
                        " :disabled="isReseting ||
                            isSaving ||
                            isChangingStatus ||
                            !tourForm.hasChanges
                            " @click="saveTourChanges">
                        <Icon v-if="isSaving" icon="lucide:loader-2" class="size-4 animate-spin" />

                        <Icon v-else icon="lucide:save" class="size-4" />

                        <span>
                            {{ isSaving ? 'Saving...' : 'Save Changes' }}
                        </span>
                    </Button>

                    <!-- Status -->
                    <PublishStatusDropdown v-model:state="tourForm.form.overviewItems.state"
                        v-model:visibility="tourForm.form.overviewItems.visibility" :loading="isChangingStatus"
                        @change="updateStatus" />

                </div>
            </div>
            <div class="p-6">
                <TourForm :is-create-new="false" :is-loading="isSaving || isReseting" />
            </div>
            <ScrollToTopButton />
        </div>
    </AppLayout>
</template>