<script setup lang="ts">
import { SharedData, User } from '@/types';
import { Icon } from '@iconify/vue';
import { usePage } from '@inertiajs/vue3';

const page = usePage<SharedData>();
const currentUser = page.props.auth.user as User;
const envUrl = import.meta.env.VITE_APP_URL;
interface Props {
    id: number;
    avatar?: string | null;
    name: string;
    display_name?: string;
}

defineProps<Props>();
</script>

<template>
    <div class="flex items-center gap-2">
        <span class="flex items-center justify-center">
            <img v-if="avatar" class="w-10 h-10 object-cover rounded-sm" :src="`${envUrl}/storage/${avatar}`" :alt="name">
            <div v-else class="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-sm">
                <Icon icon="mdi:image-off" width="24" height="24" class="text-gray-400" />
            </div>
        </span>
        
        <span class="font-semibold line-clamp-2 flex flex-col">
            <span>{{ name }} <span v-if="id === currentUser.id" class="text-xs text-orange-500">(Owned)</span></span>
            <span v-if="display_name" class="text-xs font-light text-muted-foreground flex items-center">
                {{ display_name }}
            </span>
        </span>
    </div>
</template>