<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

interface Props {
    href: string;
    label: string;
}

defineProps<Props>();
</script>

<template>
    <div class="flex flex-col">
        <Link :href="href" class="italic underline text-sm hover:text-[var(--tertiary-custom)] duration-75">
            {{ label }}
        </Link>
    </div>
</template>