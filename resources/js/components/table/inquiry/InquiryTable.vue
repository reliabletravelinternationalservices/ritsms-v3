<script setup lang="ts">

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/vue3';
import { h, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

import {
    useVueTable,
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    CellContext
} from '@tanstack/vue-table';

import type { Inquiry } from '@/types/inquiry';

import CopiableCell from './CopiableCell.vue';
import StatusCell from './StatusCell.vue';
import ActionCell from './ActionCell.vue';

interface Props {
    inquiries: Inquiry[];
}

const props = defineProps<Props>();

const data = ref<Inquiry[]>(props.inquiries);

watch(() => props.inquiries, (newInquiries) => {
    data.value = newInquiries;
}, { deep: true });

const handleView = (id: number) => {
    router.visit(route('admin.inquiries.details', { id }));
};

const handleStatusChange = (id: number, status: Inquiry['status']) => {
    router.patch(route('admin.inquiries.update', { id }), { status }, {
        preserveScroll: true,
    });
};

// -------------------- FIX FOR FREEZE --------------------

const globalFilter = ref<string>('');
const search = ref<string>('');
const columnFilters = ref<any[]>([]);

const selectedStatuses = ref<Inquiry['status'][]>([]);

// sync status filter properly (IMPORTANT FIX)
watch(selectedStatuses, (val) => {
    columnFilters.value = [
        {
            id: 'status',
            value: val,
        }
    ];
});

// -------------------- COLUMNS --------------------

const columns = [
    {
        accessorKey: 'id',
        header: 'ID',
        enableHiding: true,
        meta: { hidden: true },
        cell: () => null,
    },
    {
        header: 'Sender Name',
        accessorKey: 'fullname',
        minSize: 180,
        maxSize: 220,
        cell: ({ row }: CellContext<Inquiry, any>) =>
            h('span', { class: 'font-semibold text-zinc-900 dark:text-zinc-100' }, row.original.fullname),
    },
    {
        header: 'Email Address',
        accessorKey: 'email',
        minSize: 180,
        maxSize: 220,
        cell: ({ row }: CellContext<Inquiry, any>) =>
            h(CopiableCell, { value: row.original.email, isMono: true }),
    },
    {
        header: 'Phone Number',
        accessorKey: 'phone',
        minSize: 120,
        maxSize: 150,
        cell: ({ row }: CellContext<Inquiry, any>) => {
            const num = row.original.phone;
            return num
                ? h(CopiableCell, { value: num, isMono: true })
                : h('span', { class: 'text-[11px] text-zinc-400/60 italic' }, 'Not left');
        },
    },
    {
        header: 'Status',
        accessorKey: 'status',
        minSize: 130,
        maxSize: 160,
        cell: ({ row }: CellContext<Inquiry, any>) =>
            h(StatusCell, {
                status: row.original.status,
                onChange: (newStatus) => handleStatusChange(row.original.id, newStatus)
            }),
        filterFn: (row: any, columnId: string, filterValue: string[]) => {
            if (!filterValue || filterValue.length === 0) return true;
            return filterValue.includes(row.getValue(columnId));
        }
    },
    {
        header: 'Received',
        accessorKey: 'created_at',
        minSize: 120,
        maxSize: 160,
        cell: ({ row }: CellContext<Inquiry, any>) => {
            const date = new Date(row.original.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            return h('span', { class: 'text-xs text-muted-foreground whitespace-nowrap' }, date);
        },
    },
    {
        header: 'Actions',
        accessorKey: 'actions',
        minSize: 100,
        maxSize: 180,
        cell: ({ row }: CellContext<Inquiry, any>) =>
            h(ActionCell, {
                href: route('admin.inquiries.details', { id: row.original.id }),
                label: 'View Details'
            }),
    },
];

// -------------------- TABLE --------------------

const table = useVueTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    initialState: {
        pagination: { pageSize: 10 },
        columnVisibility: { id: false },
    },

    state: {
        get globalFilter() {
            return globalFilter.value;
        },
        get columnFilters() {
            return columnFilters.value;
        },
    },

    onGlobalFilterChange: (updater) => {
        globalFilter.value =
            typeof updater === 'function'
                ? updater(globalFilter.value)
                : updater;
    },

    onColumnFiltersChange: (updater) => {
        columnFilters.value =
            typeof updater === 'function'
                ? updater(columnFilters.value)
                : updater;
    },
});

