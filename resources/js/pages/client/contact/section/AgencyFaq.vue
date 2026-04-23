<script setup lang="ts">
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from '@/components/ui/accordion';
import { Icon } from '@iconify/vue';

</script>

<template>
    <section class="flex flex-col items-center justify-center py-12 md:py-40 w-full px-4">
        <div class="max-w-5xl w-full">
            <div class="w-full flex flex-col items-center gap-8 md:gap-12">
                
                <div class="flex flex-col items-center text-center space-y-4 max-w-3xl">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[var(--secondary-custom)] uppercase">
                        Frequently Asked <span class="text-[var(--tertiary-custom)]">Questions</span>
                    </h1>
                    <p class="text-sm md:text-base font-roboto text-[var(--muted-custom)]">
                        Everything you need to know about our travel services and booking process.
                    </p>
                </div>

                <div class="w-full">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" class="border-[var(--shadow-custom)]">
                            <AccordionTrigger class="font-bold">How do I book a trip with your agency?</AccordionTrigger>
                            <AccordionContent>
                                You can book online through our website, call our hotline, or visit our office. Our travel consultants will guide you through the process step-by-step.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" class="border-[var(--shadow-custom)]">
                            <AccordionTrigger class="font-bold">What is your cancellation policy?</AccordionTrigger>
                            <AccordionContent>
                                Our cancellation policy varies depending on the type of booking and the time of cancellation. Please refer to our terms and conditions for more details.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" class="border-[var(--shadow-custom)]">
                            <AccordionTrigger class="font-bold">Is your website accessible to users with disabilities?</AccordionTrigger>
                            <AccordionContent>
                                Yes, we are committed to making our website accessible to all users. We follow web accessibility guidelines and continuously work to improve the user experience for everyone.
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
                <div class="flex justify-start md:justify-end">
                    <span class="border-b border-1 border-[var(--secondary--custom)] font-medium text-sm md:text-base font-roboto text-[var(--secondary-custom)] hover:text-[var(--tertiary-hover-custom)] duration-75">
                    <a href="#">
                        <button class="flex items-center">
                            More about FAQs 
                            <Icon icon="ic:baseline-arrow-right-alt" width="26" height="26" class="ml-2  md:w-6 md:h-6" />
                        </button>
                    </a>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>