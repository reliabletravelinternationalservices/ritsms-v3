<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const visible = ref(false)

const handleScroll = () => {
    visible.value = window.scrollY > 300
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 translate-y-4 scale-90"
        enter-to-class="opacity-100 translate-y-0 scale-100" leave-active-class="transition-all duration-200"
        leave-from-class="opacity-100 translate-y-0 scale-100" leave-to-class="opacity-0 translate-y-4 scale-90">
        <button v-if="visible" type="button" @click="scrollToTop" aria-label="Scroll to top"
            class="fixed bottom-6 right-6 z-50 flex h-11 w-11 text-accent items-center justify-center rounded-full border bg-foreground shadow-lg backdrop-blur transition-all ease-in hover:-translate-y-1 hover:bg-foreground/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50">
            <Icon icon="lucide:arrow-up" class="h-5 w-5" />
        </button>
    </Transition>
</template>