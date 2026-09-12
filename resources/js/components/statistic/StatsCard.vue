<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';
import { useCounterAnimation } from '@/composables/useCounterAnimation';

interface Props {
    title: string;
    value: string | number;
    icon?: string;
    trendValue?: string | number;
    trendType?: 'up' | 'down' | 'neutral';
    delay?: number; // Animation delay in seconds
}

const props = withDefaults(defineProps<Props>(), {
    icon: 'iconoir:package',
    trendType: 'up',
    trendValue: undefined,
    delay: 0
});

// Counter animation
const { animatedValue } = useCounterAnimation(props.value, { duration: 1000, delay: props.delay * 1000 });

// Dynamic trend badge styling configuration
const trendConfig = computed(() => {
    if (props.trendType === 'down') {
        return {
            icon: 'iconoir:arrow-bl',
            classes: 'text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400'
        };
    }
    if (props.trendType === 'neutral') {
        return {
            icon: 'iconoir:arrow-right',
            classes: 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800/50 dark:text-zinc-400'
        };
    }
    // Default to 'up' trending
    return {
        icon: 'iconoir:arrow-tr',
        classes: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400'
    };
});
</script>

<template>
    <MotionWrapper :delay="delay">
        <Card class="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 shadow-sm rounded-2xl overflow-hidden">
            <CardContent class="p-4 flex items-center gap-4">
                
                <div class="h-11 w-11 shrink-0 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                    <Icon :icon="props.icon" class="text-xl" />
                </div>

                <div class="space-y-0.5 min-w-0">
                    <p class="text-xs font-medium text-zinc-400 dark:text-zinc-500 truncate">
                        {{ props.title }}
                    </p>
                    
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
                            {{ animatedValue }}
                        </span>
                        
                        <div 
                            v-if="props.trendValue !== undefined"
                            class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide"
                            :class="trendConfig.classes"
                        >
                            <Icon :icon="trendConfig.icon" class="text-xs stroke-[2.5]" />
                            <span>{{ props.trendValue }}</span>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    </MotionWrapper>
</template>