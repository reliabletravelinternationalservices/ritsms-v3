<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Image } from 'lucide-vue-next';
import { useShareModal } from '@/stores/shareModal';
import { GroupDetailHeaderProps } from '../../types';

const share = useShareModal();


const props = defineProps<GroupDetailHeaderProps>();

const openMessenger = () => {
    window.open(
        'https://www.facebook.com/messages/t/reliableinternationaltravelservices',
        '_blank',
        'width=900,height=500'
    );
};
</script>

<template>
  <section class="w-full h-[400px] md:h-[200px] lg:h-[300px] relative overflow-hidden">
    <div class="w-full h-full absolute top-0 left-0">
      <img v-if="image && image.url" class="w-full h-full object-cover" :src="image.url" alt="Traveler">
      <div v-else class="w-full h-full bg-gray-300 flex items-center justify-center">
        <span class="text-gray-400">
          <Image width="60" height="60" />
        </span>
      </div>

      <span class="absolute inset-0 bg-gradient-to-t bg-black/60 flex items-center justify-center">
        <div
          class="max-w-3xl mx-auto flex flex-col items-center justify-center gap-8 p-6 md:p-8 text-[var(--primary-custom)]">

          <span class="flex flex-col items-center justify-center gap-3 text-center">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold tracking-wide">
              {{ title }}
            </h1>
            <p v-if="description" class="text-sm md:text-base font-roboto max-w-2xl leading-relaxed">
              {{ description }}
            </p>
          </span>

          <span class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button
                @click="openMessenger"
                class="w-full sm:w-auto bg-[var(--outbound-custom)] text-[var(--primary-custom)] px-6 py-2 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--tertiary-hover-custom)] transition-all duration-200"
                :class="{ 'bg-[var(--inbound-custom)]': isInbound }">
                <Icon icon="tabler:message" class="text-xl" />
                <span class="whitespace-nowrap">Message us</span>
              </button>
              <a href="tel:9085721338" target="_blank" class="w-full">
                <button
                  class="w-full sm:w-auto bg-[var(--tag-custom)] text-[var(--primary-custom)] px-6 py-2 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--tertiary-hover-custom)] transition-all duration-200">
                  <Icon icon="material-symbols:call-outline" class="text-xl" />
                  <span class="whitespace-nowrap">Call us</span>
                </button>
              </a>
              <button
                @click="share.open(
                            route(
                                `client.${props.isInbound ? 'inbound' : 'outbound'}.group`,
                                { id: props.id }
                            )
                        )"
                type="button"
                class="w-full sm:w-auto bg-[var(--tertiary-custom)] text-[var(--primary-custom)] px-6 py-2 flex items-center justify-center gap-2 font-roboto hover:bg-[var(--tertiary-hover-custom)] transition-all duration-200">
                <Icon icon="material-symbols:share-outline" class="text-xl" />
                <span class="whitespace-nowrap">Share now</span>
              </button>
          </span>

        </div>
      </span>
    </div>
  </section>
</template>