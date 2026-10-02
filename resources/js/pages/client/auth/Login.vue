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
import CarouselSection from '@/pages/client/home/section/ImageCarousel.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle } from '@lucide/vue';


interface Form {
    email: string;
    password: string;
    remember: boolean
}

const form = useForm<Form>();



const submit = () => {

} 



</script>

<template>

    <AppLayout>
        <Head title="Login" />
        <div class="grid grid-cols-2">
            <div class="col-span-1 bg-red-100 w-full h-full">
                <img 
                    class="object-cover"
                    :src="getImageUrl('upload/agency/auth_bg.jpg')"/>
            </div> 
            <div class="col-span-1 w-full flex items-center justify-center">

               <div class="flex flex-col gap-4 border border-zinc-200 p-8 w-1/2 item-center">
                    <div class="self-center flex flex-col items-center gap-2">
                        <AppLogoIcon class="size-24" />
                        <h1 class="font-bold text-lg">LOGIN ACCOUNT</h1>
                    </div>
                    <form @submit.prevent="submit" class="flex flex-col gap-2">

                        <div class="grid gap-6">
                            <div class="grid gap-2">
                                <Label for="email">Email address</Label>
                                <Input id="email" type="email" required autofocus tabindex="1" autocomplete="email"
                                    v-model="form.email" placeholder="example@mail.com"
                                    class="bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none" />
                                <InputError :message="form.errors.email" />
                            </div>

                            <div class="grid gap-2">
                                <div class="flex items-center justify-between">
                                    <Label for="password">Password</Label>
                                    <TextLink href="#"  class="text-sm text-zinc-600" :tabindex="5"> 
                                        Forgot password?
                                    </TextLink>
                                </div>
                                <PasswordInput id="password" required tabindex="2" autocomplete="current-password"
                                    v-model="form.password" placeholder="Password"
                                    icon-class="text-zinc-400 hover:text-zinc-300"
                                    class="bg-[var(--primary-custom)] focus:outline-none border border-[var(--muted-custom)] text-sm md:text-base rounded-none" />
                                    
                                <InputError :message="form.errors.password" />
                            </div>

                            <div class="flex items-center justify-between" tabindex="3">
                                <Label for="remember" class="flex items-center space-x-3">
                                    <Checkbox id="remember" 
                                        v-model="form.remember"
                                        @update:checked="(value) => form.remember = value"
                                        tabindex="4"
                                        class="bg-[rgb(var(--app-color-background))] 
                                        data-[state=checked]:text-background data-[state=checked]:border-[rgb(var(--app-color-primary))] data-[state=checked]:bg-[rgb(var(--app-color-primary))]
                                        dark:bg-[rgb(var(--app-color-background))] dark:data-[state=checked]:text-background dark:data-[state=checked]:border-[rgb(var(--app-color-primary))] dark:data-[state=checked]:bg-[rgb(var(--app-color-primary))]" />
                                    <span>Remember me</span>
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                :disabled="form.processing"
                                class="bg-[var(--secondary-custom)] text-[var(--primary-custom)] py-2 px-4 hover:bg-[var(--tertiary-custom)] duration-75 ease-in rounded-none"
                            >
                                <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                                Login
                            </Button>
                        </div>

                    </form>

                    <div class="flex items-center justify-center  gap-2 text-sm text-zinc-600">
                        <p>Don't have an account?</p> 
                        <a href="#"  class="underline font-bold text-yellow-600">Signup</a>
                    </div>
               </div>
            </div>
        </div>
    </AppLayout>
</template>
