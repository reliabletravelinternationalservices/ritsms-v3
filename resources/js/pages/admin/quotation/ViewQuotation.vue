<script setup lang="ts">
import ScrollToTopButton from '@/components/ScrollToTopButton.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { BreadcrumbItem } from '@/types'
import { Head, Link, router } from '@inertiajs/vue3'
import { Quote } from '@/types/quote'
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue'
import Button from '@/components/ui/button/Button.vue'
import { Icon } from '@iconify/vue'
import { formatCurrency, formatDateRange, formatDateString, formatTime, getMediaUrl, getPackageDurationLabel } from '@/lib/utils'
import { ref } from 'vue'
import { useAlertDialog } from '@/composables/useAlertDialog'


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



const edit = () => {
    router.get(route('admin.quotations.edit', { slug: props.quotation.slug }))
}


const downloadPDF= () => {
    window.open(
        route('admin.quotations.pdf', { slug: props.quotation.slug }),
        '_blank',
        'noopener,noreferrer'
    )
}

const openDelete = () => {
const { alertDialog } = useAlertDialog()
    alertDialog({
        variant: 'warning',
        title: 'Delete Quotation',
        description: 'Do you want to delete this quotation?',
        confirmText: 'Delete',
        onConfirm: deleteQuotation
    })
}


const deleteQuotation = () => {
    router.delete(
        route('admin.quotations.delete', {
            quotation: props.quotation.id,
        }),
        {
            data: {
                redirect_url: route('admin.quotations'),
            },
        }
    )
}


