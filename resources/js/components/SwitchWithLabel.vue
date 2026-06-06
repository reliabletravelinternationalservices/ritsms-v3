<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface Props {
  label?: string
  isChecked: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:isChecked', value: boolean): void
  (e: 'change', value: boolean): void
}>()

function handleChange(value: boolean) {
  emit('update:isChecked', value)
  emit('change', value)
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <Switch
      id="airplane-mode"
      :modelValue="props.isChecked"
      @update:modelValue="handleChange"
    />
    <Label for="airplane-mode">
      {{ label }}
    </Label>
  </div>
</template>