<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import Label from '@/components/ui/label/Label.vue';
import Input from '@/components/ui/input/Input.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import Button from '@/components/ui/button/Button.vue';
import { useForm } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';
import InputError from '@/components/InputError.vue';

interface Props {
    class?: string
}

const prop = defineProps<Props>();

const form = useForm({
    fullname: '',
    email: '',
    phone: '',
    message: '',
});

const submit = () => {
    form.post(route('client.inquiry.store'), {
        onSuccess: () => {
            form.reset();
        },
    });
};
</script>

<template>
  <section
    class="relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center py-24 px-4 md:px-6"
    :class="prop.class"
  >

    <div class="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="w-full md:w-3/4 space-y-2">
        <div class="flex items-end gap-1 text-[var(--tertiary-custom)]">
          <Icon icon="ix:inquiry-filled" width="28" height="28" class="md:w-7 md:h-7" />
          <h2 class="font-bold font-roboto text-lg md:text-xl">INQUIRE NOW</h2>
        </div>

        <div class="space-y-3">
          <h1 class="text-2xl md:text-3xl lg:text-4xl text-[var(--secondary-custom)] uppercase font-montserrat font-bold">
            Get In Touch With Us
          </h1>

          <p class="font-roboto text-sm md:text-base text-[var(--muted-custom)]">
            Ready to explore the world? Reach out to us for bookings, inquiries, or personalized travel advice. Our dedicated support team is available to assist you with every step of your journey.
          </p>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-col lg:flex-row gap-8">
      <div class="w-full flex flex-col gap-4">
        <div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2">
          <h3 class="font-bold font-roboto text-lg md:text-xl">Satellite Address</h3>
          <div class="flex flex-col gap-2">
            <span class="flex items-center justify-start gap-2">
              <span class="bg-[var(--secondary-custom)] p-1">
                <Icon icon="mdi:location" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" />
              </span>
              <a target="_blank" href="#" class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">
                JJSS Commercial Building Brgy Navarro General Trias, Cavite, Philippines
              </a>
            </span>

            <span class="flex items-center justify-start gap-2">
              <span class="bg-[var(--secondary-custom)] p-1">
                <Icon icon="mdi:location" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" />
              </span>
              <a target="_blank" href="#" class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">
                Nomangonan, San Manuel, Pangasinan
              </a>
            </span>
          </div>
        </div>

        <div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2">
          <h3 class="font-bold font-roboto text-lg md:text-xl">Contact Information</h3>

          <span class="flex items-center justify-start gap-2">
            <span class="bg-[var(--secondary-custom)] p-1">
              <Icon icon="material-symbols:call" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" />
            </span>
            <a href="tel:+639085721338" class="font-roboto text-xs md:text-sm font-bold underline">
              +63 908 572 1338
            </a>
          </span>

          <span class="flex items-center justify-start gap-2">
            <span class="bg-[var(--secondary-custom)] p-1">
              <Icon icon="material-symbols:call" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" />
            </span>
            <a href="tel:+639279275207" class="font-roboto text-xs md:text-sm font-bold underline">
              +63 927 927 5207
            </a>
          </span>
        </div>

        <div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2">
          <h3 class="font-bold font-roboto text-lg md:text-xl">Email Address</h3>

          <span class="flex items-center justify-start gap-2">
            <span class="bg-[var(--secondary-custom)] p-1">
              <Icon icon="ic:baseline-email" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" />
            </span>
            <a href="mailto:reliabletravelinfo@gmail.com" class="font-roboto text-xs md:text-sm font-bold underline">
              reliabletravelinfo@gmail.com
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
              type="text"
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
              type="text"
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