const updateStatus = (status: string) => {
    router.put(
        route('admin.quotations.update.status', {
            quotation: props.quotation.id,
        }),
        {
           status: status
        },
        {
            preserveScroll: true,
            preserveState: true,
        }
    )
}
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

                            <!-- Icon -->
                            <div
                                class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600"
                            >
                                <Icon icon="lucide:file-text" class="size-6" />
                            </div>

                            <div class="min-w-0">

                                <!-- Title / Code / Status -->
                                <div class="flex flex-wrap items-center gap-2">

                                    <h1 class="text-2xl font-bold tracking-tight">
                                        Quotation
                                    </h1>

                                    <!-- Quotation Code -->
                                    <span
                                        class="rounded-md bg-yellow-500/10 px-2 py-1 text-sm font-semibold text-yellow-600"
                                    >
                                        {{ quotation.code }}
                                    </span>

                                    <!-- Status -->
                                    <span
                                        class="rounded-full border px-2.5 py-1 text-xs font-medium capitalize"
                                    >
                                        {{ quotation.status }}
                                    </span>

                                    <!-- Expired -->
                                    <span
                                        v-if="quotation.valid_until && new Date(quotation.valid_until) < new Date()"
                                        class="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600"
                                    >
                                        <Icon icon="lucide:circle-alert" class="size-3.5" />
                                        Expired
                                    </span>

                                </div>

                                <p class="mt-1 text-sm text-muted-foreground">
                                    Manage quotation details, status, and client actions.
                                </p>

                            </div>
                        </div>

                        <!-- Metadata -->
                        <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">

                            <!-- Created -->
                            <div class="flex items-center gap-2 text-xs text-muted-foreground">
                                <Icon icon="lucide:calendar-plus" class="size-4" />

                                <span>
                                    Created
                                    <span class="font-medium text-foreground">
                                        {{ formatDateString(quotation.created_at) }}
                                    </span>
                                </span>
                            </div>

                            <!-- Last Updated -->
                            <div class="flex items-center gap-2 text-xs text-muted-foreground">
                                <Icon icon="lucide:clock-3" class="size-4" />

                                <span>
                                    Last updated
                                    <span class="font-medium text-foreground">
                                        {{ formatDateString(quotation.updated_at) }}
                                    </span>
                                </span>
                            </div>

                            <!-- Valid Until -->
                            <div
                                class="flex items-center gap-2 text-xs"
                                :class="
                                    quotation.valid_until &&
                                    new Date(quotation.valid_until) < new Date()
                                        ? 'text-red-500'
                                        : 'text-muted-foreground'
                                "
                            >
                                <Icon icon="lucide:calendar-clock" class="size-4" />

                                <span>
                                    Valid until: 
                                    <span v-if="quotation.valid_until" class="font-medium">
                                        {{ formatDateString(quotation.valid_until) }}
                                    </span>
                                    <span v-else class="font-medium">
                                        N/A
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
                            @update:model-value="updateStatus"
                        />

                        <div class="h-6 w-px bg-border"></div>

                        <!-- Edit -->
                        <Button
                            variant="outline"
                            class="gap-2"
                            @click="edit"
                        >
                            <Icon icon="lucide:edit" class="size-4" />
                            Edit
                        </Button>

                        <!-- PDF -->
                        <Button
                            variant="outline"
                            class="gap-2"
                            @click="downloadPDF"
                        >
                            <Icon icon="lucide:download" class="size-4" />
                            PDF
                        </Button>

                        <!-- Share -->
                        <!-- <Button
                            variant="outline"
                            class="gap-2 border-blue-600 text-blue-600 hover:text-blue-700"
                        >
                            <Icon icon="lucide:send" class="size-4" />
                            Share
                        </Button> -->

                        <!-- Convert -->
                        <Button
                            class="gap-2 bg-green-600 text-white hover:bg-green-700"
                        >
                            <Icon icon="lucide:arrow-right-left" class="size-4" />
                            Convert to Booking
                        </Button>

                        <!-- Delete -->
                        <Button
                            variant="ghost"
                            size="icon"
                            class="text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
                            title="Delete quotation"
                            @click="openDelete"
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
                    <div class="mb-5 flex items-center gap-2">
                        <div class="flex size-8 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-600">
                            <Icon icon="lucide:map" class="size-4" />
                        </div>

                        <div>
                            <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Tour Preview
                            </p>
                            <p class="text-sm text-muted-foreground">
                                Tour and travel details included in this quotation
                            </p>
                        </div>
                    </div>

                    <!-- Main Tour Information -->
                    <div class="grid gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-4">

                        <!-- Tour -->
                        <div class="min-w-0 lg:col-span-2">
                            <p class="mb-1 text-xs font-medium text-muted-foreground">
                                Tour
                            </p>

                            <p class="truncate text-lg font-semibold">
                                {{ quotation.tour_name }}
                            </p>

                            <a
                                v-if="quotation.tour"
                                :href="route('admin.tours')"
                                target="_blank"
                                class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
                            >
                                {{ quotation.tour_code }}
                                <Icon icon="lucide:arrow-up-right" class="size-3.5" />
                            </a>

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
                                    class="size-4 shrink-0 text-muted-foreground"
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
                                    class="size-4 shrink-0 text-muted-foreground"
                                />

                                <span class="text-sm font-medium">
                                    {{ getPackageDurationLabel(quotation.tour_duration) }}
                                </span>
                            </div>
                        </div>

                        <!-- Departure -->
                        <div>
                            <p class="mb-1 text-xs font-medium text-muted-foreground">
                                Departure
                            </p>

                            <div class="flex items-center gap-2">
                                <Icon
                                    icon="lucide:plane-takeoff"
                                    class="size-4 shrink-0 text-muted-foreground"
                                />

                                <div class="min-w-0">
                                    <p class="truncate text-sm font-medium">
                                        {{ quotation.departure_date }}
                                    </p>

                                    <p
                                        v-if="quotation.departure_time"
                                        class="text-xs text-muted-foreground"
                                    >
                                        {{ formatTime(quotation.departure_time) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Return -->
                        <div>
                            <p class="mb-1 text-xs font-medium text-muted-foreground">
                                Return
                            </p>

                            <div class="flex items-center gap-2">
                                <Icon
                                    icon="lucide:plane-landing"
                                    class="size-4 shrink-0 text-muted-foreground"
                                />

                                <div class="min-w-0">
                                    <p class="text-sm font-medium">
                                        {{ formatDateString(quotation.return_date) }}
                                    </p>

                                    <p
                                        v-if="quotation.return_time"
                                        class="text-xs text-muted-foreground"
                                    >
                                        {{ formatTime(quotation.return_time) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Airline -->
                        <div>
                            <p class="mb-1 text-xs font-medium text-muted-foreground">
                                Airline
                            </p>

                            <div class="flex items-center gap-2">
                                <Icon
                                    icon="lucide:plane"
                                    class="size-4 shrink-0 text-muted-foreground"
                                />

                                <span class="truncate text-sm font-medium">
                                    {{ quotation.airline_name }}
                                </span>
                            </div>
                        </div>

                        <!-- Passengers -->
                        <div>
                            <p class="mb-1 text-xs font-medium text-muted-foreground">
                                Passengers
                            </p>

                            <div class="flex items-center gap-2">
                                <Icon
                                    icon="lucide:users"
                                    class="size-4 shrink-0 text-muted-foreground"
                                />

                                <span class="text-sm font-medium">
                                    {{ quotation.total_pax }}
                                    {{ quotation.total_pax === 1 ? 'Passenger' : 'Passengers' }}
                                </span>
                            </div>
                        </div>

                    </div>

                    <!-- Flight Information -->
                    <div class="mt-6 border-t border-border pt-5">
                        <div class="mb-4 flex items-center gap-2">
                            <Icon
                                icon="lucide:ticket"
                                class="size-4 text-muted-foreground"
                            />

                            <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Flight Information
                            </p>
                        </div>

                        <div class="grid gap-4 sm:grid-cols-2">

                            <!-- Departure Flight -->
                            <div class="rounded-lg border border-border bg-muted/20 p-4">
                                <div class="mb-2 flex items-center justify-between">
                                    <span class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Departure Flight
                                    </span>

                                    <Icon
                                        icon="lucide:plane-takeoff"
                                        class="size-4 text-muted-foreground"
                                    />
                                </div>

                                <p class="text-base font-semibold">
                                    {{ quotation.departure_flight_no || '—' }}
                                </p>

                                <p
                                    v-if="quotation.departure_time"
                                    class="mt-1 text-xs text-muted-foreground"
                                >
                                    Time:
                                    {{ formatTime(quotation.departure_time) }}
                                </p>
                            </div>

                            <!-- Return Flight -->
                            <div class="rounded-lg border border-border bg-muted/20 p-4">
                                <div class="mb-2 flex items-center justify-between">
                                    <span class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        Return Flight
                                    </span>

                                    <Icon
                                        icon="lucide:plane-landing"
                                        class="size-4 text-muted-foreground"
                                    />
                                </div>

                                <p class="text-base font-semibold">
                                    {{ quotation.return_flight_no || '—' }}
                                </p>

                                <p
                                    v-if="quotation.return_time"
                                    class="mt-1 text-xs text-muted-foreground"
                                >
                                    Time:
                                    {{ formatTime(quotation.return_time) }}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <div class="grid gap-5 bg-muted/20 px-6 py-5 lg:grid-cols-3">

                <!-- =========================
                    CLIENT INFORMATION
                ========================== -->
                <div class="rounded-xl border border-border bg-background p-5 shadow-sm lg:col-span-1">

                    <!-- Header -->
                    <div class="mb-5 flex items-center gap-2">
                        <div class="flex size-8 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-600">
                            <Icon icon="lucide:user-round" class="size-4" />
                        </div>

                        <div>
                            <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Client Information
                            </p>

                            <p class="text-sm text-muted-foreground">
                                Primary client for this quotation
                            </p>
                        </div>
                    </div>

                    <div class="space-y-5">

                        <!-- Client Name -->
                        <div>
                            <p class="mb-1 text-xs font-medium text-muted-foreground">
                                Client
                            </p>

                            <p class="truncate text-lg font-semibold">
                                {{ quotation.primary_client_name }}
                            </p>

                            <!-- Clickable Client Code -->
                            <a
                                v-if="quotation.client"
                                :href="route('admin.clients')"
                                target="_blank"
                                class="mt-1 inline-flex items-center gap-1 text-sm font-medium text-yellow-600 hover:text-yellow-700 hover:underline"
                            >
                                {{ quotation.primary_client_code }}

                                <Icon
                                    icon="lucide:arrow-up-right"
                                    class="size-3.5"
                                />
                            </a>

                            <!-- Non-clickable Client Code -->
                            <span
                                v-else-if="quotation.primary_client_code"
                                class="mt-1 inline-block text-sm font-medium text-muted-foreground"
                            >
                                {{ quotation.primary_client_code }}
                            </span>
                        </div>

                        <!-- Email -->
                        <div>
                            <p class="mb-1 text-xs font-medium text-muted-foreground">
                                Email
                            </p>

                            <div class="flex items-center gap-2">
                                <Icon
                                    icon="lucide:mail"
                                    class="size-4 shrink-0 text-muted-foreground"
                                />

                                <span class="break-all text-sm font-medium">
                                    {{ quotation.primary_client_email || '—' }}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>


                <!-- =========================
                    QUOTATION SUMMARY
                ========================== -->
                <div class="rounded-xl border border-border bg-background p-5 shadow-sm lg:col-span-2">

                    <!-- Header -->
                    <div class="mb-5 flex items-center gap-2">
                        <div class="flex size-8 items-center justify-center rounded-md bg-yellow-500/10 text-yellow-600">
                            <Icon icon="lucide:receipt-text" class="size-4" />
                        </div>

                        <div>
                            <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Quotation Summary
                            </p>

                            <p class="text-sm text-muted-foreground">
                                Pricing and quotation details
                            </p>
                        </div>
                    </div>


                    <!-- Pricing -->
                    <div class="rounded-lg border border-border bg-muted/20 p-4">

                        <div class="space-y-3">

                            <!-- Subtotal -->
                            <div class="flex items-center justify-between gap-4">
                                <span class="text-sm text-muted-foreground">
                                    Subtotal
                                </span>

                                <span class="text-sm font-medium tabular-nums">
                                    {{ formatCurrency(quotation.subtotal) }}
                                </span>
                            </div>

                            <!-- Discount -->
                            <div
                                v-if="quotation.discount_total > 0"
                                class="flex items-center justify-between gap-4"
                            >
                                <span class="text-sm text-muted-foreground">
                                    Discount
                                </span>

                                <span class="text-sm font-medium text-green-600 tabular-nums">
                                    -{{ formatCurrency(quotation.discount_total) }}
                                </span>
                            </div>

                            <!-- Tax -->
                            <div
                                v-if="quotation.tax_total > 0"
                                class="flex items-center justify-between gap-4"
                            >
                                <span class="text-sm text-muted-foreground">
                                    Tax
                                </span>

                                <span class="text-sm font-medium tabular-nums">
                                    {{ formatCurrency(quotation.tax_total) }}
                                </span>
                            </div>

                            <!-- Divider -->
                            <div class="border-t border-border pt-3">
                                <div class="flex items-center justify-between gap-4">
                                    <span class="text-sm font-semibold">
                                        Grand Total
                                    </span>

                                    <span class="text-xl font-bold tabular-nums text-yellow-600">
                                        {{ formatCurrency(quotation.grand_total) }}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>


                    <!-- Remarks -->
                    <div
                        v-if="quotation.remarks"
                        class="mt-5"
                    >
                        <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Remarks
                        </p>

                        <div class="rounded-lg border border-border bg-muted/20 p-4">
                            <p class="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                                {{ quotation.remarks }}
                            </p>
                        </div>
                    </div>


                    <!-- Quotation Timeline -->
                    <div class="mt-5">
                        <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Quotation Activity
                        </p>

                        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                            <!-- Sent -->
                            <div class="rounded-lg border border-border p-3">
                                <div class="mb-1 flex items-center gap-2">
                                    <Icon
                                        icon="lucide:send"
                                        class="size-3.5 text-muted-foreground"
                                    />

                                    <span class="text-xs font-medium text-muted-foreground">
                                        Sent
                                    </span>
                                </div>

                                <p class="text-sm font-medium">
                                    {{ quotation.sent_at ? formatDateString(quotation.sent_at, true) : 'Not sent' }}
                                </p>
                            </div>

                            <!-- Viewed -->
                            <div class="rounded-lg border border-border p-3">
                                <div class="mb-1 flex items-center gap-2">
                                    <Icon
                                        icon="lucide:eye"
                                        class="size-3.5 text-muted-foreground"
                                    />

                                    <span class="text-xs font-medium text-muted-foreground">
                                        Viewed
                                    </span>
                                </div>

                                <p class="text-sm font-medium">
                                    {{ quotation.viewed_at ? formatDateString(quotation.viewed_at, true) : 'Not viewed' }}
                                </p>
                            </div>

                            <!-- Accepted -->
                            <div class="rounded-lg border border-border p-3">
                                <div class="mb-1 flex items-center gap-2">
                                    <Icon
                                        icon="lucide:circle-check"
                                        class="size-3.5 text-muted-foreground"
                                    />

                                    <span class="text-xs font-medium text-muted-foreground">
                                        Accepted
                                    </span>
                                </div>

                                <p class="text-sm font-medium">
                                    {{ quotation.accepted_at ? formatDateString(quotation.accepted_at, true) : 'Not accepted' }}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>


        <ScrollToTopButton />
    </AppLayout>
</template>