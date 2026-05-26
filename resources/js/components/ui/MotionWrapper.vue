<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

const props = defineProps({
  threshold: { type: Number, default: 0.15 },
  delay: { type: Number, default: 0 },
});

const el = ref<HTMLElement | null>(null);
const visible = ref(false);

useIntersectionObserver(
  el,
  ([{ isIntersecting }]) => {
    if (isIntersecting) visible.value = true;
  },
  { threshold: props.threshold },
);

watchEffect(() => {
  if (el.value) {
    const node = el.value as HTMLElement;
    node.style.transition = `opacity 0.65s ${props.delay}s cubic-bezier(0.22,1,0.36,1), transform 0.65s ${props.delay}s cubic-bezier(0.22,1,0.36,1)`;
    node.style.opacity = visible.value ? '1' : '0';
    node.style.transform = visible.value ? 'translateY(0px)' : 'translateY(20px)';
  }
});
</script>

<template>
  <div ref="el" style="opacity:0; transform:translateY(20px); will-change: transform, opacity;">
    <slot />
  </div>
</template>
