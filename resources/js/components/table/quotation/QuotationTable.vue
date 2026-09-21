<script setup lang="ts">
import Table from '@/components/Table.vue';
import { Quote } from '@/types/quote'
import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import MenuCell from '../reusable/MenuCell.vue';
import CodeCell from './cells/CodeCell.vue';
import StatusCell from './cells/StatusCell.vue';
import PriceCell from './cells/PriceCell.vue';
import TourCell from './cells/TourCell.vue';
import ClientCell from './cells/ClientCell.vue';
import ExpirationCell from './cells/ExpirationCell.vue';
import { router } from '@inertiajs/vue3';
import { useAlertDialog } from '@/composables/useAlertDialog.js';
import { toast } from 'vue-sonner';

defineProps<{
    quotes: Quote[]
}>()

const columns: ColumnDef<Quote, unknown>[] = [
    {
        id: 'code',
        header: 'CODE',

        cell: ({ row }) =>
            h(
                CodeCell,
                {
                    code: row.original.code,
                    link: "#"
                }
            ),
    },

    {
        accessorKey: 'tour',
        header: 'TOUR',

        cell: ({ row }) => {
            return h(
                TourCell,
                {
                    code: row.original.tour_code,
                    name: row.original.tour_name,
                    duration: row.original.tour_duration,

                }
            )
        },
    },
    
    {
        accessorKey: 'customer',
        header: 'CLIENT',

        cell: ({ row }) => {
            return h(
                ClientCell,
                {
                    code: row.original.client.code,
                    name: row.original.client.name,
                }
            )
        },
    },

    {
        accessorKey: 'grand_total',
        header: 'TOTAL',

        cell: ({ row }) =>
            h(
                PriceCell,
                {
                    total: row.original.grand_total
                }
            ),
    },

    {
        accessorKey: 'status',
        header: 'STATUS',

        cell: ({ row }) => {
            return h(
                StatusCell,
                {
                    status: row.original.status
                }
            )
        },
    },

    {
        accessorKey: 'valid_until',
        header: 'EXPIRATION',

        cell: ({ row }) =>
            h(
                ExpirationCell,
                {
                    date: row.original.valid_until?? undefined,
                }
            ),
    },

    {
        accessorKey: 'menu',
        header: '',

        cell: ({ row }) =>
            h(
                MenuCell,
                {
                    onView: ()=>{},
                    onEdit: ()=> edit(row.original.slug),
                    onDelete: ()=> deleteQuote(row.original),
                },
            ),
    },
]


function edit(slug: string) {
    window.open(
        route('admin.quotations.edit', { slug }),
        '_blank',
        'noopener,noreferrer'
    )
}

const deleteQuote = (quote: Quote) => {
    const alert = useAlertDialog();
    alert.alertDialog({
        variant: 'danger',
        title: 'Delete Quote',
        description: `Are you sure you want to delete this quote "${quote.code}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel',

        onConfirm: () => {
            router.delete(route('admin.quotations.delete', { quotation: quote.id }), {
                preserveState: true,
                preserveScroll: true,
                onError: () => {
                    toast.error('Failed to delete quote. Somethings went wrong.')
                },
                onSuccess: () => {
                    toast.success('Quote deleted successfully.')
                },
            });
        },
    });
};


</script>

<template>
    <div>
        <Table :columns="columns" :data="quotes" class="w-full text-foreground" />
    </div>
</template>