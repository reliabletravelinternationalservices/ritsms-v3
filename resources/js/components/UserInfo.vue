<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/composables/useInitials';
import type { User } from '@/types';
import { computed } from 'vue';

interface Props {
    user: User;
    showEmail?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showEmail: false,
});

const { getInitials } = useInitials();

// Compute whether we should show the avatar image
const showAvatar = computed(() => props.user.avatar && props.user.avatar !== '');
</script>

<template>
    <Avatar class="h-8 w-8 overflow-hidden rounded-lg bg-sidebar border border-sidebar-border">
        <AvatarImage v-if="showAvatar && user.avatar" :src="user.avatar" :alt="user.display_name" />
        <AvatarFallback class="rounded-lg text-white">
            {{ getInitials(user.display_name) }}
        </AvatarFallback>
    </Avatar>

    <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-medium text-sidebar-foreground">{{ user.display_name }}</span>
        <span v-if="showEmail" class="truncate text-sidebar-foreground">{{ user.email }}</span>
    </div>
</template>
