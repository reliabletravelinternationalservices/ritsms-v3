<script setup lang="ts">
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from '@/components/ui/accordion';
import { Icon } from '@iconify/vue';

</script>

<template>
    <section class="flex flex-col items-center justify-center py-12 md:py-40 w-full px-4">
        <div class="max-w-5xl w-full">
            <div class="w-full flex flex-col items-center gap-8 md:gap-12">
                
                <div class="flex flex-col items-center text-center space-y-4 max-w-3xl">
                    <h2 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase">
                        Frequently Asked <span class="text-[var(--tertiary-custom)]">Questions</span>
                    </h2>
                    <p class="text-sm md:text-base font-roboto text-[var(--muted-custom)]">
                        Everything you need to know about our travel services and booking process.
                    </p>
                </div>

                <div class="w-full">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" class="border-[var(--shadow-custom)]">
                            <AccordionTrigger class="font-bold">What's included in your packages?</AccordionTrigger>
                            <AccordionContent>
                                Our packages are hassle-free, but inclusions vary depending on destination and promo.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" class="border-[var(--shadow-custom)]">
                            <AccordionTrigger class="font-bold">Do you offer installment plans?</AccordionTrigger>
                            <AccordionContent>
                                Yes, we offer flexible installment plans. You can secure your slot with a small reservation fee, then pay the remaining balance in installments before your travel date.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" class="border-[var(--shadow-custom)]">
                            <AccordionTrigger class="font-bold">What other services do you offer?</AccordionTrigger>
                            <AccordionContent>
                                We offer complete travel services for a hassle-free experience. Domestic & International Tour Packages, Visa Processing Assistance, Passport Assistance, Hotel Reservations, Cruise Bookings and more!                            
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" class="border-[var(--shadow-custom)]">
                            <AccordionTrigger class="font-bold">How do I contact customer support?</AccordionTrigger>
                            <AccordionContent>
                                You can reach our customer support team via phone, email, or live chat on our website. We are available 24/7 to assist you with any questions or concerns.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" class="border-[var(--shadow-custom)]">
                            <AccordionTrigger class="font-bold">What payment methods do you accept?</AccordionTrigger>
                            <AccordionContent>
                                We accept all major credit cards, debit cards, and bank transfers. Please note that some payment methods may have additional processing times.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>    
                </div>
                <!-- <div class="flex justify-start md:justify-end">
                    <span class="border-b border-1 border-[var(--secondary--custom)] font-medium text-sm md:text-base font-roboto text-[var(--secondary-custom)] hover:text-[var(--tertiary-hover-custom)] duration-75">
                    <a href="#">
                        <button class="flex items-center">
                            More about FAQs 
                            <Icon icon="ic:baseline-arrow-right-alt" width="26" height="26" class="ml-2  md:w-6 md:h-6" aria-hidden="true" />
                        </button>
                    </a>
                    </span>
                </div> -->
            </div>
        </div>
    </section>
</template>