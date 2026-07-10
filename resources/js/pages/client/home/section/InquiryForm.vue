<script setup lang="ts">
// CONSTANTS
import { AGENCY_CONTACTS } from '../constants';

// COMPONENTS
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import Label from '@/components/ui/label/Label.vue';
import Input from '@/components/ui/input/Input.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import Button from '@/components/ui/button/Button.vue';
import { LoaderCircle } from 'lucide-vue-next';
import InputError from '@/components/InputError.vue';

// FORMS
import { useForm } from '@inertiajs/vue3';

// TYPES
import type { ClassProps } from '../types';

const props = defineProps<ClassProps>();

const form = useForm({
    fullname: '',
    email: '',
    phone: '',
    message: '',
});

const submit = () => {
    form.post(route('client.inquiry.store'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
        },
    });
};
</script>

<template>
  <section
    id="inquiry"
    class="relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center py-24 px-4 md:px-6"
    :class="props.class"
  >

    <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="w-full md:w-3/4 space-y-2">
        <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
          <Icon icon="ix:inquiry-filled" width="28" height="28" class="md:w-7 md:h-7" aria-hidden="true" />
          <p class="font-bold font-roboto text-lg md:text-xl">INQUIRE NOW</p>
        </div>

        <div class="space-y-3">
          <h2 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
            Contact Reliable International Travel Services
          </h2>

          <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">
            Ready to explore the world? Contact our travel agency for bookings, inquiries, or personalized travel planning. Our dedicated support team is ready to assist with every step of your journey.
          </p>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col lg:flex-row gap-8">
      <div class="w-full flex flex-col gap-4">
        <div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2">
          <h3 class="font-bold font-roboto text-lg md:text-xl">Satellite Address</h3>
          <address class="flex flex-col gap-2 not-italic">
            <span class="flex items-center justify-start gap-2">
              <span class="bg-[var(--secondary-custom)] p-1">
                <Icon icon="mdi:location" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" aria-hidden="true" />
              </span>
              <a target="_blank" :href="AGENCY_CONTACTS.address.primary.link" :aria-label="`View ${AGENCY_CONTACTS.address.primary.label} office address on Google Maps`" class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">
                {{ AGENCY_CONTACTS.address.primary.label }}
              </a>
            </span>

            <span class="flex items-center justify-start gap-2">
              <span class="bg-[var(--secondary-custom)] p-1">
                <Icon icon="mdi:location" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" aria-hidden="true" />
              </span>
              <a target="_blank" :href="AGENCY_CONTACTS.address.secondary.link" :aria-label="`View ${AGENCY_CONTACTS.address.secondary.label} office address on Google Maps`" class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">
                {{ AGENCY_CONTACTS.address.secondary.label }}
              </a>
            </span>
          </address>
        </div>

        <div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2">
          <h3 class="font-bold font-roboto text-lg md:text-xl">Contact Information</h3>

          <span class="flex items-center justify-start gap-2">
            <span class="bg-[var(--secondary-custom)] p-1">
              <Icon icon="material-symbols:call" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" aria-hidden="true" />
            </span>
            <a :href="`tel:${AGENCY_CONTACTS.phone.primary}`" :aria-label="`Call ${AGENCY_CONTACTS.phone.primary}`" class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">
              {{ AGENCY_CONTACTS.phone.primary }}
            </a>
          </span>

          <span class="flex items-center justify-start gap-2">
            <span class="bg-[var(--secondary-custom)] p-1">
              <Icon icon="material-symbols:call" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" aria-hidden="true" />
            </span>
            <a :href="`tel:${AGENCY_CONTACTS.phone.secondary}`" :aria-label="`Call ${AGENCY_CONTACTS.phone.secondary}`" class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">
              {{ AGENCY_CONTACTS.phone.secondary }}
            </a>
          </span>
        </div>

        <div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2">
          <h3 class="font-bold font-roboto text-lg md:text-xl">Email Address</h3>
          <span class="flex items-center justify-start gap-2">
            <span class="bg-[var(--secondary-custom)] p-1">
              <Icon icon="ic:baseline-email" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" aria-hidden="true" />
            </span>
              <a :href="`mailto:${AGENCY_CONTACTS.email.primary}`" :aria-label="`Send an email to ${AGENCY_CONTACTS.email.primary}`" class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">
              {{ AGENCY_CONTACTS.email.primary }}
            </a>
          </span>
          
          <span class="flex items-center justify-start gap-2">
            <span class="bg-[var(--secondary-custom)] p-1">
              <Icon icon="ic:baseline-email" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" aria-hidden="true" />
            </span>
            <a :href="`mailto:${AGENCY_CONTACTS.email.secondary}`" :aria-label="`Send an email to ${AGENCY_CONTACTS.email.secondary}`" class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">
              {{ AGENCY_CONTACTS.email.secondary }}
            </a>
          </span>
        </div>
      </div>

      <!-- ONLY CHANGED PART (FORM BINDING) -->
      <div class="w-full lg:w-3/4 border border-[var(--shadow-custom)] p-6 flex flex-col gap-2">
        <h3 class="font-bold font-roboto text-lg md:text-xl">Ask us About your Travel?</h3>

        <form @submit.prevent="submit" class="flex flex-col gap-2">

          <div class="space-y-1">
            <Label for="name" class="font-roboto text-[var(--muted-custom)]">
              Fullname <span class="text-[var(--warning-custom)]">*</span>
            </Label>
            <Input
              v-model="form.fullname"
              type="text"
              id="name"
              placeholder="Enter your full name"
              class="bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none"
            />
            <InputError  :message="form.errors.fullname" />
          </div>

          <div class="space-y-1">
            <Label for="email" class="font-roboto text-[var(--muted-custom)]">
              Email <span class="text-[var(--warning-custom)]">*</span>
            </Label>
            <Input
              v-model="form.email"
              type="email"
              id="email"
              placeholder="Enter your email address"
              class="bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none"
            />
            <InputError  :message="form.errors.email" />
          </div>

          <div class="space-y-1">
            <Label for="phone" class="font-roboto text-[var(--muted-custom)]">
              Phone number (Optional)
            </Label>
            <Input
              v-model="form.phone"
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              class="bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none"
            />
            <InputError  :message="form.errors.phone" />
          </div>

          <div class="space-y-1">
            <Label for="message" class="font-roboto text-[var(--muted-custom)]">
              Message <span class="text-[var(--warning-custom)]">*</span>
            </Label>
            <Textarea
              v-model="form.message"
              id="message"
              rows="3"
              placeholder="Tell us about your concern..."
              class="bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none"
            />
            <InputError  :message="form.errors.message" />
          </div>

          <div>
            <a :href="route('client.inquiry.policy')" target="_blank" class="flex items-center gap-1">
              <span class="text-xs md:text-sm font-roboto text-[var(--tag-custom)] underline italic">
                Why do we need your information?
              </span>
            </a>
          </div>

          <div class="w-full flex justify-end">
            <Button
              type="submit"
              :disabled="form.processing"
              class="bg-[var(--secondary-custom)] text-[var(--primary-custom)] py-2 px-4 hover:bg-[var(--tertiary-custom)] duration-75 ease-in rounded-none"
            >
              <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
              Send Message
            </Button>
          </div>

        </form>
      </div>
    </div>

  </section>
</template>