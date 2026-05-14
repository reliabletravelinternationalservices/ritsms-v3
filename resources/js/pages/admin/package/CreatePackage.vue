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
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-vue-next';
import { toast } from 'vue-sonner'


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
    tag: string
    description: string
    base_price: string
    down_payment: string
    inclusions: string
    exclusions: string
    highlights: string
    destination: string
    itineraries: string
    selling_start_date: string
    selling_end_date: string
    season: string
    notes: string
    is_foreign_only: boolean
}

const form = useForm<Props>({
    name: '',
    duration: '',
    tag: '',
    description: '',
    base_price: '',
    down_payment: '',
    inclusions: '',
    exclusions: '',
    highlights: '',
    destination: '',
    itineraries: '',
    selling_start_date: '',
    selling_end_date: '',
    season: '',
    notes: '',
    is_foreign_only: false
});

const submit = () => {
    console.log(form);
    form.post(route('admin.packages.store'), {
        onFinish: () => {
            console.log('Submitted');
        },
        
        onSuccess: () => {
            form.reset();
            console.log('Success');
            toast.success('Saved successfully')
        },

        onError: (err) => {
            console.log(err);
            toast.error('Something went wrong')
        }
    });
};


// const seedData = () => {
//     form.name = 'Premium Boracay Package';
//     form.duration = '7';
//     form.tag = 'Boracay';
//     form.description = 'This is a premium package for Boracay';
//     form.base_price = '5000';
//     form.down_payment = '0';
//     form.inclusions = 'Inclusions';
//     form.exclusions = 'Exclusions';
//     form.highlights = 'Highlights';
//     form.destination = 'Destinations';
//     form.itineraries = 'TITLE: SAMPLE ITINERARY \nACTIVITY: \nSAMPLE ACTIVITY1 \nSAMPLE ACTIVITY2';
//     form.selling_start_date = '2023-01-01';
//     form.selling_end_date = '2023-12-31';
//     form.season = 'Summer';
//     form.notes = 'Notes';
//     form.is_foreign_only = false;
// }

// seedData();

</script>

