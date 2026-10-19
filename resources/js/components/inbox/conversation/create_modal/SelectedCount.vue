<script setup lang="ts">
interface Props {
    totalContact: number
}

withDefaults(defineProps<Props>(), {
    totalContact: 0
})
</script>

<template>
    <div class="mt-3 text-xs text-muted-foreground">
        {{ totalContact }}
        {{ totalContact === 1 ? 'contact' : 'contacts' }}
        selected
    </div>
</template>