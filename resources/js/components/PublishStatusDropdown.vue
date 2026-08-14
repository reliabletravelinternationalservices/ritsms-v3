<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type PublishStatus = 'draft' | 'public' | 'private'

const status = ref<PublishStatus>('draft')

const buttonLabel = computed(() => {
    switch (status.value) {
        case 'public':
            return 'Unpublish'
        case 'private':
            return 'Private'
        default:
            return 'Publish'
    }
})

const buttonIcon = computed(() => {
    switch (status.value) {
        case 'public':
            return 'lucide:eye-off'
        case 'private':
            return 'lucide:lock'
        default:
            return 'lucide:globe'
    }
})

const buttonClass = computed(() => {
    switch (status.value) {
        case 'public':
            return 'bg-red-600 hover:bg-red-700'

        case 'private':
            return 'bg-blue-600 hover:bg-blue-700'

        default:
            return 'bg-[var(--color-green)] hover:bg-green-700'
    }
})

const actions = computed(() => {
    switch (status.value) {
        case 'public':
            return [
                {
                    label: 'Unpublish',
                    value: 'draft' as PublishStatus,
                    icon: 'lucide:eye-off',
                },
                {
                    label: 'Publish as Private',
                    value: 'private' as PublishStatus,
                    icon: 'lucide:lock',
                },
            ]

        case 'private':
            return [
                {
                    label: 'Unpublish',
                    value: 'draft' as PublishStatus,
                    icon: 'lucide:eye-off',
                },
                {
                    label: 'Publish as Public',
                    value: 'public' as PublishStatus,
                    icon: 'lucide:globe',
                },
            ]

        default:
            return [
                {
                    label: 'Publish as Public',
                    value: 'public' as PublishStatus,
                    icon: 'lucide:globe',
                },
                {
                    label: 'Publish as Private',
                    value: 'private' as PublishStatus,
                    icon: 'lucide:lock',
                },
            ]
    }
})

function selectAction(value: PublishStatus) {
    status.value = value
}
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="default" :class="[
                'flex items-center gap-2 text-white',
                buttonClass,
            ]">
                <span class="flex items-center gap-2">
                    <Icon :icon="buttonIcon" class="text-xl" />

                    <span>{{ buttonLabel }}</span>
                </span>

                <Icon icon="lucide:chevron-down" class="text-xl" />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="w-52">
            <DropdownMenuItem v-for="action in actions" :key="action.value"
                class="flex cursor-pointer items-center gap-2" @click="selectAction(action.value)">
                <Icon :icon="action.icon" class="text-lg" />

                <span>{{ action.label }}</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>