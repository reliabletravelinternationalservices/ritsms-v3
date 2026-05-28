<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/vue3';
import { Inquiry } from '@/types/inquiry';
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ref } from 'vue';

interface Props {
    inquiry: Inquiry;
}

const props = defineProps<Props>();

const copiedEmail = ref(false);
const copiedPhone = ref(false);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Inquiries',
        href: route('admin.inquiries'),
    },
    {
        title: 'Details',
        href: route('admin.inquiries.details', { id: props.inquiry.id }),
    }
];

const handleStatusChange = (status: Inquiry['status']) => {
    router.patch(route('admin.inquiries.update', { id: props.inquiry.id }), { status }, {
        preserveScroll: true,
    });
};

const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
        await navigator.clipboard.writeText(text);
        if (type === 'email') {
            copiedEmail.value = true;
            setTimeout(() => copiedEmail.value = false, 2000);
        } else {
            copiedPhone.value = true;
            setTimeout(() => copiedPhone.value = false, 2000);
        }
    } catch (err) {
        console.error('Fallback utility failed to execute programmatic copy context', err);
    }
};

// Directly opens Gmail web app handler bypassing mailto settings entirely
const triggerEmailClient = () => {
    const baseUrl = 'https://mail.google.com/mail/?view=cm&fs=1';

    const targetEmail = encodeURIComponent(props.inquiry.email);

    const subject = encodeURIComponent(
        `Regarding your Travel Inquiry`
    );

    const body = encodeURIComponent(
`Hello ${props.inquiry.fullname},

Greetings from Reliable International Travel Services!

Thank you for reaching out to us regarding your inquiry.

────────────────────

YOUR MESSAGE:
"${props.inquiry.message}"

────────────────────

Our travel team will review your concern and respond as soon as possible.

If you have additional questions, feel free to reply to this email.

Best regards,
Reliable International Travel Services
Official Travel Support Team
`
    );

    window.open(
        `${baseUrl}&to=${targetEmail}&su=${subject}&body=${body}`,
        '_blank'
    );
};

const triggerPhoneDialer = () => {
    if (props.inquiry.phone) {
        window.location.href = `tel:${props.inquiry.phone}`;
    }
};

const getStatusStyles = (status: Inquiry['status']) => {
    switch (status) {
        case 'pending': 
            return 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50';
        case 'resolved': 
            return 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50';
        case 'dismissed': 
            return 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800';
        default: 
            return 'bg-zinc-50 text-zinc-600 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800';
    }
};

const formatLongDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
</script>

