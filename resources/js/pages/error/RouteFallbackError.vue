<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ComponentProps {
    code?: string | number;
    message?: string; // Optional override prop from backend
}

const props = withDefaults(defineProps<ComponentProps>(), {
    code: '404'
});

const isHovered = ref<boolean>(false);
const page = usePage();

// 1. Dynamic Status Code Message Dictionary Matrix
const errorMessage = computed<string>(() => {
    // If a custom override message was passed from the backend route, prioritize it
    if (props.message) return props.message;

    const status = props.code.toString();
    
    const messages: Record<string, string> = {
        '401': 'Authentication failed. Please verify your system credentials.',
        '403': 'Access denied. You do not have clearance for this coordinates.',
        '404': 'The coordinates you are looking for flew off the radar screen.',
        '419': 'Your security session expired. Please refresh and try again.',
        '500': 'Internal systems malfunction. Our ground team is investigating.',
        '503': 'Service temporarily offline. Systems undergoing maintenance.',
    };

    return messages[status] || 'An unexpected navigation error occurred.';
});

// 2. Dynamic route detection logic determining admin context states
const isAdminRoute = computed<boolean>(() => {
    return page.url.startsWith('/admin');
});

// 3. Computed navigation settings variables based on context evaluation
const navigationTarget = computed<string>(() => {
    return isAdminRoute.value ? route('admin.dashboard') : route('client.landing');
});

const navigationLabel = computed<string>(() => {
    return isAdminRoute.value ? 'Return to Admin Dashboard' : 'Navigate Home';
});
</script>

<template>
    <Head :title="`${props.code} - Error Threshold`" />
    
    <div class="relative flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-50 p-4 sm:p-6 overflow-hidden select-none">
        
        <div class="absolute inset-0 bg-[radial-gradient(#1c1c1f_1px,transparent_1px)] [background-size:32px_32px] opacity-80 pointer-events-none"></div>
        
        <div class="absolute inset-x-0 top-1/3 h-40 pointer-events-none overflow-hidden z-0">
            <div class="absolute animate-airplane-loop left-0 flex items-center gap-2 opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" class="text-sky-500 transform rotate-[25deg]">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l8 2.5z"/>
                </svg>
                <div class="h-[1.5px] w-64 bg-gradient-to-l from-sky-500 via-sky-500/40 to-transparent"></div>
            </div>
        </div>

        <div 
            class="relative z-10 flex flex-col items-center w-full max-w-lg text-center px-4 transition-all duration-500 ease-out"
            :class="{ 'scale-[1.015]': isHovered }"
        >
            <h1 class="text-[8rem] sm:text-[12rem] md:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-950 drop-shadow-[0_25px_25px_rgba(0,0,0,0.8)]">
                {{ code }}
            </h1>

            <Badge 
                variant="outline" 
                class="inline-flex items-center gap-2 bg-zinc-900/90 border-zinc-800 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium tracking-wide text-zinc-300 shadow-xl -mt-4 sm:-mt-8 mb-10 transition-colors hover:border-zinc-700 max-w-full"
            >
                <span class="flex h-2 w-2 relative shrink-0">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span class="truncate">{{ errorMessage }}</span>
            </Badge>

            <Button 
                as-child
                variant="default"
                size="lg"
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false"
                class="group w-full sm:w-auto h-11 px-8 bg-zinc-100 text-zinc-950 font-bold hover:bg-white transition-all duration-300 active:scale-[0.98] rounded-xl shadow-lg shadow-zinc-950/50"
            >
                <Link :href="navigationTarget" class="flex items-center justify-center gap-2">
                    <span>{{ navigationLabel }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transform group-hover:translate-x-1 transition-transform duration-300 shrink-0">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </Link>
            </Button>
        </div>

        <div class="absolute bottom-6 left-4 right-4 text-center text-[10px] font-mono tracking-widest text-zinc-600 uppercase pointer-events-none">
            {{ isAdminRoute ? 'SECURE_ZONE // CORRUPT_PATH_HANDSHAKE' : 'SIGNAL_LOST // RADAR_CONTACT_TERMINATED' }}
        </div>
    </div>
</template>

<style>
@keyframes airplane-loop {
    0% { transform: translateX(-120vw) translateY(10px); }
    50% { transform: translateX(50vw) translateY(-25px); }
    100% { transform: translateX(120vw) translateY(15px); }
}
.animate-airplane-loop {
    animation: airplane-loop 16s linear infinite;
}
</style>