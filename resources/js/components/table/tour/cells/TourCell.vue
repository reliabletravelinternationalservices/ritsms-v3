```vue
<script setup lang="ts">
import { getImagePath } from '@/lib/utils';
import { Media } from '@/types/media-v2';
import { Icon } from '@iconify/vue';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Link } from '@inertiajs/vue3';

interface Props {
    code: string,
    name: string,
    image?: Media | null,
    description?: string,
    deleted_at?: string | null,
}

defineProps<Props>()
</script>

<template>
    <HoverCard>
        <HoverCardTrigger class="w-fit h-fit cursor-default">
            <div
                class="flex items-center gap-2 w-fit h-fit"
                :class="{ 'opacity-60': deleted_at }"
            >
                <div class="relative w-14 h-10 bg-zinc-200 rounded-sm overflow-hidden">
                    <img
                        v-if="image"
                        :src="getImagePath(image.file_path, 'thumbnail')"
                        :alt="image.alt_text"
                        class="w-full h-full rounded-sm"
                    />

                    <div
                        v-else
                        class="flex items-center justify-center bg-zinc-200 w-full h-full rounded-sm"
                    >
                        <Icon
                            icon="lucide:image-off"
                            class="size-5 text-zinc-600 self-center"
                        />
                    </div>

                    <!-- Deleted overlay -->
                    <div
                        v-if="deleted_at"
                        class="absolute inset-0 flex items-center justify-center bg-black/40"
                    >
                        <Icon
                            icon="lucide:trash-2"
                            class="size-4 text-white"
                        />
                    </div>
                </div>

                <div>
                    <!-- Active -->
                    <Link
                        v-if="!deleted_at"
                        href="#"
                        class="uppercase font-bold text-sm text-yellow-600 underline"
                    >
                        {{ code }}
                    </Link>

                    <!-- Deleted -->
                    <div
                        v-else
                        class="flex items-center gap-1.5 uppercase font-bold text-sm text-zinc-500"
                    >
                        <span>{{ code }}</span>
                    </div>

                    <div
                        class="font-bold text-base self-center max-w-48 overflow-hidden line-clamp-1"
                        :class="deleted_at ? 'text-zinc-500 line-through' : ''"
                    >
                        {{ name }}
                    </div>

                    <!-- Deleted badge -->
                    <div
                        v-if="deleted_at"
                        class="mt-0.5"
                    >
                        <span
                            class="inline-flex items-center gap-1 rounded-md bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-red-700"
                        >
                            <Icon
                                icon="lucide:trash-2"
                                class="size-3"
                            />
                            Deleted
                        </span>
                    </div>
                </div>
            </div>
        </HoverCardTrigger>

        <HoverCardContent class="max-h-96 overflow-y-auto">
            <div class="flex flex-col gap-2 w-full">
                <div class="relative w-full h-28">
                    <img
                        v-if="image"
                        :src="getImagePath(image.file_path, 'thumbnail')"
                        :alt="image.alt_text"
                        class="w-full h-full rounded-sm"
                    />

                    <div
                        v-else
                        class="flex items-center justify-center bg-zinc-200 w-full h-full rounded-sm"
                    >
                        <Icon
                            icon="lucide:image-off"
                            class="size-8 text-zinc-600 self-center"
                        />
                    </div>

                    <!-- Deleted overlay -->
                    <div
                        v-if="deleted_at"
                        class="absolute inset-0 flex items-center justify-center rounded-sm bg-black/40"
                    >
                        <div
                            class="flex items-center gap-1.5 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                        >
                            <Icon
                                icon="lucide:trash-2"
                                class="size-3.5"
                            />
                            Deleted
                        </div>
                    </div>
                </div>

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
```