// -------------------- FILTER UI HELPERS --------------------

const statusOptions: { label: string; value: Inquiry['status'] }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Resolved', value: 'resolved' },
    { label: 'Dismissed', value: 'dismissed' }
];

const toggleStatusFilter = (status: Inquiry['status']) => {
    if (selectedStatuses.value.includes(status)) {
        selectedStatuses.value = selectedStatuses.value.filter(s => s !== status);
    } else {
        selectedStatuses.value = [...selectedStatuses.value, status];
    }
};

const clearStatusFilter = () => {
    selectedStatuses.value = [];
};

</script>

<template>

    <div class="space-y-4">

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div class="flex items-center gap-2 w-full max-w-md">

                <div class="relative w-full">

                    <Input
                        v-model="search"
                        type="text"
                        placeholder="Search by Name, Email, or keywords..."
                        class="pl-3 pr-10 py-2 w-full border border-zinc-200 dark:border-zinc-800 rounded-md bg-background text-sm"
                        @keyup.enter="table.setGlobalFilter(search)"
                        @input="!search.trim() && table.setGlobalFilter('')"
                    />

                    <button
                        type="button"
                        class="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                        @click="table.setGlobalFilter(search)"
                    >
                        <Icon icon="iconoir:search" class="text-lg" />
                    </button>

                </div>
            </div>

            <div class="flex items-center gap-2 self-start sm:self-auto">

                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" size="sm" class="h-9 gap-2 border-dashed text-xs">
                            <Icon icon="iconoir:filter-list" class="text-sm" />
                            Filter Status

                            <span v-if="selectedStatuses.length > 0"
                                class="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 rounded-full">
                                {{ selectedStatuses.length }}
                            </span>

                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" class="w-48">

                        <DropdownMenuLabel class="text-xs font-semibold">
                            Filter by Status
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuCheckboxItem
                            v-for="option in statusOptions"
                            :key="option.value"
                            class="text-xs cursor-pointer capitalize"
                            :checked="selectedStatuses.includes(option.value)"
                            @select="(e) => e.preventDefault()"
                            @update:checked="toggleStatusFilter(option.value)"
                        >
                            {{ option.label }}
                        </DropdownMenuCheckboxItem>

                        <template v-if="selectedStatuses.length > 0">
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                class="text-xs justify-center text-center font-medium text-red-600 dark:text-red-400"
                                @click="clearStatusFilter"
                            >
                                Clear Filters
                            </DropdownMenuCheckboxItem>
                        </template>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>

        <!-- TABLE -->
        <div class="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">

            <table class="w-full text-left border-collapse">

                <thead>
                    <tr
                        v-for="columnHeaders in table.getHeaderGroups()"
                        :key="columnHeaders.id"
                        class="bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800"
                    >
                        <th
                            v-for="header in columnHeaders.headers"
                            :key="header.id"
                            class="px-4 py-3 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                            :style="{ width: `${header.column.getSize()}px` }"
                        >
                            <FlexRender
                                :render="header.column.columnDef.header"
                                :props="header.getContext()"
                            />
                        </th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">

                    <template v-if="table.getRowModel().rows.length > 0">

                        <tr
                            v-for="row in table.getRowModel().rows"
                            :key="row.id"
                            class="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                        >
                            <td
                                v-for="cell in row.getVisibleCells()"
                                :key="cell.id"
                                class="px-4 py-3 text-sm align-middle"
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
                            class="px-4 py-12 text-center text-sm text-muted-foreground italic"
                        >
                            No Client Inquiries Found matching your metric filters...
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>

        <!-- PAGINATION -->
        <div class="flex items-center justify-between pt-2">

            <span class="text-xs text-muted-foreground">
                Page <strong>{{ table.getState().pagination.pageIndex + 1 }}</strong>
                of <strong>{{ table.getPageCount() }}</strong>
            </span>

            <div class="flex gap-1.5">

                <Button
                    variant="outline"
                    size="sm"
                    class="text-xs h-8 px-2.5"
                    :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()"
                >
                    Previous
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    class="text-xs h-8 px-2.5"
                    :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()"
                >
                    Next
                </Button>
            </div>
        </div>
    </div>
</template>