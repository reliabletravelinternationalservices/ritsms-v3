<script setup lang="ts">

// COMPONENTS
import { Icon } from '@iconify/vue';

// TYPES
import { TitleHeaderProps } from '../types';
defineProps<TitleHeaderProps>();
</script>

<template>
  <section class="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[360px] relative overflow-hidden select-none">
    
    <div class="absolute inset-0 w-full h-full z-0">
      <img 
        v-if="image?.url" 
        :src="image.url" 
        :alt="image.alt_text || title" 
        class="w-full h-full object-cover object-center"
        loading="eager"
      />
      <div v-else class="w-full h-full bg-slate-200 flex items-center justify-center">
        <Icon icon="lucide:image-off" class="w-12 h-12 text-slate-400" />
      </div>
    </div>

    <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-black/30 flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div class="max-w-3xl w-full mx-auto flex flex-col items-center justify-center gap-3 text-center text-[var(--primary-custom,white)]">
        
        <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold uppercase tracking-wider leading-tight drop-shadow-md">
          {{ title }}
        </h1>
        
        <p 
          v-if="description" 
          class="text-xs sm:text-sm md:text-base font-roboto max-w-2xl leading-relaxed opacity-90 drop-shadow-sm line-clamp-3 sm:line-clamp-none"
        >
          {{ description }}
        </p>

      </div>
    </div>

  </section>
</template>