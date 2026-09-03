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

const model = defineModel<PublishStatus>({
    default: () => ({
        state: 'draft',
        visibility: 'private',
    }),
})

const emit = defineEmits<{
    change: [value: PublishStatus]
}>()

const statusLabel = computed(() => {
    if (
        model.value.state === 'draft' &&
        model.value.visibility === 'private'
    ) {
        return 'Draft'
    }

    if (
        model.value.state === 'published' &&
        model.value.visibility === 'private'
    ) {
        return 'Published'
    }

    if (
        model.value.state === 'published' &&
        model.value.visibility === 'public'
    ) {
        return 'Live'
    }

    if (model.value.state === 'archived') {
        return 'Archived'
    }

    return 'Draft'
})

const statusDescription = computed(() => {
    if (
        model.value.state === 'published' &&
        model.value.visibility === 'private'
    ) {
        return 'Published · Hidden'
    }

    if (
        model.value.state === 'published' &&
        model.value.visibility === 'public'
    ) {
        return 'Live publicly'
    }

    if (model.value.state === 'archived') {
        return 'Archived'
    }

    return 'Still being prepared'
})

const buttonIcon = computed(() => {
    if (model.value.state === 'draft') {
        return 'lucide:file-pen'
    }

    if (model.value.state === 'published' && model.value.visibility === 'private') {
        return 'lucide:link'
    }

    if (model.value.state === 'published' && model.value.visibility === 'public') {
        return 'lucide:globe'
    }

    return 'lucide:archive'
})

const buttonClass = computed(() => {
    if (model.value.state === 'draft') {
        return 'bg-zinc-600 hover:bg-zinc-700'
    }

    if (
        model.value.state === 'published' &&
        model.value.visibility === 'private'
    ) {
        return 'bg-blue-600 hover:bg-blue-700'
    }

    if (
        model.value.state === 'published' &&
        model.value.visibility === 'public'
    ) {
        return 'bg-green-600 hover:bg-green-700'
    }

    return 'bg-gray-600 hover:bg-gray-700'
})

const actions = computed(() => {
    const current = model.value

    // DRAFT
    if (current.state === 'draft') {
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

    // PUBLISHED + PRIVATE
    if (
        current.state === 'published' &&
        current.visibility === 'private'
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

    // PUBLISHED + PUBLIC
    if (
        current.state === 'published' &&
        current.visibility === 'public'
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

    // ARCHIVED
    if (current.state === 'archived') {
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

function selectAction(value: PublishStatus) {
    model.value = value

    emit('change', value)
}
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                variant="default"
                :class="[
                    'flex items-center gap-2 text-white',
                    buttonClass,
                ]"
            >
                <Icon :icon="buttonIcon" class="text-xl" />

                <div class="flex flex-col items-start">
                    <span>{{ statusLabel }}</span>
                </div>

                <Icon
                    icon="lucide:chevron-down"
                    class="ml-1 text-xl"
                />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="w-64">
            <DropdownMenuItem
                v-for="action in actions"
                :key="action.label"
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