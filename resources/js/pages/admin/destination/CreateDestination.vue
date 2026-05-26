<script setup lang="ts">
import { ref } from 'vue';
import { Head, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';

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
    Globe, 
    Tag, 
    ChevronLeft,
    Save
} from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'Destinations', href: route('admin.destinations') },
    { title: 'New', href: route('admin.destinations.create') },
];

// --- INERTIA FORM CONFIGURATION ---
const form = useForm({
    title: '',
    description: '',
    country: '',
    tag: '',
    image: null as File | null,
});

// Image Preview Lifecycle State
const imagePreview = ref<string | null>(null);

const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        form.image = file;
        imagePreview.value = URL.createObjectURL(file);
    }
};

const clearSelectedImage = () => {
    form.image = null;
    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value);
        imagePreview.value = null;
    }
};

const submitForm = () => {
    form.post(route('admin.destinations.store'), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Destination created successfully!');
            clearSelectedImage();
        },
        onError: () => {
            toast.error('Failed to create destination. Please check the form for errors.');
        },
    });
};
</script>

<template>
    <Head title="Create Destination" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="p-6 mx-auto w-full space-y-6">
            
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
                <div>
                    <h1 class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                    New Destination
                    </h1>
                    <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Register a new geographical destination catalog container for travel packages.</p>
                </div>
                <Button 
                    variant="outline" 
                    size="sm" 
                    class="h-9 text-xs gap-1.5 bg-white dark:bg-zinc-950 dark:border-zinc-800"
                >
                    <ChevronLeft class="w-3.5 h-3.5" /> Back
                </Button>
            </div>

            <form @submit.prevent="submitForm">
                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    <div class="md:col-span-7 space-y-4">
                        <Card class="dark:border-zinc-800 shadow-sm">
                            <CardHeader class="p-4 pb-2">
                                <CardTitle class="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Destination Identity</CardTitle>
                                <CardDescription class="text-xs">Provide basic region titles, descriptions, and regional groupings.</CardDescription>
                            </CardHeader>
                            <CardContent class="p-4 space-y-2">
                                
                                <div class="space-y-1.5">
                                    <Label for="title" class="text-xs font-medium">Destination Title <span class="text-red-500">*</span></Label>
                                    <div class="relative">
                                        <MapPin class="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                        <Input 
                                            id="title" 
                                            type="text" 
                                            v-model="form.title" 
                                            placeholder="e.g., Tokyo & Around" 
                                            class="pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800"
                                            :class="{ 'border-red-500 focus-visible:ring-red-500': form.errors.title }"
                                        />
                                    </div>
                                    <div class="min-h-[1.5rem]">
                                        <InputError :message="form.errors.title" />
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="space-y-1.5">
                                        <div class="flex justify-between items-center">
                                            <Label for="country" class="text-xs font-medium">Country <span class="text-red-500">*</span></Label>
                                        </div>
                                        <div class="relative">
                                            <Globe class="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                            <Input 
                                                id="country" 
                                                type="text" 
                                                v-model="form.country" 
                                                placeholder="e.g., Japan" 
                                                class="pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800"
                                                :class="{ 'border-red-500 focus-visible:ring-red-500': form.errors.country }"
                                            />
                                        </div>
                                        <div class="min-h-[1.5rem]">
                                            <InputError :message="form.errors.country" />
                                        </div>
                                    </div>

                                    <div class="space-y-1.5">
                                        <div class="flex justify-between items-center">
                                            <Label for="tag" class="text-xs font-medium">Marketing Tag</Label>
                                            <span class="text-[10px] text-zinc-400 font-normal italic">Optional</span>
                                        </div>
                                        <div class="relative">
                                            <Tag class="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                            <Input 
                                                id="tag" 
                                                type="text" 
                                                v-model="form.tag" 
                                                placeholder="e.g., popular, trending" 
                                                class="pl-9 h-9 text-xs dark:bg-zinc-950 dark:border-zinc-800"
                                                :class="{ 'border-red-500 focus-visible:ring-red-500': form.errors.tag }"
                                            />
                                        </div>
                                        <div class="min-h-[1.5rem]">
                                            <InputError :message="form.errors.tag" />
                                        </div>
                                    </div>
                                </div>

                                <div class="space-y-1.5">
                                    <Label for="description" class="text-xs font-medium">Description Summary <span class="text-red-500">*</span></Label>
                                    <Textarea 
                                        id="description" 
                                        v-model="form.description" 
                                        rows="6"
                                        placeholder="Write an engaging overview detailing climate, scenic structures..." 
                                        class="text-xs dark:bg-zinc-950 dark:border-zinc-800 resize-none leading-relaxed"
                                        :class="{ 'border-red-500 focus-visible:ring-red-500': form.errors.description }"
                                    />
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
                                <CardTitle class="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Cover Image</CardTitle>
                                <CardDescription class="text-xs">Upload exactly one showcase landscape image asset.</CardDescription>
                            </CardHeader>
                            <CardContent class="p-4 pt-2">
                                
                                <div v-if="!imagePreview" class="relative group border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-700 transition duration-150">
                                    <label class="flex flex-col items-center justify-center p-6 text-center cursor-pointer min-h-[180px]">
                                        <ImagePlus class="w-8 h-8 text-zinc-400 stroke-[1.25] mb-2 group-hover:scale-105 transition" />
                                        <span class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Select Image File</span>
                                        <span class="text-[10px] text-zinc-400 mt-0.5">Supports PNG, JPG, or WEBP formats</span>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            class="hidden" 
                                            @change="handleFileSelect"
                                        />
                                    </label>
                                </div>

                                <div v-else class="relative aspect-[4/3] w-full rounded-lg overflow-hidden border bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 group">
                                    <img :src="imagePreview" alt="Destination preview" class="w-full h-full object-cover" />
                                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-150">
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="sm" 
                                            class="h-8 text-xs font-medium flex items-center gap-1.5 shadow-md"
                                            @click="clearSelectedImage"
                                        >
                                            <X class="w-3.5 h-3.5" /> Remove Photo
                                        </Button>
                                    </div>
                                </div>
                                
                                <div class="min-h-[1.5rem] mt-2">
                                    <InputError :message="form.errors.image" />
                                </div>

                            </CardContent>
                            
                            <CardFooter class="bg-zinc-50/50 dark:bg-zinc-900/40 px-4 py-3 border-t dark:border-zinc-800 flex justify-end gap-2">
                                <Button 
                                    type="submit" 
                                    size="sm" 
                                    class="h-8 text-xs gap-1.5 shadow-sm px-4" 
                                    :disabled="form.processing"
                                >
                                    <LoaderCircle v-if="form.processing" class="w-3.5 h-3.5 animate-spin" />
                                    <Save v-else class="w-3.5 h-3.5" /> Save Destination
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                </div>
            </form>

        </div>
    </AppLayout>
</template>