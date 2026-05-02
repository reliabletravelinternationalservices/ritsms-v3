<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Icon, IconProps } from '@iconify/vue';



interface Props {
    class?: string
    icon?: IconProps
    title: string
}

const props = defineProps<Props>()
</script>

<template>
    <div :class="cn('flex text-xs font-medium items-center gap-2 px-3 py-1 bg-[var(--secondary-custom)] text-[var(--primary-custom)] shadow-sm w-fit uppercase', props.class)">
        <Icon v-if="props.icon" v-bind="props.icon" class="w-6 h-6" />
        <span>{{ props.title }}</span>
    </div>
</template>
