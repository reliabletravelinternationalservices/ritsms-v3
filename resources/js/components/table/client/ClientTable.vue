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
import ContactCell from '../admin/ContactCell.vue';
import StatusCell from './cells/StatusCell.vue';
import TypeCell from './cells/TypeCell.vue';
import LastContactedCell from './cells/LastContactedCell.vue';


defineProps<{
    clients: Pagination<Client>
}>()

const columns: ColumnDef<Client, unknown>[] = [

    {
        id: 'code',
        header: 'CLIENT',

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
        accessorKey: 'type',
        header: 'TYPE',

        cell: ({ row }) => {
            const client = row.original

            return h(TypeCell, {
                type: client.type,
            })
        },
    },

    {
        accessorKey: 'contact',
        header: 'CONTACTS',

        cell: ({ row }) => {
            const client = row.original;
            return h(
                ContactCell,
                {
                    phone: client.phone,
                    email: client.email,
                }
            )
        },
    },


    {
        accessorKey: 'status',
        header: 'STATUS',

        cell: ({ row }) => {
            const client = row.original

            return h(StatusCell, {
                status: client.status,
            })
        },
    },
    
    {
        accessorKey: 'last_contacted',
        header: 'CONTACT AT',

        cell: ({ row }) => {
            const client = row.original

            return h(LastContactedCell, {
                datetime: client.last_contacted_at,
            })
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
                    onEdit: () => { edit(client.slug) },
                    onDelete: () =>  {}
                }
            )
        },
    },
]

function edit(slug: string) {
    window.open(
        route('admin.clients.edit', { slug }),
        '_blank',
        'noopener,noreferrer'
    )
}



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