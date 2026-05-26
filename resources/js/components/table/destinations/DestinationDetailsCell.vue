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
            :href="route('admin.destinations.show', { destination: props.destinationId })"
            class="italic underline text-sm text-[var(--tertiary-custom)]"
        >
            View Details
        </Link>
    </div>
</template>
