<script setup lang="ts">
import { computed } from 'vue';


interface Props {
    class?: string
    title: string
}

const props = defineProps<Props>()

const className = computed(() => props.class);

</script>


<template>
    <div class="p-4 border-b-2 border-border font-bold text-lg" :class="className">
        <h4>{{ title }}</h4>
    </div>
</template>