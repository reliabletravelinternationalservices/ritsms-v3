<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@iconify/vue';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';
import { useCounterAnimation } from '@/composables/useCounterAnimation';

interface Props {
    title: string;
    value: string | number;
    icon?: string; // Main display icon (e.g. package, calendar)
    trendValue?: string | number;
    trendType?: 'up' | 'down' | 'neutral';
    trendLabel?: string;
    delay?: number; // Animation delay in seconds
}

const props = withDefaults(defineProps<Props>(), {
    icon: 'iconoir:database',
    trendType: 'neutral',
    trendValue: undefined,
    trendLabel: undefined,
    delay: 0
});

// Counter animation
const { animatedValue } = useCounterAnimation(props.value, { duration: 1000, delay: props.delay * 1000 });

// Automatically resolve visual styles and direction indicators
const trendConfig = computed(() => {
    switch (props.trendType) {
        case 'up':
            return {
                icon: 'iconoir:arrow-tr',
                classes: 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/20'
            };
        case 'down':
            return {
                icon: 'iconoir:arrow-bl',
                classes: 'text-rose-600 bg-rose-500/10 dark:text-rose-400 dark:bg-rose-500/20'
            };
        case 'neutral':
        default:
            return {
                icon: 'iconoir:arrow-right',
                classes: 'text-zinc-500 bg-zinc-500/10 dark:text-zinc-400 dark:bg-zinc-500/20'
            };
    }
});
</script>

<template>
    <MotionWrapper :delay="delay">
        <Card class="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 shadow-sm rounded-lg overflow-hidden">
            <CardContent class="p-5 flex items-center justify-between">
                <div class="space-y-1.5 min-w-0">
                    <p class="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 truncate">
                        {{ props.title }}
                    </p>
                    
                    <div class="flex items-baseline gap-2.5">
                        <span class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
                            {{ animatedValue }}
                        </span>
                        
                        <span 
                            v-if="props.trendValue && !props.trendLabel"
                            class="inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-bold font-mono rounded-full"
                            :class="trendConfig.classes"
                        >
                            <Icon :icon="trendConfig.icon" class="text-[10px] stroke-[2.5]" />
                            <span>{{ props.trendValue }}</span>
                        </span>
                    </div>

                    <div v-if="props.trendLabel" class="flex items-center gap-1.5 pt-1">
                        <span class="p-0.5 rounded-md" :class="trendConfig.classes">
                            <Icon :icon="trendConfig.icon" class="text-xs stroke-[3]" />
                        </span>
                        <p class="text-xs text-zinc-500 dark:text-zinc-400">
                            <span class="font-semibold font-mono text-zinc-800 dark:text-zinc-200">
                                {{ props.trendValue }}
                            </span> 
                            {{ props.trendLabel }}
                        </p>
                    </div>
                </div>

                <div class="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800/80">
                    <Icon :icon="props.icon" class="text-2xl" />
                </div>
            </CardContent>
        </Card>
    </MotionWrapper>
</template>