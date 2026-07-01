<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { LoaderCircle, CheckCircle2 } from 'lucide-vue-next';
import { computed } from 'vue';

const page = usePage<SharedData>();

const flash = computed(() => page.props.flash);

const status = computed(() => flash.value?.message ?? null);

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('admin.forgot.password.send'), {
        preserveScroll: true,
        onSuccess: () => {
            form.reset('email');
        },
    });
};
</script>

<template>
    <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
        <Head title="Forgot password" />

        <div class="space-y-6">
            <form @submit.prevent="submit">
                
                <!-- Professional Green Status Callout (Positioned right on top of email input elements) -->
                <div 
                    v-if="status" 
                    class="mb-5 flex items-start gap-2.5 rounded-lg border border-emerald-200/60 bg-emerald-50/50 p-3 text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-400"
                >
                    <CheckCircle2 class="h-4 w-4 mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-500" />
                    <p class="text-sm font-medium leading-relaxed">
                        {{ status }}
                    </p>
                </div>

                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input id="email" type="email" name="email" autocomplete="off" v-model="form.email" autofocus placeholder="email@example.com" />
                    <InputError :message="form.errors.email" />
                </div>

                <div class="my-6 flex items-center justify-start">
                    <Button class="w-full" :disabled="form.processing">
                        <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                        Email password reset link
                    </Button>
                </div>
            </form>

            <div class="space-x-1 text-center text-sm text-muted-foreground">
                <span>Or proceed to</span>
                <TextLink :href="route('admin.login')">log in</TextLink>
            </div>
        </div>
    </AuthLayout>
</template>