<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-vue-next';

const props = defineProps<{
  isDirty: boolean;
  processing: boolean;
}>();

const emit = defineEmits<{
  (event: 'save'): void;
}>();
</script>

<template>
  <div class="flex flex-col items-center gap-3">
    <Button @click="emit('save')" :disabled="!props.isDirty || props.processing" size="sm" class="flex items-center gap-2 shadow-sm">
      <Loader2 v-if="props.processing" class="w-4 h-4 animate-spin" />
      <Save v-else class="w-4 h-4" /> Save Sequence
    </Button>

    <span v-if="props.isDirty" class="text-xs text-amber-600">
      <span class="font-medium">●</span>
      You have unsaved changes
    </span>
  </div>
</template>
