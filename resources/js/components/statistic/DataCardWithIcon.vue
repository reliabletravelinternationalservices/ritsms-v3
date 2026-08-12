<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@iconify/vue';
import MotionWrapper from '@/components/ui/MotionWrapper.vue';

interface Props {
    background?: string
    foreground?: string
    iconBackground?: string
    iconColor?: string
    icon?: string
    title: string
    value: number
}

withDefaults(defineProps<Props>(), {
    background: "bg-background",
    foreground: "text-foreground",
    iconBackground: "bg-background",
    iconColor: "text-black",
    icon: "lucide:inbox",
})

</script>

<template>
    <MotionWrapper :delay="0.1">
        <Card class="shadow-sm rounded-md overflow-hidden border-2 border-border"
            :class="background + ' ' + foreground">
            <CardContent class="p-4 flex items-stretch gap-3">
                <div class="flex item-center justify-center p-4 rounded-md" :class="iconBackground">
                    <Icon :icon="icon" class="text-4xl" :class="iconColor" />
                </div>
                <div class="flex flex-col">
                    <p class="text-sm font-bold">{{ title }}</p>
                    <span class="text-3xl font-bold">
                        {{ value }}
                    </span>
                </div>
            </CardContent>
        </Card>
    </MotionWrapper>
</template>