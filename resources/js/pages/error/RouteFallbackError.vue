<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ComponentProps {
    code?: string | number;
    message?: string;
}

interface Plane {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    angle: number;
    duration: number;
    color: string;
}

const props = withDefaults(defineProps<ComponentProps>(), {
    code: '404'
});

const isHovered = ref(false);
const page = usePage();

// Dynamic Airspace System
const activePlanes = ref<Plane[]>([]);
let planeIdCounter = 0;

const planeColors = [
    'var(--tertiary-custom)',
    'var(--inbound-custom)',
    'var(--outbound-custom)'
];

function spawnPlane() {
    if (typeof window === 'undefined') return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const buffer = 200; // Guarantees planes start and end completely off-screen

    // Select a random boundary edge for entry (0: Left, 1: Right, 2: Top, 3: Bottom)
    const startEdge = Math.floor(Math.random() * 4);
    
    // Ensure destination is always on a completely different edge to guarantee screen crossing
    const edgeOffsets = [1, 2, 3];
    const endEdge = (startEdge + edgeOffsets[Math.floor(Math.random() * edgeOffsets.length)]) % 4;

    let startX = 0, startY = 0;
    let endX = 0, endY = 0;

    // Define entry coordinates
    if (startEdge === 0) { startX = -buffer; startY = Math.random() * H; }
    else if (startEdge === 1) { startX = W + buffer; startY = Math.random() * H; }
    else if (startEdge === 2) { startX = Math.random() * W; startY = -buffer; }
    else { startX = Math.random() * W; startY = H + buffer; }

    // Define destination exit coordinates
    if (endEdge === 0) { endX = -buffer; endY = Math.random() * H; }
    else if (endEdge === 1) { endX = W + buffer; endY = Math.random() * H; }
    else if (endEdge === 2) { endX = Math.random() * W; endY = -buffer; }
    else { endX = Math.random() * W; endY = H + buffer; }

    // Calculate precision heading vector angle
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
    
    // Smooth flight time (16s to 26s for elegant majestic motion)
    const duration = 16 + Math.random() * 10; 
    const color = planeColors[Math.floor(Math.random() * planeColors.length)];

    activePlanes.value.push({
        id: planeIdCounter++,
        startX,
        startY,
        endX,
        endY,
        angle,
        duration,
        color
    });
}

function handleFlightTermination(id: number) {
    // Filter out the landed plane and immediately spawn a fresh one with a new trajectory
    activePlanes.value = activePlanes.value.filter(plane => plane.id !== id);
    spawnPlane();
}

onMounted(() => {
    // Initialize 3 concurrent planes with staggered departures
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            spawnPlane();
        }, i * 4500); 
    }
});

const errorMessage = computed<string>(() => {
    if (props.message) return props.message;

    const status = props.code.toString();

    const messages: Record<string, string> = {
        '401': 'Authentication failed. Please verify your system credentials.',
        '403': 'Access denied. You do not have clearance for this route.',
        '404': 'Oops, Your flight path seems to have been lost in the clouds.',
        '419': 'Session expired. Please refresh and try again.',
        '500': 'Internal system error detected.',
        '503': 'Service temporarily unavailable.',
    };

    return messages[status] || 'Unexpected navigation error occurred.';
});

const isAdminRoute = computed(() => page.url.startsWith('/admin'));

const navigationTarget = computed(() =>
    isAdminRoute.value ? route('admin.dashboard') : route('client.landing')
);

const navigationLabel = computed(() =>
    isAdminRoute.value ? 'Return to Admin Dashboard' : 'Go Home'
);
</script>

