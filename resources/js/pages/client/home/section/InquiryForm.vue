<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Icon } from '@iconify/vue'
import Label from '@/components/ui/label/Label.vue';
import Input from '@/components/ui/input/Input.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import Button from '@/components/ui/button/Button.vue';


</script>

<template>
  <section class="relative max-w-5xl mx-auto flex flex-col gap-4 items-center justify-center min-h-screen md:min-h-[800px] lg:min-h-[1100px] py-12 px-4 md:px-6">
    
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
              <a target="_blank" href="https://www.google.com/maps/place/JJSS+Commercial+Building+Rental/@14.3867898,120.9009201,19z/data=!4m6!3m5!1s0x3397d3c4d3a39989:0x595b7ddf600718ae!8m2!3d14.3866729!4d120.9011789!16s%2Fg%2F11j9cmvtn_?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D" class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">JJSS Commercial Building Brgy Navarro General Trias, Cavite, Philippines</a>
            </span>

            <span class="flex items-center justify-start gap-2">
              <span class="bg-[var(--secondary-custom)] p-1">
                <Icon icon="mdi:location" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" />
              </span>
              <a target="_blank" href="https://www.google.com/maps/place/Nomangonan/@16.0772201,120.6784388,21z/data=!4m6!3m5!1s0x3391114a0e66ebf5:0x66e1c0fa58b50fa5!8m2!3d16.0771441!4d120.6786534!16s%2Fg%2F11q4hfyy2c?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D" class="font-roboto text-xs md:text-sm font-bold underline hover:text-[var(--tertiary-custom)] duration-75">Nomangonan, San Manuel, Pangasinan</a>
            </span>
          </div>
        </div>  

        <div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2">
          <h3 class="font-bold font-roboto text-lg md:text-xl">Contact Information</h3>
          <div class="flex flex-col gap-2">
            <span class="flex items-center justify-start gap-2">
              <span class="bg-[var(--secondary-custom)] p-1">
                <Icon icon="material-symbols:call" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" />
              </span>
              <a href="tel:+639085721338" class="font-roboto text-xs md:text-sm font-bold underline">+63 908 572 1338</a>
            </span>

            <span class="flex items-center justify-start gap-2">
              <span class="bg-[var(--secondary-custom)] p-1">
                <Icon icon="material-symbols:call" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" />
              </span>
              <a href="tel:+639279275207" class="font-roboto text-xs md:text-sm font-bold underline">+63 927 927 5207</a>
            </span>
          </div>
        </div>  

        <div class="w-full border border-[var(--shadow-custom)] p-6 flex flex-col gap-2">
          <h3 class="font-bold font-roboto text-lg md:text-xl">Email Address</h3>
          <div class="flex flex-col gap-2">
            <span class="flex items-center justify-start gap-2">
              <span class="bg-[var(--secondary-custom)] p-1">
                <Icon icon="ic:baseline-email" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tertiary-custom)]" />
              </span>
              <a href="mailto:reliabletravelinfo@gmail.com" class="font-roboto text-xs md:text-sm font-bold underline">reliabletravelinfo@gmail.com</a>
            </span>
          </div>
        </div>  
      </div>

      <div class="w-full lg:w-3/4 border border-[var(--shadow-custom)] p-6 flex flex-col gap-2">
        <h3 class="font-bold font-roboto text-lg md:text-xl">Ask us About your Travel?</h3>
        <div class="space-y-1">
          <Label for="name" class="font-roboto text-[var(--muted-custom)]">Fullname</Label>
          <Input type="text" id="name" placeholder="Enter your full name" class="bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none" />
        </div>
        <div class="space-y-1">
          <Label for="email" class="font-roboto text-[var(--muted-custom)]">Email</Label>
          <Input type="text" id="email" placeholder="Enter your email address" class="bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none" />
        </div>
        <div class="space-y-1">
          <Label for="phone" class="font-roboto text-[var(--muted-custom)]">Phone number (Optional)</Label>
          <Input type="text" id="phone" placeholder="Enter your email address" class="bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none" />
        </div>
        <div class="space-y-1">
          <Label for="message" class="font-roboto text-[var(--muted-custom)]">Message</Label>
          <Textarea id="message" rows="3" placeholder="Tell us about your concern..." class="bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none" />
        </div>
        <div class="w-full flex justify-end">
          <Button type="submit" class="bg-[var(--secondary-custom)] text-[var(--primary-custom)] py-2 px-4 hover:bg-[var(--tertiary-custom)] duration-75 ease-in rounded-none">Send Message</Button>
        </div>
      </div>
    </div>
  </section>
</template>