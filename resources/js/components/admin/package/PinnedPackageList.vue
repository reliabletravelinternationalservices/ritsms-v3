<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Compass, GripVertical, PinOff } from 'lucide-vue-next';
import { type Package } from '@/types/package';

const props = defineProps<{
  packages: Package[];
  draggedIndex: number | null;
}>();

const emit = defineEmits<{
  (event: 'drag-start', index: number): void;
  (event: 'drag-over', index: number): void;
  (event: 'drag-end'): void;
  (event: 'unpin', pkg: Package): void;
}>();
</script>

<template>
  <div class="space-y-1.5 max-h-[600px] overflow-y-auto p-2 rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/20 dark:border-zinc-800">
    <div
      v-for="(pkg, idx) in props.packages"
      :key="pkg.id"
      draggable="true"
      @dragstart="() => emit('drag-start', idx)"
      @dragover.prevent="() => emit('drag-over', idx)"
      @dragend="() => emit('drag-end')"
      class="flex items-center gap-3 p-2 rounded-lg border bg-white dark:bg-zinc-950 dark:border-zinc-800 shadow-sm transition-all cursor-grab active:cursor-grabbing hover:border-zinc-300 dark:hover:border-zinc-700"
      :class="{ 'opacity-30 border-indigo-500 bg-indigo-50/10': props.draggedIndex === idx }"
    >
      <GripVertical class="w-3.5 h-3.5 text-zinc-400 shrink-0" />
      <span class="text-xs font-bold text-zinc-400 w-4 text-center">{{ idx + 1 }}</span>

      <div class="w-8 h-8 rounded overflow-hidden bg-zinc-100 border dark:bg-zinc-800 dark:border-zinc-700 shrink-0">
        <img v-if="pkg.primary_image?.url" :src="pkg.primary_image.url" class="w-full h-full object-cover" />
        <Compass v-else class="w-4 h-4 m-2 text-zinc-400" />
      </div>

      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">{{ pkg.name }}</h4>
        <p class="text-[11px] text-zinc-400 truncate">{{ pkg.destination }} • <span class="capitalize">{{ pkg.season }}</span></p>
      </div>

      <Button @click="() => emit('unpin', pkg)" variant="ghost" size="icon" class="w-7 h-7 text-zinc-400 hover:text-red-500 shrink-0 rounded-md">
        <PinOff class="w-3.5 h-3.5" />
      </Button>
    </div>

    <div v-if="props.packages.length === 0" class="text-center py-12 text-zinc-400 text-xs">
      <PinOff class="w-6 h-6 mx-auto opacity-40 mb-1.5" />
      <p>No packages pinned to this group.</p>
    </div>
  </div>
</template>
