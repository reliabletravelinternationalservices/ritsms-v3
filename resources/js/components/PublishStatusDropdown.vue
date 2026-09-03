<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

import { Button } from '@/components/ui/button'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export type TourState = 'draft' | 'published' | 'archived'

export type TourVisibility = 'public' | 'private'

export interface PublishStatus {
    state: TourState
    visibility: TourVisibility
}

/*
|--------------------------------------------------------------------------
| Models
|--------------------------------------------------------------------------
*/

const state = defineModel<TourState>('state', {
    default: 'draft',
})

const visibility = defineModel<TourVisibility>('visibility', {
    default: 'private',
})

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
*/

const props = defineProps<{
    loading?: boolean
}>()

/*
|--------------------------------------------------------------------------
| Emits
|--------------------------------------------------------------------------
*/

const emit = defineEmits<{
    change: [value: PublishStatus]
}>()

/*
|--------------------------------------------------------------------------
| Current Status
|--------------------------------------------------------------------------
*/

const currentStatus = computed<PublishStatus>(() => ({
    state: state.value,
    visibility: visibility.value,
}))

/*
|--------------------------------------------------------------------------
| Status Label
|--------------------------------------------------------------------------
*/

const statusLabel = computed(() => {
    if (
        state.value === 'draft' &&
        visibility.value === 'private'
    ) {
        return 'Draft'
    }

    if (
        state.value === 'published' &&
        visibility.value === 'private'
    ) {
        return 'Published'
    }

    if (
        state.value === 'published' &&
        visibility.value === 'public'
    ) {
        return 'Live'
    }

    if (state.value === 'archived') {
        return 'Archived'
    }

    return 'Draft'
})

/*
|--------------------------------------------------------------------------
| Status Description
|--------------------------------------------------------------------------
*/

const statusDescription = computed(() => {
    if (
        state.value === 'draft' &&
        visibility.value === 'private'
    ) {
        return 'Still being prepared'
    }

    if (
        state.value === 'published' &&
        visibility.value === 'private'
    ) {
        return 'Published · Hidden'
    }

    if (
        state.value === 'published' &&
        visibility.value === 'public'
    ) {
        return 'Live publicly'
    }

    if (state.value === 'archived') {
        return 'Archived'
    }

    return ''
})

/*
|--------------------------------------------------------------------------
| Button Icon
|--------------------------------------------------------------------------
*/

const buttonIcon = computed(() => {
    if (state.value === 'draft') {
        return 'lucide:file-pen'
    }

    if (
        state.value === 'published' &&
        visibility.value === 'private'
    ) {
        return 'lucide:link'
    }

    if (
        state.value === 'published' &&
        visibility.value === 'public'
    ) {
        return 'lucide:globe'
    }

    return 'lucide:archive'
})

/*
|--------------------------------------------------------------------------
| Button Color
|--------------------------------------------------------------------------
*/

const buttonClass = computed(() => {
    if (state.value === 'draft') {
        return 'bg-orange-600 hover:bg-orange-700'
    }

    if (
        state.value === 'published' &&
        visibility.value === 'private'
    ) {
        return 'bg-blue-600 hover:bg-blue-700'
    }

    if (
        state.value === 'published' &&
        visibility.value === 'public'
    ) {
        return 'bg-green-600 hover:bg-green-700'
    }

    return 'bg-gray-600 hover:bg-gray-700'
})

/*
|--------------------------------------------------------------------------
| Available Actions
|--------------------------------------------------------------------------
*/

const actions = computed(() => {
    /*
    |--------------------------------------------------------------------------
    | DRAFT
    |--------------------------------------------------------------------------
    */

    if (state.value === 'draft') {
        return [
            {
                label: 'Publish as Public',
                description: 'Live publicly on website',
                value: {
                    state: 'published',
                    visibility: 'public',
                } satisfies PublishStatus,
                icon: 'lucide:globe',
            },
            {
                label: 'Publish as Private',
                description: 'Published but hidden',
                value: {
                    state: 'published',
                    visibility: 'private',
                } satisfies PublishStatus,
                icon: 'lucide:link',
            },
        ]
    }

    /*
    |--------------------------------------------------------------------------
    | PUBLISHED + PRIVATE
    |--------------------------------------------------------------------------
    */

    if (
        state.value === 'published' &&
        visibility.value === 'private'
    ) {
        return [
            {
                label: 'Make Public',
                description: 'Show on website',
                value: {
                    state: 'published',
                    visibility: 'public',
                } satisfies PublishStatus,
                icon: 'lucide:globe',
            },
            {
                label: 'Unpublish',
                description: 'Return to draft',
                value: {
                    state: 'draft',
                    visibility: 'private',
                } satisfies PublishStatus,
                icon: 'lucide:eye-off',
            },
        ]
    }

    /*
    |--------------------------------------------------------------------------
    | PUBLISHED + PUBLIC
    |--------------------------------------------------------------------------
    */

    if (
        state.value === 'published' &&
        visibility.value === 'public'
    ) {
        return [
            {
                label: 'Make Private',
                description: 'Hide from website',
                value: {
                    state: 'published',
                    visibility: 'private',
                } satisfies PublishStatus,
                icon: 'lucide:lock',
            },
            {
                label: 'Unpublish',
                description: 'Return to draft',
                value: {
                    state: 'draft',
                    visibility: 'private',
                } satisfies PublishStatus,
                icon: 'lucide:eye-off',
            },
        ]
    }

    /*
    |--------------------------------------------------------------------------
    | ARCHIVED
    |--------------------------------------------------------------------------
    */

    if (state.value === 'archived') {
        return [
            {
                label: 'Restore as Draft',
                description: 'Move back to draft',
                value: {
                    state: 'draft',
                    visibility: 'private',
                } satisfies PublishStatus,
                icon: 'lucide:archive-restore',
            },
        ]
    }

    return []
})

/*
|--------------------------------------------------------------------------
| Select Action
|--------------------------------------------------------------------------
*/

function selectAction(value: PublishStatus) {
    if (props.loading) {
        return
    }

    /*
     * Update both v-model values
     */
    state.value = value.state
    visibility.value = value.visibility

    /*
     * Notify parent
     */
    emit('change', value)
}
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                variant="default"
                :disabled="loading"
                :class="[
                    'flex items-center gap-2 text-white',
                    buttonClass,
                ]"
            >
                <!-- Loading -->
                <Icon
                    v-if="loading"
                    icon="lucide:loader-2"
                    class="size-5 animate-spin"
                />

                <!-- Normal Icon -->
                <Icon
                    v-else
                    :icon="buttonIcon"
                    class="text-xl"
                />

                <!-- Label -->
                <div class="flex flex-col items-start">
                    <span>
                        {{ statusLabel }}
                    </span>
                </div>

                <!-- Dropdown Icon -->
                <Icon
                    v-if="!loading"
                    icon="lucide:chevron-down"
                    class="ml-1 text-xl"
                />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
            align="end"
            class="w-64"
        >
            <DropdownMenuItem
                v-for="action in actions"
                :key="action.label"
                :disabled="loading"
                class="flex cursor-pointer items-start gap-3 py-3"
                @click="selectAction(action.value)"
            >
                <Icon
                    :icon="action.icon"
                    class="mt-0.5 text-lg"
                />

                <div class="flex flex-col">
                    <span class="font-medium">
                        {{ action.label }}
                    </span>

                    <span class="text-xs text-muted-foreground">
                        {{ action.description }}
                    </span>
                </div>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>