<script setup lang="ts">
import ChatHeader from './ChatHeader.vue';
import ChatComposer from './ChatComposer.vue';
import { ConvoWithParticipants, Type } from '@/types/convo/conversation';
import { computed } from 'vue';
import { getAuthUser } from '@/lib/utils.js';

interface Props {
    chat: ConvoWithParticipants
}

const props = defineProps<Props>();

const emit = defineEmits<{
    info: [chat: ConvoWithParticipants];
    send: [value: string]
}>();


const authUser = computed(() => getAuthUser())
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
    <div class="flex flex-col h-full w-full">
        <ChatHeader :name="name" :avatar="avatar" :is-group="isGroup" @info="emit('info', props.chat)" />

        <slot />

        <ChatComposer @send="emit('send', $event)" />
    </div>
</template>