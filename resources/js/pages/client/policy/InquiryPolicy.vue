<script setup lang="ts">
import ClientAppLayout from '@/layouts/ClientAppLayout.vue';
import { Icon } from '@iconify/vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Why Do We Need Your Information?" />
    <ClientAppLayout>
        <div class="max-w-3xl mx-auto px-4 py-12 text-zinc-800 dark:text-zinc-200">
            
            <div class="text-center mb-10">
                <div class="inline-block p-3 rounded-full bg-indigo-50 text-[var(--tag-custom)]  mb-3">
                    <Icon icon="streamline-plump:user-protection-check" width="24" height="24" class="md:w-10 md:h-10" />
                </div>
                <h1 class="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                    Why We Ask for Your Information?
                </h1>
                <p class="text-sm text-zinc-800 dark:text-zinc-400 mt-2 max-w-xl mx-auto">
                    We keep our process transparent. Here is exactly why your details are necessary when you send us a message.
                </p>
            </div>

            <div class="space-y-6">
                
                <div class="bg-white  p-6 rounded-xl border border-zinc-200 shadow-sm">
                    <h2 class="text-base font-semibold text-zinc-900 mb-2 flex items-center gap-2">
                        <span><Icon icon="ic:baseline-message" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tag-custom)]" /></span> To Respond to Your Inquiries
                    </h2>
                    <p class="text-sm text-zinc-800 leading-relaxed">
                        We collect your contact information solely to respond to your inquiries and provide the travel assistance you requested. Your email address and phone number allow our travel consultants to send quotations, customized itineraries, booking details, and important travel updates related to your request.
                    </p>
                </div>

                <div class="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                    <h3 class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-800 mb-4">
                        <Icon icon="mdi:message-check" width="24" height="24" class="md:w-5 md:h-5 text-[var(--tag-custom)]" /> What we collect & how we use it:
                    </h3>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div class="p-3 rounded-lg bg-zinc-100">
                            <span class="font-semibold text-zinc-900">Full Name</span>
                            <p class="text-xs text-zinc-800 mt-0.5">So we know who we are addressing in our replies.</p>
                        </div>
                        
                        <div class="p-3 rounded-lg bg-zinc-100">
                            <span class="font-semibold text-zinc-900">Email Address</span>
                            <p class="text-xs text-zinc-800 mt-0.5">The primary inbox where we will send your travel options and quotes.</p>
                        </div>
                        
                        <div class="p-3 rounded-lg bg-zinc-100">
                            <div class="flex items-center gap-1.5">
                                <span class="font-semibold text-zinc-900">Phone Number</span>
                                <span class="text-[10px] px-1 bg-zinc-300 rounded text-zinc-600">Optional</span>
                            </div>
                            <p class="text-xs text-zinc-800 mt-0.5">Used only if you want an instant callback or text update.</p>
                        </div>
                        
                        <div class="p-3 rounded-lg bg-zinc-100">
                            <span class="font-semibold text-zinc-900">Your Message</span>
                            <p class="text-xs text-zinc-800 mt-0.5">Your specific questions, destinations, or travel budgets.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-indigo-50/40 border border-indigo-100 rounded-xl p-5 flex items-start gap-3">
                    <span class="text-lg mt-0.5">⚖️</span>
                    <div>
                        <h4 class="text-xs font-bold text-zinc-900 uppercase tracking-wide">Data Privacy Act of 2012 (R.A. 10173)</h4>
                        <p class="text-xs text-zinc-600 leading-relaxed mt-1">
                            We are committed to operating transparently and keeping your trust. In absolute compliance with the <span class="font-semibold">Philippine Republic Act No. 10173</span>, your secure personal data metrics are never sold, shared, or distributed to third-party ad networks. It remains entirely confidential.
                        </p>
                    </div>
                </div>

                <div class="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h4 class="text-sm font-semibold text-zinc-900">Still have doubts about our credentials?</h4>
                        <p class="text-xs text-zinc-500 dark:text-zinc-600">Verify our business details or read community reviews.</p>
                    </div>
                    <div class="flex items-center gap-2 w-full sm:w-auto">
                        <a 
                            :href="route('client.about')"
                            target="_blank"
                            class="text-center w-1/2 sm:w-auto text-xs font-medium px-3 py-2 border border-zinc-300 hover:bg-zinc-200 rounded-md transition text-[var(--secondary-custom)]"
                        >
                            About Us
                        </a>
                        <a 
                            href="https://www.facebook.com/reliableinternationaltravelservices" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            class="text-center w-1/2 sm:w-auto text-xs font-medium px-3 py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-md shadow-sm transition"
                        >
                            Our Facebook Page
                        </a>
                    </div>
                </div>

            </div>

        </div>
    </ClientAppLayout>
</template>