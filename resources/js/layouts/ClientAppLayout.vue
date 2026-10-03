<script setup lang="ts">
import AuthSuccessModal from '@/components/AuthSuccessModal.vue';
import ChatWidget from '@/components/chat/ChatWidget.vue';
import AppLayout from '@/layouts/app/AppNavigationLayout.vue';
import { BreadcrumbItemType, SharedData } from '@/types';
import { Client } from '@/types/client';
import { usePage } from '@inertiajs/vue3';
import { computed, ref } from 'vue';


interface Props {
    breadcrumbs?: BreadcrumbItemType[];
    authUser?: Client | null;
}

const props = defineProps<Props>();

    

const page = usePage<SharedData>();
const user = page.props.auth.client as Client;

const flash = page.props.flash;

const showAuthModal = ref(
    ['login', 'logout', 'register'].includes(flash?.type ?? '')
);
const type = computed(() => flash?.type as 'login' | 'logout' | 'register')

</script>


<template>
    <AppLayout
        :breadcrumbs="props.breadcrumbs"
        :auth-user="user"
    >
        <slot />

        <ChatWidget v-if="!authUser" />
        <AuthSuccessModal
            :open="showAuthModal"
            :variant="type"
            :user-name="user?.name"
            @close="showAuthModal = false" />
    </AppLayout>
</template>
