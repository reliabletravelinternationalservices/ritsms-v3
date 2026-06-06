<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface Props {
    label?: string
    isChecked: boolean
    onChange?: (value: boolean) => void
}

const props = defineProps<Props>()

</script>

<template>
  <div class="flex items-center space-x-2">
    <Switch id="airplane-mode"  v-model:modelValue="isChecked" @change="props.onChange" />
    <Label for="airplane-mode">{{ label }}</Label>
  </div>
</template>
