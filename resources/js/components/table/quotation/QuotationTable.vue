<script setup lang="ts">
import Table from '@/components/Table.vue';
import { Quote } from '@/types/quote'
import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import MenuCell from '../reusable/MenuCell.vue';

defineProps<{
    quotes: Quote[]
}>()

const columns: ColumnDef<Quote, unknown>[] = [
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
        header: 'CODE',

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
        header: 'CLIENT',

        cell: ({ row }) => {
            const quote = row.original

            return h(
                'span',
                {
                    class: 'font-semibold',
                },
                quote.client.code
            )
        },
    },

    {
        accessorKey: 'grand_total',
        header: 'TOTAL',

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
        accessorKey: 'status',
        header: 'STATUS',

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
        accessorKey: 'valid_until',
        header: 'EXPIRATION',

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
        accessorKey: 'menu',
        header: '',

        cell: ({ row }) =>
            h(
                MenuCell,
                {
                    onView: ()=>{},
                    onEdit: ()=>{},
                    onDelete: ()=>{},
                },
            ),
    },
]
</script>

<template>
    <div>
        <Table :columns="columns" :data="quotes" class="w-full text-foreground" />
    </div>
</template>