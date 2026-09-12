<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { nextTick, watch } from "vue"
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
    minHeight: 100,
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

const resizeTextarea = (element: HTMLTextAreaElement) => {
  element.style.height = "auto"

  const height = Math.min(
    Math.max(element.scrollHeight, props.minHeight),
    props.maxHeight
  )

  element.style.height = `${height}px`
  element.style.overflowY =
    element.scrollHeight > props.maxHeight ? "auto" : "hidden"
}

const handleInput = async (event: Event) => {
  const element = event.target as HTMLTextAreaElement

  resizeTextarea(element)
}

watch(
  () => modelValue.value,
  async () => {
    await nextTick()

    const textarea = document.querySelector(
      "textarea[data-auto-resize]"
    ) as HTMLTextAreaElement | null

    if (textarea) {
      resizeTextarea(textarea)
    }
  }
)
</script>

<template>
  <textarea v-model="modelValue" data-auto-resize :class="cn(
    'flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    props.class
  )
    " :style="{
      minHeight: `${minHeight}px`,
      maxHeight: `${maxHeight}px`,
      overflowY: 'hidden',
    }" @input="handleInput" />
</template>