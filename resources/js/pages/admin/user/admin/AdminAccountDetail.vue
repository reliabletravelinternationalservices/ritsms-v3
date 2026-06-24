<script setup lang="ts">
import { computed } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { type User, type BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Shield, Mail, Phone, User as UserIcon, ShieldAlert, ArrowLeft, Pencil, Trash2 } from 'lucide-vue-next';

interface Props {
    admin: User;
}
const props = defineProps<Props>();

const page = usePage<SharedData>();

// Dynamically compute if the viewed profile belongs to the currently logged-in user
const isCurrentUser = computed(() => {
    const authUser = page.props.auth.user as User | undefined;
    return authUser?.id === props.admin.id;
});

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
        title: 'Details',
        href: route('admin.users.admins.details', { id: props.admin.id }),
    }
];

// Helper for initials fallback on avatar
const initials = computed(() => {
    return props.admin.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
});

// Helper for styling status badges dynamically
const statusVariant = computed(() => {
    switch (props.admin.status) {
        case 'active': return 'default';
        case 'inactive': return 'secondary';
        default: return 'destructive';
    }
});


const envUrl = import.meta.env.VITE_APP_URL;
</script>

<template>
    <Head title="Account Details" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex flex-1 flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
            
            <div class="flex items-center justify-between">
                <Button variant="ghost" as-child class="gap-2">
                    <Link :href="route('admin.users.admins')">
                        <ArrowLeft class="w-4 h-4" />
                        Back to List
                    </Link>
                </Button>

                <div v-if="!isCurrentUser" class="flex items-center gap-2">
                    <Button variant="outline" as-child class="gap-2">
                        <Link href="#">
                            <Pencil class="w-4 h-4" />
                            Edit Account
                        </Link>
                    </Button>
                    <Button variant="destructive" as-child class="gap-2">
                        <Link 
                            href="#"
                            method="delete" 
                            as="button" 
                            type="button"
                            preserve-scroll
                        >
                            <Trash2 class="w-4 h-4" />
                            Delete Account
                        </Link>
                    </Button>
                </div>

                <div v-else>
                    <Badge variant="outline" class="gap-1.5 text-muted-foreground px-3 py-1 bg-muted/20">
                        <ShieldAlert class="w-3.5 h-3.5" />
                        Viewing Your Account Profile
                    </Badge>
                </div>
            </div>

            <Card>
                <CardContent class="pt-6">
                    <div class="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                        <Avatar class="w-24 h-24 border-2 border-border">
                            <AvatarImage :src="`${ envUrl }/storage/${ props.admin.avatar }`" :alt="props.admin.name" class="object-cover" />
                            <AvatarFallback class="text-xl bg-primary text-primary-foreground font-semibold">
                                {{ initials }}
                            </AvatarFallback>
                        </Avatar>

                        <div class="space-y-2 flex-1">
                            <div class="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                                <div>
                                    <h2 class="text-2xl font-bold tracking-tight">{{ props.admin.name }}</h2>
                                    <p class="text-sm text-muted-foreground">@{{ props.admin.display_name || 'No display name' }}</p>
                                </div>
                                <div class="flex gap-2 justify-center md:justify-end">
                                    <Badge :variant="statusVariant" class="capitalize">
                                        {{ props.admin.status }}
                                    </Badge>
                                    <Badge variant="outline" class="capitalize gap-1">
                                        <Shield class="w-3 h-3 text-primary fill-primary/10" />
                                        {{ props.admin.role }}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <Card class="md:col-span-2">
                    <CardHeader>
                        <CardTitle class="text-base">Contact & Identity Details</CardTitle>
                        <CardDescription>Core identity references assigned to this profile.</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="flex items-center gap-3 text-sm">
                            <div class="p-2 rounded-md bg-muted text-muted-foreground">
                                <Mail class="w-4 h-4" />
                            </div>
                            <div class="space-y-0.5">
                                <p class="text-xs text-muted-foreground font-medium">Email Address</p>
                                <p class="font-medium text-foreground">{{ props.admin.email }}</p>
                            </div>
                        </div>

                        <Separator class="bg-border/60" />

                        <div class="flex items-center gap-3 text-sm">
                            <div class="p-2 rounded-md bg-muted text-muted-foreground">
                                <Phone class="w-4 h-4" />
                            </div>
                            <div class="space-y-0.5">
                                <p class="text-xs text-muted-foreground font-medium">Mobile Number</p>
                                <p class="font-medium text-foreground">{{ props.admin.phone || 'None provided' }}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle class="text-base">System Audit</CardTitle>
                        <CardDescription>System logs associated with user metadata.</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="flex items-center gap-3 text-sm">
                            <div class="p-2 rounded-md bg-muted text-muted-foreground">
                                <UserIcon class="w-4 h-4" />
                            </div>
                            <div class="space-y-0.5">
                                <p class="text-xs text-muted-foreground font-medium">Internal Reference ID</p>
                                <p class="font-mono text-xs font-semibold">ID-{{ props.admin.id }}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
        </div>
    </AppLayout>
</template>