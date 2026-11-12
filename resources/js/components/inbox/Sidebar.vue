<script setup lang="ts">
import { SidebarHeader, SidebarFilter } from '@/components/inbox/index';

const emit = defineEmits<{
    create: [];
    search: [event?: string];
}>();



</script>

<template>
    <aside class="flex h-full w-[26%] min-w-0 shrink-0 flex-col overflow-hidden border-r py-4 text-foreground">
        <SidebarHeader title="Chats" @create="emit('create')" />

        <SidebarFilter @search="emit('search', $event)" />

        <div class="min-h-0 min-w-0 flex-1 overflow-hidden">
            <slot />
        </div>
    </aside>
</template>