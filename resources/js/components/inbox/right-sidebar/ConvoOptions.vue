<script setup lang="ts">
import AvatarPlaceholder from '@/components/AvatarPlaceholder.vue';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDateString } from '@/lib/utils';
import { ConvoWithParticipants } from '@/types/convo/conversation';
import { Ellipsis, Info, LogOut, Settings, Users } from '@lucide/vue';
interface Props {
    isGroup: boolean
    chat: ConvoWithParticipants
}

defineProps<Props>()

const emit = defineEmits<{
    leaveConvo:[]
}>()


</script>

<template>
    <Accordion type="multiple" class="w-full" default-value="information">
        <!-- Information -->
        <AccordionItem value="information" key="information">
            <AccordionTrigger class="text-sm font-semibold hover:no-underline">
                <div class="flex items-center gap-2">
                    <Info class="h-4 w-4 text-muted-foreground" />
                    Chat Information
                </div>
            </AccordionTrigger>

            <AccordionContent>
                <div class="space-y-4 pt-2">
                    <div class="space-y-1">
                        <p class="text-xs text-muted-foreground">Created by</p>
                        <p class="text-sm font-medium">
                            {{ chat.created_by.display_name }}
                        </p>
                        <p class="text-xs capitalize text-muted-foreground">
                            {{ chat.created_by.role }}
                        </p>
                    </div>

                    <div class="space-y-1">
                        <p class="text-xs text-muted-foreground">Created at</p>
                        <p class="text-sm font-medium">
                            {{ formatDateString(chat.created_at) }}
                        </p>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>

        <!-- Members -->
        <AccordionItem value="members" key="members">
            <AccordionTrigger class="text-sm font-semibold hover:no-underline">
                <div class="flex items-center gap-2">
                    <Users class="h-4 w-4 text-muted-foreground" />
                    Chat Members
                    <span class="text-xs font-normal text-muted-foreground">
                        ({{ chat.participants?.length ?? 0 }})
                    </span>
                </div>
            </AccordionTrigger>

            <AccordionContent>
                <div class="space-y-1 pt-2">
                    <div v-for="participant in chat.participants ?? []" :key="participant.id"
                        class="group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted">
                        <Avatar class="h-10 w-10 shrink-0">
                            <AvatarImage v-if="participant.participant.avatar"
                                :src="participant.participant.avatar"
                                :alt="participant.participant.display_name" />
                            <AvatarFallback>
                                <AvatarPlaceholder class="h-full w-full" />
                            </AvatarFallback>
                        </Avatar>

                        <div class="min-w-0 flex-1">
                            <p class="truncate text-sm font-medium">
                                {{ participant.participant.display_name }}
                            </p>

                            <p class="text-xs capitalize text-muted-foreground">
                                {{ participant.role }}
                            </p>
                        </div>

                        <button
                            class="rounded-md p-1.5 opacity-0 transition-opacity hover:bg-background group-hover:opacity-100"
                            @click.stop>
                            <Ellipsis class="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>

        <!-- More Options -->
        <AccordionItem v-if="isGroup" value="options" key="options">
            <AccordionTrigger class="text-sm font-semibold hover:no-underline">
                <div class="flex items-center gap-2">
                    <Settings class="h-4 w-4 text-muted-foreground" />
                    More Options
                </div>
            </AccordionTrigger>

            <AccordionContent>
                <div class="space-y-1 pt-2">
                    <button
                        @click="emit('leaveConvo')"
                        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10">
                        <LogOut class="h-4 w-4" />
                        Leave Group
                    </button>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>