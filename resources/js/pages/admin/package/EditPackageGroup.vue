<script setup lang="ts">
import { ref } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';

// Shadcn Primitives (Adapt import paths to your specific config if needed)
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

// Icons
import {
    ImagePlus,
    X,
    Loader2,
    PlaneTakeoff,
    PlaneLanding,
    Star,
    FolderPlus,
    RefreshCcw
} from 'lucide-vue-next';
import { type PackageGroup } from '@/types/group-package';
import { toast } from 'vue-sonner';

const props = defineProps<{ group: PackageGroup }>();

const originalImageUrl = props.group.image?.url ?? null;
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Package Groups', href: route('admin.packages.groups') },
    { title: 'Edit', href: route('admin.packages.groups.edit', { id: props.group.id }) },
];

type FormData = {
    title: string;
    description: string;
    include_as_outbound: boolean;
    include_as_inbound: boolean;
    is_featured: boolean;
    tag: string;
    image: File | null;
}

const form = useForm<FormData>({
    title: props.group.title,
    description: props.group.description ?? '',
    include_as_outbound: props.group.include_as_outbound,
    include_as_inbound: props.group.include_as_inbound,
    is_featured: props.group.is_featured,
    tag: props.group.tag ?? '',
    image: null as File | null,
});

const imagePreview = ref<string | null>(originalImageUrl);
const isBlobPreview = ref(false);

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0]) {
        const file = target.files[0];

        if (isBlobPreview.value && imagePreview.value) {
            URL.revokeObjectURL(imagePreview.value);
        }

        form.image = file;
        imagePreview.value = URL.createObjectURL(file);
        isBlobPreview.value = true;
    }
};

const clearSelectedImage = () => {
    if (isBlobPreview.value && imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }

    form.image = null;
    imagePreview.value = null;
    isBlobPreview.value = false;
};

const resetForm = () => {
    if (isBlobPreview.value && imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
    }

    form.reset();
    form.image = null;
    imagePreview.value = originalImageUrl;
    isBlobPreview.value = false;
};

const submitForm = () => {

    form
        .transform((data) => ({
            ...data,
            _method: 'put',
        }))
        .post(route('admin.packages.groups.update', {
            id: props.group.id,
        }), {
            forceFormData: true,
            onSuccess: () => {
                if (! form.image) {
                    imagePreview.value = originalImageUrl;
                    isBlobPreview.value = false;
                }
                toast.success(
                    'Package group updated successfully.'
                );
            },

            onError: () => {
                toast.error(
                    'Failed to update package group.'
                );
            },
        });
};

</script>

