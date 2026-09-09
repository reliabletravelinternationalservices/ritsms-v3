<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'

import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface Props {
    email: string
    phone?: string | null
}

defineProps<Props>()

const { copy, isSupported } = useClipboard()

const copied = ref<'email' | 'phone' | null>(null)

const handleCopy = async (
    text: string,
    type: 'email' | 'phone',
) => {
    if (!text) {
        return
    }

    try {
        // Try VueUse clipboard first
        if (isSupported.value) {
            await copy(text)
        } else {
            // Fallback for HTTP / unsupported Clipboard API
            const textarea = document.createElement('textarea')

            textarea.value = text
            textarea.style.position = 'fixed'
            textarea.style.left = '-9999px'
            textarea.style.top = '0'
            textarea.setAttribute('readonly', '')

            document.body.appendChild(textarea)

            textarea.focus()
            textarea.select()
            textarea.setSelectionRange(0, textarea.value.length)

            const success = document.execCommand('copy')

            textarea.remove()

            if (!success) {
                throw new Error('Copy command failed')
            }
        }

        copied.value = type

        window.setTimeout(() => {
            if (copied.value === type) {
                copied.value = null
            }
        }, 1500)
    } catch (error) {
        console.error('COPY FAILED:', error)
    }
}
</script>

<template>
    <TooltipProvider :delay-duration="100">
        <div class="flex flex-col gap-1">
            <!-- EMAIL -->
            <div class="group flex items-center gap-2">
                <Icon
                    icon="lucide:mail"
                    class="size-3 shrink-0 text-muted-foreground"
                />

                <span
                    class="min-w-0 max-w-52 truncate text-sm"
                    :title="email"
                >
                    {{ email }}
                </span>

                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            class="size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                            @click.stop.prevent="
                                handleCopy(email, 'email')
                            "
                        >
                            <Icon
                                :icon="
                                    copied === 'email'
                                        ? 'lucide:check'
                                        : 'lucide:copy'
                                "
                                class="size-3"
                                :class="
                                    copied === 'email'
                                        ? 'text-emerald-500'
                                        : 'text-muted-foreground'
                                "
                            />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent side="right">
                        {{
                            copied === 'email'
                                ? 'Copied!'
                                : 'Copy email'
                        }}
                    </TooltipContent>
                </Tooltip>
            </div>

            <!-- PHONE -->
            <div
                v-if="phone"
                class="group flex items-center gap-2"
            >
                <Icon
                    icon="lucide:phone"
                    class="size-3 shrink-0 text-muted-foreground"
                />

                <span
                    class="min-w-0 max-w-52 truncate text-xs text-muted-foreground"
                    :title="phone"
                >
                    {{ phone }}
                </span>

                <Tooltip>
                    <TooltipTrigger as-child>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            class="size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                            @click.stop.prevent="
                                handleCopy(phone, 'phone')
                            "
                        >
                            <Icon
                                :icon="
                                    copied === 'phone'
                                        ? 'lucide:check'
                                        : 'lucide:copy'
                                "
                                class="size-3"
                                :class="
                                    copied === 'phone'
                                        ? 'text-emerald-500'
                                        : 'text-muted-foreground'
                                "
                            />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent side="right">
                        {{
                            copied === 'phone'
                                ? 'Copied!'
                                : 'Copy phone'
                        }}
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    </TooltipProvider>
</template>