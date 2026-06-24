<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PasswordInput from '@/components/PasswordInput.vue';
import InfoTooltip from '@/components/InfoTooltip.vue';
import InputError from '@/components/InputError.vue';
import { Camera, X } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('admin.dashboard'),
    },
    {
        title: 'Admin Management',
        href: route('admin.users.admins'),
    },
    {
        title: 'Create',
        href: route('admin.users.admins.create'),
    }
];

const form = useForm({
    name: '',
    display_name: '',
    email: '',
    phone: '',
    password: '',
    role: 'admin', 
    avatar: null as File | null,
});

const imagePreview = ref<string | null>(null);

const handleAvatarChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        form.avatar = file;
        imagePreview.value = URL.createObjectURL(file);
    }
};

// Method to explicitly clear out the profile picture state
const clearAvatar = () => {
    form.avatar = null;
    if (imagePreview.value) {
        URL.revokeObjectURL(imagePreview.value); // Clean up memory
        imagePreview.value = null;
    }
};

const submit = () => {
    form.post(route('admin.users.admins.store'), {
        onSuccess: () => {
            form.reset();
            clearAvatar();
            toast.success('Admin account created successfully.');
        },
    });
};
</script>

<template>
    <Head title="Create Admin" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 flex-col gap-4 p-4 mx-auto w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Admin Account</CardTitle>
                    <CardDescription>Fill out the details below to provision a new administrator account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="submit" class="space-y-4">
                        
                        <div class="flex flex-col items-center justify-center pb-6 border-b border-border/40 gap-2">
                            <Label class="text-sm font-medium text-muted-foreground">Account Avatar</Label>
                            
                            <div class="flex flex-col items-center justify-center gap-4">
                                <div class="relative group flex items-center justify-center">
                                    <div class="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-muted-foreground/30 group-hover:border-primary/50 transition-colors flex items-center justify-center bg-muted/30">
                                        <img 
                                            v-if="imagePreview" 
                                            :src="imagePreview" 
                                            alt="Avatar preview" 
                                            class="w-full h-full object-cover"
                                        />
                                        <div v-else class="flex flex-col items-center text-muted-foreground">
                                            <Camera class="w-6 h-6 mb-1 stroke-[1.5]" />
                                            <span class="text-[10px]">Upload</span>
                                        </div>
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                                        @change="handleAvatarChange"
                                    />
                                </div>

                                <Button 
                                    v-if="imagePreview"
                                    type="button" 
                                    variant="outline" 
                                    size="sm" 
                                    class="text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10 h-8 gap-1 px-2"
                                    @click="clearAvatar"
                                >
                                    <X class="w-3.5 h-3.5" />
                                    Clear
                                </Button>
                            </div>
                            
                            <div class="min-h-[1.5rem]">
                                <InputError :message="form.errors.avatar" />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="name">Full Name</Label>
                                <Input 
                                    id="name" 
                                    v-model="form.name" 
                                    type="text" 
                                    placeholder="eg. John Doe" 
                                    :class="{ 'border-destructive': form.errors.name }"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError :message="form.errors.name" />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <Label for="display_name">Display Name</Label>
                                <Input 
                                    id="display_name" 
                                    v-model="form.display_name" 
                                    type="text" 
                                    placeholder="eg. Travel Agent" 
                                    :class="{ 'border-destructive': form.errors.display_name }"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError :message="form.errors.display_name" />
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-2">         
                                <Label for="role">
                                    <InfoTooltip content="Admin: Full Access&#10;Agent: Partial Access" />
                                    Access Level
                                </Label>
                                <Select v-model="form.role">
                                    <SelectTrigger id="role" :class="{ 'border-destructive': form.errors.role }">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="agent">Agent</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div class="min-h-[1.5rem]">
                                    <InputError :message="form.errors.role" />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <Label for="phone">Phone Number</Label>
                                <Input 
                                    id="phone" 
                                    v-model="form.phone" 
                                    type="tel" 
                                    placeholder="+63 9XXX XXX XXX" 
                                    :class="{ 'border-destructive': form.errors.phone }"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError :message="form.errors.phone" />
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <Label for="email">Email Address</Label>
                                <Input 
                                    id="email" 
                                    v-model="form.email" 
                                    type="email" 
                                    placeholder="eg. username@example.com" 
                                    :class="{ 'border-destructive': form.errors.email }"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError :message="form.errors.email" />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <Label for="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    v-model="form.password"
                                    placeholder="Password"
                                    :class="{ 'border-destructive': form.errors.password }"
                                />
                                <div class="min-h-[1.5rem]">
                                    <InputError :message="form.errors.password" />
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" @click="form.reset(); clearAvatar();">
                                Reset
                            </Button>
                            <Button type="submit" :disabled="form.processing">
                                <span v-if="form.processing">Creating...</span>
                                <span v-else>Create Admin Account</span>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>