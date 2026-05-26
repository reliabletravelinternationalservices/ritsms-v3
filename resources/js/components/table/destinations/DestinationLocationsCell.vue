<script setup lang="ts">
import { DestinationLocation } from '@/types/destination-location';

interface Props {
    locations: DestinationLocation[];
}

const props = defineProps<Props>();

const displayedLocations = (() => {
    const names = props.locations.map((location) => location.name);

    if (names.length === 0) {
        return 'No locations available';
    }

    const visibleNames = names.slice(0, 3);
    const remaining = names.length - visibleNames.length;

    return remaining > 0
        ? `${visibleNames.join(', ')} and ${remaining} more`
        : visibleNames.join(', ');
})();
</script>

<template>
    <div class="space-y-2">
        <p class="text-sm text-muted-foreground">
            {{ displayedLocations }}
        </p>
    </div>
</template>
