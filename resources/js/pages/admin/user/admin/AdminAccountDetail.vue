<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/AppLayout.vue';
import { formatDateString } from '@/lib/utils';
import { openDeleteDialog } from '@/stores/deleteDialog';
import { type BreadcrumbItem, SharedData, type User } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';
import { ArrowLeft, CheckCircle2, CircleAlert, CircleMinus, Mail, Pencil, Phone, Shield, ShieldAlert, Trash2, User as UserIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { toast } from 'vue-sonner';

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
    },
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
        case 'active':
            return 'default';
        case 'inactive':
            return 'secondary';
        default:
            return 'destructive';
    }
});

const isEmailVerified = computed(() => Boolean(props.admin.email_verified_at));

const emailVerifiedDate = computed(() => formatDateString(props.admin.email_verified_at ?? undefined, true));

const isSendingVerification = ref(false);


const form = useForm({
    id: props.admin.id,
    email: props.admin.email,
});
const sendVerificationEmail = () => {
    form.post(route('admin.verify.email.send'), {
        onStart: () => {
            isSendingVerification.value = true;
        },
        onFinish: () => {
            isSendingVerification.value = false;
        },
        onSuccess: () => {
            toast.success('Verification email sent successfully.');
        },
    });
};


const onDelete = () => {
    openDeleteDialog({
        title: 'Delete Account',
        message: `Are you sure you want to delete "${props.admin.name}"? This action cannot be undone.`,
        confirmText: 'Delete Account',
        cancelText: 'Cancel',

        onConfirm: () => {
            router.delete(
                route('admin.users.admins.destroy', {
                    id: props.admin.id
                }),
                {
                    onSuccess: () => {
                        toast.success('Account deleted successfully');
                    },

                    onError: () => {
                        toast.error('Failed to delete account');
                    },
                }
            );
        },
    });
};

const envUrl = import.meta.env.VITE_APP_URL;
</script>

<template>
    <Head title="Account Details" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4">
            <div class="flex items-center justify-between">
                <Button variant="ghost" as-child class="gap-2">
                    <Link :href="route('admin.users.admins')">
                        <ArrowLeft class="h-4 w-4" />
                        Back to List
                    </Link>
                </Button>

                <div v-if="!isCurrentUser" class="flex items-center gap-2">
                    <Button variant="outline" as-child class="gap-2">
                        <Link href="#">
                            <Pencil class="h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                    <Button @click="onDelete" v-if="!isCurrentUser && !isEmailVerified" variant="destructive" as-child>
                        <span class="cursor-pointer">
                            <Trash2 class="h-4 w-4" />
                            Delete
                        </span>
                    </Button>
                    <Button v-else variant="ghost" as-child class="gap-2 bg-red-700/10 border-red-700">
                        <span class="cursor-pointer">
                            <CircleMinus class="h-4 w-4" />
                            Deactivate
                        </span>
                    </Button>
                </div>

                <div v-else>
                    <Badge variant="outline" class="gap-1.5 bg-muted/20 px-3 py-1 text-muted-foreground">
                        <ShieldAlert class="h-3.5 w-3.5" />
                        Viewing Your Account Profile
                    </Badge>
                </div>
            </div>

            <Card>
                <CardContent class="pt-6">
                    <div class="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
                        <Avatar class="h-24 w-24 border-2 border-border">
                            <AvatarImage :src="`${envUrl}/storage/${props.admin.avatar}`" :alt="props.admin.name" class="object-cover" />
                            <AvatarFallback class="bg-primary text-xl font-semibold text-primary-foreground">
                                {{ initials }}
                            </AvatarFallback>
                        </Avatar>

                        <div class="flex-1 space-y-2">
                            <div class="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                                <div>
                                    <h2 class="text-2xl font-bold tracking-tight">{{ props.admin.name }}</h2>
                                    <p class="text-sm text-muted-foreground">@{{ props.admin.display_name || 'No display name' }}</p>
                                </div>
                                <div class="flex justify-center gap-2 md:justify-end">
                                    <Badge :variant="statusVariant" class="capitalize">
                                        {{ props.admin.status }}
                                    </Badge>
                                    <Badge variant="outline" class="gap-1 capitalize">
                                        <Shield class="h-3 w-3 fill-primary/10 text-primary" />
                                        {{ props.admin.role }}
                                    </Badge>
                                    <Badge
                                        v-if="isEmailVerified"
                                        variant="outline"
                                        class="gap-1 border-green-200 bg-green-50 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400"
                                    >
                                        <CheckCircle2 class="h-3 w-3" />
                                        Verified
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card class="md:col-span-2">
                    <CardHeader>
                        <CardTitle class="text-base">Contact & Identity Details</CardTitle>
                        <CardDescription>Core identity references assigned to this profile.</CardDescription>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                            <div class="flex items-center gap-3">
                                <div class="rounded-md bg-muted p-2 text-muted-foreground">
                                    <Mail class="h-4 w-4" />
                                </div>
                                <div class="space-y-0.5">
                                    <p class="text-xs font-medium text-muted-foreground">Email Address</p>
                                    <p class="font-medium text-foreground">{{ props.admin.email }}</p>
                                </div>
                            </div>

                            <div
                                v-if="isEmailVerified"
                                class="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-green-700 dark:border-green-900/60 dark:bg-green-950/30 dark:text-green-400"
                            >
                                <CheckCircle2 class="h-4 w-4 shrink-0" />
                                <div class="leading-tight">
                                    <p class="text-xs font-semibold">Email verified</p>
                                    <p class="text-xs">Verified at {{ emailVerifiedDate }}</p>
                                </div>
                            </div>

                            <Button
                                v-else
                                type="button"
                                variant="outline"
                                class="w-full gap-2 sm:w-auto"
                                :disabled="isSendingVerification"
                                @click="sendVerificationEmail"
                            >
                                <CircleAlert class="h-4 w-4 text-amber-500" />
                                {{ isSendingVerification ? 'Sending...' : 'Verify Gmail Account' }}
                            </Button>
                        </div>
                        <div class="flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between">
                            <InputError :message="form.errors.email" class="mt-2 text-sm" />
                        </div>
                        <div
                            v-if="!isEmailVerified"
                            class="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300"
                        >
                            This admin account is not Gmail verified yet. Verification will allow the account to be marked active once you access the
                            link sent to your email.
                        </div>

                        <Separator class="bg-border/60" />

                        <div class="flex items-center gap-3 text-sm">
                            <div class="rounded-md bg-muted p-2 text-muted-foreground">
                                <Phone class="h-4 w-4" />
                            </div>
                            <div class="space-y-0.5">
                                <p class="text-xs font-medium text-muted-foreground">Mobile Number</p>
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
                            <div class="rounded-md bg-muted p-2 text-muted-foreground">
                                <UserIcon class="h-4 w-4" />
                            </div>
                            <div class="space-y-0.5">
                                <p class="text-xs font-medium text-muted-foreground">Internal Reference ID</p>
                                <p class="font-mono text-xs font-semibold">ID-{{ props.admin.id }}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </AppLayout>
</template>
