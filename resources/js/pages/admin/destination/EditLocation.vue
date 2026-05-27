<script setup lang="ts">
import { ref } from 'vue';
import { Head, useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { type Destination } from '@/types/destination';
import { truncateText } from '@/lib/utils';

// Components & Shadcn Primitives
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/InputError.vue';

// Icons
import {
    ImagePlus,
    X,
    LoaderCircle,
    MapPin,
    Map,
    ChevronLeft,
    Save,
    Compass,
    RefreshCcw
} from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { DestinationLocation } from '@/types/destination-location';

interface Props {
    destination: Destination;
    location: DestinationLocation;
}

const props = defineProps<Props>();

const originalImageUrl = props.location.image?.url ?? null;

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Destinations', href: route('admin.destinations') },
    { title: truncateText(props.destination.title, 20), href: route('admin.destinations.details', { id: props.destination.id }) },
    { title: 'Edit Location', href: route('admin.destinations.locations.edit', { destID: props.destination.id, id: props.location.id }) },
];

type FormData = {
    name: string;
    description: string;
    map_link: string;
    image: File | null;
    remove_image: boolean;
};

// --- INERTIA FORM CONFIGURATION ---
const form = useForm<FormData>({
    name: props.location.name,
    description: props.location.description,
    map_link: props.location.map_link ?? '',
    image: null,
    remove_image: false,
});

// Image Preview Lifecycle State
const imagePreview = ref<string | null>(originalImageUrl);
const isBlobPreview = ref(false);
const removeImage = ref(false);

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];

        if (isBlobPreview.value && imagePreview.value) {
            URL.revokeObjectURL(imagePreview.value);
        }

        form.image = file;
        form.remove_image = false;
        imagePreview.value = URL.createObjectURL(file);
        isBlobPreview.value = true;
        removeImage.value = false;
    }
};

const clearSelectedImage = () => {
    if (isBlobPreview.value && imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }

    form.image = null;
    imagePreview.value = null;
    isBlobPreview.value = false;
    removeImage.value = originalImageUrl !== null;
    form.remove_image = originalImageUrl !== null;
};

const resetForm = () => {
    if (isBlobPreview.value && imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }

    form.reset();
    form.image = null;
    form.remove_image = false;
    imagePreview.value = originalImageUrl;
    isBlobPreview.value = false;
    removeImage.value = false;
};

const submitForm = () => {
    if (removeImage.value) {
        form.remove_image = true;
    }

    form
        .transform((data) => ({
            ...data,
            _method: 'put',
        }))
        .post(route('admin.destinations.locations.update', {
            destID: props.destination.id,
            id: props.location.id,
        }), {
            forceFormData: true,
            preserveScroll: true,

            onSuccess: () => {
                toast.success('Location updated successfully!');
            },

            onError: () => {
                toast.error('Failed to update location.');
            },
        });
};
</script>

