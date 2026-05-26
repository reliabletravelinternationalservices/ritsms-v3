<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

interface Props {
    destinationId: number;
}

const props = defineProps<Props>();
</script>

<template>
    <div>
        <Link
            :href="route('admin.destinations.details', { id: props.destinationId })"
            class="italic underline text-sm hover:text-[var(--tertiary-custom)]"
        >
            View Details
        </Link>
    </div>
</template>
