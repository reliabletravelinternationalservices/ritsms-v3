<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/vue';

import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useVueTable,
    type CellContext,
    type ColumnDef,
    type ColumnFiltersState,
    type Row,
} from '@tanstack/vue-table';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDateString } from '@/lib/utils.js';
import type { User } from '@/types';
import { Link } from '@inertiajs/vue3';
import { h, ref, watch } from 'vue';
import ContactCell from './ContactCell.vue';
import DateRecordCell from './DateRecordCell.vue';
import LinkCell from './LinkCell.vue';
import NameWithImageCell from './NameWithImageCell.vue';
import StatusIndicatorCell from './StatusIndicatorCell.vue';

interface Props {
    users: User[];
}

const props = defineProps<Props>();

const data = ref<User[]>(props.users);
const globalFilter = ref<string>('');
const search = ref<string>('');
const columnFilters = ref<ColumnFiltersState>([]);
const selectedRoles = ref<User['role'][]>(['admin', 'agent']);

watch(
    () => props.users,
    (newUsers) => {
        data.value = newUsers;
    },
    { deep: true },
);

watch(
    selectedRoles,
    (roles) => {
        columnFilters.value = [
            {
                id: 'role',
                value: roles,
            },
        ];
    },
    { deep: true, immediate: true },
);

const columns: ColumnDef<User>[] = [
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
        cell: (info: CellContext<User, unknown>) =>
            h(NameWithImageCell, {
                id: info.row.original.id,
                name: info.row.original.name,
                avatar: info.row.original.avatar,
                display_name: info.row.original.display_name,
            }),
    },
    {
        header: 'Name',
        accessorKey: 'name',
        enableHiding: true,
        cell: () => null,
    },
    {
        header: 'Contacts',
        accessorKey: 'email',
        minSize: 200,
        maxSize: 300,
        cell: (info: CellContext<User, unknown>) =>
            h(ContactCell, {
                email: info.row.original.email,
                phone: info.row.original.phone,
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
                verifiedDate: info.row.original.email_verified_at,
            }),
    },
    {
        header: 'Role',
        accessorKey: 'role',
        minSize: 120,
        maxSize: 180,
        cell: (info: CellContext<User, unknown>) => h('span', { class: 'capitalize' }, info.row.original.role),
        filterFn: (row: Row<User>, columnId: string, filterValue: User['role'][]) => {
            if (!filterValue || filterValue.length === 0) return false;
            return filterValue.includes(row.getValue(columnId) as User['role']);
        },
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
                label: 'View Details',
            }),
    },
];

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
            name: false,
        },
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
        globalFilter.value = typeof updater === 'function' ? updater(globalFilter.value) : updater;
    },
    onColumnFiltersChange: (updater) => {
        columnFilters.value = typeof updater === 'function' ? updater(columnFilters.value) : updater;
    },
});

const roleOptions: { label: string; value: User['role'] }[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Agent', value: 'agent' },
];

const toggleRoleFilter = (role: User['role']) => {
    if (selectedRoles.value.includes(role)) {
        selectedRoles.value = selectedRoles.value.filter((selectedRole) => selectedRole !== role);
        return;
    }

    selectedRoles.value = [...selectedRoles.value, role];
};

const submitSearch = () => {
    table.setGlobalFilter(search.value.trim());
};

const handleSearchInput = () => {
    if (!search.value.trim()) {
        table.setGlobalFilter('');
    }
};

const isShowingAllRoles = (roles: User['role'][]) => roles.length === roleOptions.length;
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex w-full flex-col gap-2 sm:max-w-xl sm:flex-row sm:items-center">
        <div class="relative w-full sm:max-w-md">
          <Input
            v-model="search"
            type="text"
            placeholder="Search admins..."
            class="w-full pr-10"
            @input="handleSearchInput"
            @keyup.enter="submitSearch"
          />

          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
            aria-label="Search admins"
            @click="submitSearch"
          >
            <Icon icon="iconoir:search" class="text-lg" />
          </button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="sm" class="h-10 gap-2 border-dashed">
              <Icon icon="iconoir:filter-list" class="text-sm" />
              Role
              <span
                v-if="!isShowingAllRoles(selectedRoles)"
                class="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"
              >
                {{ selectedRoles.length }}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" class="w-44">
            <DropdownMenuLabel class="text-xs font-semibold">
              Filter by Role
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem
              v-for="option in roleOptions"
              :key="option.value"
              class="cursor-pointer text-xs"
              :checked="selectedRoles.includes(option.value)"
              @select="(event) => event.preventDefault()"
              @update:checked="toggleRoleFilter(option.value)"
            >
              {{ option.label }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Link :href="route('admin.users.admins.create')" class="self-start sm:self-auto">
        <Button type="button" variant="default"> Create </Button>
      </Link>
    </div>
    <table class="w-full table-auto">
      <thead>
        <tr v-for="columnHeaders in table.getHeaderGroups()" :key="columnHeaders.id">
          <th
            class="border px-4 py-2"
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
          <tr v-for="row in table.getRowModel().rows" :key="row.id">
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
            class="border px-4 py-2 text-center text-sm italic text-muted-foreground"
          >
            No Account Found...
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td :colspan="columns.length">
            <div class="mt-4 flex items-center justify-between">
              <span class="text-sm text-muted-foreground">
                Page {{ table.getState().pagination.pageIndex + 1 }}
                of
                {{ table.getPageCount() }}
              </span>

              <div class="flex gap-2">
                <button
                  class="rounded border px-3 py-1"
                  :disabled="!table.getCanPreviousPage()"
                  @click="table.previousPage()"
                >
                  Previous
                </button>

                <button
                  class="rounded border px-3 py-1"
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
