<script setup lang="ts">

interface Props {
    createdAt: string;
}

defineProps<Props>();
</script>

<template>
    <div class="flex flex-col">
        <span class="text-xs text-muted-foreground">
           {{ createdAt }}
        </span>
    </div>
</template>