<template>
    <Head :title="`Inquiry #${inquiry.id} - ${inquiry.fullname}`" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="max-w-6xl mx-auto w-full p-4 md:p-6 lg:p-8 space-y-6">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-100 dark:border-zinc-900">
                <div class="flex items-center gap-3">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        class="h-9 w-9 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                        @click="router.visit(route('admin.inquiries'))"
                    >
                        <Icon icon="iconoir:arrow-left" class="text-lg" />
                    </Button>
                    <div>
                        <div class="flex items-center gap-2.5">
                            <h1 class="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                                Inquiry #{{ inquiry.id }}
                            </h1>
                            <Badge 
                                variant="outline" 
                                class="capitalize font-medium tracking-wide text-[11px] px-2.5 py-0.5 rounded-full shadow-none"
                                :class="getStatusStyles(inquiry.status)"
                            >
                                {{ inquiry.status }}
                            </Badge>
                        </div>
                        <p class="text-xs text-muted-foreground mt-0.5">
                            Received on {{ formatLongDate(inquiry.created_at) }}
                        </p>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <template v-if="inquiry.status === 'pending'">
                        <Button 
                            size="sm" 
                            variant="outline"
                            class="h-9 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            @click="handleStatusChange('dismissed')"
                        >
                            <Icon icon="iconoir:cancel" class="mr-1.5 text-zinc-400" />
                            Dismiss
                        </Button>
                        <Button 
                            size="sm" 
                            class="h-9 text-xs font-medium bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-sm" 
                            @click="handleStatusChange('resolved')"
                        >
                            <Icon icon="iconoir:check-circle-solid" class="mr-1.5 text-emerald-500 dark:text-emerald-600" />
                            Mark as Resolved
                        </Button>
                    </template>

                    <template v-else>
                        <Button 
                            size="sm" 
                            variant="outline"
                            class="h-9 text-xs font-medium border-zinc-200 dark:border-zinc-800"
                            @click="handleStatusChange('pending')"
                        >
                            <Icon icon="iconoir:undo" class="mr-1.5 text-zinc-400" />
                            Reopen Inquiry
                        </Button>
                    </template>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                <div class="lg:col-span-2">
                    <Card class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
                        <div class="px-5 py-4 bg-zinc-50/50 dark:bg-zinc-900/20 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                            <span class="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                Client Message Plaintext
                            </span>
                            <Icon icon="iconoir:chat-lines" class="text-zinc-400 text-base" />
                        </div>
                        <CardContent class="p-6 md:p-8">
                            <div class="text-sm md:text-base leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
                                {{ inquiry.message }}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div class="space-y-4">
                    <Card class="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
                        <div class="p-5">
                            <h2 class="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4">
                                Sender Meta Data
                            </h2>
                            
                            <div class="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-900/60 mb-5">
                                <div class="h-10 w-10 shrink-0 rounded-full bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 flex items-center justify-center font-bold text-sm">
                                    {{ inquiry.fullname.charAt(0).toUpperCase() }}
                                </div>
                                <div class="min-w-0">
                                    <div class="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                                        {{ inquiry.fullname }}
                                    </div>
                                    <div class="text-[11px] text-muted-foreground">Inbound Contact Profile</div>
                                </div>
                            </div>

                            <div class="space-y-5">
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <label class="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                                            Email Address
                                        </label>
                                        <button 
                                            @click="copyToClipboard(inquiry.email, 'email')"
                                            class="text-[11px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition"
                                            title="Copy clean email string to paste manually"
                                        >
                                            <Icon :icon="copiedEmail ? 'iconoir:check' : 'iconoir:copy'" class="text-xs" :class="{'text-emerald-500': copiedEmail}" />
                                            {{ copiedEmail ? 'Copied' : 'Copy Email' }}
                                        </button>
                                    </div>
                                    
                                    <div class="font-mono text-xs text-zinc-800 dark:text-zinc-300 break-all bg-zinc-50 dark:bg-zinc-900/40 px-3 py-2 rounded border border-zinc-100 dark:border-zinc-900/40">
                                        {{ inquiry.email }}
                                    </div>

                                    <Button 
                                        @click="triggerEmailClient"
                                        size="sm" 
                                        variant="outline" 
                                        class="w-full justify-center h-8 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-none"
                                    >
                                        <Icon icon="iconoir:google" class="mr-2 text-zinc-400" />
                                        Reply via Gmail Web
                                    </Button>
                                </div>

                                <Separator class="bg-zinc-100 dark:bg-zinc-900" />

                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <label class="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                                            Phone Number
                                        </label>
                                        <button 
                                            v-if="inquiry.phone"
                                            @click="copyToClipboard(inquiry.phone, 'phone')"
                                            class="text-[11px] font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 transition"
                                            title="Copy phone sequence"
                                        >
                                            <Icon :icon="copiedPhone ? 'iconoir:check' : 'iconoir:copy'" class="text-xs" :class="{'text-emerald-500': copiedPhone}" />
                                            {{ copiedPhone ? 'Copied' : 'Copy Number' }}
                                        </button>
                                    </div>

                                    <template v-if="inquiry.phone">
                                        <div class="font-mono text-xs text-zinc-800 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900/40 px-3 py-2 rounded border border-zinc-100 dark:border-zinc-900/40">
                                            {{ inquiry.phone }}
                                        </div>
                                        <Button 
                                            @click="triggerPhoneDialer"
                                            size="sm" 
                                            variant="outline" 
                                            class="w-full justify-center h-8 text-xs font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-none"
                                        >
                                            <Icon icon="iconoir:phone" class="mr-2 text-zinc-400" />
                                            Call Customer Now
                                        </Button>
                                    </template>

                                    <div v-else class="text-xs text-zinc-400/60 italic p-3 bg-zinc-50/50 dark:bg-zinc-900/20 border border-dashed border-zinc-100 dark:border-zinc-900/60 rounded flex items-center gap-1.5">
                                        <Icon icon="iconoir:phone-disabled" class="text-zinc-400/40 text-sm shrink-0" />
                                        No phone metadata left
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    
                    <div class="rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/20 p-4 text-xs text-muted-foreground flex items-start gap-2">
                        <Icon icon="iconoir:info-empty" class="text-sm mt-0.5 text-zinc-400 shrink-0" />
                        <div>
                            Clicking <span class="font-medium text-zinc-800 dark:text-zinc-200">Reply via Gmail Web</span> safely opens an external browser tab containing pre-filled message data.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </AppLayout>
</template>