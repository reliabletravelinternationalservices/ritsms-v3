```vue
<script setup lang="ts">
import Banner from '@/components/Banner.vue'

type TourState = 'draft' | 'published' | 'archived'

interface Props {
    label: TourState
}

defineProps<Props>()
</script>

<template>
    <div class="w-fit">
        <Banner
            :title="label"
            :class="`rounded-sm border-0 text-white ${
                label === 'draft'
                    ? 'bg-zinc-500'
                    : label === 'published'
                      ? 'bg-green-600'
                      : 'bg-red-600'
            }`"
        />
    </div>
</template>
```