<template>
    <Head title="New Package" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <div class="flex flex-col space-y-6 max-w-4xl">
                    <HeadingSmall title="Creating a new package" description="Create a package that can be added for your service" />

                    <form @submit.prevent="submit" class="flex flex-col gap-2">
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="">
                                <Label for="name">Name</Label>
                                <Input id="name" class="mt-1 block w-full" v-model="form.name" autocomplete="name" placeholder="e.g. Premium Boracay Package" />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.name" />
                                </div>
                            </div>

                            <div class="grid gap-2">
                                <Label for="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    class="mt-1 block w-full"
                                    v-model="form.duration"
                                    autocomplete="duration"
                                    placeholder="How many days is your trip?"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.duration" />
                                </div>
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="base_price">Base Price</Label>
                                <CurrencyInput id="base_price" class="mt-1 block w-full" v-model="form.base_price"  autocomplete="base_price" placeholder="0.00" />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.base_price" />
                                </div>
                            </div>
                            <div class="grid gap-2">
                                <Label for="down_payment">Down Payment <span class="text-[var(--muted-custom)]">(Optional)</span></Label>
                                <CurrencyInput id="down_payment" class="mt-1 block w-full" v-model="form.down_payment" autocomplete="down_payment" placeholder="0.00" />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.down_payment" />
                                </div>
                            </div>
                        </div>

                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="destination">Destination</Label>
                                <Input id="destination" class="mt-1 block w-full" v-model="form.destination" autocomplete="destinations" placeholder="e.g. Boracay, Philippines" />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.destination" />
                                </div>
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
                                    v-model="form.season"
                                    autocomplete="season"
                                    placeholder="e.g. Winter"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.season" />
                                </div>
                            </div>
                        </div>

                        <!-- Selling DATES -->
                        <div class="grid gap-2 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="selling_start_date">Selling Start Date <span class="text-[var(--muted-custom)]">(Optional)</span></Label>
                                <Input
                                    id="selling_start_date"
                                    type="date"
                                    class="mt-1 block w-full"
                                    v-model="form.selling_start_date"
                                    autocomplete="selling_start_date"
                                    placeholder="e.g. Group tour"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.selling_start_date" />
                                </div>
                            </div>
                            <div class="grid gap-2">
                                <Label for="selling_end_date">Selling End Date</Label>
                                <Input
                                    id="selling_end_date"
                                    type="date"
                                    class="mt-1 block w-full"
                                    v-model="form.selling_end_date"
                                    autocomplete="selling_end_date"
                                    placeholder="e.g. Group tour"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.selling_end_date" />
                                </div>
                            </div>
                        </div>
                        <div class="grid gap-2 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="tag">Tag <span class="text-[var(--muted-custom)]">(Optional)</span></Label>
                                <Input
                                    id="tag"
                                    type="text"
                                    class="mt-1 block w-full"
                                    v-model="form.tag"
                                    autocomplete="tag"
                                    placeholder="e.g. Group tour"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.tag" />
                                </div>
                            </div>
                        </div>

                        <!-- DESCRIPTION -->
                        <div class="grid gap-2">
                            <Label for="description">Description</Label>
                            <Textarea id="description" rows="4" class="mt-1 block w-full" v-model="form.description" autocomplete="description" placeholder="Tell us about this package?" />
                            <div class="min-h-[1.5rem]">
                                <InputError  :message="form.errors.tag" />
                            </div>
                        </div>
                        
                        <!-- INCLUSIONS & EXCLUSIONS -->
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="inclusions" class="flex items-center gap-2">
                                    Inclusions
                                    <InfoTooltip
                                        content="Separate each inclusion group using an empty line.

                                    Hotel accommodation
                                    Tour Guide
                                    English speaking tour guide
                                    Professional tour guide"
                                    />
                                </Label>
                                <Textarea 
                                    id="inclusions" 
                                    rows="10" 
                                    class="mt-1 block w-full" 
                                    v-model="form.inclusions" 
                                    autocomplete="inclusions" 
                                    placeholder="What's included to this package?" 
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.inclusions" />
                                </div>
                            </div>
                            <div class="grid gap-2">
                               <Label for="exclusions" class="flex items-center gap-2">
                                    Exclusions
                                    <InfoTooltip
                                        content="Separate each exclusion group using an empty line.

                                    Hotel accommodation
                                    Tour Guide
                                    English speaking tour guide
                                    Professional tour guide"
                                    />
                                </Label>

                                <Textarea
                                    id="exclusions"
                                    rows="10"
                                    class="mt-1 block w-full"
                                    v-model="form.exclusions"
                                    autocomplete="exclusions"
                                    placeholder="What's not included in this package?"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.exclusions" />
                                </div>
                            </div>
                        </div>

                        <div class="grid gap-2">
                            <Label for="highlights" class="flex items-center gap-2">
                                Highlights
                                <InfoTooltip
                                    content="Separate each highlight group using a new line.

                                    Hotel accommodation
                                    Tour Guide
                                    English speaking tour guide
                                    Professional tour guide"
                                />
                            </Label>

                            <Textarea
                                id="highlights"
                                rows="10"
                                class="mt-1 block w-full"
                                v-model="form.highlights"
                                autocomplete="highlights"
                                placeholder="What's different about this package?"
                            />
                            <div class="min-h-[1.5rem]">
                                <InputError  :message="form.errors.highlights" />
                            </div>
                        </div>
                        <div class="grid gap-2">
                            <Label for="itineraries" class="flex items-center gap-2">
                                Itineraries
                                <InfoTooltip
                                    content="Use this format to each itineraries group.

                                    TITLE: Hotel accommodation
                                    ACTIVITIES:
                                        4 to 5 stars hotel
                                        Breakfast buffet

                                    TITLE: Tour Guide
                                    ACTIVITY:
                                        English speaking tour guide
                                        Professional tour guide"
                                />
                            </Label>

                            <Textarea
                                id="itineraries"
                                rows="10"
                                class="mt-1 block w-full"
                                v-model="form.itineraries"
                                autocomplete="itineraries"
                                placeholder="Any activities included in this package?"
                            />
                            <div class="min-h-[1.5rem]">
                                <InputError  :message="form.errors.itineraries" />
                            </div>
                        </div>
                        <div class="grid gap-2">
                            <Label for="notes" class="flex items-center gap-2">
                                Notes
                                <InfoTooltip
                                    content="Use this format to each notes group.

                                    Note 1.
                                    Note 2.
                                    Note 3."
                                />
                            </Label>

                            <Textarea
                                id="notes"
                                rows="10"
                                class="mt-1 block w-full"
                                v-model="form.notes"
                                autocomplete="notes"
                                placeholder="What else the client should know about this package?"
                            />
                            <div class="min-h-[1.5rem]">
                                <InputError  :message="form.errors.notes" />
                            </div>
                        </div>
                        
                        
                        <div class="flex w-full justify-start">
                            <SwitchWithLabel :is-checked="form.is_foreign_only" @change="form.is_foreign_only = $event" label="Make Package For Foreign Only" />
                        </div>
                        <div class="flex w-full justify-end">
                      
                            <Button type="submit" class="mt-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                                Create Package
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
