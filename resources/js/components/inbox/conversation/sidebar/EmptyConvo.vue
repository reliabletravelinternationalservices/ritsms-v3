<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="flex flex-col items-center justify-center px-4 py-12 text-center">
        <Icon icon="lucide:search-x" class="mb-2 size-7 text-muted-foreground" />

        <p class="text-sm font-medium">
            No conversations found
        </p>

        <p class="mt-1 text-xs text-muted-foreground">
            Try searching for another conversation.
        </p>
    </div>
</template>