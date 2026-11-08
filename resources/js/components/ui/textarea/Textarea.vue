<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { nextTick, watch, onMounted, ref } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    defaultValue?: string | number
    modelValue?: string | number
    minHeight?: number
    maxHeight?: number
  }>(),
  {
    minHeight: 40,
    maxHeight: 250,
  }
)

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const resizeTextarea = () => {
  const element = textareaRef.value
  if (!element) return

  // Reset height to calculate actual content height
  element.style.height = "auto"

  const height = Math.max(
    props.minHeight,
    Math.min(element.scrollHeight, props.maxHeight)
  )

  element.style.height = `${height}px`

  // Show scrollbar only when content exceeds max height
  element.style.overflowY =
    element.scrollHeight > props.maxHeight ? "auto" : "hidden"
}

const handleInput = () => {
  resizeTextarea()
}

watch(
  modelValue,
  async () => {
    await nextTick()
    resizeTextarea()
  }
)

onMounted(() => {
  resizeTextarea()
})
</script>

<template>
  <textarea ref="textareaRef" v-model="modelValue" data-auto-resize :class="cn(
    'flex w-full box-border resize-none rounded-md border border-input bg-background px-3 py-2 text-sm leading-5 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.class
  )" :style="{
    minHeight: `${minHeight}px`,
    maxHeight: `${maxHeight}px`,
  }" rows="1" @input="handleInput" />
</template>
