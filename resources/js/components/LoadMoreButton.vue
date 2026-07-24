<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  loading?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div class="mt-8 flex justify-center">
    <button
      :disabled="disabled || loading"
      @click="emit('click')"
      class="group inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Icon
        v-if="loading"
        icon="svg-spinners:180-ring"
        class="h-5 w-5"
      />

      <template v-else>
        <slot>
          <span class="text-sm font-semibold">Show More</span>

          <Icon
            icon="codicon:fold-down"
            class="h-4 w-4 transition-transform group-hover:animate-pulse"
          />
        </slot>
      </template>
    </button>
  </div>
</template>