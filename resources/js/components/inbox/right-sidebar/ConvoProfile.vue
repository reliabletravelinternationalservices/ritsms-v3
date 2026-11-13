<script setup lang="ts">
import AvatarPlaceholder from '@/components/AvatarPlaceholder.vue';
import GroupAvatarPlaceholder from '@/components/GroupAvatarPlaceholder.vue';
import { Avatar, AvatarImage } from '@/components/ui/avatar/index.js';

interface Props {
    avatar?: string | null
    name: string,
    isGroup?: boolean
}


const props = withDefaults(defineProps<Props>(), {
    isGroup:false
})


</script>

<template>
    <!-- Conversation Profile -->
        <div class="flex flex-col items-center gap-3 py-4">
            <Avatar class="h-20 w-20 overflow-hidden rounded-full border bg-sidebar">
                <AvatarImage v-if="props.avatar" :src="props.avatar" :alt="props.name" />
                <AvatarFallback class="rounded-full">
                    <AvatarPlaceholder v-if="!isGroup" class="h-full w-full" />
                    <GroupAvatarPlaceholder v-else class="h-full w-full" />
                </AvatarFallback>
            </Avatar>

            <div class="w-full space-y-1 text-center">
                <h2 class="break-words text-lg font-bold leading-tight">
                    {{ props.name }}
                </h2>

                <p class="text-xs text-muted-foreground">
                    {{ props.isGroup? 'Group conversation' : 'Private conversation' }}
                </p>
            </div>
        </div>
</template>