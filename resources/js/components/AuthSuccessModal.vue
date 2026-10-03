<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import { CheckCircle2, X } from '@lucide/vue';

type AuthVariant = 'login' | 'register' | 'logout';

interface Props {
    open: boolean;
    variant?: AuthVariant;
    userName?: string;
    delay?: number;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'register',
    delay: 500,
});

const emit = defineEmits<{
    close: [];
}>();

const showModal = ref(false);

let openTimeout: ReturnType<typeof setTimeout> | null = null;

const clearOpenTimeout = () => {
    if (openTimeout) {
        clearTimeout(openTimeout);
        openTimeout = null;
    }
};

const closeModal = () => {
    clearOpenTimeout();
    showModal.value = false;
    emit('close');
};

const content = computed(() => {
    switch (props.variant) {
        case 'login':
            return {
                label: 'Login Successful',
                title: `Welcome Back${props.userName ? `, ${props.userName}` : ''}!`,
                description:
                    'You have successfully logged in to your account.',
                body: null,
                button: 'Continue',
            };

        case 'logout':
            return {
                label: 'Logout Complete',
                title: 'Successfully Logged Out',
                description:
                    'You have been safely logged out of your account.',
                body:
                    'Thank you for visiting Reliable International Travel Services. We hope to assist you again soon.',
                button: 'Close',
            };

        case 'register':
        default:
            return {
                label: 'Registration Complete',
                title: `Welcome${props.userName ? `, ${props.userName}` : ''}!`,
                description:
                    "Your account has been successfully created. We're excited to have you with us.",
                body:
                    'You can now access your account, explore our travel packages, manage your inquiries, and enjoy a more convenient booking experience.',
                button: 'Get Started',
            };
    }
});

watch(
    () => props.open,
    (open) => {
        clearOpenTimeout();

        if (open) {
            openTimeout = setTimeout(() => {
                showModal.value = true;
                openTimeout = null;
            }, props.delay);
        } else {
            showModal.value = false;
        }
    },
    {
        immediate: true,
    },
);

onBeforeUnmount(() => {
    clearOpenTimeout();
});
</script>

<template>
    <Transition name="modal">
        <div
            v-if="showModal"
            class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
            @click.self="closeModal"
        >
            <div
                class="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-success-title"
            >
                <!-- Close Button -->
                <button
                    type="button"
                    aria-label="Close"
                    class="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    @click="closeModal"
                >
                    <X class="h-5 w-5" />
                </button>

                <!-- Header -->
                <div
                    class="relative flex flex-col items-center px-6 pb-7 pt-9 text-center sm:px-8"
                >
                    <!-- Glow -->
                    <div
                        class="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-[#EDBD53]/20 blur-3xl"
                    />

                    <!-- Success Icon -->
                    <div
                        class="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#EDBD53]/15"
                    >
                        <div
                            class="flex h-14 w-14 items-center justify-center rounded-full bg-[#EDBD53]"
                        >
                            <CheckCircle2
                                class="h-8 w-8 text-black"
                                stroke-width="2.5"
                            />
                        </div>
                    </div>

                    <!-- Label -->
                    <p
                        class="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#B58A2A]"
                    >
                        {{ content.label }}
                    </p>

                    <!-- Title -->
                    <h2
                        id="auth-success-title"
                        class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                    >
                        {{ content.title }}
                    </h2>

                    <!-- Description -->
                    <p
                        class="mt-3 max-w-sm text-sm leading-6 text-gray-600 sm:text-base"
                    >
                        {{ content.description }}
                    </p>
                </div>

                <!-- Divider -->
                <div class="border-t border-gray-100" />

                <!-- Body -->
                <div class="px-6 py-6 sm:px-8">
                    <div v-if="content.body" class="rounded-xl bg-gray-50 p-4">
                        <p class="text-sm leading-6 text-gray-600">
                            {{ content.body }}
                        </p>
                    </div>

                    <button
                        type="button"
                        class="mt-5 w-full rounded-xl bg-[#EDBD53] px-5 py-3.5 text-sm font-semibold text-black shadow-sm transition hover:bg-[#dcae43] focus:outline-none focus:ring-2 focus:ring-[#EDBD53] focus:ring-offset-2 active:scale-[0.99]"
                        @click="closeModal"
                    >
                        {{ content.button }}
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
    transition:
        transform 0.25s ease,
        opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
}
</style>
