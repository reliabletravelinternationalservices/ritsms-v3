<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'

interface Props {
    label?: string
    icon?: string
    iconPosition?: 'left' | 'right'
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    disabled?: boolean
    loading?: boolean
}

withDefaults(defineProps<Props>(), {
    iconPosition: 'left',
    variant: 'default',
    size: 'default',
    disabled: false,
    loading: false,
})
</script>

<template>
    <Button :variant="variant" :size="size" :disabled="disabled || loading">
        <!-- Loading -->
        <Icon v-if="loading" icon="ri:loader-4-line" class="size-4 animate-spin" />

        <template v-else>
            <!-- Left Icon -->
            <Icon v-if="icon && iconPosition === 'left'" :icon="icon" class="size-4" />

            <!-- Label -->
            <span v-if="label">
                {{ label }}
            </span>

            <!-- Right Icon -->
            <Icon v-if="icon && iconPosition === 'right'" :icon="icon" class="size-4" />
        </template>
    </Button>
</template>