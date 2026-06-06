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
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-vue-next';
import { toast } from 'vue-sonner'
import { Package } from '@/types/package';
import { formatItinerariesForEdit } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

const unescapeJsonString = (value?: string | null): string => {
    if (!value) {
        return '';
    }

    return value
        .replace(/\\\\/g, '\\')
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t');
};

const normalizeBlock = (items?: string[]): string => {
    return items ? items.map(unescapeJsonString).join('\n') : '';
};
const normalizeBlockWithEmptyLines = (items?: string[]): string => {
    return items ? items.map(unescapeJsonString).join('\n') : '';
};

const props = defineProps<{package: Package}>();

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
        title: 'Edit',
        href: route('admin.packages.edit', { id: props.package.id }),
    },
];


type Props = {
    name: string
    duration: string | number
    tag: string
    description: string
    base_price: string | number
    down_payment: string | number
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
    name: props.package.name ?? '',
    duration: props.package.duration ?? '',
    tag: props.package.tag ?? '',
    description: unescapeJsonString(props.package.description ?? ''),
    base_price: props.package.base_price ?? '',
    down_payment: props.package.down_payment ?? '',
    inclusions: normalizeBlockWithEmptyLines(props.package.inclusions_array),
    exclusions: normalizeBlockWithEmptyLines(props.package.exclusions_array),
    highlights: normalizeBlock(props.package.highlights_array),
    destination: unescapeJsonString(props.package.destination ?? ''),
    itineraries: props.package.itineraries_array
    ? formatItinerariesForEdit(
          props.package.itineraries_array,
          unescapeJsonString
      )
    : '',
    selling_start_date: props.package.selling_start_date ?? '',
    selling_end_date: props.package.selling_end_date ?? '',
    season: unescapeJsonString(props.package.season ?? ''),
    notes: normalizeBlock(props.package.notes_array),
    is_foreign_only: props.package.is_foreign_only ?? false
});

const submit = () => {
    form.put(route('admin.packages.update', { id: props.package.id }), {
        onFinish: () => {
            console.log('Submitted');
        },
        
        onSuccess: () => {
            console.log('Success');
            toast.success('Saved successfully')
        },

        onError: (err) => {
            console.log(err);
            toast.error('Something went wrong')
        }
    });
};



</script>

