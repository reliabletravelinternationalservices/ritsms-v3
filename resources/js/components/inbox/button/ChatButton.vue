<script setup lang="ts">
import AvatarPlaceholder from '@/components/AvatarPlaceholder.vue';
import GroupAvatarPlaceholder from '@/components/GroupAvatarPlaceholder.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatTimeAgo, getAuthUser, getFirstName, getImageUrl } from '@/lib/utils';
import { ConvoWithParticipantsAndLatestMessage, Type as ConvoType } from '@/types/convo/conversation';
import { Type as MessageType } from '@/types/convo/message';
import { Image, Paperclip, Video } from '@lucide/vue';
import { computed } from 'vue';


interface Props {
    isOpen: boolean
    chat: ConvoWithParticipantsAndLatestMessage
}

const props = defineProps<Props>();


const emit = defineEmits<{
    click: [chat: ConvoWithParticipantsAndLatestMessage];
}>();




const authUser = computed(() => getAuthUser())
const isGroup = computed(() => props.chat.type === ConvoType.Group)
const privateParticipant = computed(() =>
    props.chat.participants.find(
        (pt) => pt.participant.id !== authUser.value.id
    )?.participant
);

const currentAuthParticipant = computed(() =>
    props.chat.participants.find(
        (pt) => pt.participant.id === authUser.value.id
    )
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


const totalUnreadMessage = computed(() => currentAuthParticipant.value?.total_unread ?? 0)
const isNotRead = computed(() => props.chat.latest_message.is_read === false)

const latestMessage = computed(() => props.chat.latest_message)

const isYou = computed(() => authUser.value.id === props.chat.latest_message.sender?.id)
const senderName = computed(() => isYou.value ? 'You: ' : getFirstName(props.chat.latest_message.sender!.display_name) + ': ')
</script>


<template>
    <button
        @click="emit('click', props.chat)"
        class="group relative block w-full min-w-0 max-w-full overflow-hidden rounded-md border border-transparent p-2 text-left transition-all duration-200"
        :class="isOpen
            ? 'border-[#edbd53]/30 bg-[#edbd53]/10'
            : 'hover:bg-muted/60'"
    >
        <!-- ACTIVE INDICATOR -->
        <span
            v-if="isOpen"
            class="absolute bottom-2 left-0 top-2 w-1 rounded-full bg-[#edbd53]"
        />

        <div class="flex w-full min-w-0 items-center gap-2">

            <!-- AVATAR -->
            <Avatar class="h-12 w-12 shrink-0 overflow-hidden rounded-circle border border-border bg-sidebar">
                <AvatarImage v-if="avatar" :src="getImageUrl(avatar)" :alt="name" />

                <AvatarFallback class="rounded-circle text-white">
                    <GroupAvatarPlaceholder
                        v-if="isGroup"
                        class="aspect-square h-full w-full"
                    />
                    <AvatarPlaceholder
                        v-else
                        class="aspect-square h-full w-full"
                    />
                </AvatarFallback>
            </Avatar>

            <!-- CONTENT -->
            <div class="min-w-0 flex-1">

                <!-- HEADER -->
                <div class="flex min-w-0 w-full items-center justify-between gap-2">
                    <span
                        class="min-w-0 flex-1 truncate"
                        :class="isOpen
                            ? 'font-bold text-foreground'
                            : 'font-semibold text-foreground'"
                    >
                        {{ name }}
                    </span>

                    <span
                        v-if="totalUnreadMessage > 0"
                        class="flex h-4 shrink-0 items-center justify-center rounded-lg bg-red-600 px-1 text-xs text-white"
                    >
                        {{ totalUnreadMessage }}
                    </span>
                </div>

                <!-- LATEST MESSAGE -->
                <div class="flex min-w-0 w-full items-center gap-2">

                    <p
                        class="flex min-w-0 flex-1 items-center gap-1 overflow-hidden text-sm"
                        :class="[
                            latestMessage.type === MessageType.System
                                ? 'italic text-muted-foreground'
                                : 'text-muted-foreground',
                            isNotRead && 'font-semibold text-foreground'
                        ]"
                    >
                        <!-- SYSTEM -->
                        <template v-if="latestMessage.type === MessageType.System">
                            <span class="min-w-0 flex-1 truncate">
                                {{ latestMessage.body }}
                            </span>
                        </template>

                        <!-- IMAGE -->
                        <template v-else-if="latestMessage.type === MessageType.Image">
                            <Image class="h-3.5 w-3.5 shrink-0" />
                            <span class="min-w-0 truncate">
                                {{ senderName }}Sent an image
                            </span>
                        </template>

                        <!-- VIDEO -->
                        <template v-else-if="latestMessage.type === MessageType.Video">
                            <Video class="h-3.5 w-3.5 shrink-0" />
                            <span class="min-w-0 truncate">
                                {{ senderName }}Sent a video
                            </span>
                        </template>

                        <!-- FILE -->
                        <template v-else-if="latestMessage.type === MessageType.File">
                            <Paperclip class="h-3.5 w-3.5 shrink-0" />
                            <span class="min-w-0 truncate">
                                {{ senderName }}Sent a file
                            </span>
                        </template>

                        <!-- TEXT -->
                        <template v-else>
                            <span v-if="isYou || isGroup" class="shrink-0">
                                {{ senderName }}
                            </span>

                            <span class="min-w-0 flex-1 truncate">
                                {{ latestMessage.body }}
                            </span>
                        </template>
                    </p>

                    <!-- SENT TIME -->
                    <span
                        v-if="latestMessage.sent_at"
                        class="shrink-0 whitespace-nowrap text-xs text-muted-foreground"
                    >
                        {{ formatTimeAgo(latestMessage.sent_at) }}
                    </span>
                </div>
            </div>
        </div>
    </button>
</template>
