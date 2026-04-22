<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
      <section class="w-full h-[300px] md:h-[400px] lg:h-[500px] relative">
            <div class="w-full h-full absolute top-0 left-0">
                <img class="w-full h-full" src="https://ik.imgkit.net/3vlqs5axxjf/TP/ik-seo/images/99999999-9999-9999-9999-999999999999/5121cfbf-0d8c-46bc-9ef1-53bf7a989078/source/Young-female-traveler-enjoying-a-summer-vacation-o.jpeg?tr=w-684%2Cfo-auto" alt="">
                <span class="absolute inset-0 bg-gradient-to-t bg-black/60 flex items-center justify-center">
                    <div class="max-w-3xl mx-auto flex flex-col items-center justify-between gap-6 p-4 md:p-8 text-[var(--primary-custom)]">
                        <span class="flex flex-col items-center justify-center gap-2">
                            <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold">UNFORGETTABLE JOURNEYS</h1>
                            <p class="text-sm md:text-base font-roboto text-center">From local gems to international wonders, we ensure top-tier service standards at every stop. High-quality travel is our standard, not an extra</p>
                        </span>
                        <span class="flex items-center justify-between gap-4">
                            <button class="bg-[var(--outbound-custom)] text-[var(--primary-custom)] px-4 py-2 flex items-center gap-2 font-roboto hover:bg-[var(--tertiary-custom)] border-2 border-[var(--outbound-custom)] hover:border-[var(--tertiary-custom)] duration-75 ease-in">
                                <span>Outbound Destinations</span>
                                <Icon icon="tabler:external-link" width="24" height="24" class="md:w-5 md:h-5" />
                            </button>
                            <button class="bg-[var(--inbound-opacity-custom)] border-2 border-[var(--inbound-custom)] text-[var(--inbound-custom)] px-4 py-2 flex items-center gap-2 font-roboto hover:bg-[var(--inbound-custom)] hover:text-[var(--primary-custom)] hover:border-[var(--inbound-custom)] duration-75 ease-in">
                                <span>Inbound Destinations</span>
                                <Icon icon="tabler:external-link" width="24" height="24" class="md:w-5 md:h-5" />
                            </button>
                        </span>
                    </div>
                </span>
            </div>
      </section>
</template>
