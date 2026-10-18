<script setup lang="ts">
import { formatMessageTime } from '@/lib/utils';


interface Props {
    createdAt?: string
}

const props = defineProps<Props>();

</script>


<template>
    <span v-if="props.createdAt" class="shrink-0 text-[10px] text-muted-foreground">
        {{ formatMessageTime(props.createdAt) }}
    </span>
</template>