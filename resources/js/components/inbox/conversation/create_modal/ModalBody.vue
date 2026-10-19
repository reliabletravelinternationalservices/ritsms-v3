<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="min-h-0 flex-1 overflow-y-auto p-5">
        <!-- Info -->
        <div class="mb-4 flex gap-3 rounded-lg border border-border bg-muted/40 p-3">
            <Icon icon="lucide:info" class="mt-0.5 size-4 shrink-0 text-muted-foreground" />

            <div class="text-xs text-muted-foreground">
                <p>
                    Select at least one contact.
                </p>

                <p class="mt-1">
                    You can add agents and client to the same
                    conversation.
                </p>
            </div>
        </div>

        <slot />
    </div>
</template>