<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Package } from '@/types/package';
import { Icon } from '@iconify/vue';

import { 
    useVueTable, 
    FlexRender, 
    getCoreRowModel, 
    CellContext, 
    getPaginationRowModel,
    getFilteredRowModel  
} from '@tanstack/vue-table';

import { h, ref, computed } from 'vue';
import Button from '@/components/ui/button/Button.vue';
import { Link } from '@inertiajs/vue3';
import LinkCell from './LinkCell.vue';
import NameWithImageCell from './NameWithImageCell.vue';
import StatusIndicatorCell from './StatusIndicatorCell.vue';
import { User } from '@/types/index.js';
import DateRecordCell from './DateRecordCell.vue';
import { formatDateString } from '@/lib/utils.js';
import ContactCell from './ContactCell.vue';


interface Props {
    users: User[];
}


const props = defineProps<Props>();

const data = ref<User[]>(props.users);

const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
        enableHiding: true,
        enableSorting: true,
        cell: () => null,
        meta: {
            hidden: true,
        },
    },
    {
        header: 'Display Name',
        accessorKey: 'display_name',
        enableSorting: true,
        minSize: 300,
        maxSize: 700,
        cell : (info: CellContext<User, unknown>) =>
            h(NameWithImageCell, {
                id: info.row.original.id,
                name: info.row.original.name,
                avatar: info.row.original.avatar,
                display_name: info.row.original.display_name
            }),
    },
    {
        header: 'Contacts',
        accessorKey: 'email',
        minSize: 200,
        maxSize: 300,
        cell: (info: CellContext<User, unknown>) =>
            h(ContactCell, {
                email: info.row.original.email,
                phone: info.row.original.phone
            }),
    },
    {
        header: 'Status',
        accessorKey: 'status',
        minSize: 200,
        maxSize: 300,
        cell: (info: CellContext<User, unknown>) =>
            h(StatusIndicatorCell, {
                status: info.row.original.status,
                verifiedDate: info.row.original.email_verified_at
            }),
    },
    {
        header: 'Date Registered',
        accessorKey: 'created_at',
        minSize: 200,
        maxSize: 300,
        cell: (info: CellContext<User, unknown>) =>
            h(DateRecordCell, {
                createdAt: formatDateString(info.row.original.created_at, true),
                updatedAt: formatDateString(info.row.original.updated_at, true),
            }),
    },
    {
        header: 'Actions',
        accessorKey: 'actions',
        minSize: 100,
        maxSize: 300,
        cell: (info: CellContext<User, unknown>) => 
            h(LinkCell, { 
                href: route('admin.packages.details', { id: info.row.original.id }),
                label: 'View Details'
            }),
    },
];


const globalFilter = ref<string>('');

const table = useVueTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
            columnVisibility: {
                id: false,
            },
        },
});

</script>

<template>
    <div class="space-y-4">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">


            <div class="flex flex-wrap items-end gap-4">

                <div class="flex flex-col gap-1">
                    <span>
                        <Link :href="route('admin.packages.create')">
                            <Button type="button" variant="default">
                                Create
                            </Button>
                        </Link>
                    </span>
                </div>

            </div>

        </div>
        <table class="w-full table-auto">
            <thead>
                <tr v-for="columnHeaders in table.getHeaderGroups()" :key="columnHeaders.id">
                    <th class="border px-4 py-2" v-for="header in columnHeaders.headers" :key="header.id" :style="{ width: `${header.column.getSize()}px` }">
                        <FlexRender
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-if="table.getRowModel().rows.length > 0">
                    <tr
                        v-for="row in table.getRowModel().rows"
                        :key="row.id"
                    >
                        <td
                            v-for="cell in row.getVisibleCells()"
                            :key="cell.id"
                            class="border px-4 py-2"
                        >
                            <FlexRender
                                :render="cell.column.columnDef.cell"
                                :props="cell.getContext()"
                            />
                        </td>
                    </tr>
                </template>

                <tr v-else>
                    <td
                        :colspan="columns.length"
                        class="border px-4 py-2 text-center text-sm text-muted-foreground italic"
                    >
                        No Account Found...
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="8">
                        <div class="flex items-center justify-between mt-4">
                            <span class="text-sm text-muted-foreground">
                                Page {{ table.getState().pagination.pageIndex + 1 }}
                                of
                                {{ table.getPageCount() }}
                            </span>

                            <div class="flex gap-2">
                                <button
                                    class="border px-3 py-1 rounded"
                                    :disabled="!table.getCanPreviousPage()"
                                    @click="table.previousPage()"
                                >
                                    Previous
                                </button>

                                <button
                                    class="border px-3 py-1 rounded"
                                    :disabled="!table.getCanNextPage()"
                                    @click="table.nextPage()"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>    
    </div>
</template>