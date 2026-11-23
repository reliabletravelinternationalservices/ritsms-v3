<script setup lang="ts">
// LAYOUT
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { getImageUrl } from '@/lib/utils';

// COMPONENTS
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle } from '@lucide/vue';

interface Form {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const form = useForm<Form>({
    name: '',
    email: '',
    password: '',
    password_confirm: '',
});

const submit = () => {
    form.post(route('client.signup.store'), {
        onFinish: () => {
            form.reset('password', 'password_confirm');
        },
    });
};
</script>

<template>
    <AppLayout>
        <Head title="Signup" />

        <div
            class="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-[3fr_2fr]"
        >

            <!-- IMAGE -->
            <div
                class="hidden lg:block relative w-full h-full min-h-[calc(100vh-4rem)]"
            >
                <img
                    :src="getImageUrl('upload/agency/auth_bg.jpg')"
                    alt="Reliable International Travel Services"
                    class="absolute inset-0 w-full h-full object-fill"
                />
            </div>

            <!-- SIGNUP -->
            <div
                class="w-full min-h-[calc(100vh-4rem)]
                    flex items-center justify-center
                    px-4 py-8 sm:px-6 lg:px-10"
            >
                <div
                    class="w-full max-w-md p-5 sm:p-8"
                >

                    <!-- LOGO -->
                    <div class="flex flex-col items-center gap-2 mb-6">
                        <AppLogoIcon class="size-20 sm:size-24" />

                        <h1 class="font-bold text-base sm:text-lg">
                            REGISTER ACCOUNT
                        </h1>
                    </div>

                    <!-- FORM -->
                    <form @submit.prevent="submit">
                        <div class="grid gap-5 sm:gap-6">

                            <!-- NAME -->
                            <div class="grid gap-2">
                                <Label for="name">
                                    Full Name
                                </Label>

                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autofocus
                                    tabindex="1"
                                    autocomplete="name"
                                    v-model="form.name"
                                    placeholder="Enter your name..."
                                    class="w-full bg-[var(--primary-custom)]
                                        focus:outline-none
                                        border border-[var(--muted-custom)]
                                        text-sm md:text-base
                                        rounded-none"
                                />

                                <InputError
                                    :message="form.errors.name"
                                />
                            </div>

                            <!-- EMAIL -->
                            <div class="grid gap-2">
                                <Label for="email">
                                    Email address
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabindex="2"
                                    autocomplete="email"
                                    v-model="form.email"
                                    placeholder="example@mail.com"
                                    class="w-full bg-[var(--primary-custom)]
                                        focus:outline-none
                                        border border-[var(--muted-custom)]
                                        text-sm md:text-base
                                        rounded-none"
                                />

                                <InputError
                                    :message="form.errors.email"
                                />
                            </div>

                            <!-- PASSWORD -->
                            <div class="grid gap-2">
                                <Label for="password">
                                    Password
                                </Label>

                                <PasswordInput
                                    id="password"
                                    required
                                    tabindex="3"
                                    autocomplete="new-password"
                                    v-model="form.password"
                                    placeholder="Password"
                                    icon-class="text-zinc-400 hover:text-zinc-300"
                                    class="w-full bg-[var(--primary-custom)]
                                        focus:outline-none
                                        border border-[var(--muted-custom)]
                                        text-sm md:text-base
                                        rounded-none"
                                />

                                <InputError
                                    :message="form.errors.password"
                                />
                            </div>

                            <!-- CONFIRM PASSWORD -->
                            <div class="grid gap-2">
                                <Label for="password_confirm">
                                    Confirm Password
                                </Label>

                                <PasswordInput
                                    id="password_confirm"
                                    required
                                    tabindex="4"
                                    autocomplete="new-password"
                                    v-model="form.password_confirm"
                                    placeholder="Re-enter password"
                                    icon-class="text-zinc-400 hover:text-zinc-300"
                                    class="w-full bg-[var(--primary-custom)]
                                        focus:outline-none
                                        border border-[var(--muted-custom)]
                                        text-sm md:text-base
                                        rounded-none"
                                />

                                <InputError
                                    :message="form.errors.password_confirm"
                                />
                            </div>

                            <!-- SIGNUP BUTTON -->
                            <Button
                                type="submit"
                                :disabled="form.processing"
                                class="w-full bg-[var(--secondary-custom)]
                                    text-[var(--primary-custom)]
                                    py-2 px-4
                                    hover:bg-[var(--tertiary-custom)]
                                    duration-75 ease-in
                                    rounded-none"
                            >
                                <LoaderCircle
                                    v-if="form.processing"
                                    class="h-4 w-4 animate-spin"
                                />

                                Create Account
                            </Button>
                        </div>
                    </form>

                    <!-- LOGIN -->
                    <div
                        class="flex flex-wrap items-center justify-center
                            gap-1.5 sm:gap-2
                            mt-6
                            text-xs sm:text-sm
                            text-zinc-600"
                    >
                        <p>Already have an account?</p>

                        <a
                            :href="route('client.login')"
                            class="underline font-bold text-yellow-600"
                        >
                            Login
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </AppLayout>
</template>