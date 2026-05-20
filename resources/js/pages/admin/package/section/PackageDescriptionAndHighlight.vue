
<script setup lang="ts">

defineProps<{ description: string, highlights_array?: string[] }>();
</script>

<template>
    <section class="space-y-4">
        <h2 class="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Overview</h2>
        <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">{{ description }}</p>
        
        <div v-if="highlights_array?.length" class="mt-4 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30">
            <h3 class="text-sm font-semibold text-indigo-900 dark:text-indigo-400 mb-2">Highlights</h3>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li v-for="(highlight, idx) in highlights_array" :key="idx" class="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                    <span class="text-indigo-500 font-bold">•</span> {{ highlight }}
                </li>
            </ul>
        </div>
    </section>
</template>