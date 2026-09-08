<script setup lang="ts">
import Table from '@/components/Table.vue'
import { Client } from '@/types/client'
import { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { router } from '@inertiajs/vue3';
import { Pagination } from '@/types/pagination.js';
import { useAlertDialog } from '@/composables/useAlertDialog.js';
import MenuCell from '../reusable/MenuCell.vue';
import ClientCell from './cells/ClientCell.vue';


defineProps<{
    clients: Pagination<Client>
}>()

const columns: ColumnDef<Client, unknown>[] = [

    {
        id: 'code',
        header: 'Client',

        cell: ({ row }) => {
            const client = row.original;
            return h(
                ClientCell,
                {
                    code: client.code,
                    name: client.name,
                }
            )
        },
    },


    {
        accessorKey: 'menu',
        header: '',

        cell: ({ row }) => {
            const client = row.original
            return h(
                MenuCell,
                {
                    onView: () => { },
                    onEdit: () => {},
                    onDelete: () =>  {}
                }
            )
        },
    },
]

// function edit(slug: string) {
//     window.open(
//         route('admin.tours.edit', { slug }),
//         '_blank',
//         'noopener,noreferrer'
//     )
// }



// const deleteTour = (tour: Tour) => {
//     const alert = useAlertDialog();
//     alert.alertDialog({
//         variant: 'danger',
//         title: 'Delete Tour',
//         description: `Are you sure you want to delete the tour "${tour.name}"? This action cannot be undone.`,
//         confirmText: 'Delete',
//         cancelText: 'Cancel',

//         onConfirm: () => {
//             router.delete(route('admin.tours.destroy', { id: tour.id }), {
//                 preserveState: true,
//                 preserveScroll: true,
//             });
//         },
//     });
// };

</script>

<template>
    <div>
        <Table :columns="columns" :data="clients.data" class="w-full text-foreground" />
    </div>
</template>