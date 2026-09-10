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
import MenuCell from '../reusable/MenuCell.vue';
import { router } from '@inertiajs/vue3';
import DurationCell from './cells/DurationCell.vue';
import { Pagination } from '@/types/pagination.js';
import { useAlertDialog } from '@/composables/useAlertDialog.js';
import NextDepartureCell from './cells/NextDepartureCell.vue';
import { toast } from 'vue-sonner';
import DeletedAtCell from '../reusable/DeletedAtCell.vue';

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
                    image: getFirstImage(tour.media, 'image'),
                    deleted_at: tour.deleted_at,
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
                    duration: row.original.duration,
                    deleted_at: row.original.deleted_at
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
                    itinerary_type: row.original.itinerary_type,
                    deleted_at: row.original.deleted_at
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
                    label: row.original.category,
                    deleted_at: row.original.deleted_at
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
                    visibility: row.original.visibility,
                    deleted_at: row.original.deleted_at
                }
            )
        },
    },

    {
        accessorKey: 'next_departure_date',
        header: 'NEXT DEPARTURE',

        cell: ({ row }) => {
            return h(
                NextDepartureCell,
                {
                    departures: row.original.departures,
                    deleted_at: row.original.deleted_at
                }
            )
        },
    },


    {
        accessorKey: 'menu',
        header: '',

        cell: ({ row }) => {
            const tour = row.original
            if(tour.deleted_at){
                return h(
                    DeletedAtCell,
                    {
                        deleted_at: tour.deleted_at
                    }
                )
            }else{
                return h(
                    MenuCell,
                    {
                        onView: () => { },
                        onEdit: () => edit(tour.slug),
                        onDelete: () => deleteTour(tour)
                    }
                )
            
            }
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
            router.delete(route('admin.tours.delete', { tour: tour.id }), {
                preserveState: true,
                preserveScroll: true,
                onError: (e) => {
                    toast.error('Failed to delete tour. Somethings went wrong.')
                },
                onSuccess: () => {
                    toast.success('Tour deleted successfully.')
                },
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