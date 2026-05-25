<script setup lang="ts">

interface Props {
    tag: string
}
defineProps<Props>();

</script>


<template>
    <div class="bg-[var(--warning-custom)] text-[var(--primary-custom)] py-2 px-4 font-roboto uppercase italic w-fit text-sm">
        <p>{{ tag }}</p>
    </div>
</template>