
<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps<{
    value: string;
    isMono?: boolean;
}>();

const copied = ref(false);

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(props.value);
        copied.value = true;
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
};
</script>

<template>
    <div class="inline-flex items-center gap-2 group max-w-full">
        <span :class="[
            isMono ? 'font-mono text-xs text-muted-foreground' : 'text-xs text-zinc-600 dark:text-zinc-400',
            'truncate'
        ]">
            {{ value }}
        </span>
        <button 
            type="button"
            class="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 focus:opacity-100 focus:outline-none"
            title="Copy to clipboard"
            @click.stop="copyToClipboard"
        >
            <Icon 
                class="w-4 h-4"
                :icon="copied ? 'iconoir:check' : 'iconoir:copy'" 
                :class="['text-xs transition-colors', copied ? 'text-emerald-500 dark:text-emerald-400' : '']"
            />
        </button>
    </div>
</template>