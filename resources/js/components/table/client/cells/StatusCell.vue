<script setup lang="ts">
import Banner from '@/components/Banner.vue'
import { computed } from 'vue'
import type { IconProps } from '@iconify/vue'
import { ClientStatus } from '@/types/client'

interface Props {
    status: ClientStatus
    deleted_at?: string | null
}

interface ClientStatusConfig {
    label: string
    icon: IconProps
    class: string
}

const props = defineProps<Props>()

const status = computed<ClientStatusConfig>(() => {
    if (props.deleted_at) {
        return {
            label: 'Deleted',
            icon: {
                icon: 'lucide:trash-2',
                class: 'text-sm',
            },
            class: 'rounded-sm border-0 bg-red-600 text-white opacity-70',
        }
    }

    switch (props.status) {
        case 'new':
            return {
                label: 'New',
                icon: {
                    icon: 'lucide:sparkles',
                    class: 'text-sm',
                },
                class: 'rounded-sm border-0 bg-blue-600 text-white',
            }

        case 'contacted':
            return {
                label: 'Contacted',
                icon: {
                    icon: 'lucide:phone',
                    class: 'text-sm',
                },
                class: 'rounded-sm border-0 bg-indigo-600 text-white',
            }

        case 'qualified':
            return {
                label: 'Qualified',
                icon: {
                    icon: 'lucide:user-check',
                    class: 'text-sm',
                },
                class: 'rounded-sm border-0 bg-violet-600 text-white',
            }

        case 'quotation_sent':
            return {
                label: 'Quotation Sent',
                icon: {
                    icon: 'lucide:file-text',
                    class: 'text-sm',
                },
                class: 'rounded-sm border-0 bg-amber-500 text-white',
            }

        case 'booked':
            return {
                label: 'Booked',
                icon: {
                    icon: 'lucide:badge-check',
                    class: 'text-sm',
                },
                class: 'rounded-sm border-0 bg-green-600 text-white',
            }

        case 'completed':
            return {
                label: 'Completed',
                icon: {
                    icon: 'lucide:check-circle',
                    class: 'text-sm',
                },
                class: 'rounded-sm border-0 bg-emerald-600 text-white',
            }

        case 'unresponsive':
            return {
                label: 'Unresponsive',
                icon: {
                    icon: 'lucide:phone-off',
                    class: 'text-sm',
                },
                class: 'rounded-sm border-0 bg-zinc-500 text-white',
            }

        case 'cancelled':
            return {
                label: 'Cancelled',
                icon: {
                    icon: 'lucide:x-circle',
                    class: 'text-sm',
                },
                class: 'rounded-sm border-0 bg-red-600 text-white',
            }

        case 'disqualified':
            return {
                label: 'Disqualified',
                icon: {
                    icon: 'lucide:user-x',
                    class: 'text-sm',
                },
                class: 'rounded-sm border-0 bg-zinc-700 text-white',
            }

        default:
            return {
                label: 'Unknown',
                icon: {
                    icon: 'lucide:circle-help',
                    class: 'text-sm',
                },
                class: 'rounded-sm border-0 bg-zinc-400 text-white',
            }
    }
})
</script>

<template>
    <div class="w-fit">
        <Banner
            :title="status.label"
            :icon="status.icon"
            :class="status.class"
        />
    </div>
</template>