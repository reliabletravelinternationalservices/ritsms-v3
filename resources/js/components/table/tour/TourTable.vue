<script setup lang="ts">
import Table from '@/components/Table.vue'
import { Tour, TourWithRelationshipTables } from '@/types/tour'
import { ColumnDef } from '@tanstack/vue-table'
import { h, ref } from 'vue'
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
import { toast } from 'vue-sonner';
import AppModal from '@/components/AppModal.vue';
import Button from '@/components/ui/button/Button.vue';
import NextDepartureCell from './cells/NextDepartureCell.vue';



defineProps<{
    tours: Pagination<TourWithRelationshipTables>
}>()


const loading = ref(false)

// DELETE PERMA
const showDeleteModal = ref(false)
const selectedTour = ref<Tour>()


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
                return h(
                    MenuCell,
                    {
                        deleted_date: tour.deleted_at,
                        onView: () => { },
                        onEdit: () => edit(tour.slug),
                        onDelete: () => deleteTour(tour),
                        onRestore: () => restoreDelete(tour),
                        onForceDelete: () => openDeleteModal(tour)
                    }
                )
        },
    },
]

function edit(slug: string) {
    window.open(
        route('admin.tours.edit', { slug: slug }),
        '_blank',
        'noopener,noreferrer'
    )
}



const deleteTour = (tour: Tour) => {
    router.delete(route('admin.tours.delete', { tour: tour.id }), {
        preserveState: true,
        preserveScroll: true,
        onError: () => {
            toast.error('Failed to delete tour. Somethings went wrong.')
        },
        onSuccess: () => {
            toast.success('Tour deleted successfully.')
        },
    });
};



function openDeleteModal(tour: Tour) {
    selectedTour.value = tour
    showDeleteModal.value = true
}

const deletePermanently = () => {
    showDeleteModal.value=false
    if (!selectedTour.value) return;
    loading.value = true
    router.delete(route('admin.tours.destroy', { tour: selectedTour.value.id }), {
        preserveState: true,
        preserveScroll: true,
        onFinish:() =>{
             loading.value=false
        },
        onError: () => {
            toast.error('Failed to permanently delete tour. Somethings went wrong.')
        },
        onSuccess: () => {
            toast.success('Tour permanently deleted successfully.')
        },
    });
}


const restoreDelete = (tour: Tour) => {
    router.put(
        route('admin.tours.restore', { tour: tour.id }),
        {},
        {
            preserveState: true,
            preserveScroll: true,
        }
    )
}

</script>

<template>
    <div>
        <Table :columns="columns" :data="tours.data" class="w-full text-foreground" />
    </div>

   
    <AppModal
        v-model:open="showDeleteModal"
        title="Permanently Delete Tour?"
        description="This action cannot be undone."
    >
        <template #content>
            <div class="space-y-4">
                <p class="text-sm text-muted-foreground">
                    The following tour
                    <span class="font-medium italic text-foreground">
                        "{{ selectedTour?.code }}"
                    </span>
                    data will be permanently deleted:
                </p>

                <ul class="space-y-2 text-sm">
                    <li class="flex items-center gap-2">
                        <span class="text-destructive">•</span>
                        Departure dates
                    </li>

                    <li class="flex items-center gap-2">
                        <span class="text-destructive">•</span>
                        Routes
                    </li>

                    <li class="flex items-center gap-2">
                        <span class="text-destructive">•</span>
                        Hotels
                    </li>

                    <li class="flex items-center gap-2">
                        <span class="text-destructive">•</span>
                        Itineraries
                    </li>

                    <li class="flex items-center gap-2">
                        <span class="text-destructive">•</span>
                        Images, audio, and documents
                    </li>

                    <li class="flex items-center gap-2">
                        <span class="text-destructive">•</span>
                        This tour's visibility in grouped tours
                    </li>
                </ul>

                <div
                    class="rounded-md border border-amber-300/60 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30"
                >
                    <p class="text-sm font-medium text-amber-900 dark:text-amber-200">
                        Quotations & Bookings will not be deleted.
                    </p>

                    <p class="mt-1 text-sm text-amber-800 dark:text-amber-300">
                        Existing quotations and bookings related to this tour
                        will remain in the system.
                    </p>
                </div>
            </div>
        </template>

        <template #footer>
            <Button
                type="button"
                variant="outline"
                @click="showDeleteModal=false"
            >
                Cancel
            </Button>

            <Button
                type="button"
                variant="destructive"
                @click="deletePermanently"
            >
                Permanently Delete
            </Button>
        </template>
    </AppModal>
    

</template>