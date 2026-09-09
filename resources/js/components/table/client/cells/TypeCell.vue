<script setup lang="ts">
import Banner from '@/components/Banner.vue'
import { computed } from 'vue'
import type { IconProps } from '@iconify/vue'
import { ClientType } from '@/types/client';



interface Props {
    type: ClientType
}

const props = defineProps<Props>()

</script>

<template>
    <div class="w-fit">
        <span class="uppercase text-xs text-muted-foreground font-bold">{{ type }}</span>
    </div>
</template>