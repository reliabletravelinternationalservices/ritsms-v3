<script setup lang="ts">
import Table from '@/components/Table.vue'
import { TourWithRelationshipTables } from '@/types/tour'
import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { getFirstImage } from '@/lib/utils.js';
import CategoryCell from './cells/CategoryCell.vue';
import RouteCell from './cells/RouteCell.vue';
import TourCell from './cells/TourCell.vue';
import StatusCell from './cells/StatusCell.vue';

defineProps<{
    tours: TourWithRelationshipTables[]
}>()

const columns: ColumnDef<TourWithRelationshipTables, unknown>[] = [

    {
        id: 'code',
        header: 'TOUR',

        cell: ({ row }) => {
            const tour = row.original;
            return h(
                TourCell,
                {
                    code: tour.code,
                    name: tour.name,
                    description: tour.description,
                    image: getFirstImage(tour.media, 'image')
                }
            )
        },
    },

    {
        accessorKey: 'route',
        header: 'ROUTE',

        cell: ({ row }) =>
            h(
                RouteCell,
                {
                    routes: row.original.routes,
                    itinerary_type: row.original.itinerary_type
                }
            ),
    },

    {
        accessorKey: 'category',
        header: 'CATEGORY',

        cell: ({ row }) =>
            h(
                CategoryCell,
                {
                    label: row.original.category
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
                    state: row.original.state,
                    visibility: row.original.visibility
                }
            )
        },
    },



]
</script>

<template>
    <div>
        <Table :columns="columns" :data="tours" class="w-full text-foreground" />
    </div>
</template>