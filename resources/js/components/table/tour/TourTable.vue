<script setup lang="ts">
import Table from '@/components/Table.vue'
import { TourWithRelationshipTables } from '@/types/tour'
import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import CodeCell from './cells/CodeCell.vue';
import TourNameAndImageCell from './cells/TourNameAndImageCell.vue';
import { getFirstImage } from '@/lib/utils.js';
import CategoryCell from './cells/CategoryCell.vue';
import StateCell from './cells/StateCell.vue';

defineProps<{
    tours: TourWithRelationshipTables[]
}>()

const columns: ColumnDef<TourWithRelationshipTables, unknown>[] = [
    {
        id: 'name',
        header: 'Tour Name',

        cell: ({ row }) => {
            const tour = row.original;
            return h(
                TourNameAndImageCell,
                {
                    name:  tour.name,
                    image: getFirstImage(tour.media, 'image')
                }
            )
        },
    },

    {
        accessorKey: 'code',
        header: 'Code',

        cell: ({ row }) =>
            h(
                CodeCell,
                {
                    tourID:  row.original.id,
                    code: row.original.code
                }
            ),
    },

    {
        accessorKey: 'category',
        header: 'Category',

        cell: ({ row }) =>
            h(
                CategoryCell,
                {
                    label: row.original.category
                }
            ),
    },

    {
        accessorKey: 'state',
        header: 'State',

        cell: ({ row }) => {
            return h(
                StateCell,
                {
                    label: row.original.state
                }
            )
        },
    },
]
</script>

<template>
    <div>
        <Table
            :columns="columns"
            :data="tours"
            class="w-full text-foreground"
        />
    </div>
</template>