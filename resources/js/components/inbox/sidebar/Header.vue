<script setup lang="ts">
import { PenSquareIcon } from '@lucide/vue';



withDefaults(defineProps<{
    title: string;
}>(), {
    title: 'Chats'
});



const emit = defineEmits<{
    create: [];
}>();

</script>


<template>
    <div class="flex items-center justify-between px-3">
        <h2 class="text-xl font-bold">Chats</h2>
        <button @click="emit('create')">
            <PenSquareIcon class="h-5 w-5 cursor-pointer" />
        </button>
    </div>
</template>