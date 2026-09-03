<script setup lang="ts">
import Banner from '@/components/Banner.vue'
import { computed } from 'vue'
import type { IconProps } from '@iconify/vue'

type TourState = 'draft' | 'published' | 'archived'
type TourVisibility = 'public' | 'private'

interface Props {
    state: TourState
    visibility: TourVisibility
}

interface TourStatus {
    label: string
    icon: IconProps
    class: string
}

const props = defineProps<Props>()

const status = computed<TourStatus>(() => {
    if (props.state === 'draft') {
        return {
            label: 'Draft',
            icon: {
                icon: 'lucide:file-pen',
                class: 'text-xs',
            },
            class: 'rounded-sm border-0 text-white bg-zinc-500',
        }
    }

    if (props.state === 'published' && props.visibility === 'public') {
        return {
            label: 'Live',
            icon: {
                icon: 'lucide:globe',
                class: 'text-xs',
            },
            class: 'rounded-sm border-0 text-white bg-green-600 text-sm',
        }
    }

    if (props.state === 'published' && props.visibility === 'private') {
        return {
            label: 'Published',
            icon: {
                icon: 'lucide:link',
                class: 'text-xs',
            },
            class: 'rounded-sm border-0 text-white bg-blue-600',
        }
    }

    return {
        label: 'Archived',
        icon: {
            icon: 'lucide:archive',
            class: 'text-xs',
        },
        class: 'rounded-sm border-0 text-white bg-zinc-700',
    }
})
</script>

<template>
    <div class="w-fit">
        <Banner :title="status.label" :icon="status.icon" :class="status.class" />
    </div>
</template>