<template>
    <Head title="Edit Package Group" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="p-6 max-w-4xl mx-auto w-full">
            
            <!-- Page Title -->
            <div class="mb-6 flex items-center gap-2">
                <div class="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                    <FolderPlus class="w-5 h-5" />
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Edit Package Group</h1>
                    <p class="text-sm text-zinc-500 dark:text-zinc-400">Update the details for this package group.</p>
                </div>
            </div>

            <form @submit.prevent="submitForm">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    <!-- LEFT COLUMN: Main Text & Image Data (2 Cols) -->
                    <div class="md:col-span-2 space-y-6">
                        <Card class="dark:border-zinc-800">
                            <CardHeader>
                                <CardTitle class="text-base">Group Details</CardTitle>
                                <CardDescription>Basic storefront marketing identities.</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-4">
                                <!-- Title Input -->
                                <div class="space-y-1.5">
                                    <Label for="title">Collection Title <span class="text-red-500">*</span></Label>
                                    <Input 
                                        id="title" 
                                        type="text" 
                                        v-model="form.title" 
                                        placeholder="e.g., Autumn Cherry Blossom Luxury Escapes" 
                                        :class="{ 'border-red-500 focus-visible:ring-red-500': form.errors.title }"
                                    />
                                    <p v-if="form.errors.title" class="text-xs text-red-500 font-medium">{{ form.errors.title }}</p>
                                </div>
                                <div class="space-y-1.5">
                                    <Label for="tag">Tag <span class="text-sm text-zinc-400">(Optional)</span></Label>
                                    <Input 
                                        id="tag" 
                                        type="text" 
                                        v-model="form.tag" 
                                        placeholder="e.g., Hot Deals, Valid for Foreigners, Last Minute" 
                                        :class="{ 'border-red-500 focus-visible:ring-red-500': form.errors.tag }"
                                    />
                                    <p v-if="form.errors.tag" class="text-xs text-red-500 font-medium">{{ form.errors.tag }}</p>
                                </div>
                                <!-- Description Input -->
                                <div class="space-y-1.5">
                                    <Label for="description">Description Summary</Label>
                                    <Textarea 
                                        id="description" 
                                        v-model="form.description" 
                                        rows="4"
                                        placeholder="Brief summary detailing destinations, experiences, or itineraries featured inside this bundle group..." 
                                        :class="{ 'border-red-500 focus-visible:ring-red-500': form.errors.description }"
                                    />
                                    <p v-if="form.errors.description" class="text-xs text-red-500 font-medium">{{ form.errors.description }}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <!-- Single Image Uploader Block -->
                        <Card class="dark:border-zinc-800">
                            <CardHeader>
                                <CardTitle class="text-base">Cover Banner Image</CardTitle>
                                <CardDescription>Upload a single high-resolution cover image representation for this collection.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div v-if="!imagePreview" class="relative group border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-200">
                                    <label class="flex flex-col items-center justify-center p-8 text-center cursor-pointer h-48">
                                        <ImagePlus class="w-10 h-10 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-110 transition duration-200" />
                                        <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300">Click to upload file</span>
                                        <span class="text-xs text-zinc-400 mt-1">Accepts PNG, JPG, or WEBP formats</span>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            class="hidden" 
                                            @change="handleFileSelect"
                                        />
                                    </label>
                                </div>

                                <!-- Selected Preview Frame -->
                                <div v-else class="relative aspect-[16/7] w-full rounded-xl overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group">
                                    <img :src="imagePreview" alt="Upload preview asset" class="w-full h-full object-cover" />
                                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-200">
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="sm" 
                                            class="flex items-center gap-1.5"
                                            @click="clearSelectedImage"
                                        >
                                            <X class="w-4 h-4" /> Remove Image
                                        </Button>
                                    </div>
                                </div>
                                <p v-if="form.errors.image" class="text-xs text-red-500 font-medium mt-2">{{ form.errors.image }}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <!-- RIGHT COLUMN: Flags & Toggles Shelf (1 Col) -->
                    <div class="space-y-6">
                        <Card class="dark:border-zinc-800">
                            <CardHeader>
                                <CardTitle class="text-base">Visibility Scopes</CardTitle>
                                <CardDescription>Configure search indexing options.</CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-5">
                                
                                <!-- Toggle: Outbound -->
                                <div class="flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
                                    <div class="flex gap-2.5 items-start max-w-[80%]">
                                        <PlaneTakeoff class="w-4 h-4 text-sky-500 mt-1 shrink-0" />
                                        <div>
                                            <Label for="outbound" class="font-medium cursor-pointer">Include Outbound</Label>
                                            <p class="text-[11px] text-zinc-400 mt-0.5 leading-tight">Display on international travel directories.</p>
                                        </div>
                                    </div>
                                    <Switch id="outbound" v-model:modelValue="form.include_as_outbound" />
                                </div>

                                <!-- Toggle: Inbound -->
                                <div class="flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
                                    <div class="flex gap-2.5 items-start max-w-[80%]">
                                        <PlaneLanding class="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                        <div>
                                            <Label for="inbound" class="font-medium cursor-pointer">Include Inbound</Label>
                                            <p class="text-[11px] text-zinc-400 mt-0.5 leading-tight">Display on localized domestic directories.</p>
                                        </div>
                                    </div>
                                    <Switch id="inbound" v-model:modelValue="form.include_as_inbound" />
                                </div>

                                <hr class="dark:border-zinc-800" />

                                <!-- Toggle: Featured -->
                                <div class="flex items-center justify-between p-3 rounded-lg border dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
                                    <div class="flex gap-2.5 items-start max-w-[80%]">
                                        <Star class="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                                        <div>
                                            <Label for="featured" class="font-medium cursor-pointer">Feature Collection</Label>
                                            <p class="text-[11px] text-zinc-400 mt-0.5 leading-tight">Promote container on front hero banners.</p>
                                        </div>
                                    </div>
                                    <Switch id="featured" v-model:modelValue="form.is_featured" />
                                </div>

                            </CardContent>
                            <CardFooter class="bg-zinc-50/50 dark:bg-zinc-900/50 p-4 border-t dark:border-zinc-800 flex justify-end gap-3">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm"
                                    v-if="!form.processing"
                                    @click="resetForm"
                                >
                                    <RefreshCcw class="w-4 h-4"/>
                                </Button>
                                <Link :href="route('admin.packages.groups')">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm"
                                        :disabled="form.processing"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <Button 
                                    type="submit" 
                                    size="sm" 
                                    class="shadow-sm" 
                                    :disabled="form.processing"
                                >
                                    <Loader2 v-if="form.processing" class="w-4 h-4 animate-spin mr-1.5" />
                                    Save Group
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </form>

        </div>
    </AppLayout>
</template>