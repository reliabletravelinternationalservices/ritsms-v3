<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { Input } from '@/components/ui/input';

interface Props {
    modelValue?: number | string;
    placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'e.g. 4,400',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
}>();

const displayValue = computed({
    get() {
        if (
            props.modelValue === null ||
            props.modelValue === undefined ||
            props.modelValue === ''
        ) {
            return '';
        }

        return Number(props.modelValue).toLocaleString('en-PH');
    },

    set(value: string) {
        const cleaned = value.replace(/[^\d]/g, '');

        const numeric = Number(cleaned);

        emit(
            'update:modelValue',
            isNaN(numeric) ? 0 : numeric
        );
    },
});
</script>

<template>
    <div class="relative">
        <span
            class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
            <Icon
                icon="mdi:currency-php"
                class="text-xl"
            />
        </span>

        <Input
            v-bind="$attrs"
            type="text"
            inputmode="numeric"
            class="pl-10"
            v-model="displayValue"
            :placeholder="placeholder"
        />
    </div>
</template>