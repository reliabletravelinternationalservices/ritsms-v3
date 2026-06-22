<script setup lang="ts">
import { formatDateString } from '@/lib/utils';
import { Icon } from '@iconify/vue';


interface Props {
    status: 'active' | 'inactive';
    verifiedDate?: string | null;
}

defineProps<Props>();

</script>

<template>
    <div class="flex flex-col">
        <span
            class="font-semibold"
            :class="status === 'inactive' ? 'text-red-500' : 'text-green-500'"
        >
            {{ status === 'inactive' ? 'Inactive' : 'Active' }}
        </span>

        <span v-if="verifiedDate" class="text-xs font-light text-muted-foreground flex items-center">
            <Icon icon="lets-icons:check-fill" width="16" height="16" class="text-green-500" /> Verified at {{ formatDateString(verifiedDate) }}
        </span>
        <span v-else class="text-xs font-light text-muted-foreground flex items-center">
            <Icon icon="material-symbols:close-rounded" width="16" height="16" class="text-red-500" /> Not verified yet
        </span>
    </div>
</template>