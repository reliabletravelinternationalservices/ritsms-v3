<script setup lang="ts">
import { QuoteWithClientAndGuest } from '@/types/quote'
import { Tour } from '@/types/tour';
import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

defineProps<{
    tours: Tour[]
}>()

const columns: ColumnDef<Tour, unknown>[] = [
    {
        accessorKey: 'id',
        header: 'ID',

        cell: ({ row }) =>
            h(
                'span',
                {
                    class: 'font-semibold',
                },
                row.original.id
            ),
    },

    {
        accessorKey: 'code',
        header: 'Code',

        cell: ({ row }) =>
            h(
                'span',
                {
                    class: 'font-semibold',
                },
                row.original.code
            ),
    },

    {
        id: 'customer',
        header: 'Client',

        cell: ({ row }) => {
            const quote = row.original

            const value =
                quote.client?.name ??
                quote.guest?.guest_name ??
                'N/A'

            return h(
                'span',
                {
                    class:
                        value === 'N/A'
                            ? 'text-muted-foreground'
                            : 'font-semibold',
                },
                value
            )
        },
    },

    {
        accessorKey: 'grand_total',
        header: 'Total',

        cell: ({ row }) =>
            h(
                'span',
                {
                    class: 'text-muted-foreground',
                },
                row.original.grand_total
            ),
    },

    {
        accessorKey: 'valid_until',
        header: 'Expiration',

        cell: ({ row }) =>
            h(
                'span',
                {
                    class: 'font-medium',
                },
                row.original.valid_until ?? 'N/A'
            ),
    },

    {
        accessorKey: 'status',
        header: 'Status',

        cell: ({ row }) => {
            const status = row.original.status

            return h(
                'span',
                {
                    class:
                        status === 'Accepted'
                            ? 'font-medium text-green-600'
                            : 'font-medium text-muted-foreground',
                },
                status
            )
        },
    },

    {
        accessorKey: 'created_at',
        header: 'Created',

        cell: ({ row }) =>
            h(
                'span',
                {
                    class: 'font-medium text-muted-foreground',
                },
                row.original.created_at
            ),
    },
]
</script>

<template>
    <div>
        <Table :columns="columns" :data="tours" class="w-full text-foreground" />
    </div>
</template>