<template>
    <Head title="Edit Package" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="relative min-h-[100vh] flex-1 rounded-smr md:min-h-min p-6 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                <div class="flex flex-col space-y-6 max-w-4xl">
                    <HeadingSmall title="Edit package" description="Modify the package information for your service" />

                    <form @submit.prevent="submit" class="flex flex-col gap-2">
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="">
                                <Label for="name">
                                    Name <span class="text-[var(--warning-custom)]">*</span>
                                </Label>
                                <Input id="name" class="mt-1 block w-full" v-model="form.name" autocomplete="name" placeholder="e.g. Premium Boracay Package" />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.name" />
                                </div>
                            </div>

                            <div class="grid gap-2">
                                 <Label for="duration">
                                    Duration <span class="text-[var(--warning-custom)]">*</span>
                                </Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    class="mt-1 block w-full"
                                    v-model="form.duration"
                                    autocomplete="duration"
                                    placeholder="How many days is your trip?"
                                Mentioned component updates
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.duration" />
                                </div>
                            </div>
                        </div>
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="base_price">
                                    Base Price <span class="text-[var(--warning-custom)]">*</span>
                                </Label>
                                <CurrencyInput id="base_price" class="mt-1 block w-full" v-model="form.base_price"  autocomplete="base_price" placeholder="0.00" />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.base_price" />
                                </div>
                            </div>
                            <div class="grid gap-2">
                                <Label for="down_payment">
                                    Down Payment <span class="text-[var(--muted-custom)]">(Optional)</span>
                                </Label>
                                <CurrencyInput id="down_payment" class="mt-1 block w-full" v-model="form.down_payment" autocomplete="down_payment" placeholder="0.00" />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.down_payment" />
                                </div>
                            </div>
                        </div>

                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="destination">
                                    Destination <span class="text-[var(--warning-custom)]">*</span>
                                </Label>
                                <Input id="destination" class="mt-1 block w-full" v-model="form.destination" autocomplete="destinations" placeholder="e.g. Boracay, Philippines" />
                                <div class="min-h-[1.5rem]">
                                    <InputError  :message="form.errors.destination" />
                                </div>
                            </div>

                            <div class="grid gap-2">
                                <Label for="season" class="flex items-center gap-1">
                                    <InfoTooltip
                                        content="Value must only: 'All Seasons', 'Winter', 'Spring', 'Summer', 'Autumn'" />
                                    Season <span class="text-[var(--warning-custom)]">*</span>
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

                        <div class="grid gap-2 md:grid-cols-2">
                            <div class="grid gap-2">
                                <Label for="selling_start_date">
                                    Selling Start Date <span class="text-[var(--muted-custom)]">(Optional)</span>
                                </Label>
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
                                <Label for="selling_end_date">
                                    Selling End Date <span class="text-[var(--warning-custom)]">*</span>
                                </Label>
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
                                <Label for="tag">
                                    Tag <span class="text-[var(--muted-custom)]">(Optional)</span>
                                </Label>
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

                        <div class="grid gap-2">
                             <Label for="description">
                                Description <span class="text-[var(--warning-custom)]">*</span>
                            </Label>
                            <Textarea id="description" rows="8" class="mt-1 block w-full" v-model="form.description" autocomplete="description" placeholder="Tell us about this package?" />
                            <div class="min-h-[1.5rem]">
                                <InputError  :message="form.errors.description" />
                            </div>
                        </div>
                        
                        <div class="grid gap-6 md:grid-cols-2">
                            <div class="grid gap-2">
                                 <Label for="inclusions" class="flex items-center gap-1">
                                    <InfoTooltip content="Separate each inclusion group using an empty line.

                                    Hotel accommodation
                                    Tour Guide
                                    English speaking tour guide
                                    Professional tour guide" />
                                    Inclusions <span class="text-[var(--warning-custom)]">*</span>

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
                                <Label for="exclusions" class="flex items-center gap-1">
                                    <InfoTooltip content="Separate each exclusion group using an empty line.

                                    Hotel accommodation
                                    Tour Guide
                                    English speaking tour guide
                                    Professional tour guide" />
                                    Exclusions <span class="text-[var(--warning-custom)]">*</span>
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
                             <Label for="highlights" class="flex items-center gap-1">
                                <InfoTooltip content="Separate each highlight group using a new line.

                                    Hotel accommodation
                                    Tour Guide
                                    English speaking tour guide
                                    Professional tour guide" />
                                Highlights <span class="text-[var(--warning-custom)]">*</span>
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
                            <Label for="itineraries" class="flex items-center gap-1">
                                <InfoTooltip content="Each itinerary group must follow this format:

                                Title of itinerary (first line)
                                Activity details (next lines)

                                Example:

                                Manila to Sydney | Arrival & Free Time
                                Depart Manila via flight...
                                Meals included...

                                Sydney City Tour & Harbour Cruise
                                Visit Sydney Opera House
                                Explore Bondi Beach
                                Lunch cruise experience" />
                                Itineraries <span class="text-[var(--warning-custom)]">*</span>
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
                            <Label for="notes" class="flex items-center gap-1">
                                <InfoTooltip content="Use this format to each notes group.

                                    Note 1.
                                    Note 2.
                                    Note 3." />
                                Notes <span class="text-[var(--muted-custom)]">(Optional)</span>
                            </Label>

                            <Textarea
                                id="notes"
                                rows="4"
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
                              <div class="flex items-center space-x-2">
                                    <Switch id="foreign-only"  v-model:modelValue="form.is_foreign_only"  />
                                    <Label for="foreign-only">Make Package For Foreign Only</Label>
                                </div>
                        </div>
                        <div class="flex w-full justify-end">
                      
                            <Button type="submit" class="mt-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                                <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
                                Update Package
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>