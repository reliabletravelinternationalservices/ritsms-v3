<script setup lang="ts">
import { Loader2 } from '@lucide/vue';
import {
    ref,
    onMounted,
    onUnmounted,
    watch,
    nextTick,
} from 'vue';

export interface InfiniteScrollProps {
    loading?: boolean;
    hasMore?: boolean;
    threshold?: number;
    direction?: 'top-to-bottom' | 'bottom-to-top';
    initialScroll?: boolean;
}

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(defineProps<InfiniteScrollProps>(), {
    loading: false,
    hasMore: true,
    threshold: 200,
    direction: 'top-to-bottom',
    initialScroll: true,
});

const emit = defineEmits<{
    load: [];
}>();

const container = ref<HTMLElement | null>(null);
const target = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

const scrollToBottom = async () => {
    await nextTick();

    if (!container.value) return;

    container.value.scrollTo({
        top: container.value.scrollHeight,
        behavior: 'instant',
    });
};

const setupObserver = () => {
    observer?.disconnect();

    if (!target.value) return;

    observer = new IntersectionObserver(
        ([entry]) => {
            if (
                entry.isIntersecting &&
                !props.loading &&
                props.hasMore
            ) {
                emit('load');
            }
        },
        {
            root: container.value,
            rootMargin:
                props.direction === 'bottom-to-top'
                    ? `${props.threshold}px 0px 0px 0px`
                    : `0px 0px ${props.threshold}px 0px`,
        }
    );

    observer.observe(target.value);
};

onMounted(async () => {
    await nextTick();

    setupObserver();

    if (
        props.direction === 'bottom-to-top' &&
        props.initialScroll
    ) {
        await scrollToBottom();
    }
});

watch(
    () => [
        props.direction,
        props.loading,
        props.hasMore,
    ],
    async () => {
        await nextTick();
        setupObserver();
    },
    { flush: 'post' }
);

onUnmounted(() => {
    observer?.disconnect();
});
</script>

<template>
    <div ref="container" v-bind="$attrs">
        <!-- TOP LOADER -->
        <div v-if="loading && direction === 'bottom-to-top'" class="flex items-center justify-center py-4">
            <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
        </div>

        <!-- TOP TRIGGER -->
        <div v-if="direction === 'bottom-to-top'" ref="target" class="h-1 w-full" />

        <!-- CONTENT -->
        <slot />

        <!-- BOTTOM TRIGGER -->
        <div v-if="direction === 'top-to-bottom'" ref="target" class="h-1 w-full" />

        <!-- BOTTOM LOADER -->
        <div v-if="loading && direction === 'top-to-bottom'" class="flex items-center justify-center py-4">
            <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
    </div>
</template>
