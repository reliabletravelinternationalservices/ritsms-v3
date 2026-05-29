<script setup lang="ts">
import { computed } from 'vue';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/vue';

interface Props {
    title?: string;
    description?: string;
    mode?: 'maintenance' | 'update' | 'optimization' | 'features';
    estimatedTime?: string;
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Section Under Maintenance',
    description: 'We are currently running critical updates to enhance platform stability. Access will be restored shortly.',
    mode: 'update',
    estimatedTime: undefined
});

const modeConfig = computed(() => {
    switch (props.mode) {
        case 'maintenance':
            return {
                icon: 'wpf:maintenance',
                badgeText: 'Critical Maintenance',
                badgeStyle: 'bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:text-destructive-foreground',
                iconColor: 'text-rose-500'
            };
        case 'optimization':
            return {
                icon: 'mdi:flash',
                badgeText: 'Performance Optimization',
                badgeStyle: 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400',
                iconColor: 'text-amber-500'
            };
        case 'features':
            return {
                icon: 'mdi:sparkles',
                badgeText: 'New Features Deploying',
                badgeStyle: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400',
                iconColor: 'text-emerald-500'
            };
        case 'update':
        default:
            return {
                icon: 'iconoir:system-restart',
                badgeText: 'System Update Running',
                badgeStyle: 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400',
                iconColor: 'text-blue-500'
            };
    }
});
</script>

<template>
    <div class="w-full min-h-[70vh] flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in">
        <Card class="max-w-md w-full border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-md overflow-hidden relative">
            <div class="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"></div>

            <CardContent class="p-6 md:p-8 flex flex-col items-center text-center space-y-6">
                <div class="relative flex items-center justify-center h-16 w-16 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <span class="absolute inline-flex h-full w-full rounded-2xl opacity-40 animate-ping bg-zinc-200 dark:bg-zinc-800/60 [animation-duration:3s]"></span>
                    <Icon 
                        :icon="modeConfig.icon" 
                        class="text-3xl" 
                        :class="[modeConfig.iconColor, props.mode === 'update' ? 'animate-spin [animation-duration:12s]' : '']" 
                    />
                </div>

                <div class="space-y-2">
                    <div class="flex justify-center">
                        <Badge variant="outline" class="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold" :class="modeConfig.badgeStyle">
                            {{ modeConfig.badgeText }}
                        </Badge>
                    </div>
                    
                    <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {{ props.title }}
                    </h1>
                    
                    <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed px-2">
                        {{ props.description }}
                    </p>
                </div>

                <div v-if="props.estimatedTime" class="w-full pt-4 border-t border-zinc-100 dark:border-zinc-900/60">
                    <div class="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 px-4 py-2.5 rounded-lg flex items-center justify-between text-left">
                        <span class="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Estimated Finish</span>
                        <span class="text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200">{{ props.estimatedTime }}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>