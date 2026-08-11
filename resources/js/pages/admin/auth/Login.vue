<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthBase from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';


const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('admin.login.store'), {
        onFinish: () => form.reset('password'),
    });
};

</script>

<template>
    <AuthBase title="Admin Panel" description="Please enter your registered admin credentials">

        <Head title="Log in" />

        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input id="email" type="email" required autofocus tabindex="1" autocomplete="email"
                        v-model="form.email" placeholder="admin@example.com"
                        class="bg-[rgb(var(--app-color-background))] dark:bg-background" />
                    <InputError :message="form.errors.email" />
                </div>

                <div class="grid gap-2">
                    <div class="flex items-center justify-between">
                        <Label for="password">Password</Label>
                        <TextLink :href="route('admin.forgot.password')" class="text-sm" :tabindex="5"> Forgot password?
                        </TextLink>
                    </div>
                    <PasswordInput id="password" required tabindex="2" autocomplete="current-password"
                        v-model="form.password" placeholder="Password"
                        class="bg-[rgb(var(--app-color-background))] dark:bg-background" />
                    <InputError :message="form.errors.password" />
                </div>

                <div class="flex items-center justify-between" tabindex="3">
                    <Label for="remember" class="flex items-center space-x-3">
                        <Checkbox id="remember" v-model:checked="form.remember" tabindex="4"
                            class="bg-[rgb(var(--app-color-background))] 
                            data-[state=checked]:text-background data-[state=checked]:border-[rgb(var(--app-color-primary))] data-[state=checked]:bg-[rgb(var(--app-color-primary))]
                            dark:bg-[rgb(var(--app-color-background))] dark:data-[state=checked]:text-background dark:data-[state=checked]:border-[rgb(var(--app-color-primary))] dark:data-[state=checked]:bg-[rgb(var(--app-color-primary))]" />
                        <span>Remember me</span>
                    </Label>
                </div>

                <Button type="submit"
                    class="mt-4 w-full bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary)/0.8)]"
                    tabindex="4" :disabled="form.processing">
                    <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                    Log in
                </Button>
            </div>
        </form>
    </AuthBase>
</template>
