<script setup lang="ts">
import { SidebarHeader, SidebarFilter } from '@/components/inbox/index';

const emit = defineEmits<{
    create: [];
    search: [event?: string];
}>();



</script>

<template>
    <aside class="text-foreground border-r h-full w-[26%] py-4">
        <SidebarHeader title="Chats" @create="emit('create')" />
        <SidebarFilter @search="emit('search', $event)" />
        <slot />
    </aside>
</template>