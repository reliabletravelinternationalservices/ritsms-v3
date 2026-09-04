<script setup lang="ts">
import Table from '@/components/Table.vue'
import { Tour, TourWithRelationshipTables } from '@/types/tour'
import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { getFirstImage } from '@/lib/utils.js';
import CategoryCell from './cells/CategoryCell.vue';
import RouteCell from './cells/RouteCell.vue';
import TourCell from './cells/TourCell.vue';
import StatusCell from './cells/StatusCell.vue';
import DateCreatedCell from './cells/DateCreatedCell.vue';
import MenuCell from './cells/MenuCell.vue';
import { router } from '@inertiajs/vue3';
import DurationCell from './cells/DurationCell.vue';
import { Pagination } from '@/types/pagination.js';
import { useAlertDialog } from '@/composables/useAlertDialog.js';

defineProps<{
    tours: Pagination<TourWithRelationshipTables>
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
        accessorKey: 'duration',
        header: 'DURATION',

        cell: ({ row }) =>
            h(
                DurationCell,
                {
                    duration: row.original.duration
                }
            ),
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

    {
        accessorKey: 'created_at',
        header: 'CREATED',

        cell: ({ row }) => {
            return h(
                DateCreatedCell,
                {
                    created_at: row.original.created_at
                }
            )
        },
    },


    {
        accessorKey: 'menu',
        header: '',

        cell: ({ row }) => {
            const tour = row.original
            return h(
                MenuCell,
                {
                    onView: () => { },
                    onEdit: () => edit(tour.slug),
                    onDelete: () => deleteTour(tour)
                }
            )
        },
    },
]

function edit(slug: string) {
    window.open(
        route('admin.tours.edit', { slug }),
        '_blank',
        'noopener,noreferrer'
    )
}



const deleteTour = (tour: Tour) => {
    const alert = useAlertDialog();
    alert.alertDialog({
        variant: 'danger',
        title: 'Delete Tour',
        description: `Are you sure you want to delete the tour "${tour.name}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        onConfirm: () => {
            router.delete(route('admin.tours.destroy', { id: tour.id }), {
                preserveState: true,
                preserveScroll: true,
            });
        },
    });
};

</script>

<template>
    <div>
        <Table :columns="columns" :data="tours.data" class="w-full text-foreground" />
    </div>
</template>