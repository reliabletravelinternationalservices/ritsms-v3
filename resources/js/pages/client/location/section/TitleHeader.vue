<script setup lang="ts">
import { Media } from '@/types/media';
import { Icon } from '@iconify/vue';

interface Props {
  title: string,
  description: string,
  image?: Media
}

defineProps<Props>();
</script>

<template>
  <section class="w-full h-[200px] md:h-[200px] lg:h-[300px] relative overflow-hidden">
    <div class="w-full h-full absolute top-0 left-0">
      <img v-if="image && image.url"  class="w-full h-full object-cover" :src="image.url" :alt="image.alt_text">
      <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
        <Icon icon="mdi:image-off" width="48" height="48" class="text-gray-400" />
      </div>
      <span class="absolute inset-0 bg-gradient-to-t bg-black/60 flex items-center justify-center">
        <div class="max-w-3xl mx-auto flex flex-col items-center justify-center gap-8 p-6 md:p-8 text-[var(--primary-custom)]">
          
          <span class="flex flex-col items-center justify-center gap-3 text-center">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold uppercase tracking-wide">
              {{ title }}
            </h1>
            <p v-if="description" class="text-sm md:text-base font-roboto max-w-2xl leading-relaxed">
              {{ description }}
            </p>
          </span>
        </div>
      </span>
    </div>
  </section>
</template>