<script setup lang="ts">
import { computed } from 'vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import SelectMenu, { SelectOption } from '@/components/SelectMenu.vue'

interface PaginationLink {
    url: string | null
    label: string
    active: boolean
}

interface Pagination<T> {
    current_page: number
    data: T[]
    first_page_url: string
    from: number | null
    last_page: number
    last_page_url: string
    links: PaginationLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}


interface Props {
    pagination: Pagination<unknown>
    perPage: string
    perPageOptions?: SelectOption[]
}

const props = withDefaults(defineProps<Props>(), {
    perPageOptions: () => [
        { label: '5', value: '5' },
        { label: '10', value: '10' },
        { label: '20', value: '20' },
        { label: '50', value: '50' },
        { label: '100', value: '100' },
    ],
})

const emit = defineEmits<{
    'update:perPage': [value: string]
    'page-change': [page: string]
}>()

const currentPage = computed(() => props.pagination.current_page)
const lastPage = computed(() => props.pagination.last_page)

const canGoPrevious = computed(() => currentPage.value > 1)
const canGoNext = computed(() => currentPage.value < lastPage.value)

const goToPage = (page: string) => {
    if (parseInt(page) < 1 || parseInt(page) > lastPage.value || parseInt(page) === currentPage.value) {
        return
    }

    emit('page-change', page)
}

const goToFirstPage = () => goToPage('1')

const goToPreviousPage = () => goToPage((currentPage.value - 1).toString())

const goToNextPage = () => goToPage((currentPage.value + 1).toString())

const goToLastPage = () => goToPage(lastPage.value.toString())
</script>

<template>
    <div class="flex justify-between">
        <div class="flex gap-2">
            <ButtonIcon
                icon="lucide:chevrons-left"
                class="bg-white text-foreground hover:bg-zinc-100 border p-2 h-min"
                :disabled="!canGoPrevious"
                @click="goToFirstPage"
            />

            <ButtonIcon
                icon="lucide:chevron-left"
                class="bg-white text-foreground hover:bg-zinc-100 border p-2 h-min"
                :disabled="!canGoPrevious"
                @click="goToPreviousPage"
            />

            <span
                class="text-foreground border p-1 w-8 h-8 flex items-center justify-center rounded-sm"
            >
                {{ currentPage }}
            </span>

            <ButtonIcon
                icon="lucide:chevron-right"
                class="bg-white text-foreground hover:bg-zinc-100 border p-2 h-min"
                :disabled="!canGoNext"
                @click="goToNextPage"
            />

            <ButtonIcon
                icon="lucide:chevrons-right"
                class="bg-white text-foreground hover:bg-zinc-100 border p-2 h-min"
                :disabled="!canGoNext"
                @click="goToLastPage"
            />
        </div>

        <div class="flex gap-2">
            <label class="text-foreground self-center">
                Show
            </label>

            <SelectMenu
                :model-value="perPage"
                :options="perPageOptions"
                class="text-foreground"
                @update:model-value="emit('update:perPage', $event)"
            />
        </div>
    </div>
</template>
