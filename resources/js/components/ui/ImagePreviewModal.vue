<script setup lang="ts">
import { ref } from "vue"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const openState = ref(false)
const images = ref<{ url: string; alt_text: string }[]>([])
const startIndex = ref(0)

function open(
  imgs: { url: string; alt_text: string }[],
  index = 0
) {
  images.value = imgs
  startIndex.value = index
  openState.value = true
}

function close() {
  openState.value = false
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <Dialog v-model:open="openState">
    <DialogContent class="max-w-5xl p-0 bg-black/90 border-none">

      <Carousel
        class="w-full"
        :opts="{
          startIndex: startIndex,
          loop: true
        }"
      >
        <CarouselContent>
          <CarouselItem
            v-for="(img, i) in images"
            :key="i"
            class="flex items-center justify-center"
          >
            <img
              :src="img.url"
              :alt="img.alt_text"
              class="max-h-[85vh] object-contain select-none"
            />
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious class="left-2" />
        <CarouselNext class="right-2" />
      </Carousel>

    </DialogContent>
  </Dialog>
</template>