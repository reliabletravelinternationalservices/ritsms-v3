<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background dark:bg-background p-6 md:p-10">
        <div
            class="w-full max-w-lg bg-background rounded-lg p-12 shadow-lg border border-border dark:bg-background dark:shadow-none">
            <div class="flex flex-col gap-10 w-full">
                <div class="flex flex-col items-center gap-4">
                    <div class="mb-1 flex h-20 w-20 items-center justify-center rounded-md">
                        <AppLogoIcon class="w-full h-full fill-current" />
                    </div>
                    <!-- <span class="sr-only">{{ title }}</span> -->
                    <div class="space-y-2 text-center">
                        <h1 class="text-xl font-bold text-foreground uppercase dark:text-foreground">
                            {{ title }}</h1>
                        <p class="text-center text-sm text-foreground-muted dark:text-foreground-muted">
                            {{ description }}
                        </p>
                    </div>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
