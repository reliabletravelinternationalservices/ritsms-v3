<script setup lang="ts">
import Table from '@/components/Table.vue';
import { Quote } from '@/types/quote'
import { ColumnDef } from '@tanstack/vue-table'
import { h, ref } from 'vue'
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
import AppModal from '@/components/AppModal.vue';
import Button from '@/components/ui/button/Button.vue';

defineProps<{
    quotes: Quote[]
}>()



// DELETE
const showDeletePermannentModal = ref(false)
const showDeleteModal = ref(false)
const selectedQuote = ref<Quote>()


const columns: ColumnDef<Quote, unknown>[] = [
    {
        id: 'code',
        header: 'CODE',

        cell: ({ row }) =>
            h(
                CodeCell,
                {
                    deleted_at: row.original.deleted_at,
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
                    deleted_at: row.original.deleted_at,
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
                    deleted_at: row.original.deleted_at,
                    code: row.original.client.code,
                    name: row.original.client.name,
                }
            )
        },
    },

    {
        accessorKey: 'status',
        header: 'STATUS',

        cell: ({ row }) => {
            return h(
                StatusCell,
                {
                    deleted_at: row.original.deleted_at,
                    status: row.original.status
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
                    deleted_at: row.original.deleted_at,
                    total: Number(row.original.grand_total)
                }
            ),
    },


    {
        accessorKey: 'valid_until',
        header: 'EXPIRATION',

        cell: ({ row }) =>
            h(
                ExpirationCell,
                {
                    deleted_at: row.original.deleted_at,
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
                    deleted_date: row.original.deleted_at,
                    onView: ()=> view(row.original.slug),
                    onEdit: ()=> edit(row.original.slug),
                    onDelete: ()=> openDeleteModal(row.original, false),
                    onRestore: ()=> restoreDelete(row.original),
                    onForceDelete: () => openDeleteModal(row.original, true),
                },
            ),
    },
]


const view = (slug: string) => {
    window.open(
        route('admin.quotations.view', { slug }),
        '_blank',
        'noopener,noreferrer'
    )  
}


const edit = (slug: string) => {
    window.open(
        route('admin.quotations.edit', { slug }),
        '_blank',
        'noopener,noreferrer'
    )
}



const openDeleteModal = (quote: Quote, isPermannent: boolean) => {
    selectedQuote.value = quote
    if(isPermannent){
        showDeletePermannentModal.value = true
    }else{
        showDeleteModal.value = true
    }
}


const deleteQuote = () => {
    router.delete(route('admin.quotations.delete', { quotation: selectedQuote.value?.id }), {
        preserveState: true,
        preserveScroll: true,
        onError: () => {
            toast.error('Failed to delete quote. Somethings went wrong.')
        },
        onSuccess: () => {
            toast.success('Quote deleted successfully.')
        },
    });
}

const deletePermanentQuote = () => {
    router.delete(route('admin.quotations.destroy', { quotation: selectedQuote.value?.id }), {
        preserveState: true,
        preserveScroll: true,
        onError: () => {
            toast.error('Failed to delete quote. Somethings went wrong.')
        },
        onSuccess: () => {
            toast.success('Quote deleted successfully.')
        },
    });
}


const restoreDelete = (quote: Quote) => {
    router.put(
        route('admin.quotations.restore', { quotation: quote.id }),
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
        <Table :columns="columns" :data="quotes" class="text-foreground"/>
    </div>


    <AppModal
        v-model:open="showDeleteModal"
        title="Delete Tour"
        :description="`The following Quotation ${selectedQuote?.code ?? ''} will be deleted.`"
    >
        <template #footer>
            <Button
                type="button"
                variant="outline"
                @click="showDeleteModal = false"
            >
                Cancel
            </Button>

            <Button
                type="button"
                variant="destructive"
                @click="deleteQuote"
            >
                Delete
            </Button>
        </template>
    </AppModal>

    <AppModal
        v-model:open="showDeletePermannentModal"
        title="Delete Permanently Tour"
        :description="`The following Quotation ${selectedQuote?.code ?? ''} will be deleted Permanently.`"
    >
        <template #footer>
            <Button
                type="button"
                variant="outline"
                @click="showDeletePermannentModal = false"
            >
                Cancel
            </Button>

            <Button
                type="button"
                variant="destructive"
                @click="deletePermanentQuote"
            >
                Delete
            </Button>
        </template>
    </AppModal>
</template>