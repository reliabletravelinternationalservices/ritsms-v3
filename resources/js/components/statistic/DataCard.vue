<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@iconify/vue';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';

interface Props {
    withButton?: boolean
    background?: string
    foreground?: string
    iconColor?: string
    icon?: string
    title: string
    value: number
}

withDefaults(defineProps<Props>(), {
    withButton: true,
    background: "bg-background",
    foreground: "text-foreground",
    iconColor: "text-black",
    icon: "lucide:inbox",
})

</script>

<template>
    <MotionWrapper :delay="0.1">
        <Card class="shadow-sm rounded-md overflow-hidden border-2 border-border"
            :class="background + ' ' + foreground">
            <CardContent class="p-4 flex flex-col gap-3">
                <div v-if="withButton" class="flex items-center justify-between">
                    <div class="flex item-center gap-2">
                        <Icon :icon="icon" class="text-lg" :class="iconColor" />
                        <p class="text-sm font-bold">{{ title }}</p>
                    </div>
                    <button type="button" class="flex items-center gap-1 border-b border-foreground">
                        <p class="text-xs font-medium">View</p>
                        <Icon icon="lucide:arrow-up-right" class="text-md" />
                    </button>
                </div>

                <div v-else class="flex items-center justify-between" :class="background + ' ' + foreground">
                    <p class="text-sm font-bold">{{ title }}</p>
                    <Icon :icon="icon ?? 'lucide:inbox'" class="text-xl" :class="iconColor" />
                </div>
                <span class="text-3xl font-bold">
                    {{ value }}
                </span>
            </CardContent>
        </Card>
    </MotionWrapper>
</template>