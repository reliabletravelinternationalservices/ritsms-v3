<script setup lang="ts">
// LAYOUT
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import Button from '@/components/ui/button/Button.vue';
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import AppLayout from '@/layouts/ClientAppLayout.vue';
import { getImageUrl } from '@/lib/utils';

// COMPONENTS
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle } from '@lucide/vue';

interface Form {
    email: string;
    password: string;
    remember: boolean;
}

const form = useForm<Form>({
    email: '',
    password: '',
    remember: false,
});

    const submit = () => {
        form.post(route('client.login.store'), {
            onFinish: () => {
                form.reset('password')
            },
        })
    }
</script>

<template>
    <AppLayout>
        <Head title="Login" />
        <div class="min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-[3fr_2fr]">

            <!-- IMAGE -->
            <div class="hidden lg:block relative w-full h-full min-h-[calc(100vh-4rem)]">
                <img
                    :src="getImageUrl('upload/agency/auth_bg.jpg')"
                    alt="Reliable International Travel Services"
                    class="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <!-- LOGIN -->
            <div
                class="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10"
            >
                <div
                    class="w-full max-w-md p-5 sm:p-8"
                >

                    <!-- LOGO -->
                    <div class="flex flex-col items-center gap-2 mb-6">
                        <AppLogoIcon class="size-20 sm:size-24" />

                        <h1 class="font-bold text-base sm:text-lg">
                            LOGIN ACCOUNT
                        </h1>
                    </div>

                    <!-- FORM -->
                    <form @submit.prevent="submit">
                        <div class="grid gap-5 sm:gap-6">

                            <!-- EMAIL -->
                            <div class="grid gap-2">
                                <Label for="email">
                                    Email address
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autofocus
                                    tabindex="1"
                                    autocomplete="email"
                                    v-model="form.email"
                                    placeholder="example@mail.com"
                                    class="w-full bg-[var(--primary-custom)]
                                        focus:outline-none
                                        border border-[var(--muted-custom)]
                                        text-sm md:text-base
                                        rounded-none"
                                />

                                <InputError :message="form.errors.email" />
                            </div>

                            <!-- PASSWORD -->
                            <div class="grid gap-2">
                                <div class="flex items-center justify-between gap-2">
                                    <Label for="password">
                                        Password
                                    </Label>

                                    <TextLink
                                        href="#"
                                        class="text-xs sm:text-sm text-zinc-600 whitespace-nowrap"
                                        :tabindex="5"
                                    >
                                        Forgot password?
                                    </TextLink>
                                </div>

                                <PasswordInput
                                    id="password"
                                    required
                                    tabindex="2"
                                    autocomplete="current-password"
                                    v-model="form.password"
                                    placeholder="Password"
                                    icon-class="text-zinc-400 hover:text-zinc-300"
                                    class="w-full bg-[var(--primary-custom)]
                                        focus:outline-none
                                        border border-[var(--muted-custom)]
                                        text-sm md:text-base
                                        rounded-none"
                                />

                                <InputError :message="form.errors.password" />
                            </div>

                            <!-- REMEMBER -->
                            <div
                                class="flex items-center justify-between"
                                tabindex="3"
                            >
                                <Label
                                    for="remember"
                                    class="flex items-center gap-3 cursor-pointer"
                                >
                                    <Checkbox
                                        id="remember"
                                        v-model="form.remember"
                                        @update:checked="(value) => form.remember = value"
                                        tabindex="4"
                                        class="bg-[rgb(var(--app-color-background))]
                                            data-[state=checked]:text-background
                                            data-[state=checked]:border-[rgb(var(--app-color-primary))]
                                            data-[state=checked]:bg-[rgb(var(--app-color-primary))]
                                            dark:bg-[rgb(var(--app-color-background))]
                                            dark:data-[state=checked]:text-background
                                            dark:data-[state=checked]:border-[rgb(var(--app-color-primary))]
                                            dark:data-[state=checked]:bg-[rgb(var(--app-color-primary))]"
                                    />

                                    <span class="text-sm">
                                        Remember me
                                    </span>
                                </Label>
                            </div>

                            <!-- LOGIN BUTTON -->
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

                                Login
                            </Button>
                        </div>
                    </form>

                    <!-- SIGNUP -->
                    <div
                        class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 text-xs sm:text-sm text-zinc-600"
                    >
                        <p>Don't have an account?</p>

                        <a
                            :href="route('client.signup')"
                            class="underline font-bold text-yellow-600"
                        >
                            Signup
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </AppLayout>
</template>