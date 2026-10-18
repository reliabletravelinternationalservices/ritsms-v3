<script setup lang="ts">

interface Props {
    isRead?: boolean
    isMine?: boolean
    message?: string
    newMessageCount?: number
}

const props = withDefaults(defineProps<Props>(), {
    isRead: () => false,
    isMine: () => false,
    message: () => 'No messages yet',
    newMessageCount: () => 0,
});

</script>


<template>
    <div class="mt-1 flex items-center gap-2">
        <p class="min-w-0 flex-1 truncate text-xs" :class="props.isRead
            ? 'text-muted-foreground' : 'font-semibold text-foreground'">
            <span v-if="isMine">You:</span>
            {{ message }}
        </p>

        <!-- UNREAD COUNT -->
        <span v-if="!props.isRead"
            class="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
            {{ newMessageCount }}
        </span>
    </div>
</template>