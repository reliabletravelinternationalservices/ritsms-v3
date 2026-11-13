
<script setup lang="ts">
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';


interface Props {
    open: boolean;
}

defineProps<Props>()

const emit = defineEmits<{
    'update:open': [value: boolean];
}>();

</script>

<template>
    <Dialog :open="open" @update:open="emit('update:open', $event)">
        <DialogContent class="sm:max-w-md">
            <!-- Custom body -->
            <div class="py-2">
                <slot />
            </div>
        </DialogContent>
    </Dialog>
</template>
