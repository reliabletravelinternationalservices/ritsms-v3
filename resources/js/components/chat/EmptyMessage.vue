<script setup lang="ts">
import { MessageCircle } from '@lucide/vue';

</script>

<template>
    <div
        class="flex h-full items-center justify-center text-center"
    >
        <div>
            <MessageCircle
                class="mx-auto mb-2 size-8 text-muted-foreground"
            />

            <p class="text-sm text-muted-foreground">
                Send a message to start the conversation.
            </p>
        </div>
    </div>
</template>