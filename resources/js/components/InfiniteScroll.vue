<script setup lang="ts">
import { Loader2 } from '@lucide/vue';
import { ref, onMounted, onUnmounted } from 'vue';

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(defineProps<{
    loading?: boolean;
    hasMore?: boolean;
    threshold?: number;
}>(), {
    loading: false,
    hasMore: true,
    threshold: 200,
});

const emit = defineEmits<{
    load: [];
}>();

const target = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

onMounted(() => {
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
            rootMargin: `${props.threshold}px`,
        }
    );

    if (target.value) observer.observe(target.value);
});

onUnmounted(() => {
    observer?.disconnect();
});
</script>

<template>
    <div v-bind="$attrs">
        <slot />

        <div ref="target" class="h-1 w-full" />

        <div v-if="loading" class="py-4 flex items-center justify-center text-sm">
            <loader2 class="text-foreground-muted animate-spin" />
        </div>
    </div>
</template>
