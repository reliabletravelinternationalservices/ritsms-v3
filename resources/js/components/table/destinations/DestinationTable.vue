<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Destination } from '@/types/destination';
import { Icon } from '@iconify/vue';
import DestinationNameCell from './DestinationNameCell.vue';
import DestinationLocationsCell from './DestinationLocationsCell.vue';
import DestinationDetailsCell from './DestinationDetailsCell.vue';
import {
    useVueTable,
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    type CellContext,
} from '@tanstack/vue-table';
import { h, ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/vue3';

interface Props {
    destinations: Destination[];
}

const props = defineProps<Props>();
const data = ref<Destination[]>(props.destinations);

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
        id: 'destination',
        header: 'Destination',
        accessorFn: (row: Destination) => row.title,
        enableSorting: true,
        minSize: 300,
        maxSize: 520,
        cell: (info: CellContext<Destination, unknown>) =>
            h(DestinationNameCell, {
                destination: info.row.original,
            }),
    },
    {
        accessorKey: 'country',
        header: 'Country',
        enableSorting: true,
        minSize: 150,
    },
    {
        accessorKey: 'tag',
        header: 'Tag',
        minSize: 120,
        cell: (info: CellContext<Destination, unknown>) =>
            info.getValue() ? String(info.getValue()) : '-',
    },
    {
        id: 'locations',
        header: 'Locations',
        accessorFn: (row: Destination) => row.locations,
        enableSorting: true,
        minSize: 220,
        cell: (info: CellContext<Destination, unknown>) =>
            h(DestinationLocationsCell, {
                locations: info.row.original.locations,
            }),
    },
    {
        id: 'details',
        header: 'Details',
        minSize: 140,
        cell: (info: CellContext<Destination, unknown>) =>
            h(DestinationDetailsCell, {
                destinationId: info.row.original.id,
            }),
    },
];

const globalFilter = ref<string>('');
const search = ref<string>('');

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
    state: {
        get globalFilter() {
            return globalFilter.value;
        },
    },
    onGlobalFilterChange: (updater) => {
        globalFilter.value =
            typeof updater === 'function'
                ? updater(globalFilter.value)
                : updater;
    },
});
</script>

<template>
    <div class="space-y-4">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
            <div class="flex items-center gap-4">
                <Input
                    v-model="search"
                    type="text"
                    placeholder="Search by title, country or tag..."
                    class="border rounded-sm px-3 py-2 w-full max-w-sm"
                    @keyup.enter="table.setGlobalFilter(search)"
                    @input="!search.trim() && table.setGlobalFilter('')"
                />

                <button
                    class="flex items-center"
                    @click="table.setGlobalFilter(search)"
                >
                    <Icon icon="iconoir:search" class="text-2xl" />
                </button>
            </div>

            
            <div class="flex flex-col gap-1">
                <span>
                    <Link :href="route('admin.destinations.create')">
                        <Button type="button" variant="default">
                            Create
                        </Button>
                    </Link>
                </span>
                <!-- <span class="text-xs text-muted-foreground">
                    Status
                </span>

                <select
                    class="border rounded-sm px-3 py-2 h-10"
                >
                    <option value="">
                        All Status
                    </option>

                    <option value="selling">
                        Selling
                    </option>

                    <option value="ended">
                        Ended
                    </option>
                </select> -->
            </div>
        </div>

        <table class="w-full table-auto">
            <thead>
                <tr v-for="columnHeaders in table.getHeaderGroups()" :key="columnHeaders.id">
                    <th
                        class="border px-4 py-2 text-left"
                        v-for="header in columnHeaders.headers"
                        :key="header.id"
                        :style="{ width: `${header.column.getSize()}px` }"
                    >
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
                        class="odd:bg-muted/50"
                    >
                        <td
                            v-for="cell in row.getVisibleCells()"
                            :key="cell.id"
                            class="border px-4 py-2 align-top"
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
                        No destinations found.
                    </td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <td :colspan="columns.length">
                        <div class="flex items-center justify-between mt-4">
                            <span class="text-sm text-muted-foreground">
                                Page {{ table.getState().pagination.pageIndex + 1 }} of
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
