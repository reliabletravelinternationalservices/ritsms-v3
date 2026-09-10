<script setup lang="ts">
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Link } from '@inertiajs/vue3'
import { Icon } from '@iconify/vue'

interface Props {
    code: string
    name: string
    description?: string
    deleted_at?: string | null
}

defineProps<Props>()
</script>

<template>
    <HoverCard>
        <HoverCardTrigger class="w-fit h-fit cursor-default">
            <div
                class="w-fit h-fit"
                :class="{ 'opacity-60': deleted_at }"
            >
                <div>
                    <Link
                        v-if="!deleted_at"
                        href="#"
                        class="uppercase font-bold text-sm text-yellow-600 underline"
                    >
                        {{ code }}
                    </Link>

                    <div
                        v-else
                        class="flex items-center gap-1.5 uppercase font-bold text-sm text-zinc-500"
                    >
                        <Icon
                            icon="lucide:trash-2"
                            class="size-3.5"
                        />
                        {{ code }}
                    </div>

                    <div
                        class="font-bold text-base self-center max-w-48 overflow-hidden line-clamp-1"
                        :class="deleted_at ? 'text-zinc-500 line-through' : ''"
                    >
                        {{ name }}
                    </div>

                    <div
                        v-if="deleted_at"
                        class="mt-0.5 inline-flex items-center gap-1 rounded-md bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-red-700"
                    >
                        <Icon
                            icon="lucide:trash-2"
                            class="size-3"
                        />
                        Deleted
                    </div>
                </div>
            </div>
        </HoverCardTrigger>

        <HoverCardContent class="max-h-96 overflow-y-auto">
            <div class="flex flex-col gap-2 w-full">
                <div
                    class="font-bold text-base"
                    :class="deleted_at ? 'text-zinc-500 line-through' : ''"
                >
                    {{ name }}
                </div>

                <div
                    v-if="deleted_at"
                    class="flex items-center gap-1.5 text-xs text-red-600"
                >
                    <Icon
                        icon="lucide:circle-alert"
                        class="size-3.5"
                    />
                    This tour has been deleted.
                </div>

                <div
                    v-if="description"
                    class="text-sm text-zinc-600"
                >
                    <p class="text-base">
                        {{ description }}
                    </p>
                </div>
            </div>
        </HoverCardContent>
    </HoverCard>
</template>