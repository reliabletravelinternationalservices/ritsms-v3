<script setup lang="ts">
import AvatarPlaceholder from '@/components/AvatarPlaceholder.vue';
import GroupAvatarPlaceholder from '@/components/GroupAvatarPlaceholder.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAuthUser } from '@/lib/utils';
import { ConvoWithParticipants, Type } from '@/types/convo/conversation';
import { Info } from '@lucide/vue';
import { computed } from 'vue';


interface Props {
    chat: ConvoWithParticipants
}

const props = defineProps<Props>()


const emit = defineEmits<{
    info: [chat: ConvoWithParticipants];
}>();

const authUser = computed(() => getAuthUser());
const isGroup = computed(() => props.chat.type === Type.Group)
const privateParticipant = computed(() =>
    props.chat.participants.find(
        (pt) => pt.participant.id !== authUser.value.id
    )?.participant
);
const avatar = computed(() =>
    isGroup.value
        ? props.chat.avatar
        : privateParticipant.value?.avatar ?? null
);
const name = computed(() =>
    isGroup.value
        ? props.chat.name
        : privateParticipant.value?.display_name ?? 'Unknown user'
);

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

        <button class="btn btn-ghost btn-sm gap-2" @click="emit('info', chat)">
            <Info class="w-6 h-6" />
        </button>

    </div>
</template>