<script setup lang="ts">

import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/vue3';

import { Button } from '@/components/ui/button';
import HeadingSmall from '@/components/HeadingSmall.vue';

import Label from '@/components/ui/label/Label.vue';
import Input from '@/components/ui/input/Input.vue';
import InputError from '@/components/InputError.vue';
import { Icon } from '@iconify/vue';
import CurrencyInput from '@/components/CurrencyInput.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import Tooltip from '@/components/ui/tooltip/Tooltip.vue';
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue';
import InfoTooltip from '@/components/InfoTooltip.vue';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Packages',
        href: route('admin.packages'),
    },
    {
        title: 'New',
        href: route('admin.packages.create'),
    },
];


type Props = {
    name: string
    tag?: string | null
    description: string
    base_price: string
    inclusions: string
    exclusions: string
}

const form = useForm<Props>({
    name: '',
    tag: '',
    description: '',
    base_price: '',
    inclusions: '',
    exclusions: '',
});

const submit = () => {
    // form.post(route('admin.packages.store'), {
    //     onFinish: () => form.reset('password', 'password_confirmation'),
    // });
};

</script>

<template>
    <Head title="New Package" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <div class="flex flex-col space-y-6 max-w-4xl">
                    <HeadingSmall title="Creating a new package" description="Create a package that can be added for your service" />

                    <form @submit.prevent="submit" class="space-y-6">
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="name">Name</Label>
                                <Input id="name" class="mt-1 block w-full" :v-model="form.name" required autocomplete="name" placeholder="e.g. Premium Boracay Package" />
                                <InputError class="mt-2" :message="form.errors.name" />
                            </div>

                            <div class="grid gap-2">
                                <Label for="tag">Tag <span class="text-[var(--muted-custom)]">(Optional)</span></Label>
                                <Input
                                    id="tag"
                                    type="text"
                                    class="mt-1 block w-full"
                                    :v-model="form.tag"
                                    autocomplete="tag"
                                    placeholder="e.g. Group tour"
                                />
                                <InputError class="mt-2" :message="form.errors.tag" />
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="tag">Base Price</Label>
                                <CurrencyInput id="base_price" class="mt-1 block w-full" :v-model="form.base_price" required autocomplete="base_price" placeholder="e.g. 4400" />
                                <InputError class="mt-2" :message="form.errors.tag" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="tag">Down Payment <span class="text-[var(--muted-custom)]">(Optional)</span></Label>
                                <CurrencyInput id="base_price" class="mt-1 block w-full" :v-model="form.base_price" required autocomplete="base_price" placeholder="e.g. 4400" />
                                <InputError class="mt-2" :message="form.errors.tag" />
                            </div>
                        </div>

                        <div class="grid gap-2">
                            <Label for="description">Description</Label>
                            <Textarea id="description" rows="4" class="mt-1 block w-full" :v-model="form.description" required autocomplete="description" placeholder="Tell us about this package?" />
                            <InputError class="mt-2" :message="form.errors.description" />
                        </div>

                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="inclusions" class="flex items-center gap-2">
                                    Inclusions
                                    <InfoTooltip
                                        content="Separate each inclusion group using an empty line.

                                        1. Hotel accommodation
                                            Breakfast buffet

                                        2. Personal expenses
                                            Optional tours
                                            Additional meals"
                                    />
                                </Label>
                                <Textarea id="inclusions" rows="12" class="mt-1 block w-full" :v-model="form.inclusions" required autocomplete="description" placeholder="What's included to this package?" />
                                <InputError class="mt-2" :message="form.errors.inclusions" />
                            </div>
                            <div class="grid gap-2">
                               <Label for="exclusions" class="flex items-center gap-2">
                                    Exclusions
                                    <InfoTooltip
                                        content="Separate each exclusion group using an empty line.

                                        1. Hotel accommodation
                                            Breakfast buffet

                                        2. Personal expenses
                                            Optional tours
                                            Additional meals"
                                    />
                                </Label>

                                <Textarea
                                    id="exclusions"
                                    rows="12"
                                    class="mt-1 block w-full"
                                    v-model="form.exclusions"
                                    required
                                    autocomplete="description"
                                    placeholder="What's not included in this package?"
                                />

                                <InputError
                                    class="mt-2"
                                    :message="form.errors.exclusions"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
