<script setup lang="ts">
import { computed } from 'vue';


interface Props {
    totalSelected?: number
}

const props = withDefaults(defineProps<Props>(), {
    totalSelected: 0
});


const isNoSelected = computed(() => props.totalSelected <= 0)

</script>

<template>

    <div class="flex shrink-0 items-center justify-between border-t border-border px-5 py-4">
        <div class="flex items-center text-xs text-muted-foreground">
            <template v-if="isNoSelected">
                Select a contact to continue.
            </template>

            <template v-else-if="props.totalSelected === 1">
                1 client conversation
            </template>

            <template v-else>
                {{ props.totalSelected }} participants
            </template>
        </div>

        <div class="flex gap-2">
            <slot />
        </div>
    </div>
</template>