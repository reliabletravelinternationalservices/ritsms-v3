<script setup lang="ts">
import { computed } from 'vue';
import { Head, Link, usePage } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, LogOut } from 'lucide-vue-next';
import { SharedData, type User } from '@/types';

const page = usePage<SharedData>();

// Dynamically fetch the authenticated user's profile
const currentUser = computed(() => page.props.auth?.user as User | undefined);
</script>

<template>
    <Head title="Inactive Account" />

    <div class="min-h-screen w-full flex items-center justify-center bg-muted/30 p-4">
        <Card class="max-w-md w-full border border-border/60 shadow-lg">
            <CardHeader class="text-center pt-8">
                <!-- Warning Graphic Icon Badge -->
                <div class="mx-auto w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
                    <ShieldAlert class="w-6 h-6 stroke-[2]" />
                </div>
                
                <CardTitle class="text-2xl font-bold tracking-tight text-foreground">
                    Account Access Restricted
                </CardTitle>
                <CardDescription class="text-sm text-muted-foreground mt-2">
                    Your Account is currently inactive. Access will be available once your account has been reviewed and activated.
                </CardDescription>
            </CardHeader>

            <CardContent class="text-center space-y-4 px-6 pb-6 text-sm text-muted-foreground">
                <!-- Explicit personalized warning message -->
                <div class="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive-foreground text-center">
                    The account <span class="font-semibold">"{{ currentUser?.email || currentUser?.name || 'User' }}"</span> is currently inactive. Please contact your system administrator to request account activation.
                </div>
                <div class="p-4 rounded-lg bg-muted/50 border border-border/40 text-left space-y-2 text-muted-foreground">
                    <p class="font-medium text-foreground">Why can't I access the system?</p>
                    <p class="text-xs leading-relaxed">
                        Your account has not been activated or has been temporarily disabled by an administrator. You will be able to access the administrator portal once your account status is changed to <span class="font-semibold text-foreground">Active</span>.
                    </p>
                </div>
            </CardContent>

            <CardFooter class="flex flex-col gap-2 border-t border-border/40 bg-muted/20 p-6 rounded-b-xl">
                <!-- Action: Trigger an absolute logout link method -->
                <Button variant="default" as-child class="w-full gap-2">
                    <Link :href="route('logout')" method="post" as="button" type="button">
                        <LogOut class="w-4 h-4" />
                        Sign Out
                    </Link>
                </Button>

                <!-- Action: Contact Workspace Admin mail anchor -->
                <!-- <Button variant="ghost" as-child class="w-full gap-2 text-muted-foreground hover:text-foreground">
                    <a :href="`mailto:support@yourdomain.com?subject=Activation Request for ${currentUser?.name || currentUser?.email}`">
                        <MailQuestion class="w-4 h-4" />
                        Contact Workspace Admin
                    </a>
                </Button> -->
            </CardFooter>
        </Card>
    </div>
</template>