<template>
    <Head :title="`${props.code} - Flight Status`" />

    <div class="relative min-h-screen flex items-center justify-center overflow-hidden">

        <div class="absolute inset-0 bg-[var(--secondary-custom)]"></div>

        <div class="absolute inset-0 opacity-20"
             style="background: radial-gradient(circle at top, var(--tertiary-custom), transparent 60%);">
        </div>

        <div class="absolute inset-0 bg-[radial-gradient(var(--muted-custom)_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>

        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="cloud c1"></div>
            <div class="cloud c2"></div>
            <div class="cloud c3"></div>
        </div>

        <svg class="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <path
                d="M-100 700 C 250 100, 700 800, 1300 150"
                stroke="var(--tertiary-custom)"
                stroke-width="2.5"
                stroke-dasharray="10 10"
                fill="none"
            />
        </svg>

        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
                v-for="plane in activePlanes" 
                :key="plane.id"
                class="plane"
                :style="{
                    '--start-x': `${plane.startX}px`,
                    '--start-y': `${plane.startY}px`,
                    '--end-x': `${plane.endX}px`,
                    '--end-y': `${plane.endY}px`,
                    '--angle': `${plane.angle}deg`,
                    '--duration': `${plane.duration}s`
                }"
                @animationend="handleFlightTermination(plane.id)"
            >
                <svg viewBox="0 0 640 512" class="plane-icon" :fill="plane.color">
                    <path d="M480 192H365.71L260.61 8.47A16 16 0 0 0 246.73 0H192a16 16 0 0 0-15.79 18.59L204.35 192H96L58.35 122.82A16 16 0 0 0 44.47 112H16A16 16 0 0 0 .42 131.84L32 256 .42 380.16A16 16 0 0 0 16 400h28.47a16 16 0 0 0 13.88-10.82L96 320h108.35l-28.14 173.41A16 16 0 0 0 192 512h54.73a16 16 0 0 0 13.88-8.47L365.71 320H480c88.22 0 160-28.65 160-64s-71.78-64-160-64z"/>
                </svg>
            </div>
        </div>

        <div
            class="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl"
            :class="{ 'scale-[1.02]': isHovered }"
        >
            <h1 class="text-[10rem] md:text-[14rem] font-black leading-none"
                style="color: var(--primary-custom);">
                {{ code }}
            </h1>

            <div class="text-[var(--tertiary-custom)] uppercase tracking-[0.5em] text-sm font-semibold -mt-4">
                ROUTE NOT FOUND
            </div>

            <Badge
                class="mt-6 px-4 py-2 rounded-full border"
                style="background: var(--secondary-custom); border-color: var(--muted-custom); color: var(--primary-custom);"
            >
                {{ errorMessage }}
            </Badge>

            <Button
                as-child
                size="lg"
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false"
                class="mt-10 font-bold px-8 rounded-xl shadow-xl"
                style="background: var(--tertiary-custom); color: var(--secondary-custom);"
            >
                <Link :href="navigationTarget">
                    {{ navigationLabel }}
                </Link>
            </Button>
        </div>

        <div class="absolute bottom-6 text-xs tracking-[0.4em] uppercase"
            style="color: var(--muted-custom);">
            {{ isAdminRoute ? 'SECURE AIRSPACE // ADMIN ROUTE' : 'FLIGHT TERMINATED // LOST SIGNAL' }}
        </div>

    </div>
</template>

<style scoped>
/* =========================
   DYNAMIC AIRSPACE SYSTEM
========================= */

.plane {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
    animation: dynamicFly var(--duration) linear forwards;
}

.plane-icon {
    width: 140px;
    height: 140px;
    transform-origin: center;
}

/* Hardware accelerated transition using dynamic variables */
@keyframes dynamicFly {
    0% {
        transform: translate(var(--start-x), var(--start-y)) rotate(var(--angle));
        opacity: 0;
    }
    8% {
        opacity: 1;
    }
    92% {
        opacity: 1;
    }
    100% {
        transform: translate(var(--end-x), var(--end-y)) rotate(var(--angle));
        opacity: 0;
    }
}

/* =========================
   CLOUD SYSTEM
========================= */

.cloud {
    position: absolute;
    border-radius: 999px;
    background: var(--primary-opacity-custom);
    filter: blur(32px);
    animation: cloudFloat 30s ease-in-out infinite;
}

@keyframes cloudFloat {
    0%   { transform: translateX(0px) translateY(0px); opacity: 0.4; }
    50%  { transform: translateX(40px) translateY(-20px); opacity: 0.6; }
    100% { transform: translateX(0px) translateY(0px); opacity: 0.4; }
}

.c1 { width: 240px; height: 80px; top: 15%; left: 10%; animation-delay: 0s; }
.c2 { width: 320px; height: 100px; top: 35%; right: 12%; animation-delay: 6s; }
.c3 { width: 220px; height: 70px; bottom: 18%; left: 40%; animation-delay: 12s; }
</style>