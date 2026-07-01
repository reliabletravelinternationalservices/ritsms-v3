<script setup lang="ts">
import { ref } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { User, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InfoTooltip from '@/components/InfoTooltip.vue';
import InputError from '@/components/InputError.vue';
import { Camera, X, AlertTriangle } from 'lucide-vue-next';
import { toast } from 'vue-sonner';
import { truncateText } from '@/lib/utils';


const props = defineProps<{ admin: User }>();

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
        title: truncateText(props.admin.name, 20),
        href: route('admin.users.admins.details', { id: props.admin.id }),
    },
    {
        title: 'Edit',
        href: route('admin.users.admins.edit', { id: props.admin.id }),
    }
];

// Initialize form with existing admin data (omitting password entirely)
const form = useForm({
    _method: 'PUT',
    name: props.admin.name ?? '',
    display_name: props.admin.display_name ?? '',
    email: props.admin.email ?? '',
    phone: props.admin.phone ?? '',
    role: props.admin.role, 
    avatar: null as File | null,
});

// Set default preview if an existing avatar url is present
const envUrl = import.meta.env.VITE_APP_URL || '';
const imagePreview = ref<string | null>(props.admin.avatar !== null ? `${envUrl}/storage/${props.admin.avatar}` : null);

// Check if email has been verified to conditionally lock it
const isEmailLocked = ref(!!props.admin.email_verified_at);

const handleAvatarChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        form.avatar = file;
        imagePreview.value = URL.createObjectURL(file);
    }
};

const clearAvatar = () => {
    form.avatar = null;
    if (imagePreview.value) {
        if (imagePreview.value.startsWith('blob:')) {
            URL.revokeObjectURL(imagePreview.value);
        }
        imagePreview.value = props.admin.avatar !== null ? `${envUrl}/storage/${props.admin.avatar}` : null;
    }
};

const submit = () => {
    form.post(route('admin.users.admins.update', { id: props.admin.id }), {
        preserveScroll: true,
        onSuccess: () => {
            toast.success('Admin account updated successfully.');
        },
    });
};
</script>

<template>
    <Head title="Edit Admin" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 flex-col gap-4 p-4 mx-auto w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Admin Account</CardTitle>
                    <CardDescription>Modify account settings and permissions for this administrator.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="submit" class="space-y-4">
                        
                        <!-- Avatar Section -->
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
                                    v-if="form.avatar || (imagePreview && imagePreview !== props.admin.avatar)"
                                    type="button" 
                                    variant="outline" 
                                    size="sm" 
                                    class="text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10 h-8 gap-1 px-2"
                                    @click="clearAvatar"
                                >
                                    <X class="w-3.5 h-3.5" />
                                    Reset Avatar
                                </Button>
                            </div>
                            
                            <div class="min-h-[1.5rem]">
                                <InputError :message="form.errors.avatar" />
                            </div>
                        </div>

                        <!-- Name Row -->
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

                        <!-- Access & Phone Row -->
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

                        <!-- Email Input Block -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <div class="flex items-center gap-1.5">
                                    <InfoTooltip v-if="isEmailLocked" content="Verified email addresses cannot be changed." />
                                    <Label for="email">Email Address</Label>
                                </div>
                                <Input 
                                    id="email" 
                                    v-model="form.email" 
                                    type="email" 
                                    placeholder="eg. username@example.com" 
                                    :disabled="isEmailLocked"
                                    :class="{ 'border-destructive': form.errors.email, 'bg-muted opacity-80 cursor-not-allowed': isEmailLocked }"
                                />
                                
                                <!-- Professional Orange Warning Callout -->
                                <div v-if="isEmailLocked" class="flex items-start gap-2 mt-2 p-2.5 rounded-lg border border-amber-200/60 bg-amber-50/50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400">
                                    <AlertTriangle class="w-4 h-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" />
                                    <p class="text-xs leading-relaxed font-medium">
                                        This email address is verified and cannot be modified to preserve account security.
                                    </p>
                                </div>

                                <div class="min-h-[1.5rem]">
                                    <InputError :message="form.errors.email" />
                                </div>
                            </div>
                        </div>
                        
                        <!-- Form Actions -->
                        <div class="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" @click="form.reset(); clearAvatar();">
                                Undo Changes
                            </Button>
                            <Button type="submit" :disabled="form.processing">
                                <span v-if="form.processing">Saving...</span>
                                <span v-else>Save Changes</span>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
</template>