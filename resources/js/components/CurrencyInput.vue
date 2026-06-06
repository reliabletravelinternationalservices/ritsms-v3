<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { Input } from '@/components/ui/input';

interface Props {
    modelValue?: number | string;
    placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'e.g. 4,400.00',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
}>();

const formatNumber = (value: number) => {
    return value.toLocaleString('en-PH', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
};

const displayValue = computed({
    get() {
        if (
            props.modelValue === null ||
            props.modelValue === undefined ||
            props.modelValue === ''
        ) {
            return '';
        }

        const num = Number(props.modelValue);
        return isNaN(num) ? '' : formatNumber(num);
    },

    set(value: string) {
        // allow only numbers + dot
        let cleaned = value.replace(/[^0-9.]/g, '');

        // prevent multiple dots
        const parts = cleaned.split('.');
        if (parts.length > 2) {
            cleaned = parts[0] + '.' + parts.slice(1).join('');
        }

        // remove leading dot like ".5"
        if (cleaned.startsWith('.')) {
            cleaned = '0' + cleaned;
        }

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
            <Icon icon="mdi:currency-php" class="text-xl" />
        </span>

        <Input
            v-bind="$attrs"
            type="text"
            inputmode="decimal"
            class="pl-10"
            v-model="displayValue"
            :placeholder="placeholder"
        />
    </div>
</template>