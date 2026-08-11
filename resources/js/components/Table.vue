<script setup lang="ts" generic="TData">
import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useVueTable,
    type ColumnDef,
} from '@tanstack/vue-table'

interface Props {
    columns: ColumnDef<TData, unknown>[]
    data: TData[]
}

const props = defineProps<Props>()

const table = useVueTable({
    get data() {
        return props.data
    },

    get columns() {
        return props.columns
    },

    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    // Change this if you want a different default page size
    initialState: {
        pagination: {
            pageIndex: 0,
            pageSize: 10,
        },
    },
})
</script>

<template>
    <div class="w-full">
        <!-- Table -->
        <div class="overflow-x-auto">
            <table class="w-full table-auto">
                <!-- Header -->
                <thead>
                    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <th v-for="header in headerGroup.headers" :key="header.id"
                            class="border-b px-4 py-3 text-left text-sm font-semibold">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </th>
                    </tr>
                </thead>

                <!-- Body -->
                <tbody>
                    <template v-if="table.getRowModel().rows.length > 0">
                        <tr v-for="row in table.getRowModel().rows" :key="row.id" class="hover:bg-muted/50">
                            <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="border-b px-4 py-3 text-sm">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </td>
                        </tr>
                    </template>

                    <!-- Empty -->
                    <tr v-else>
                        <td :colspan="columns.length" class="px-4 py-8 text-center text-sm text-muted-foreground">
                            No data found.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div v-if="table.getPageCount() > 1" class="flex items-center justify-between mt-4">
            <!-- Page -->
            <span class="text-sm text-muted-foreground">
                Page
                {{ table.getState().pagination.pageIndex + 1 }}
                of
                {{ table.getPageCount() }}
            </span>

            <!-- Buttons -->
            <div class="flex items-center gap-2">
                <button type="button"
                    class="border px-3 py-1.5 rounded-sm text-sm transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                    :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
                    Previous
                </button>

                <button type="button"
                    class="border px-3 py-1.5 rounded-sm text-sm transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                    :disabled="!table.getCanNextPage()" @click="table.nextPage()">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>