<script setup lang="ts">
import AvatarPlaceholder from '@/components/AvatarPlaceholder.vue';
import GroupAvatarPlaceholder from '@/components/GroupAvatarPlaceholder.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Info } from '@lucide/vue';


interface Props {
    name: string;
    avatar?: string | null;
    isGroup: boolean
}

withDefaults(defineProps<Props>(), {
    isGroup: false
})


const emit = defineEmits<{
    info: [];
}>();


</script>

<template>
    <div class="flex items-center justify-between w-full p-4 gap-4 text-foreground  border-b border-border">
        <div class="flex gap-2 items-center">
            <Avatar class="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-sidebar-border bg-sidebar">
                <AvatarImage v-if="avatar" class="aspect-square h-full w-full" :src="avatar" alt="User Avatar" />
                <AvatarFallback class="rounded-full text-white">
                    <GroupAvatarPlaceholder v-if="isGroup" class="aspect-square h-full w-full" />
                    <AvatarPlaceholder v-else class="aspect-square h-full w-full" />
                </AvatarFallback>
            </Avatar>
            <h3 class="text-lg font-semibold">{{ name }}</h3>
        </div>

        <button class="btn btn-ghost btn-sm gap-2" @click="emit('info')">
            <Info class="w-6 h-6" />
        </button>

    </div>
</template>