<script setup lang="ts">
import InfiniteScroll, { InfiniteScrollProps } from '@/components/InfiniteScroll.vue';

withDefaults(defineProps<InfiniteScrollProps>(), {
    loading: false,
    hasMore: false,
    threshold: 200,
});


const emit = defineEmits<{
    load: [];
}>();

</script>

<template>
    <InfiniteScroll class="mt-2 h-[calc(100vh-210px)] w-full min-w-0 max-w-full overflow-x-hidden overflow-y-auto px-3"
        :loading="loading" :has-more="hasMore" direction="top-to-bottom" @load="emit('load')">
        <slot />
    </InfiniteScroll>
</template>