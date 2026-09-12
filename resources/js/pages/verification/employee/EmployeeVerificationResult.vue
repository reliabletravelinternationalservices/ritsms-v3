<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { computed } from 'vue';

interface Props {
    status: 'success' | 'expired' | 'already_verified' | 'error';
    email: string;
}

const props = defineProps<Props>();

const statusConfig = computed(() => {
    switch (props.status) {
        case 'success':
            return {
                title: 'Email Verified',
                message: `Your email address <strong>${props.email}</strong> has been successfully verified. You can now access your account at Reliable International Travel Services Official Website.`,
                icon: '✅',
                color: '#16a34a', // Green
            };

        case 'already_verified':
            return {
                title: 'Email Already Verified',
                message: `The email address <strong>${props.email}</strong> has already been verified. Your account is already active, and no further action is required.`,
                icon: 'ℹ️',
                color: '#2563eb', // Blue
            };

        case 'expired':
            return {
                title: 'Verification Link Expired',
                message:
                    'This verification link has expired. Please log in again and request a new verification email to continue activating your account.',
                icon: '⏳',
                color: '#dc2626', // Red
            };

        default:
            return {
                title: 'Something Went Wrong',
                message:
                    'An unexpected error occurred while processing your verification request. Please try again later or contact support.',
                icon: '⚠️',
                color: '#ca8a04', // Amber
            };
    }
});
</script>

<template>
    <Head title="Verification Result" />

    <div class="flex min-h-screen items-center justify-center bg-zinc-100 p-6">
        <div
            class="w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
        >
            <!-- Header -->
            <div
                class="p-8 text-center text-white"
                :style="{ backgroundColor: statusConfig.color }"
            >
                <div class="mb-4 text-5xl">
                    {{ statusConfig.icon }}
                </div>

                <h1 class="text-2xl font-bold">
                    {{ statusConfig.title }}
                </h1>
            </div>

            <!-- Content -->
            <div class="p-8 text-center">
                <p
                    class="leading-7 text-zinc-600"
                    v-html="statusConfig.message"
                ></p>
            </div>

            <!-- Footer -->
            <div
                class="border-t border-zinc-200 bg-zinc-50 p-4 text-center text-xs text-zinc-500"
            >
                &copy; {{ new Date().getFullYear() }} Reliable International
                Travel Services. All rights reserved.
            </div>
        </div>
    </div>
</template>