<template>

    <Head title="Edit Destination Location" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="p-6 mx-auto w-full space-y-6">

            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
                <div>
                    <h1
                        class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                        Edit Destination Location
                    </h1>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Update the specific localized attraction parameters, details, or cover imagery asset rules.
                    </p>
                </div>
                <Button variant="outline" size="sm" as-child
                    class="h-9 text-xs gap-1.5 bg-white dark:bg-zinc-950 dark:border-zinc-800">
                    <Link :href="route('admin.destinations.details', { id: destination.id })">
                        <ChevronLeft class="w-3.5 h-3.5" /> Back
                    </Link>
                </Button>
            </div>

            <form @submit.prevent="submitForm">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

                    <div class="md:col-span-7 space-y-4">
                        <Card class="dark:border-zinc-800 shadow-sm">
                            <CardHeader class="p-4 pb-2">
                                <CardTitle class="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Location
                                    Parameters</CardTitle>
                                <CardDescription class="text-xs">Specify regional metadata configurations for this
                                    sub-location entity.</CardDescription>
                            </CardHeader>
                            <CardContent class="p-4 pt-2 space-y-4">

                                <div class="space-y-1.5">
                                    <Label class="text-xs font-medium text-zinc-400">Parent Destination Context</Label>
                                    <div
                                        class="flex items-center gap-2 px-3 h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 text-xs">
                                        <Compass class="w-4 h-4 text-indigo-500 shrink-0" />
                                        <span class="font-medium truncate">{{ destination.title }}</span>
                                        <span class="text-[10px] text-zinc-400 font-normal">({{ destination.country
                                            }})</span>
                                    </div>
                                    <div class="min-h-[0.5rem]" />
                                </div>

                                <div class="space-y-1.5">
                                    <Label for="name" class="text-xs font-medium">Location Name <span
                                            class="text-red-500">*</span></Label>
                                    <div class="relative">
                                        <MapPin class="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                        <Input id="name" type="text" v-model="form.name"
                                            placeholder="e.g., Shinjuku Gyoen National Garden"
                                            class="pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800"
                                            :class="{ 'border-red-500 focus-visible:ring-red-500': form.errors.name }" />
                                    </div>
                                    <div class="min-h-[1.5rem]">
                                        <InputError :message="form.errors.name" />
                                    </div>
                                </div>

                                <div class="space-y-1.5">
                                    <div class="flex justify-between items-center">
                                        <Label for="map_link" class="text-xs font-medium">Google Maps URL /
                                            Coordinates</Label>
                                        <span class="text-[10px] text-zinc-400 font-normal italic">Optional</span>
                                    </div>
                                    <div class="relative">
                                        <Map class="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                        <Input id="map_link" type="url" v-model="form.map_link"
                                            placeholder="e.g., https://maps.google.com/?q=..."
                                            class="pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800"
                                            :class="{ 'border-red-500 focus-visible:ring-red-500': form.errors.map_link }" />
                                    </div>
                                    <div class="min-h-[1.5rem]">
                                        <InputError :message="form.errors.map_link" />
                                    </div>
                                </div>

                                <div class="space-y-1.5">
                                    <Label for="description" class="text-xs font-medium">Spot Overview Summary <span
                                            class="text-red-500">*</span></Label>
                                    <Textarea id="description" v-model="form.description" rows="5"
                                        placeholder="Detail entry rules, points of interest, coordinate guides..."
                                        class="text-xs dark:bg-zinc-950 dark:border-zinc-800 resize-none leading-relaxed"
                                        :class="{ 'border-red-500 focus-visible:ring-red-500': form.errors.description }" />
                                    <div class="min-h-[1.5rem]">
                                        <InputError :message="form.errors.description" />
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                    <div class="md:col-span-5 space-y-4">
                        <Card class="dark:border-zinc-800 shadow-sm overflow-hidden">
                            <CardHeader class="p-4 pb-2">
                                <CardTitle class="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Location
                                    Thumbnail</CardTitle>
                                <CardDescription class="text-xs">Upload an asset showcasing this specific local hub.
                                </CardDescription>
                            </CardHeader>
                            <CardContent class="p-4 pt-2">

                                <div v-if="!imagePreview"
                                    class="relative group border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-150">
                                    <label
                                        class="flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[190px]">
                                        <ImagePlus
                                            class="w-8 h-8 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-105 transition" />
                                        <span class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Select
                                            Image File</span>
                                        <span class="text-[10px] text-zinc-400 mt-0.5">Supports PNG, JPG, or WEBP
                                            formats</span>
                                        <input type="file" accept="image/*" class="hidden" @change="handleFileSelect" />
                                    </label>
                                </div>

                                <div v-else
                                    class="relative aspect-[4/3] w-full rounded-lg overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group">
                                    <img :src="imagePreview" alt="Sub-Location asset preview"
                                        class="w-full h-full object-cover" />
                                    <div
                                        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-150">
                                        <Button type="button" variant="destructive" size="sm"
                                            class="h-8 text-xs font-medium flex items-center gap-1.5 shadow-md"
                                            @click="clearSelectedImage">
                                            <X class="w-3.5 h-3.5" /> Remove Photo
                                        </Button>
                                    </div>
                                </div>

                                <p v-if="removeImage" class="text-xs text-red-500 mt-2">Current image will be removed
                                    when you save.</p>
                                <div class="min-h-[1.5rem] mt-2">
                                    <InputError :message="form.errors.image" />
                                </div>

                            </CardContent>

                            <CardFooter
                                class="bg-zinc-50/50 dark:bg-zinc-900/40 px-4 py-3 border-t dark:border-zinc-800 flex justify-end items-center gap-2">
                                <Button type="button" variant="outline" size="sm" class="h-9 text-xs gap-1.5"
                                    @click="resetForm">
                                    <RefreshCcw class="w-3.5 h-3.5" /> Reset
                                </Button>
                                <Button type="submit" size="sm" class="h-8 text-xs gap-1.5 shadow-sm px-4"
                                    :disabled="form.processing">
                                    <LoaderCircle v-if="form.processing" class="w-3.5 h-3.5 animate-spin" />
                                    <Save v-else class="w-3.5 h-3.5" /> Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </form>

        </div>
    </AppLayout>
</template>