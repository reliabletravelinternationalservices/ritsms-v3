<script setup lang="ts">
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { BreadcrumbItem } from '@/types'
import { Head, Link } from '@inertiajs/vue3'
import { Quote } from '@/types/quote'
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue'
import Button from '@/components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import { formatDateRange, formatDateString, getMediaUrl, getPackageDurationLabel } from '@/lib/utils'


interface Props {
    quotation: Quote
}

const props = defineProps<Props>()

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quotation Management',
        href: route('admin.quotations'),
    },
    {
        title: props.quotation.code,
        href: route('admin.quotations.view', {
            slug: props.quotation.slug,
        }),
    },
]



const options: SelectOption[] = [
    { label: 'Draft', value: 'draft' },
    { label: 'Sent', value: 'sent' },
    { label: 'Viewed', value: 'viewed' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Expired', value: 'expired' },
    { label: 'Cancelled', value: 'cancelled' },
]


</script>

<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <Head :title="`Quotation ${quotation.code}`" />

        <div class="flex flex-col text-foreground">
            <!-- QUOTATION -->
            <div class="border-b border-border bg-background">
                <div class="p-6 text-foreground">
                    <!-- Header -->
                    <div class="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">

                        <!-- Left: Quotation Identity -->
                        <div class="min-w-0">
                            <div class="flex items-center gap-3">
                                <div
                                    class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600"
                                >
                                    <Icon icon="lucide:file-text" class="size-6" />
                                </div>

                                <div class="min-w-0">
                                    <div class="flex flex-wrap items-center gap-2">
                                        <h1 class="text-2xl font-bold tracking-tight">
                                            Quotation
                                        </h1>

                                        <span
                                            class="rounded-md bg-yellow-500/10 px-2 py-1 text-sm font-semibold text-yellow-600"
                                        >
                                            {{ quotation.code }}
                                        </span>

                                        <span
                                            class="rounded-full border px-2.5 py-1 text-xs font-medium capitalize"
                                        >
                                            {{ quotation.status }}
                                        </span>
                                    </div>

                                    <p class="mt-1 text-sm text-muted-foreground">
                                        Manage quotation details, status, and client actions.
                                    </p>
                                </div>
                            </div>

                            <!-- Metadata -->
                            <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                                <div class="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Icon icon="lucide:calendar-plus" class="size-4" />

                                    <span>
                                        Created
                                        <span class="font-medium text-foreground">
                                            {{ formatDateString(quotation.created_at) }}
                                        </span>
                                    </span>
                                </div>

                                <div class="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Icon icon="lucide:clock-3" class="size-4" />

                                    <span>
                                        Last updated
                                        <span class="font-medium text-foreground">
                                            {{ formatDateString(quotation.updated_at) }}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Right: Actions -->
                        <div class="flex flex-wrap items-center gap-2 xl:justify-end">

                            <!-- Status -->
                            <SelectMenu
                                v-model="quotation.status"
                                :options="options"
                                :enable-clear="false"
                                class="w-auto min-w-32"
                            />

                            <div class="h-6 w-px bg-border" />

                            <!-- Secondary Actions -->
                            <Button
                                variant="outline"
                                class="gap-2"
                            >
                                <Icon icon="lucide:edit" class="size-4" />
                                Edit
                            </Button>

                            <Button
                                variant="outline"
                                class="gap-2"
                            >
                                <Icon icon="lucide:download" class="size-4" />
                                PDF
                            </Button>

                            <!-- Reject -->
                            <Button
                                variant="outline"
                                class="gap-2 border-red-500/50 text-red-500 hover:border-red-500 hover:bg-red-500/10 hover:text-red-600"
                            >
                                <Icon icon="lucide:file-x-2" class="size-4" />
                                Reject
                            </Button>

                            <!-- Primary Action -->
                            <Button
                                class="gap-2 bg-green-600 text-white hover:bg-green-700"
                            >
                                <Icon icon="lucide:arrow-right-left" class="size-4" />
                                Convert to Booking
                            </Button>

                            <!-- More / Delete -->
                            <Button
                                variant="ghost"
                                size="icon"
                                class="text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                                title="Delete quotation"
                            >
                                <Icon icon="lucide:trash-2" class="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TOUR PREVIEW -->
            <div class="bg-muted/20 px-6 py-5">
                <div class="rounded-xl border border-border bg-background p-5 shadow-sm">

                    <!-- Section Header -->
                    <div class="mb-4 flex items-center gap-2">
                        <div class="flex size-8 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-600">
                            <Icon icon="lucide:map" class="size-4" />
                        </div>

                        <div>
                            <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Tour Preview
                            </p>
                            <p class="text-sm text-muted-foreground">
                                Tour included in this quotation
                            </p>
                        </div>
                    </div>

                    <!-- Tour Information -->
                    <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4 ">

                        <!-- Tour -->
                        <div class="min-w-0 lg:col-span-2">
                            <p class="mb-1 text-xs font-medium text-muted-foreground">
                                Tour
                            </p>

                            <p class="truncate text-lg font-semibold">
                                {{ quotation.tour_name }}
                            </p>

                            <!-- Clickable Code -->
                            <a
                                v-if="quotation.tour"
                                :href="route('admin.tours')"
                                target="_blank"
                                class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
                            >
                                {{ quotation.tour_code }}
                                <Icon icon="lucide:arrow-up-right" class="size-3.5" />
                            </a>

                            <!-- Non-clickable Code -->
                            <span
                                v-else
                                class="mt-1 inline-block text-sm font-medium text-muted-foreground"
                            >
                                {{ quotation.tour_code }}
                            </span>
                        </div>

                        <!-- Travel Dates -->
                        <div>
                            <p class="mb-1 text-xs font-medium text-muted-foreground">
                                Travel Dates
                            </p>

                            <div class="flex items-center gap-2">
                                <Icon
                                    icon="lucide:calendar-days"
                                    class="size-4 text-muted-foreground"
                                />

                                <span class="text-sm font-medium">
                                    {{ formatDateRange(
                                        quotation.departure_date,
                                        quotation.return_date
                                    ) }}
                                </span>
                            </div>
                        </div>

                        <!-- Duration -->
                        <div>
                            <p class="mb-1 text-xs font-medium text-muted-foreground">
                                Duration
                            </p>

                            <div class="flex items-center gap-2">
                                <Icon
                                    icon="lucide:clock-3"
                                    class="size-4 text-muted-foreground"
                                />

                                <span class="text-sm font-medium">
                                    {{ getPackageDurationLabel(quotation.tour_duration) }}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- CLIENT INFORMATION -->
            <div  class="bg-muted/20 px-6 py-5">
                <span>{{ quotation.client_id }}</span>
            </div>
        </div>


        <ScrollToTopButton />
    </AppLayout>
</template>