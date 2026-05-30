<script setup lang="ts">
import { ref, nextTick } from "vue"
import useEmblaCarousel from "embla-carousel-vue"

const openState = ref(false)
const images = ref<any[]>([])
const startIndex = ref(0)

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

let isReady = false

function open(imgs: any[], index = 0) {
  images.value = imgs
  startIndex.value = index
  openState.value = true

  nextTick(() => {
    // wait for DOM render
    setTimeout(() => {
      if (!emblaApi.value) return

      isReady = true
      emblaApi.value.scrollTo(index, true)
    }, 50)
  })
}

function close() {
  openState.value = false
}

function next() {
  if (!emblaApi.value) return
  emblaApi.value.scrollNext()
}

function prev() {
  if (!emblaApi.value) return
  emblaApi.value.scrollPrev()
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <Dialog v-model:open="openState">
    <DialogContent class="max-w-5xl min-w-[400px] min-h-[84vh] p-0 bg-black/90 border-none">

      <div class="relative">
        <div ref="emblaRef" class="overflow-hidden">
          <div class="flex touch-pan-y">
            <div
              v-for="(img, i) in images"
              :key="i"
              class="min-w-full flex items-center justify-center"
            >
              <img
                :src="img.url"
                :alt="img.alt_text"
                class="max-h-[85vh] object-contain select-none"
              />
            </div>
          </div>
        </div>

        <Button
          class="absolute left-2 top-1/2 -translate-y-1/2"
          variant="secondary"
          @click="prev"
        >
          <Icon icon="formkit:left" class="text-lg text-white" />
        </Button>

        <Button
          class="absolute right-2 top-1/2 -translate-y-1/2"
          variant="secondary"
          @click="next"
        >
          <Icon icon="formkit:right" class="text-lg text-white" />
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>