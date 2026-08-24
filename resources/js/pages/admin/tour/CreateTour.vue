<script setup lang="ts">
import TourForm from '@/components/form/tour/TourForm.vue'
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
import Button from '@/components/ui/button/Button.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useTourFormStore } from '@/stores/tourForm'
import { BreadcrumbItem } from '@/types'
import { Icon } from '@iconify/vue'
import { Head, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const tourForm = useTourFormStore()
const isSaving = ref(false)

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tour Management',
        href: route('admin.tours'),
    },
    {
        title: 'Create',
        href: route('admin.tours.create'),
    },
]

function createDraftTour() {
    isSaving.value = true

    router.post(
        route('admin.tours.store', { absolute:true }),
        {
            overview: JSON.stringify(tourForm.form.overviewItems),
        },
        {
            onFinish: () => {
                isSaving.value = false
            },
            onError: (e) => {
                tourForm.setErrors(e)
                toast.error('Failed to save the tour. Please check for required forms.')
            },
            onSuccess: () => {
                tourForm.clearErrors()
                toast.success('Tour saved successfully.')
            },
        },
    )
}
</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">

        <Head title="Create Tour" />

        <div class="text-foreground">

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
                <TourForm :is-create-new="true" />
            </div>

            <ScrollToTopButton />

        </div>
    </AppLayout>
</template>