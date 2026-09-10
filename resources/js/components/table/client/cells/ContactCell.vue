<script setup lang="ts">
import { Mail, Phone, Copy, Check } from '@lucide/vue'
import { ref } from 'vue'

interface Props {
    email: string
    phone: string
}

defineProps<Props>()

const copied = ref<'email' | 'phone' | null>(null)

const copyToClipboard = async (value: string, type: 'email' | 'phone') => {
    await navigator.clipboard.writeText(value)

    copied.value = type

    setTimeout(() => {
        copied.value = null
    }, 1500)
}
</script>

<template>
    <div class="flex flex-col gap-1 max-w-56">
        <!-- Email -->
        <div class="group flex items-center gap-2 min-w-0">
            <Mail class="size-3.5 shrink-0 text-muted-foreground" />

            <span
                class="truncate text-sm"
                :title="email"
            >
                {{ email }}
            </span>

            <button
                type="button"
                class="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy email"
                @click="copyToClipboard(email, 'email')"
            >
                <Check
                    v-if="copied === 'email'"
                    class="size-3.5 text-green-600"
                />
                <Copy
                    v-else
                    class="size-3.5 text-muted-foreground hover:text-foreground"
                />
            </button>
        </div>

        <!-- Phone -->
        <div
            v-if="phone"
            class="group flex items-center gap-2 min-w-0"
        >
            <Phone class="size-3.5 shrink-0 text-muted-foreground" />

            <span
                class="truncate text-sm text-muted-foreground"
                :title="phone"
            >
                {{ phone }}
            </span>

            <button
                type="button"
                class="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy phone"
                @click="copyToClipboard(phone, 'phone')"
            >
                <Check
                    v-if="copied === 'phone'"
                    class="size-3.5 text-green-600"
                />
                <Copy
                    v-else
                    class="size-3.5 text-muted-foreground hover:text-foreground"
                />
            </button>
        </div>
    </div>
</template>