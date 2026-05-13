<script setup lang="ts">

import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/vue3';
import HeadingSmall from '@/components/HeadingSmall.vue';
import Label from '@/components/ui/label/Label.vue';
import Input from '@/components/ui/input/Input.vue';
import InputError from '@/components/InputError.vue';
import CurrencyInput from '@/components/CurrencyInput.vue';
import Textarea from '@/components/ui/textarea/Textarea.vue';
import InfoTooltip from '@/components/InfoTooltip.vue';
import SwitchWithLabel from '@/components/SwitchWithLabel.vue';


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
    duration: string
    tag?: string | null
    description: string
    base_price: string
    inclusions: string
    exclusions: string
    highlights: string
    destinations: string
    itineraries: string
    selling_start_date?: string | null
    selling_end_date: string
    season: string
    is_foreign_only: boolean
}

const form = useForm<Props>({
    name: '',
    duration: '',
    tag: '',
    description: '',
    base_price: '',
    inclusions: '',
    exclusions: '',
    highlights: '',
    destinations: '',
    itineraries: '',
    selling_start_date: '',
    selling_end_date: '',
    season: '',
    is_foreign_only: false
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

                    <form @submit.prevent="submit" class="space-y-8">
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="name">Name</Label>
                                <Input id="name" class="mt-1 block w-full" :v-model="form.name" required autocomplete="name" placeholder="e.g. Premium Boracay Package" />
                                <InputError class="mt-2" :message="form.errors.name" />
                            </div>

                            <div class="grid gap-2">
                                <Label for="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    class="mt-1 block w-full"
                                    :v-model="form.duration"
                                    autocomplete="duration"
                                    required
                                    placeholder="How many days is your trip?"
                                />
                                <InputError class="mt-2" :message="form.errors.duration" />
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="base_price">Base Price</Label>
                                <CurrencyInput id="base_price" class="mt-1 block w-full" :v-model="form.base_price" required autocomplete="base_price" placeholder="0.00" />
                                <InputError class="mt-2" :message="form.errors.tag" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="down_payment">Down Payment <span class="text-[var(--muted-custom)]">(Optional)</span></Label>
                                <CurrencyInput id="down_payment" class="mt-1 block w-full" :v-model="form.base_price" required autocomplete="down_payment" placeholder="0.00" />
                                <InputError class="mt-2" :message="form.errors.tag" />
                            </div>
                        </div>

                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="destinations">Destination</Label>
                                <Input id="destinations" class="mt-1 block w-full" :v-model="form.destinations" required autocomplete="destinations" placeholder="e.g. Boracay, Philippines" />
                                <InputError class="mt-2" :message="form.errors.description" />
                            </div>

                            <div class="grid gap-2">
                                <Label for="season" class="flex items-center gap-2">
                                    Season
                                    <InfoTooltip
                                        content="Value must only: 'All Seasons', 'Winter', 'Spring', 'Summer', 'Autumn'"
                                    />
                                </Label>
                                <Input
                                    id="season"
                                    type="text"
                                    class="mt-1 block w-full"
                                    :v-model="form.season"
                                    autocomplete="season"
                                    placeholder="e.g. Winter"
                                />
                                <InputError class="mt-2" :message="form.errors.tag" />
                            </div>
                        </div>
                        <div class="grid gap-2 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="selling_start_date">Selling Start Date <span class="text-[var(--muted-custom)]">(Optional)</span></Label>
                                <Input
                                    id="selling_start_date"
                                    type="date"
                                    class="mt-1 block w-full"
                                    :v-model="form.selling_start_date"
                                    autocomplete="selling_start_date"
                                    required
                                    placeholder="e.g. Group tour"
                                />
                                <InputError class="mt-2" :message="form.errors.tag" />
                            </div>
                            <div class="grid gap-2">
                                <Label for="selling_end_date">Selling End Date</Label>
                                <Input
                                    id="selling_end_date"
                                    type="date"
                                    class="mt-1 block w-full"
                                    :v-model="form.selling_end_date"
                                    autocomplete="selling_end_date"
                                    required
                                    placeholder="e.g. Group tour"
                                />
                                <InputError class="mt-2" :message="form.errors.tag" />
                            </div>
                        </div>
                        <div class="grid gap-2 md:grid-cols-2">
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
                                <Textarea 
                                    id="inclusions" 
                                    rows="10" 
                                    class="mt-1 block w-full" 
                                    :v-model="form.inclusions" 
                                    required 
                                    autocomplete="inclusions" 
                                    placeholder="What's included to this package?" 
                                />
                                <InputError 
                                    class="mt-2" 
                                    :message="form.errors.inclusions" 
                                />
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
                                    rows="10"
                                    class="mt-1 block w-full"
                                    v-model="form.exclusions"
                                    required
                                    autocomplete="exclusions"
                                    placeholder="What's not included in this package?"
                                />
                                <InputError
                                    class="mt-2"
                                    :message="form.errors.exclusions"
                                />
                            </div>
                        </div>

                        <div class="grid gap-2">
                            <Label for="highlights" class="flex items-center gap-2">
                                Highlights
                                <InfoTooltip
                                    content="Separate each highlight group using an empty line.

                                    1. Hotel accommodation
                                        4 to 5 stars hotel
                                        Breakfast buffet

                                    2. Tour Guide
                                        English speaking tour guide
                                        Professional tour guide"
                                />
                            </Label>

                            <Textarea
                                id="highlights"
                                rows="10"
                                class="mt-1 block w-full"
                                v-model="form.highlights"
                                required
                                autocomplete="highlights"
                                placeholder="What's different about this package?"
                            />
                            <InputError
                                class="mt-2"
                                :message="form.errors.highlights"
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label for="highlights" class="flex items-center gap-2">
                                Itineraries
                                <InfoTooltip
                                    content="Separate each itineraries group using an empty line.

                                    1. Hotel accommodation
                                        4 to 5 stars hotel
                                        Breakfast buffet

                                    2. Tour Guide
                                        English speaking tour guide
                                        Professional tour guide"
                                />
                            </Label>

                            <Textarea
                                id="highlights"
                                rows="10"
                                class="mt-1 block w-full"
                                v-model="form.highlights"
                                required
                                autocomplete="highlights"
                                placeholder="What's different about this package?"
                            />
                            <InputError
                                class="mt-2"
                                :message="form.errors.highlights"
                            />
                        </div>
                        
                        
                        <div class="flex w-full justify-end">
                            <SwitchWithLabel :is-checked="form.is_foreign_only" @change="form.is_foreign_only = $event" label="Make Package For Foreign Only" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
