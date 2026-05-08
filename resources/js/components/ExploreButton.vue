<script setup lang="ts">
import { Icon } from '@iconify/vue';


interface Props {
    title: string;
    href: string;
    class?: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="border-b border-[var(--outbound-custom)] hover:border-[var(--tertiary-custom)] text-[var(--outbound-custom)] hover:text-[var(--tertiary-custom)] duration-75"
        :class="props.class">
        <a :href="href" target="_blank">
            <button type="button" class="flex items-center gap-2 font-roboto italic text-sm">
                {{ title }}
                <Icon icon="ic:baseline-arrow-right-alt" class="text-md md:text-2xl" />
            </button>
        </a>
    </div>
</template>
